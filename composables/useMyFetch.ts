export const useMyFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();

  return useFetch(request, { baseURL: config.backend.baseURL, ...opts });
};
