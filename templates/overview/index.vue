<script setup lang="ts">
  import { Form } from "vee-validate"
  import Input from '~/components/forms/input/input.vue';
  import { useCounterStore } from "~/stores/counter";
  import IconChevronLeft from '@privyid/persona-icon/vue/chevron-left/20.vue'
import { useQuery, useMutation } from "composables/api";


  const {data } = useQuery<{id: number}>("insurance_option-{id}", {
    params: {
      id: 123,
    },
  })
  const {mutate } = useMutation("loan-segmentation")
  const counter = useCounterStore();

  const handleSubmit = (e: any) => {
    mutate({
      sdf: "asdf"
    })
    console.log("---", e) 
  }

</script>

<template>
  <div class="min-h-screen grid place-items-center bg-gray-900">
    <div class="text-center">
      <h1 class="font-bold text-4xl text-white">Personuxt Boilerplate</h1>
      <p-button>Click me</p-button>
      <button>click</button>
      <p-button-group>
        <p-button icon color="info"><IconChevronLeft /></p-button>
        <p-button color="info">Button Text</p-button>
      </p-button-group>
      <Form @submit="handleSubmit">
        <Input name="email"/>
        <button>submit</button>
      </Form>
      <p class="mt-4 text-gray-400">The Nuxt.js boilerplate</p>
      <button class="bg-pink-600 py-2 px-4 rounded mt-4" @click="counter.increment">Click {{ counter.count }}</button>
    </div>
  </div>
</template>