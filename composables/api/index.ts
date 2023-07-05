import { UseFetchOptions, AsyncData } from "nuxt/dist/app/composables"
import { KeysOf, PickFrom, _AsyncData } from "nuxt/dist/app/composables/asyncData"
import type { FetchError } from 'ofetch';

type Params = {
  key: string
  value: string
}

type Options<TOptions> = {
  params?: Record<string, Params> 
  query?: Record<string, Params> 
  options?: UseFetchOptions<TOptions>
}


const Paths = {
  "user": "/user",
  "list": "/list",
  "employe/present": "/employe/present",
  "employe/absent": "/employe/absent",
  "employe/sick": "/employe/sick",
}

type PathsType = typeof Paths

type PathsKeyType = {
  [K in keyof PathsType]: string
}


export const useAsync = <TData>(path: keyof PathsKeyType, options?: Options<TData>) => {
  let paramsString = ""
  let queryString = ""

  if (options?.params) {
    for (const key in options.params) {
      paramsString += `/${key}/${options.params[key]}`
    }
  }

  if (options?.query) {
    queryString = "?"
    for (const key in options.query) {
      queryString += `${key}&${options.query[key]}&`
    }
  }

  return useFetch(Paths[path] + paramsString + queryString, {
    ...options?.options,
    async onRequest({ options }) {
      const accessToken = useCookie('access_token' ,{ default: undefined })

      if (accessToken.value) {
        options.headers = new Headers(options.headers)
        options.headers.append('Authorization', accessToken.value)
      }
    },
  })
}

export const useMutation = <TData>(path: keyof PathsKeyType, options?: Options<TData>) => {
  let paramsString = ""
  let queryString = ""

  if (options?.params) {
    for (const key in options.params) {
      paramsString += `/${key}/${options.params[key]}`
    }
  }

  if (options?.query) {
    queryString = "?"
    for (const key in options.query) {
      queryString += `${key}&${options.query[key]}&`
    }
  }

  let response: _AsyncData<PickFrom<TData, KeysOf<TData>> | null, FetchError<any> | null> = {} as never

  const mutate = (formData: any) => {
    const res = useFetch(Paths[path] + paramsString + queryString, {
      ...options?.options,
      method: "POST",
      body: formData,
      async onRequest({ options }) {
        const accessToken = useCookie('access_token' ,{ default: undefined })
  
        if (accessToken.value) {
          options.headers = new Headers(options.headers)
          options.headers.append('Authorization', accessToken.value)
        }
      },
    })

    response = res
    return response
  }

  return {
    mutate,
    ...response
  }
}
