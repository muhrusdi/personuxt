const useSampleAPI = ({options}: any) => {
  const config = useRuntimeConfig()

  return useAsyncData('get-api', () => $fetch("/api", {
      baseURL: config.API_URL,
      async onRequest(ctx: any) {
          const accessToken = await useCookie('access_token' ,{ default: undefined })

          if (undefined !== accessToken) {
              ctx.options.headers = new Headers(ctx.options.headers)
              ctx.options.headers.append('Authorization', accessToken.value)
              // ctx.options.headers.set('Authorization', accessToken.value)
              // ctx.options.headers['Authorization'] = `Bearer ${accessToken.value}`
          }
      },
      ...options
  }))
}
