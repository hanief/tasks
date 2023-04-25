import { useStorage } from '@vueuse/core'

export const useMyFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();
  const { status: authStatus, data: authData } = useAuth();
  const user = useStorage('user', crypto.randomUUID())

  return useFetch(request, {
    baseURL: config.public.backend,
    query: { user: user.value || 'tasks@multita.sk' },
    headers: {
      Authorization: `Bearer ${config.public.secret}`,
    },
    ...opts
  });
};
