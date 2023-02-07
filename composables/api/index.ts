import { UseFetchOptions, AsyncData } from "nuxt/dist/app/composables"

type Params<TOptions> = {
  options?: UseFetchOptions<TOptions>
}

enum Paths {
  login = "/login"
}

export const useAsync = <TData>(path: Paths, params?: Params<TData>) => {
  return useFetch(path as string, {
    ...params?.options,
    async onRequest({ options }) {
      const accessToken = useCookie('access_token' ,{ default: undefined })

      if (accessToken.value) {
        options.headers = new Headers(options.headers)
        options.headers.append('Authorization', accessToken.value)
      }
    },
  })
}
