<template>
  <main>
    <section class="header elevated">
      <nav>
        <ul>
          <li class="title">
            <h1>Money cotations</h1>
          </li>
        </ul>
        <ul class="user-information">
          <li>
            logged in as {{ activeUsername }}
          </li>
          <li class="logout" @click="logout">
            logout
          </li>
        </ul>
      </nav>
    </section>

    <section class="cards">

    </section>
  </main>
</template>

<script>
import { getActiveUser, logout } from '../utils/user'

export default {
  name: 'dashboard',
  data () {
    return {
      activeUsername: ''
    }
  },
  mounted () {
    this.activeUsername = getActiveUser()
    if (!this.activeUsername) this.$router.push('/signin')
  },
  methods: {
    logout: function () {
      logout()
      this.$router.push('signin')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: azure;

  nav {
    display: flex;
    font-size: 1.1rem;
    padding: 14px 30px;

    ul.user-information {
      list-style: none;
      margin-left: auto;
      align-self: center;

      li {
        display: inline-block;
        text-align: center;

        &.logout {
          cursor: pointer;
          margin-left: 1em
        }
      }
    }

    .title {
      font-size: 1.7rem;
    }
  }
}
</style>
