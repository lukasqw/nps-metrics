"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/shared/pageLayout";
import { Card } from "@/components/ui/card";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Classification } from "./classfication";

const FormSchema = z.object({
  comentario: z
    .string()
    .min(1, {
      message: "O comentário deve ter pelo menos 1 caracteres.",
    })
    .max(500, {
      message: "A comentário não deve ter mais de 500 caracteres.",
    })
    .nonempty({
      message: "A comentário é obrigatória.",
    }),
});

const useFetchAnalysis = () => {
  const fetchAnalysis = async (prompt: string) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_AI_URL as string, {
        method: "POST",
        body: JSON.stringify({
          model: "gemma2",
          stream: false,
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
      });

      const data = await response.json();
      const resposta = data.choices[0].message.content;

      // Extrair o JSON da string retornada procurando pelas chaves {}
      const jsonMatch = resposta.match(/{[\s\S]*}/);
      if (!jsonMatch) {
        console.error("Error fetching data: No JSON match found");
        return null;
      }

      const jsonString = jsonMatch[0].trim();
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  return fetchAnalysis;
};

const getPrompt = (comentario: string): string => {
  return `
Você é um especialista em análise de sentimentos. Analise o texto entre colchetes [ ]
Considere os seguintes aspectos linguísticos, com a porcentagem indicando a importância de cada aspecto para a análise de sentimento:

Léxico Emocional (25%)
Identifique palavras que expressam sentimentos:
Positivo: Palavras como "feliz", "excelente", "fantástico".
Neutro: Palavras informativas, como "adequado", "mediano".
Negativo: Palavras como "triste", "horrível", "fracasso".

Contexto Linguístico (20%)
Considere como o contexto altera o sentimento das palavras:
Positivo: Uso de ironia positiva ("Claro que estou super feliz com isso!" expressando felicidade).
Neutro: Ironia sem carga emocional significativa ("Muito típico").
Negativo: Sarcasmo negativo ("Claro, isso foi tão útil" com intenção negativa).

Intensidade Emocional (15%)
Avalie a força das emoções no texto:
Positivo: Intensificadores de emoções positivas ("extremamente feliz").
Neutro: Emoções de pouca intensidade ("levemente contente").
Negativo: Intensificadores de emoções negativas ("completamente horrível").

Sintaxe e Estrutura da Frase (10%)
A construção da frase pode influenciar o sentimento:
Positivo: Frases que transmitem satisfação ("Foi uma experiência incrível").
Neutro: Frases descritivas e objetivas ("O evento ocorreu às 18 horas").
Negativo: Frases que expressam frustração ("Isso foi um desperdício de tempo").

Contexto Cultural e Temporal (10%)
Considere o impacto cultural e temporal nas expressões:
Positivo: Termos com conotação positiva em contextos atuais ("épico" significando algo muito bom).
Neutro: Palavras com significado literal e neutro.
Negativo: Termos com conotação negativa ou desatualizada.

Uso de Emojis e Emoticons (5%)
Emojis podem modificar o tom emocional:
Positivo: Emojis de felicidade ou aprovação (😊, 👍).
Neutro: Emojis sem carga emocional significativa (🔄, 🔍).
Negativo: Emojis de tristeza ou desaprovação (😞, 👎).

Marcadores Discursivos (5%)
Identifique palavras que mudam o tom ou introduzem novas ideias:
Positivo: Marcadores de emoção positiva ("excelente").
Neutro: Marcadores de transição ("no entanto").
Negativo: Marcadores de desapontamento ("infelizmente").

Polaridade e Multiplicidade de Sentimentos (5%)
Detecte a presença de múltiplos sentimentos no texto:
Positivo: Sentimentos positivos predominantes em contextos mistos.
Neutro: Equilíbrio ou ambiguidade emocional.
Negativo: Sentimentos negativos predominantes.

Referências a Entidades Nomeadas e Relacionamentos (5%)
O modo como entidades são mencionadas pode alterar o sentimento:
Positivo: Mencionar entidades de forma elogiosa ("A Apple fez um trabalho excelente").
Neutro: Referências neutras ou informativas.
Negativo: Mencionar entidades de forma crítica ("O governo falhou miseravelmente").

Estilo de Linguagem e Tom (5%)
A tonalidade geral do texto pode impactar a percepção emocional:
Positivo: Linguagem otimista.
Neutro: Estilo informativo ou descritivo.
Negativo: Linguagem pessimista ou crítica.

Objetividade e Neutralidade (5%)
Avalie se o texto é imparcial ou inclinado:
Positivo: Fatos com leve inclinação positiva.
Neutro: Fatos estritamente objetivos.
Negativo: Fatos com leve inclinação negativa.

Entonação e Prosódia (em Texto Falado) (5%)
Considere como a entonação pode influenciar o sentimento:
Positivo: Entonação alegre ou excitada.
Neutro: Entonação neutra e equilibrada.
Negativo: Entonação triste ou irritada.

Texto: [${comentario}]

Formato de retorno em json:
Não retorne nada a mais além do solicitado, somente o json.
{
  "sentiment": "promoter" | "neutral" | "detractor",
}
  `;
};

export function Analytics() {
  const [status, setStatus] = useState<
    "Promotor" | "Neutro" | "Detrator" | "Loading"
  >("Promotor");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const fetchAnalysis = useFetchAnalysis();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const prompt = getPrompt(data.comentario);
    setLoading(true);
    setStatus("Loading");
    const iaResponse = await fetchAnalysis(prompt);
    setLoading(false);

    if (iaResponse) {
      console.log("Response Data:", iaResponse);
      setStatus(
        iaResponse.sentiment === "promoter"
          ? "Promotor"
          : iaResponse.sentiment === "neutral"
          ? "Neutro"
          : "Detrator"
      );
    } else {
      setStatus("Promotor"); // Default status if no response
    }
  };

  return (
    <PageLayout>
      <Toaster />
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
      </div>
      <Card className="p-4 grid gap-4 sm:grid-cols-1 lg:grid-cols-5 lg:grid-rows-1 ">
        <div className="lg:col-span-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="comentario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentário do usuário</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Estou amando a nova funcionalidade de análise de dados!"
                        className="resize-none h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="flex gap-2 w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4" />
                    Carregando...
                  </>
                ) : (
                  <>
                    Analisar <Sparkles className="h-3.5 w-3.5" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
        <div className="lg:col-start-5 p-4">
          <Classification status={status} />
        </div>
      </Card>
    </PageLayout>
  );
}
