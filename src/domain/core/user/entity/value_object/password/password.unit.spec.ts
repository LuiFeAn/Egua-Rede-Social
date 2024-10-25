import { Password } from './password';

describe('Password Value Object Unit Tests', () => {
  it('Should throw a error if password is invalid', () => {
    expect(() => {
      new Password('insecurePassword');
    }).toThrow(
      'The password must be 9 characteres, 1 number, 1 special character and 1 upperCase',
    );
  });

  it('Should create a new valid password', () => {
    const value = 'S3cur3P4ssw@rd';
    const password = new Password(value);
    expect(password.value).toBe(value);
    expect(password).toBeTruthy();
  });

  it('Should encrypt password', async () => {
    const plainPassword = 'S3cur3P4ssw@rd';
    const password = new Password(plainPassword);

    expect(password.value).toBe(plainPassword);
    expect(password).toBeTruthy();

    await password.hashPassword();

    expect(password.value).not.toBe(plainPassword);
  });

  it('Should compare encrypted password with plain password', async () => {
    const plainPassword = 'S3cur3P4ssw@rd';
    const password = new Password(plainPassword);
    await password.hashPassword();

    const isMatch = await password.checkPassword(plainPassword);
    expect(isMatch).toBe(true);

    const wrongPasswordMatch = await password.checkPassword('WrongPassword123');
    expect(wrongPasswordMatch).toBe(false);
  });
});
