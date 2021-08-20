import { Provider } from '../models/Provider';

export const fetchProvider = async (
  id: string
): Promise<Provider | undefined> => {
  if (!id) {
    return undefined;
  }
  const response = await fetch(`/api/providers/${id}`, {
    method: 'GET',
    credentials: 'same-origin',
  });
  const { provider }: { provider: Provider } = await response.json();
  return provider;
};
