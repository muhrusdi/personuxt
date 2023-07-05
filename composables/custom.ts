import { reactive } from "vue"

export const useCustom = () => {
  const data = reactive({ loading: false })

  const onChange = (val: boolean) => {
    data.loading = val
  }
  return {
    data,
    onChange,
  }
}
