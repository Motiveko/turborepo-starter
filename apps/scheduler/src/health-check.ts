import NotificationManager from "@repo/notification";
import axios from "axios";
import schedule from "node-schedule";
import { Config } from "@scheduler/config/env";
import { logger } from "@scheduler/lib/logger";

const notificationManager = new NotificationManager({
  retry: 2,
  services: [
    {
      type: "slack",
      options: {
        webhookUrl: Config.SLACK_WEBHOOK_URL,
      },
    },
  ],
});

interface Service {
  type: string;
  host: string;
  path: string;
}

const services: Service[] = [
  { type: "time-talk", host: "http://localhost:5001", path: "/healthz" },
];

// 각 서비스 타입별 마지막 알림 전송 시간을 기록 (타임스탬프: ms)
const lastNotificationTimestamps: Record<string, number> = {};

// 서비스 헬스체크 함수: GET 요청을 timeout 2초로 보내고, 실패 시 알림 처리
const checkService = async (service: Service) => {
  try {
    const response = await axios.get(`${service.host}${service.path}`, {
      timeout: 2000,
    });
    if (response.status !== 200) {
      // 200 응답이 아닐 경우 실패 처리
      handleFailure(service);
    }
    logger.info(`✅ success , ${service.type}`);
  } catch (error) {
    logger.info(`❌ fail , ${service.type}, ${(error as Error).message}`);
    // 요청 실패 또는 타임아웃 발생 시 실패 처리
    handleFailure(service);
  }
};

// 실패 발생 시 알림 전송: 마지막 알림 후 1분이 지나지 않았다면 알림 전송 생략
const handleFailure = async (service: Service) => {
  const now = Date.now();
  const lastNotified = lastNotificationTimestamps[service.type] || 0;
  if (now - lastNotified < 60 * 1000) {
    // 마지막 알림 이후 1분 이내이면 알림 전송하지 않음
    return;
  }
  // 알림 전송 시간 갱신
  lastNotificationTimestamps[service.type] = now;
  const message = `Service "${service.type}" failed at ${new Date(now).toISOString()}`;
  const result = await notificationManager.sendMessage({ message });
  logger.info(result);
};

export const runHealthChecker = () => {
  logger.info("[runHealthChecker]");
  // node-schedule을 사용하여 매 5초마다 모든 서비스 헬스체크 수행
  // Cron 형식 (초 분 시 일 월 요일): 매 5초마다 실행
  schedule.scheduleJob("*/5 * * * * *", () => {
    services.forEach((service) => {
      checkService(service);
    });
  });
};
