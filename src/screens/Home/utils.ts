export const formatTotalValue = (value: number) => {
  const formattedValue = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formattedValue;
};

export const formatDate = (date?: Date) => {
  if (!date) {
    return "";
  }

  const splitIso = date.toISOString().split("T")[0];
  const dateIso = splitIso.split("-");
  const formattedDate = `${dateIso[2]}/${dateIso[1]}/${dateIso[0]}`;

  return formattedDate;
};

export const isPaymentCodeValid = (code: string) => {
  if (code.length === 44 || code.length === 47) {
    return true;
  }

  return false;
};
