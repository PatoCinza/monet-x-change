<template>
  <article  :class="{ 'is-active': isActive }" v-on:click="toggleActive">
    <span :class="positiveVariation ? 'positive' : 'negative'">
      {{ readableVariation }}
    </span>
    <h2>{{ readableValue }}</h2>
    <h3>{{ name }}</h3>
  </article>
</template>

<script>
export default {
  name: 'CurrencyCard',
  props: {
    name: String,
    value: Number,
    variation: Number,
    format: Array,
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    positiveVariation: function () {
      return this.variation > 0
    },
    readableVariation: function () {
      return `${this.positiveVariation ? '+' : '-'} ${Math.abs(this.variation)}`
    },
    readableValue: function () {
      return this.value.toLocaleString(this.format[1].replace('_', '-'), { style: 'currency', currency: this.format[0] })
    }
  },
  methods: {
    toggleActive () {
      this.$emit('active', !this.isActive, this.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../sass/_variables.scss';
article {
  text-align: center;
  cursor: pointer;

  span {
    border: none;
    color: $prettyGray;
    padding: 0.5rem 1.5rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 0.5rem 1rem;
    border-radius: 8px;
    color: $pureWhite;

    &.negative {
      background-color: $pastelRed;
    }

    &.positive {
      background-color: $pastelGreen;
    }
  }

  h2 {
    margin: 0.75rem 0 1.25rem 0;
    font-size: 1.5rem;
  }
}
</style>
