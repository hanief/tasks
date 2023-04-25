export const useMyFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();
  const { status: authStatus, data: authData } = useAuth();

  return useFetch(request, {
    baseURL: config.public.backend,
    query: { user: authStatus.value === 'authenticated' ? authData.value?.user?.email : 'tasks@multita.sk' },
    headers: {
      Authorization: `Bearer ${config.public.secret}`,
    },
    ...opts
  });
};
