<script setup lang="ts">
  import { useCounterStore } from '~/stores/counter';

  const counter = useCounterStore();

</script>

<template>
  <div class="min-h-screen grid place-items-center bg-gray-900">
    <div class="text-center">
      <h1 class="font-bold text-4xl text-white">Sun.js</h1>
      <p class="mt-4 text-gray-400">The Nuxt.js boilerplate</p>
      <button class="bg-pink-600 py-2 px-4 rounded mt-4" @click="counter.increment">Click {{ counter.count }}</button>
    </div>
  </div>
</template>