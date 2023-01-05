import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade'),
        recipientId: 'john-doe',
        createdAt: new Date(),
      }),
    );
    await notificationsRepository.create(
      new Notification({
        category: 'games',
        content: new Content('Nova solicitação de amizade'),
        recipientId: 'john-doe',
        createdAt: new Date(),
      }),
    );
    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade'),
        recipientId: 'taylor-swift',
        createdAt: new Date(),
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'taylor-swift',
    });
    expect(count).toBe(1);
  });
});
