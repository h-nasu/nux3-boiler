<script setup lang="ts">
const { signOut } = useAuth()
</script>

<template>
  <UButton @click="signOut({ callbackUrl: '/' })">Logout</UButton>
</template>