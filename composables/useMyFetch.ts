export const useMyFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();
  const { data } = useAuth();

  return useFetch(request, { baseURL: config.public.backend, params: { userId: data.value?.user?.email }, ...opts });
};
