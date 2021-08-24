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

export const fetchAvailability = async (
  date: string,
  providerId: string,
  serviceId: string
) => {
  if (!date || !providerId || !serviceId) {
    return undefined;
  }
  const response = await fetch(
    `/api/appointments/${providerId}/${date}/${serviceId}`,
    {
      method: 'GET',
      credentials: 'same-origin',
    }
  );
  const { availableAppointmentTimes }: { availableAppointmentTimes: any } =
    await response.json();
  return availableAppointmentTimes;
};
