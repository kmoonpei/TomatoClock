<template>
  <mu-dialog :open="showBreak" dialogClass="break-dialog">
      <span slot="title">休息计时</span>
      <!-- <mu-icon-button icon="cancel" class="dialog-close" @click="close"/> -->
      <div class="count">
        <div>{{ m }}</div>
        <div>:</div>
        <div>{{ s }}</div> 
      </div>
      <mu-flat-button slot="actions" @click="close" class="mu-color mu-fontWeight">取消休息</mu-flat-button>
    </mu-dialog>
</template>

<script>
  import muFlatButton from 'muse-components/flatButton'
  import muDialog from 'muse-components/dialog'


  let count
  const testBreakTime = 3000
  export default {
    name: 'breakCount',
    components: { muFlatButton, muDialog },
    data () {
      return{
        minutes: 0,
        secondes: 0,
      }
    },
    methods: {
      close () {
        clearInterval(count)
        this.$store.commit('openBreakCount', false)
        console.log(this.$store.breakCount)
        this.minutes = 0
        this.secondes = 0
        return this.$store.breakCount
      },
      count () {
        let secondes = this.minutes * 60 + this.secondes
        secondes++
        this.minutes = parseInt(secondes / 60 )
        this.secondes = secondes % 60
      },
      add0 (item) {
      if(item == 0){
        return '00'
      } else if (item < 10) {
        return '0' + item
      }else {
        return item
      }
    }  
    },
    computed: {
      showBreak () {
        if (this.$store.state.breakCount == true) {
          count = setInterval(this.count,1000)
          setTimeout(this.close,testBreakTime)
          return true
        }
      },
      m () {
        return this.add0(this.minutes)
      },
      s () {
        return this.add0(this.secondes)
      }
    }
  }
</script>

<style lang="scss">
  @import "../sass/vars.scss";


    .break-dialog {
      width: 60% !important;
      max-width: 600px !important;
      position: relative;
      top: -200px;
    }

    .count {
      font-size: 60px;
      font-weight: 600;
      color: $primary-color-dark;
      text-align: center;

      &>div {
        display: inline;
        width: 40px;
        height: 40px;
      }
    }
    
</style>


