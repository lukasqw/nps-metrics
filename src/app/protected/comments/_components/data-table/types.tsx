export type CommentsValue = {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  device: "mobile" | "desktop";
  date: string;
  comment: string;
  nps: number;
  sentiment: number;
};
