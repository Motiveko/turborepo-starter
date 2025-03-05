import {
  INotificationService,
  NotificationService,
  NotificationType,
  SendMessagePayload,
} from "@notification/types";

export interface DiscordNotificationServiceOptions {
  webhookUrl: string;
}
// Slack 알림 서비스 구현
export class DiscordNotificationService extends NotificationService {
  private webHookUrl: string;

  constructor(options: DiscordNotificationServiceOptions) {
    super("discord");
    this.webHookUrl = options.webhookUrl;
  }

  async sendMessage(message: SendMessagePayload): Promise<void> {
    // TODO : 구현할것
  }
}
