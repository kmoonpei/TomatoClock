<template>
  <div class="nav-register">
    <mu-flat-button label="注册" @click="open"/>
    <mu-dialog :open="showRegister" dialogClass="login-dialog">
      <span slot="title">注册</span>
      <mu-icon-button icon="close" class="dialog-close" @click="close"/>
      <mu-text-field v-model="account.username" label="账户" hintText="请输入账户" labelFocusClass="mu-color" underlineFocusClass="mu-bgc" labelFloat/><br/>
      <mu-text-field v-model="account.nickName" label="昵称" hintText="请输入昵称" labelFocusClass="mu-color" underlineFocusClass="mu-bgc" labelFloat/><br/>
      <mu-text-field v-model="account.password" label="密码" hintText="请输入密码" type="password" labelFocusClass="mu-color" underlineFocusClass="mu-bgc" labelFloat/><br/>
      <mu-text-field v-model="repassword" label="确认密码" hintText="请再次输入密码" type="password" labelFocusClass="mu-color" underlineFocusClass="mu-bgc" labelFloat/><br/>
      <mu-flat-button slot="actions" @click="register" class="mu-color mu-fontWeight">确定</mu-flat-button>
      <mu-flat-button slot="actions" @click="goLogin" class="mu-color mu-fontWeight">登陆>></mu-flat-button>
    </mu-dialog>
  </div>
</template>

<script>
  import muFlatButton from 'muse-components/flatButton'
  import muDialog from 'muse-components/dialog'
  import muTextField from 'muse-components/textField'
  import muIconButton from 'muse-components/iconButton'
  import axios from 'axios'


  
  

  export default {
    name: 'register',
    data () {
      return {
        account: {
          username: '222222',
          password: '123456',
          nickName: '222222'
        },
        repassword: '123456'
      }
    },
    components: { muFlatButton, muDialog, muTextField, muIconButton },
    methods: {
      open () {
        this.$store.commit('toggelDialog','register') 
      },
      close () {
        this.$store.commit('toggelDialog','') 
      },
      goLogin () {
        this.$store.commit('toggelDialog','login') 
      },
      register () {
        if( !this.account.username || this.account.username.length < 6 || this.account.username.length > 20 ) {
          alert('请填写用户名(6~20个字符)')
        }else if( !this.account.nickName || this.account.nickName.length < 6 || this.account.nickName.length > 20 ) {
          alert('请填写昵称(6~20个字符)')
        }else if( !this.account.password || this.account.password.length < 6 || this.account.password.length > 20 ) {
          alert('请填写密码(6~20个字符)')
        }else if( !this.repassword || this.repassword !== this.account.password ) {
          alert('请填写确认密码')
        }else if( this.repassword === this.account.password ) {
          this.$store.dispatch('register',this.account)
        }
      }
      
    },
    computed: {
      showRegister () {
        if(this.$store.state.dialog == 'register') {
          return true
        }
      }
     
    }
  }
</script>

<style lang="scss">

  .nav-register {
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
