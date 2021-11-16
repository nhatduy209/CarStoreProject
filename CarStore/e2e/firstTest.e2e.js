/* eslint-disable no-undef */

var id = require('../config/TestID');

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should login and remember sucesss', async () => {
    await waitFor(element(by.id(id.testIds.txtEmail)))
      .toBeVisible()
      .withTimeout(6000);
    await element(by.id(id.testIds.txtEmail)).typeText('testing@gmail.com');
    await element(by.id(id.testIds.txtEmail)).tapReturnKey();
    await waitFor(element(by.id(id.testIds.txtPassword)))
      .toBeVisible()
      .withTimeout(6000);
    await element(by.id(id.testIds.txtPassword)).typeText('123');
    await element(by.id(id.testIds.txtEmail)).tap();
    await element(by.id(id.testIds.txtEmail)).tapReturnKey();

    await waitFor(element(by.id(id.testIds.switchButton)))
      .toBeVisible()
      .withTimeout(6000);
    await element(by.id(id.testIds.switchButton)).tap();

    await waitFor(element(by.id(id.testIds.buttonLogin)))
      .toBeVisible()
      .withTimeout(6000);
    await element(by.id(id.testIds.buttonLogin)).tap();

    await waitFor(element(by.id(id.testIds.toogleReview)))
      .toBeVisible()
      .withTimeout(6000);

    await element(by.id(id.testIds.toogleReview)).tap();

    await waitFor(element(by.id(id.testIds.logoutButton)))
      .toBeVisible()
      .withTimeout(6000);

    await element(by.id(id.testIds.logoutButton)).tap();

    await expect(element(by.id(id.testIds.txtEmail))).toHaveText(
      'testing213@gmail.com',
    );
  });
});
