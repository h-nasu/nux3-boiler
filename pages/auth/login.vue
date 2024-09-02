<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'

const { signIn } = useAuth()

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/mypage',
  }
})

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(4, 'Must be at least 4 characters')
    .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  let email = event.data.email
  let password = event.data.password

  const response = await signIn('credentials', { redirect: false, email, password })

  console.log(response)

  if (response && response.error) {
    alert(response.error)
    return
  }

  await navigateTo(useRelativeCallbackUrl(useRoute()).value)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
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




