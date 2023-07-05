import { UseFetchOptions, AsyncData } from "nuxt/dist/app/composables"
import {
  KeysOf,
  PickFrom,
  _AsyncData,
} from "nuxt/dist/app/composables/asyncData"
import type { FetchError } from "ofetch"
import { API } from "~/utils/endpoint"

type Options<TParams, TQuery, TOptions> = {
  params?: TParams
  query?: TQuery
  options?: UseFetchOptions<TOptions>
}

// The API was being defined in the utils/enpoints.ts
type PathsType = typeof API

type PathsKeyType = {
  [K in keyof PathsType]: string
}

export const useQuery = <TParams = null, TQuery = null, TOptions = null>(
  path: keyof PathsKeyType,
  options?: Options<TParams, TQuery, TOptions>
) => {
  let paramsString = ""
  let queryString = ""

  if (options?.params) {
    for (const key in options.params) {
      paramsString += `/${options.params[key]}`
    }
  }

  if (options?.query) {
    queryString = "?"
    for (const key in options.query) {
      queryString += `${key}&${options.query[key]}&`
    }
  }

  return useFetch(API[path] + paramsString + queryString, {
    ...options?.options,
    async onRequest({ options }) {
      const accessToken = useCookie("access_token", { default: undefined })

      if (accessToken.value) {
        options.headers = new Headers(options.headers)
        options.headers.append("Authorization", accessToken.value)
      }
    },
  })
}

export const useMutation = <TParams = null, TQuery = null, TOptions = null>(
  path: keyof PathsKeyType,
  options?: Options<TParams, TQuery, TOptions>
) => {
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
      queryString += `${key}=${options.query[key]}&`
    }
  }

  let response: AsyncData<
    PickFrom<TOptions, KeysOf<TOptions>> | null,
    FetchError<any> | null
  > = {} as never

  const mutate = (formData: any) => {
    const res = useFetch(API[path] + paramsString + queryString, {
      ...options?.options,
      method: "post",
      body: formData,
      async onRequest({ options }) {
        const accessToken = useCookie("access_token", { default: undefined })

        if (accessToken.value) {
          options.headers = new Headers(options.headers)
          options.headers.append("Authorization", accessToken.value)
        }
      },
    })

    response = res
    return response
  }

  return {
    mutate,
    ...response,
  }
}
