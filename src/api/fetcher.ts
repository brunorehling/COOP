export const customFetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const baseUrl = import.meta.env.VITE_API_URL || 'https://projeto-api-7h8d.onrender.com';
  const fullUrl = `${baseUrl}${url}`;

  const token = localStorage.getItem("token");

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : "",
      ...options?.headers,
    },
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    console.error('Erro no fetcher:', response.status, data);
    throw new Error(data.message || 'Erro na requisição');
  }

  return { data, status: response.status, headers: response.headers } as T;
};
