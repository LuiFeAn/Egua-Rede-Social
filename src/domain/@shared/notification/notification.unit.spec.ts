import Notification from '.';

describe('Notification Unit Tests', () => {
  let notification: Notification;
  beforeAll(() => {
    notification = new Notification();
  });
  it('Should add a error in notification', () => {
    notification.add({
      context: 'FakeContext',
      error: 'Fake Error 1',
    });

    notification.add({
      context: 'FakeContext',
      error: 'Fake Error 2',
    });

    expect(notification.length).toBe(2);
  });

  it('Should throw a error in notification is more than 0', () => {
    expect(() => {
      notification.issue();
    }).toThrow('FakeContext: Fake Error 1, FakeContext: Fake Error 2');
  });
});
