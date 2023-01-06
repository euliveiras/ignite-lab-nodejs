import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'john-doe',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'john-doe' }),
        expect.objectContaining({ recipientId: 'john-doe' }),
      ]),
    );
  });
});
