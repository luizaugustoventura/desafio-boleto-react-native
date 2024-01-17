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
  if (code.length === 44 || code.length === 46 || code.length === 47) {
    return true;
  }

  return false;
};

export const extractValueFromCode = (code: string) => {
  if (!isPaymentCodeValid(code)) {
    return 0;
    // throw
  }

  let rawValue: number, value: number;

  switch (code.length) {
    case 44:
      rawValue = Number(code.slice(9, 19));
      value = rawValue / 100;
      return value;

    case 46:
      code = code.slice(1, 45);
      rawValue = Number(code.slice(9, 19));
      value = rawValue / 100;
      return value;

    case 47:
      rawValue = Number(code.slice(37, 47));
      value = rawValue / 100;
      return value;

    default:
      return 0;
  }
};

export const extractExpirationDateFromCode = (code: string) => {
  if (!isPaymentCodeValid(code)) {
    return;
    // throw
  }

  const baseDate = new Date("1997-10-07");
  let expirationFactor: string;
  let validUntil: Date;

  switch (code.length) {
    case 44:
      expirationFactor = code.slice(5, 9);
      validUntil = new Date(
        baseDate.getTime() + parseInt(expirationFactor) * 24 * 60 * 60 * 1000
      );
      return validUntil;

    case 46:
      code = code.slice(1, 45);
      expirationFactor = code.slice(5, 9);
      validUntil = new Date(
        baseDate.getTime() + parseInt(expirationFactor) * 24 * 60 * 60 * 1000
      );
      return validUntil;

    case 47:
      expirationFactor = code.slice(33, 37);
      validUntil = new Date(
        baseDate.getTime() + parseInt(expirationFactor) * 24 * 60 * 60 * 1000
      );
      return validUntil;

    default:
      return;
  }
};
