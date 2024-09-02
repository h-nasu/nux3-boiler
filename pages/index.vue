<script setup lang="ts">

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/mypage'
  }
})

const { status } = useAuth()

</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <AppAlert>
      This is an auto-imported component
    </AppAlert>
    <UButton to="mypage">My Page</UButton>
    <p>{{ status }}</p>
  </div>
</template>
