import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { ReadNotification } from './read-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({ notificationId: notification.id });
    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  }),
    it('should not be able to read a non existing notification ', async () => {
      const notificationsRepository = new InMemoryNotificationRepository();
      const readNotification = new ReadNotification(notificationsRepository);

      expect(() => {
        return readNotification.execute({ notificationId: 'fake-id' });
      }).rejects.toThrow(NotificationNotFound);
    });
});
