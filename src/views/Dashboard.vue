<template>
  <main>aaaa</main>
</template>

<script>
export default {
  name: 'dashboard',
  mounted () {
    const noActiveUser = !window.sessionStorage.getItem('activeUser')
    if (noActiveUser) this.$router.push('/signin')
  }
}
</script>

<style>

</style>
