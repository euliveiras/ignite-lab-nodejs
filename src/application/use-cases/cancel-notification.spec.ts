import { Content } from '@application/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Nova solicitação de amizade'),
      recipientId: 'example-id',
      createdAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepository.notifications[0].createdAt).toEqual(
      expect.any(Date),
    );
  }),
    it('should not be able to cancel a non existing notification ', async () => {
      const notificationsRepository = new InMemoryNotificationRepository();
      const cancelNotification = new CancelNotification(
        notificationsRepository,
      );

      expect(() => {
        return cancelNotification.execute({ notificationId: 'fake-id' });
      }).rejects.toThrow(NotificationNotFound);
    });
});
