import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialog } from "../../context/dialogContext";
import { LoaderCircle } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import MarkdownPreview from "@uiw/react-markdown-preview";

const fetchAnalysis = async (prompt: string, signal: AbortSignal) => {
  const resp = await fetch(process.env.NEXT_PUBLIC_AI_URL as string, {
    method: "POST",
    body: JSON.stringify({
      model: "gemma2",
      stream: true,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
    headers: {
      "Content-Type": "application/json",
    },
    signal,
  });

  return resp;
};

const streamResponse = async (
  resp: Response,
  setAnalysisResult: (value: string | ((prev: string) => string)) => void
) => {
  const reader = resp.body?.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  reader?.read().then(function processText({ done, value }): Promise<void> {
    if (done) return Promise.resolve();
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.trim().startsWith("data: ")) {
        const json = line.trim().substring(6);
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices[0].delta.content;
          setAnalysisResult((previous: string) => previous + content);
        } catch (error) {
          console.error("Failed to parse JSON:", error);
        }
      }
    }

    return reader.read().then(processText).catch((error) => {
      if (error.name === "AbortError") {
        console.log("Stream reading aborted");
      } else {
        console.error("Stream reading error:", error);
      }
    });
  });
};

export function DialogExplanIA() {
  const { isDialogOpen, setDialogOpen, dialogParams } = useDialog();
  const [loading, setLoading] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  useEffect(() => {
    if (isDialogOpen) {
      const controller = new AbortController();
      setAbortController(controller);
      setLoading(true);
      fetchAnalysis(dialogParams.prompt, controller.signal)
        .then((resp) => streamResponse(resp, setAnalysisResult))
        .finally(() => setLoading(false));
    }
  }, [isDialogOpen, dialogParams.prompt]);

  function closeDialog() {
    setDialogOpen(false);
    setAnalysisResult("");
    abortController?.abort();
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-[800px] max-h-[800px]">
        <DialogHeader>
          <DialogTitle className="mb-4">Analise do gráfico</DialogTitle>
          <DialogDescription>
            {loading ? (
              <div className="h-[300px] flex justify-center items-center">
                <LoaderCircle size={90} className="animate-spin" />
              </div>
            ) : (
              <ScrollArea className="max-h-[500px] overflow-y-auto">
                {analysisResult && (
                  <>
                    <MarkdownPreview
                      source={analysisResult}
                      style={{ backgroundColor: "transparent" }}
                    />
                    <ScrollBar orientation="vertical" />
                  </>
                )}
              </ScrollArea>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}