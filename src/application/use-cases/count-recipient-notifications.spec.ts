import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'john-doe',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'john-doe',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'taylor-swift',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'taylor-swift',
    });
    expect(count).toBe(1);
  });
});
