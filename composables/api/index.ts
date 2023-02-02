type VariableTypes<TOptions> = {
  options: TOptions
}

const $$fetch = <TOptions>(url: string, options: TOptions) => {
  const config = useRuntimeConfig()
  return $fetch(url, {
    baseURL: config.API_URL,
    ...options
  })
}

const useSampleAPI = <TProps>({options}: VariableTypes<TProps>) => {
  return useAsyncData('get-api', () => $$fetch("/api", {
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
