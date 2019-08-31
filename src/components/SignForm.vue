<template>
  <form>
    <label for="username">Username <span>*</span></label>
    <input type="text" name="username" v-model="userName" required>
    <label for="password">Password <span>*</span></label>
    <input type="password" v-model="userPassword" required>
    <p><span>*</span> Required Fields</p>
    <button @click="bubbleAction">{{ actionText }}</button>
  </form>
</template>

<script>
export default {
  name: 'signForm',
  props: {
    actionText: String
  },
  data () {
    return {
      userName: '',
      userPassword: ''
    }
  },
  methods: {
    bubbleAction: function (event) {
      event.preventDefault()
      this.$emit('form-action', this.userName, this.userPassword)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/_variables.scss';

form {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.25rem;
  }

  span {
    color: $solidRed;
  }

  input {
    margin-bottom: 2rem;
    padding: 0.5rem 1rem;
    border: 1px solid $lightGray;
    border-radius: 0.25rem;

    &:last-of-type {
      margin-bottom: 0.75rem;
    }
  }

  p {
    margin: 0 0 2rem;
    color: $prettyGray;
    font-size: 0.75rem;
  }

  button {
    width: 33%;
    margin: 0 0 0 auto;
    margin-bottom: 2rem;
    padding: 0.5rem;
    color: $pureWhite;
    font-size: 1.25rem;
    background: $solidGreen;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
  }
}

</style>
