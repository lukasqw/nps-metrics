import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  {
    comment:
      "O app está muito pesado, exigindo muito da internet. Sempre que tô com os dados móveis na rua não consigo acessar, daí tenho que usar outro banco onde o app é mais leve",
    nps: 95,
  },
  {
    comment: "Muito obrigado",
    device: "desktop",
    nps: 80,
  },
  {
    comment:
      "App lento, ruim para tudo aí para ajudar pede atualização quando tento atualizar não consigo ficar só carregando, HORRÍVEL.",
    nps: 78,
  },
  {
    comment: "Aplicativo não baixa pdf",
    nps: 85,
  },
  {
    comment: "Não estou conseguindo abrir uma conta no Itaú?",
    nps: 92,
  },
];

export function UsersDetractorsTable() {
  return (
    <Card>
      <div className=" p-4 pb-2">
        <h2 className="text-lg font-bold">Últimos Detratores</h2>
      </div>
      <div className="p-3 pt-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nota</TableHead>
              <TableHead>Comentário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{row.nps}</TableCell>
                <TableCell>{row.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
