<template>
  <main class="signin">
    <h1>Sign in</h1>

    <sign-form
      @form-action="signIn"
      actionText="Login"
    ></sign-form>

    <div class="login-footer">
      Don't have an account? <a @click="$router.push('/signup')">Click here to sign up.</a>
    </div>
  </main>
</template>

<script>
import SignForm from '../components/SignForm'
import { login } from '../utils/user'

export default {
  name: 'signin',
  data () {
    return {}
  },
  components: {
    'sign-form': SignForm
  },
  methods: {
    signIn: function (username, password) {
      if (login(username, password)) {
        this.$router.push('/dashboard')
      }
    }
  }
}
</script>
