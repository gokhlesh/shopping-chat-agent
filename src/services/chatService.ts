export async function sendMessage(
  message: string,
  history: { role: "user" | "model"; content: string }[] = [],
  model: string = "gemini-flash-latest",
) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, history, model }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.text || `API error: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
