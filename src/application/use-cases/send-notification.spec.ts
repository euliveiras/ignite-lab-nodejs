import { Notification } from '../entities/notification';
import { SendNotification } from './send-notification';

const notificationRepository = {
  async create(notification: Notification) {
    console.log(notification);
  },
};

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'Social',
      recipientId: 'example-send-notification',
    });

    expect(notification).toBeTruthy();
  });
});
