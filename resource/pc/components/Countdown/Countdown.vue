<template>
  <div class="countdown">
    <div class="clock">
      <digit :digit="minute1"></digit>
      <digit :digit="minute2"></digit>
      <digit digit=":"></digit>
      <digit :digit="second1"></digit>
      <digit :digit="second2"></digit>
    </div>
    <div class="start-resrt">
      <img v-if="!isCountdown"
           @click="start"
           src="../../images/start.png">
      <img v-else 
           @click="pause" 
           src="../../images/pause.png">
      <img @click="reset"
           src="../../images/reset.png">
    </div>
  </div>
</template>

<script>
  import Digit from './Digit.vue' 

  let count

  export default {
    name: 'countdown',
    data () {
      return {
        isCountdown: false,
        seconds: 5,
        computedSecond: 0,
      }
    },
    components: { Digit },
    methods: {
      reset () {
        this.computedSecond = this.seconds
        this.isCountdown = false
        clearInterval(count)
      },
      start () {
        this.isCountdown = true
        this.countdown()
      },
      pause () {
        clearInterval(count)
        this.isCountdown = false
      },
      countdown () {
        // --this.computedSecond
        count = setInterval(()=>{
          this.computedSecond = this.computedSecond - 1
          if( this.computedSecond === 0 ) {
            this.reset()
            this.$store.commit('openBreakCount',true)
            let tomato = {timestamp: new Date().getTime()}
            this.$store.dispatch('addTomato',tomato)
            // this.$store.commit('countTomatoNum', 1)
          }
        }, 1000)
      },
    },
    created() {
      this.computedSecond = this.seconds
    },
    computed: {
      ifstart () {
        this.start = !this.start
        return this.start
      },
      minute1(){
        // console.log(this)
        return Math.floor(this.computedSecond/600)
      },
      minute2(){
        return Math.floor(this.computedSecond/60%10)
      },
      second1(){
        return Math.floor(this.computedSecond%60/10)
      },
      second2() {
        return Math.floor(this.computedSecond%60%10)
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/imports.scss"; 

  .countdown {
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    padding-bottom: 0;
    
    &>.clock {
      width: 180px;
      padding: 15px 30px;
      background-color: #dddddd;
      box-shadow: 0 1px 1px rgba(0,0,0,0.08) inset, 0 1px 1px #fafafa;
      border-radius: 5px;
      margin: 0 auto;
    }

    &>.count {
      font-size: 60px;
      font-weight: 600;
      color: $primary-color-dark;
      text-align: center;
      margin-top: 150px;

      &>div {
        display: inline;
        width: 40px;
        height: 40px;
      }
    }
    &>.start-resrt {
      text-align: center;
      width: 100%;

      &> img {
        width: 40px;
        height: 40px;
        margin: 20px;
        cursor: pointer;
      }
    }
  }



</style>

