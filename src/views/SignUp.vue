<template>
  <main class="signup">
    <h1>Sign up</h1>

    <sign-form
      @form-action="registerUser"
      actionText="Register"
    ></sign-form>

    <div class="login-footer">
      Already have an account? <a @click="$router.push('/signin')">Click here to sign in.</a>
    </div>
  </main>
</template>

<script>
import SignForm from '../components/SignForm'
import { insertUser, login } from '../utils/user'

export default {
  name: 'signup',
  components: {
    'sign-form': SignForm
  },
  methods: {
    registerUser: function (username, password) {
      const user = insertUser(username, password)
      if (user) {
        login(username, password)
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>

<style>

</style>
