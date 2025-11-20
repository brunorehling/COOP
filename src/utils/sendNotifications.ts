import { customFetcher } from "../api/fetcher";

export async function sendNotification(userId: number, message: string, type?: string) {
  return customFetcher("/notifications", {
    method: "POST",
    body: JSON.stringify({ userId, message, type }),
  });
}
