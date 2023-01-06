import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { UnreadNotification } from './unread-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Ununread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  }),
    it('should not be able to unread a non existing notification ', async () => {
      const notificationsRepository = new InMemoryNotificationRepository();
      const unreadNotification = new UnreadNotification(
        notificationsRepository,
      );

      expect(() => {
        return unreadNotification.execute({ notificationId: 'fake-id' });
      }).rejects.toThrow(NotificationNotFound);
    });
});
