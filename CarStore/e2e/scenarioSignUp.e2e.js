/* eslint-disable no-undef */
var id = require('../config/TestID');

const accountCreate = {
  email: 'scenario@gmail.com',
  password: '123',
};

describe('Scenario SignUp ', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should sign up success', async () => {
    await waitFor(element(by.id(id.testIds.txtEmail)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.txtEmail)).typeText(accountCreate.email);
    await element(by.id(id.testIds.txtEmail)).tapReturnKey();

    await waitFor(element(by.id(id.testIds.txtPassword)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.txtPassword)).typeText(
      accountCreate.password,
    );
    await element(by.id(id.testIds.txtEmail)).tap();

    await element(by.id(id.testIds.txtEmail)).tapReturnKey();

    await waitFor(element(by.id(id.testIds.buttonLogin)))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id(id.testIds.buttonLogin)).tap();

    await waitFor(element(by.id(id.testIds.SignUp_Screen.buttonSignUp)))
      .toBeVisible()
      .withTimeout(5000);

    await waitFor(element(by.id(id.testIds.SignUp_Screen.buttonSignUp)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.SignUp_Screen.buttonSignUp)).tap();

    await waitFor(element(by.id(id.testIds.SignUp_Screen.textInputName)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.SignUp_Screen.textInputName)).typeText(
      'Nguyen Van A',
    );

    await element(by.id(id.testIds.SignUp_Screen.textInputName)).tapReturnKey();

    await waitFor(element(by.id(id.testIds.SignUp_Screen.textInputPhone)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.SignUp_Screen.textInputPhone)).typeText(
      '089013131',
    );

    await element(
      by.id(id.testIds.SignUp_Screen.textInputPhone),
    ).tapReturnKey();

    await waitFor(element(by.id(id.testIds.SignUp_Screen.textInputEmail)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.SignUp_Screen.textInputEmail)).typeText(
      accountCreate.email,
    );

    await element(
      by.id(id.testIds.SignUp_Screen.textInputEmail),
    ).tapReturnKey();

    await waitFor(element(by.id(id.testIds.SignUp_Screen.textInputPassword)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.SignUp_Screen.textInputPassword)).typeText(
      accountCreate.password,
    );

    await element(
      by.id(id.testIds.SignUp_Screen.textInputPassword),
    ).tapReturnKey();

    await waitFor(
      element(by.id(id.testIds.SignUp_Screen.textInputConfirmPassword)),
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(
      by.id(id.testIds.SignUp_Screen.textInputConfirmPassword),
    ).typeText('123');

    await element(
      by.id(id.testIds.SignUp_Screen.textInputConfirmPassword),
    ).tapReturnKey();

    await element(by.id(id.testIds.SignUp_Screen.scrollView)).scrollTo(
      'bottom',
    );

    await waitFor(element(by.id(id.testIds.SignUp_Screen.buttonSignUp)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.SignUp_Screen.buttonSignUp)).tap();

    await waitFor(element(by.id(id.testIds.txtEmail)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.txtEmail)).clearText();
    await element(by.id(id.testIds.txtEmail)).typeText(accountCreate.email);
    await element(by.id(id.testIds.txtEmail)).tapReturnKey();

    await waitFor(element(by.id(id.testIds.txtPassword)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(id.testIds.txtPassword)).clearText();
    await element(by.id(id.testIds.txtPassword)).typeText(
      accountCreate.password,
    );
    await element(by.id(id.testIds.txtEmail)).tap();

    await element(by.id(id.testIds.txtEmail)).tapReturnKey();

    await waitFor(element(by.id(id.testIds.buttonLogin)))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id(id.testIds.buttonLogin)).tap();
  });
});
