import { describe, it, expect, jest } from "@jest/globals";
import NotificationManager from "..";
import Logger from "@repo/logger";
// TODO : create test

describe("test notificaton", () => {
  it("test slack notification", async () => {
    const notificationManager = new NotificationManager({
      services: [
        {
          type: "slack",
          options: {
            webhookUrl:
              "https://hooks.slack.com/services/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",
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
