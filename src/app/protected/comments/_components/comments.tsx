import PageLayout from "@/components/shared/pageLayout";
import { Card } from "@/components/ui/card";
import { DataTable } from "./data-table/data-table";
import { CommentsValue } from "./data-table/types";
import { faker } from "@faker-js/faker";

// Função para gerar dados aleatórios
const generateData = (numRecords: number): CommentsValue[] => {
  const data: CommentsValue[] = [];
  for (let i = 0; i < numRecords; i++) {
    data.push({
      id: faker.string.uuid(),
      name: faker.name.fullName(),
      email: faker.internet.email(),
      cellphone: faker.phone.number({ style: "international" }),
      device: faker.helpers.arrayElement(["mobile", "desktop"]),
      date: faker.date.past().toISOString().split("T")[0],
      comment: faker.lorem.sentence(),
      nps: faker.number.int({ min: 0, max: 100 }),
      sentiment: faker.number.int({ min: 0, max: 100 }),
    });
  }
  return data;
};

const data: CommentsValue[] = generateData(50);

export function Comments() {
  return (
    <PageLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Comentários</h1>
      </div>
      <Card>
        <div className="p-4 pt-0">
          <DataTable data={data} />
        </div>
      </Card>
    </PageLayout>
  );
}
