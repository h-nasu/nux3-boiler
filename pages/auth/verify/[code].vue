<script setup lang="ts">
definePageMeta({
  auth: false
})

const route = useRoute()

const verifiedUser = await useFetch('/api/auth/verify', {
  method: 'post',
  body: { 
    code: route.params.code
  }
})

if (verifiedUser.data && verifiedUser.data.value.isVerified) {
  //alert('Verification Succeeded!')
  await navigateTo('/auth/login')
}

</script>

<template>
  <UContainer>
    <UCard class="mt-10">
      <template #header>
        <div class="flex justify-between">
          <h1>Account Verification</h1>
        </div>
      </template>
    </UCard>
  </UContainer>
</template>