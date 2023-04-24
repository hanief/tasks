export const useMyFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();
  const { status, data } = useAuth();

  return useFetch(request, {
    baseURL: config.public.backend,
    query: { user_id: status.value === 'authenticated' ? data.value?.user_id : 'demo_user' },
    headers: {
      Authorization: `Bearer ${config.public.secret}`,
    },
    ...opts
  });
};
