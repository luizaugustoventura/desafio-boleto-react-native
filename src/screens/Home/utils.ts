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

export const extractValueFromCode = (code: string) => {
  if (code.length !== 44 && code.length !== 47) {
    return 0;
    // throw
  }

  if (code.length === 44) {
    const rawValue = Number(code.slice(9, 19));
    const value = rawValue / 100;

    return value;
  } else {
    const rawValue = Number(code.slice(37, 47));
    const value = rawValue / 100;

    return value;
  }
};

export const extractExpirationDateFromCode = (code: string) => {
  if (code.length !== 44 && code.length !== 47) {
    return;
    // throw
  }

  if (code.length === 44) {
    const expirationFactor = code.slice(5, 9);
    const baseDate = new Date("1997-10-07");
    const validUntil = new Date(
      baseDate.getTime() + parseInt(expirationFactor) * 24 * 60 * 60 * 1000
    );

    return validUntil;
  } else {
    const expirationFactor = code.slice(33, 37);
    const baseDate = new Date("1997-10-07");
    const validUntil = new Date(
      baseDate.getTime() + parseInt(expirationFactor) * 24 * 60 * 60 * 1000
    );

    return validUntil;
  }
};
