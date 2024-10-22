export const getColumnLabel = (id: string): string => {
  switch (id) {
    case "id":
      return "ID";
    case "name":
      return "Nome";
    case "email":
      return "Email";
    case "cellphone":
      return "Telefone";
    case "device":
      return "Dispositivo";
    case "date":
      return "Data";
    case "comment":
      return "Comentário";
    case "nps":
      return "NPS";
    case "sentiment":
      return "Sent.";
    default:
      return id;
  }
};
