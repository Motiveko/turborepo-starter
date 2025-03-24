import { describe, it, expect, jest } from "@jest/globals";
import dotenv from "dotenv";
import NotificationManager from "@notification/index";

dotenv.config();

describe("test NotificationManager", () => {
  it("test slack notification", async () => {
    const notificationManager = new NotificationManager({
      services: [
        {
          type: "slack",
          options: {
            webhookUrl: process.env.TEST_SLACK_WEBHOOK_URL!,
          },
        },
      ],
    });

    const result = await notificationManager.sendMessage({ message: "안뇽?" });
    console.log(result);
    expect(result.success).toEqual({ type: "slack" });
    expect(result.fails.length).toBe(0);
  });
});
