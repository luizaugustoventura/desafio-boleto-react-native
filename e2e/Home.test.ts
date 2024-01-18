import "detox";
import { expect } from "detox";

describe("Home screen", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should fail the payment due to expired date", async () => {
    await element(by.id("code-input")).typeText(
      "0341939598000002603517512345678712341234560000"
    );
    await element(by.id("process-button")).tap();
    await element(by.id("payment-button")).tap();

    await expect(element(by.text("Pagamento negado"))).toBeVisible();
  });
});
