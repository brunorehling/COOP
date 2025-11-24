import { customFetcher } from "../api/fetcher";

export async function sendNotification(
  userId: number | string,
  content: string,
  type: string,
  projectId?: number | string
) {
  return customFetcher("/notifications", {
    method: "POST",
    body: JSON.stringify({
      userId: Number(userId),
      content,
      type,
      projectId: projectId !== undefined ? Number(projectId) : undefined,
      isRead: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
