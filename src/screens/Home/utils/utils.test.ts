import { InvalidPaymentCodeError } from "../../../errors/InvalidPaymentCode.error";
import {
  extractExpirationDateFromCode,
  extractValueFromCode,
  formatDate,
  formatTotalValue,
  isPaymentCodeValid,
} from "./utils";

describe("formatTotalValue() function", () => {
  it("should format the total value correctly", () => {
    const value = 10;

    const formattedValue = formatTotalValue(value);

    expect(formattedValue).toBe("R$ 10,00".replace(" ", "\xa0"));
  });
});

describe("formatDate() function", () => {
  it("should format the date correctly", () => {
    const date = new Date("2024-01-01");

    const formattedDate = formatDate(date);

    expect(formattedDate).toBe("01/01/2024");
  });

  it("should return an empty string if the date provided is undefined or null", () => {
    const formattedDate = formatDate(undefined);

    expect(formattedDate).toBe("");
  });
});

describe("isPaymentCodeValid() function", () => {
  it("should return true if the code has 44, 46 or 47 characters", () => {
    const code_44 = "00193373700000001000500940144816060680935031";
    const code_46 = "0341939598000002603517512345678712341234560000";
    const code_47 = "00190500954014481606906809350314337370000000100";

    const isValidCode_44 = isPaymentCodeValid(code_44);
    const isValidCode_46 = isPaymentCodeValid(code_46);
    const isValidCode_47 = isPaymentCodeValid(code_47);

    expect(isValidCode_44).toBeTruthy();
    expect(isValidCode_46).toBeTruthy();
    expect(isValidCode_47).toBeTruthy();
  });

  it("should return false if the code doest not obey the 44, 46 or 47 characters requirement", () => {
    const code = "034199959900260001790001043510049102015000";

    const isValidCode = isPaymentCodeValid(code);

    expect(isValidCode).toBeFalsy();
  });
});

describe("extractValueFromCode() function", () => {
  it("should return the value if the code has 44, 46 or 47 characters", () => {
    const code_44 = "00193373700000001000500940144816060680935031";
    const code_46 = "0341939598000002603517512345678712341234560000";
    const code_47 = "00190500954014481606906809350314337370000000100";

    const value_44 = extractValueFromCode(code_44);
    const value_46 = extractValueFromCode(code_46);
    const value_47 = extractValueFromCode(code_47);

    expect(value_44).toBe(1);
    expect(value_46).toBe(260.35);
    expect(value_47).toBe(1);
  });

  it("should throw an InvalidPaymentCodeError if the code does not obey the 44, 46 or 47 characters requirement", () => {
    const code = "034199959900260001790001043510049102015000";

    const extractValue = () => extractValueFromCode(code);

    expect(extractValue).toThrow(InvalidPaymentCodeError);
  });
});

describe("extractExpirationDateFromCode() function", () => {
  it("should return the expiration date if the code has 44, 46 or 47 characters", () => {
    const code_44 = "00193373700000001000500940144816060680935031";
    const code_46 = "0341939598000002603517512345678712341234560000";
    const code_47 = "00190500954014481606906809350314337370000000100";

    const expirationDate_44 = extractExpirationDateFromCode(code_44);
    const expirationDate_46 = extractExpirationDateFromCode(code_46);
    const expirationDate_47 = extractExpirationDateFromCode(code_47);

    expect(expirationDate_44).toBeInstanceOf(Date);
    expect(expirationDate_44?.toISOString()).toBe("2007-12-31T00:00:00.000Z");
    expect(expirationDate_46).toBeInstanceOf(Date);
    expect(expirationDate_46?.toISOString()).toBe("2024-01-17T00:00:00.000Z");
    expect(expirationDate_47).toBeInstanceOf(Date);
    expect(expirationDate_47?.toISOString()).toBe("2007-12-31T00:00:00.000Z");
  });

  it("should throw an InvalidPaymentCodeError if the code does not obey the 44, 46 or 47 characters requirement", () => {
    const code = "034199959900260001790001043510049102015000";

    const extractExpirationDate = () => extractExpirationDateFromCode(code);

    expect(extractExpirationDate).toThrow(InvalidPaymentCodeError);
  });
});
