<script setup lang="ts">
definePageMeta({
  auth: false
})

const test = await useFetch('/api/test')
console.log(test)

</script>

<template>
  <div>
    testestestse
  </div>
</template>