<template>
  <div>
    <a v-if="!isAuthenticated" @click="login">
      <slot>Log In</slot>
    </a>
    <a v-else @click="logout">
      <slot>
        Log Out {{ user }}
      </slot>
    </a>
  </div>
</template>

<script lang="ts" setup>

const ses = useSession({ required: false })

const login = () => ses.signIn('auth0')
const logout = () => ses.signOut('auth0')

const isAuthenticated = computed(() => {
  return ses.status.value === 'authenticated'
})

const user = computed(() => {
  return ses.data.value?.user?.name
})

</script>