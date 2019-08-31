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

    <section class="chart">
      <line-chart
        :chart-data="datacollection"
        :options="{
          responsive: true,
          maintainAspectRatio: false
        }"
        :height="Number(275)"
      ></line-chart>
      <button @click="fillData()">Randomize</button>
    </section>

    <section class="cards">
      <currency-card
        class="card elevated"
        v-for="info in currenciesInfo"
        :key="info.name"
        :name="info.name"
        :value="info.buy || info.last"
        :variation="info.variation"
        :isActive="info.active"
        @active="changeChart"></currency-card>
    </section>
  </main>
</template>

<script>
import { getActiveUser, logout } from '../utils/user'
import CurrencyCard from '../components/CurrencyCard.vue'
import Chart from '../components/Chart'
import axios from 'axios'

export default {
  name: 'dashboard',
  data () {
    return {
      activeUsername: '',
      currenciesInfo: [],
      datacollection: null
    }
  },
  components: {
    'currency-card': CurrencyCard,
    'line-chart': Chart
  },
  created () {
    axios.get('http://localhost/mock.json')
      .then(({ data }) => ({ ...data.results.currencies, ...data.results.bitcoin }))
      .then(currencies => Object.values(currencies)
        .filter(currency => typeof currency === 'object')
        .map((currency, index) => ({ ...currency, active: !index }))
      ).then(currencies => {
        this.currenciesInfo = currencies
        console.log(this.currenciesInfo)
        this.changeChart(true, this.currenciesInfo[0].name)
      })
  },
  mounted () {
    this.fillData()
    this.activeUsername = getActiveUser()
    if (!this.activeUsername) this.$router.push('/signin')
  },
  methods: {
    logout () {
      logout()
      this.$router.push('signin')
    },
    fillData (currency) {
      console.log(currency)
      this.datacollection = {
        labels: currency.valueHistory,
        datasets: [
          {
            label: currency.name,
            data: currency.valueHistory
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    changeChart (active, name) {
      this.currenciesInfo = this.currenciesInfo.map(currency => ({
        ...currency,
        active: (name === currency.name && active),
        valueHistory: [0, currency.buy || currency.last]
      }))
      this.fillData(this.currenciesInfo.filter(currency => currency.active).shift())
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/_variables.scss';

.header {
  background-color: #f0f0f0;
  margin-bottom: 1.5rem;

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

.cards {
  width: 90%;
  margin: 0 5%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;

  .card {
    &:hover {
      border: 2px solid #777;
      border-radius: 4px;
    }

    &.is-active {
      border: 2px solid #777;
      border-radius: 4px;
    }

    border: 2px solid #e9e9e9;
    border-radius: 4px;
    padding: .5rem;
  }
}

.chart {
  width: 90%;
  height: 300px;
  margin-left: 5%;
}
</style>
