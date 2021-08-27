import { Provider } from "../models/Provider";

export const fetchProvider = async (
  query: string | string[] | undefined
): Promise<Provider | undefined> => {
  type ProviderResponse = { provider: Provider };

  if (!query) {
    return undefined;
  }

  const isArray = typeof query === "object" && query.length;

  const response = await fetch(`/api/providers/${isArray ? query[0] : query}`, {
    method: "GET",
    credentials: "same-origin",
  });
  const { provider }: ProviderResponse = await response.json();
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
      method: "GET",
      credentials: "same-origin",
    }
  );
  const { availableAppointmentTimes }: { availableAppointmentTimes: any } =
    await response.json();
  return availableAppointmentTimes;
};
