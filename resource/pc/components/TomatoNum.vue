<template>
  <div class="tomato">{{ tomatoNum }}</div>
</template>

<script>
export default {
  name: 'tomatoNum',
  data () {
    return {

    }
  },
  methods: {

  },
  created() {
    this.$store.commit('readLocalStorage')
  },
  computed: {
    tomatoNum () {
      return this.$store.getters.totalTomato
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../sass/vars';

  .tomato {
    position: absolute;
    width: 60px;
    height: 60px;
    line-height: 60px;
    top: 90px;
    left: 150px;
    border-radius: 20px;
    color: #fff;
    background-color: $primary-color-light;
    text-align: center;
  }
</style>
