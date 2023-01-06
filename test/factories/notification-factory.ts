import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'factory-category',
    content: new Content('Content from a notication factory'),
    recipientId: 'factory-id',
    createdAt: new Date(),
    ...override,
  });
}
