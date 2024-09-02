<script setup lang="ts">

const { signOut } = useAuth()

</script>

<template>
  <UContainer>
    <UButton @click="signOut({ callbackUrl: '/' })">Logout</UButton>
    <slot />
  </UContainer>
</template>
