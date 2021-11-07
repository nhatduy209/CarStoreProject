/* eslint-disable no-undef */
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should login success', async () => {
    await element(by.id('email')).typeText('testing@gmail.com');
    await element(by.id('email')).tapReturnKey();
    await waitFor(element(by.id('password')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('password')).typeText('123');
    await element(by.id('email')).tap();
    await element(by.id('email')).tapReturnKey();
    await waitFor(element(by.id('loginBtn')))
      .toBeVisible()
      .withTimeout(3000);
    await element(by.id('loginBtn')).tap();
  });
});
