import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ILastReviews } from "@/services/http/interfaces/responses/last-reviews.interface";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface UsersPromotersProps {
  data: ILastReviews[];
}

export function UsersPromotersTable({ data }: UsersPromotersProps) {
  return (
    <div>
      {data.length === 0 ? (
        <Skeleton className="h-[500px] w-full" />
      ) : (
        <Card className="h-full">
          <div className="p-4 pb-2 flex justify-between">
            <h2 className="text-lg font-bold">Últimos Promotores</h2>
            <Button variant="outline" size="icon" className="border-none">
              <Sparkles className="h-3.5 w-3.5" />
            </Button>
          </div>
          <div className="p-3 pt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nota</TableHead>
                  <TableHead>Sentimento</TableHead>
                  <TableHead>Comentário</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{row.rating}</TableCell>
                    <TableCell className="text-center">
                      {row.sentiment}
                    </TableCell>
                    <TableCell>{row.comment}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}
