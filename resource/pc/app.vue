<template>
  <div>
    <webheader></webheader>
    <div class="main">
      <countdown></countdown>
        <todos/>
        <!-- <todos1/>   -->
    </div> 
    <tomatoNum/>
    <breakCount/>
  </div>
</template>

<script>
  import countdown from '@/components/Countdown' 
  import todos from '@/components/Todos'
  // import todos1 from '@/components/Todos／Todos1'
  
  import webheader from '@/components/Header'
  import breakCount from '@/components/BreakCount'
  import tomatoNum from '@/components/TomatoNum'

  export default {
    name: 'app',
    data () {
      return {
        
      }
    },
    components: { todos, countdown, webheader, breakCount, tomatoNum },
    methods: {
      
    },
    computed: {
      
    }
  }
</script>
<style lang="scss">
  @import './sass/index.scss';
  
</style>
