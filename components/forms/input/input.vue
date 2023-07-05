<script setup lang="ts">
import { useField } from "vee-validate"
import { toRef } from "vue"

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
})
const nameRef = toRef(props, "name")

const { errorMessage, value } = useField<string>(nameRef)
</script>
<template>
  <p-input v-model="value" :placeholder="props.placeholder" />
  <span v-if="errorMessage">{{ errorMessage }}</span>
</template>
