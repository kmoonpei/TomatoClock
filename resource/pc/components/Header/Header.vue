<template>
  <header>
    <span class="title">番茄时钟</span>
    <div class="nav">
      <Login/>
      <Register/>
    </div>
  </header>
</template>

<script>
  import Login from './Login.vue'
  import Register from './Register.vue'
  
  
  export default {
    name: 'header',
    data () {
      return {
        loginOpen: false,
        registerOpen: false
      }
    },
    components: { Login, Register },
    methods: {
      handleLoginClick() {
        loginOpen = true
      },
      handleRegisterClick() {
        registerOpen = true 
      }
    },
    computed: {
      
    }
  }
</script>

<style lang="scss">

  @import '../../sass/vars.scss';
  @import '../../sass/mixin.scss';
 
  header {
    height: 80px;
    width: 100%;
    line-height: 80px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,0.25);
    background-color: #fff;
    z-index: 10; 

    &>.title {
      float: left;
      margin-left: 100px;
      color: $primary-color-dark;
      font-size: 30px;
    }

    &>.nav {
      float: right;
      margin-right: 100px;

      
    }
  }

 .login-dialog {
    width: 40% !important;
    max-width: 400px !important;
    position: relative;

  }

// .main {
//   margin: 0 auto;
//   width: 1100px;
//   height: 500px;
//   // background: rgba(100,0,0,0.1);
//   border-radius: 5px;
//   position: absolute;
//   top: 20px;
//   left: 50%;
//   margin-left: -550px;
// }

// .content {
//   margin: 20px auto;
//   width: 1100px;
//   position: absolute;
//   left: 50%;
//   margin-left: -550px;
//   top: 400px;
//   z-index: 60;

//     &>.todos {
//       position: relative;
//       color: #666;
//       // float: left;
//       width: 800px;
//       // height: 500px;
//       margin: 20px auto;
//       border-radius: 5px;
//       background-color: #fff;
//       box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px; 
//     }
//   }

//   .mu-color {
//     color: $accent-color !important;
//   }

//   .mu-bgc {
//     background-color: $accent-color !important;
//   }

//   .mu-fontWeight {
//     font-weight: 500 !important;
//   }
  
//   ul {
//     @include clearListStyle;
//   }

//   .mu-checkbox-icon-checked{
//     color: $accent-color !important;
//   }

</style>
