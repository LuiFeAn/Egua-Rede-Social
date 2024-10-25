import Nickname from './nickname';

describe('Nickname Value Object Unit Tests', () => {
  it('Should throw a error if nickname is more than 12 characteres', () => {
    const value = 'LuiFeAnAAAAAAAAAAAAA';
    expect(() => {
      new Nickname(value);
    }).toThrow('PasswordInstance: Nickname must be only 12 characters');
  });
  it('Should throw a error if nickname is more less then 6 characters', () => {
    const value = 'Lui';
    expect(() => {
      new Nickname(value);
    }).toThrow('PasswordInstance: Nickname must be at least 6 characters');
  });
  it('Should create a valid nickname', () => {
    const value = 'LuiFeAn';
    const nickname = new Nickname(value);
    expect(value).toBe(nickname.value);
    expect(value).toBeTruthy();
  });
});
