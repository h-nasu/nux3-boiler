<template>
  <UContainer>
    <p>Some default layout content shared across all pages</p>
    <ULink 
      to="/auth/login"
      active-class="text-primary"
      inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
    >
      Login
    </ULink>
    <UButton to="/auth/register">Register</UButton>
    <slot />
  </UContainer>
</template>
