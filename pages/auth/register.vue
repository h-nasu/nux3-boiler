<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/mypage',
}
})

const schema = object({
  username: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(4, 'Must be at least 4 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  //console.log(event.data)
  let username = event.data.username
  let email = event.data.email
  let password = event.data.password

  const { data, error } = await useFetch(`/api/auth/register`, {
    method: "POST",
    body: {username, email, password}
  })

  if (error.value) {
    alert(error.value.statusMessage)
    return
  }
  if (data.value) {
    alert(data.value.message)
  }
  
  await navigateTo('/auth/login')

}

</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Uasername" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>