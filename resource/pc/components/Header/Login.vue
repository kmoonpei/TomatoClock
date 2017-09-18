<template>
  <div class="nav-login">
    <mu-flat-button label="登陆" @click="open"/>
    <mu-dialog :open="showLogin" dialogClass="login-dialog">
      <span slot="title">登陆</span>
      <mu-icon-button icon="close" class="dialog-close" @click="close"/>
      <mu-text-field v-model="account.username" label="账户" hintText="请输入账户" labelFocusClass="mu-color" underlineFocusClass="mu-bgc" labelFloat/><br/>
      <mu-text-field v-model="account.password" label="密码" hintText="请输入密码" type="password" labelFocusClass="mu-color" underlineFocusClass="mu-bgc" labelFloat/><br/>
      <mu-flat-button slot="actions" @click="login" class="mu-color mu-fontWeight">确定</mu-flat-button>
      <mu-flat-button slot="actions" @click="goRegister" class="mu-color mu-fontWeight">注册>></mu-flat-button>
    </mu-dialog>
  </div>
</template>

<script>
  import muFlatButton from 'muse-components/flatButton'
  import muDialog from 'muse-components/dialog'
  import muTextField from 'muse-components/textField'
  import muIconButton from 'muse-components/iconButton'
  
  
  export default {
    name: 'login',
    data () {
      return {
        account: {
          username: '555555',
          password: '123456'
        }
      }
    },
    components: { muFlatButton, muDialog, muTextField, muIconButton },
    methods: {
      open () {
        this.$store.commit('toggelDialog','login') 
      },
      close () {
        this.$store.commit('toggelDialog','') 
      },
      goRegister () {
        this.$store.commit('toggelDialog','register') 
      },
      login () {
        if( !this.account.username || this.account.username.length < 6 || this.account.username.length > 20 ) {
          alert('用户名填写错误')
        }else if( !this.account.password || this.account.password.length < 6 || this.account.password.length > 20 ) {
          alert('密码填写错误')
        }else {
          this.$store.dispatch('login',this.account)
        }
      }
      
    },
    computed: {
      showLogin () {
        if(this.$store.state.dialog == 'login') {
          return true
        }
      }
      
    }
  }
</script>

<style lang="scss" scoped>

  .nav-login {
    display: inline-block;
  }
  .dialog-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    cursor: pointer;
  }

</style>
