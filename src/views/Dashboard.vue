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
    </section>

    <section class="cards">
      <currency-card
        class="card elevated"
        v-for="info in currenciesInfo"
        :key="info.name"
        :name="info.name"
        :format="info.format"
        :value="info.buy || info.last"
        :variation="info.variation"
        :isActive="info.active"
        @active="changeChart"></currency-card>
    </section>
  </main>
</template>

<script>
import CurrencyCard from '../components/CurrencyCard.vue'
import Chart from '../components/Chart'
import axios from 'axios'
import { getActiveUser, logout, setActiveUser } from '../utils/user'
import { setValueHistory, getValueHistory } from '../utils/currencyHistory'
import { chainRec } from '../utils/functional'

export default {
  name: 'dashboard',
  data () {
    return {
      activeUsername: '',
      currenciesInfo: [],
      datacollection: {},
      apiUrl: 'https://api.hgbrasil.com/finance?format=json-cors&key=07ada44c',
      mock: 'http://localhost/mock.json'
    }
  },
  components: {
    'currency-card': CurrencyCard,
    'line-chart': Chart
  },
  created () {
    chainRec((done, next, value) => next(
      axios.get(this.apiUrl)
        .then(({ data }) => ({ ...data.results.currencies, ...data.results.bitcoin }))
        .then(currencies => Object.values(currencies)
          .filter(currency => typeof currency === 'object')
          .map((currency, index) => {
            setValueHistory(currency.name, currency.buy || currency.last)
            return {
              ...currency,
              format: currency.format || [ 'BRL', 'pt_BR' ],
              active: !index,
              valueHistory: [...getValueHistory(currency.name), currency.buy || currency.last]
            }
          })
        ).then(currencies => {
          this.currenciesInfo = currencies
          this.changeChart(true, this.currenciesInfo[0].name)
        }).then(_ => new Promise(resolve => {
          setTimeout(resolve, 1000 * 5 * 60)
        }))
        .catch(() => {
          return new Promise(resolve => {
            setTimeout(resolve, 1000 * 5 * 60)
          })
        })
    ))
  },
  mounted () {
    chainRec((done, next, value) => next(
      new Promise(resolve => {
        this.checkUserSession()
      }).then(() => {
        return new Promise(resolve => {
          setTimeout(resolve, 1000 * 1 * 60)
        })
      })
    ))
  },
  methods: {
    checkUserSession () {
      this.activeUsername = getActiveUser()
      if (!this.activeUsername) this.$router.push('/signin')
    },
    logout () {
      logout()
      this.$router.push('signin')
    },
    fillData (currency) {
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
    changeChart (active, name) {
      this.renewUserSession()
      this.currenciesInfo = this.currenciesInfo.map(currency => ({
        ...currency,
        active: (name === currency.name && active)
      }))
      this.fillData(this.currenciesInfo.filter(currency => currency.active).shift())
    },
    renewUserSession () {
      setActiveUser({ username: this.activeUsername })
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
    border: 2px solid #e9e9e9;
    border-radius: 4px;
    padding: .5rem;
    background-color: $pureWhite;

    &:hover {
      border: 2px solid #777;
      border-radius: 4px;
    }

    &.is-active {
      border: 2px solid #777;
      border-radius: 4px;
    }
  }
}

.chart {
  width: 90%;
  height: 300px;
  margin-left: 5%;
}
</style>
