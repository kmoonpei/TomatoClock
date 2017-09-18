<template>
  <div v-if="digitWord !== 'dots'" class="digits" :class="digitWord">
    <span class="d1"></span>
    <span class="d2"></span>
    <span class="d3"></span>
    <span class="d4"></span>
    <span class="d5"></span>
    <span class="d6"></span>
    <span class="d7"></span>
  </div>
  <div v-else class="digits" :class="digitWord">
  </div> 
</template>

<script>
  
  export default {
    name: 'digit',
    props: {
      digit: {
        type: String | Number,
        validator: function (value) {
          if(value === ':') {
            return true
          }
          value = Number(value)
          if( value >=0 && value < 10 ) {
            return true
          }else {
            return false
          }
        }
      }
    },
    computed: {
      digitWord: function() {
        //swich判断数字，获取相应class名
        if(this.digit === ':') {
          return 'dots'
        }
        switch(Number(this.digit)) {
          case 0:
            return 'zero'
          case 1:
            return 'one'
          case 2:
            return 'two'
          case 3:
            return 'three'
          case 4:
            return 'four'
          case 5:
            return 'five'
          case 6:
            return 'six'
          case 7:
            return 'seven'
          case 8:
            return 'eight'
          case 9:
            return 'nine'
        }
      }
    }
  }
</script>

<style>
@import url('./Clock.css');

</style>
