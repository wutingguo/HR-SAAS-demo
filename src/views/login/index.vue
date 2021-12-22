<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          <img src="@/assets/common/login-logo.png" alt="">
        </h3>
      </div>

      <el-form-item prop="mobile">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="mobile"
          v-model="loginForm.mobile"
          placeholder="请输入手机号"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click="handleLogin">登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">账号: 13800000003</span>
        <span> 密码: 123456</span>
      </div>

    </el-form>

    <!--
        封装一个组件 HmButton
        给自定义组件注册 原生事件, 默认是无效的!!!
        (原生事件click change..只支持添加给网页元素div  span)

        1. .native修饰符 作用是给组件的根元素添加原生事件
        <HmButton @click.native="handleClick" />

        2. 组件内部做一下支持(给button添加原生事件, 事件里面触发自定义事件click)
        <HmButton @click="handleClick" />

       结论:
        如果你用的是别人的组件, 且你想注册原生事件, 成功了 => 别人组件内部做了支持;
        失败了, 加一个.native
       -->
    <HmButton @click="handleClick" />
    <!-- <button @click="handleClick">按钮</button> -->
  </div>
</template>

<script>
import { validmobile } from '@/utils/validate'
import HmButton from './components/HmButton.vue'
import { mapActions } from 'vuex'
// import { reqLogin } from '@/api/user'

export default {
  name: 'Login',
  components: {
    HmButton
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      if (!validmobile(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456'
      },
      loginRules: {
        mobile: [
          // { required: true, trigger: 'blur', validator: validateUsername }
          // 非空
          { required: true, message: '手机号不能为空', trigger: ['change', 'blur'] },
          // 自定义校验函数
          { validator: validateMobile, trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: ['change', 'blur'] },
          // 长度校验 6-12
          { min: 6, max: 12, message: '密码必须是6-12位', trigger: ['change', 'blur'] }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      // console.log('login')
      // 1.整体校验
      this.$refs.loginForm.validate(async(valid) => {
        if (!valid) return

        // 通过
        // 2.发送请求(测试)
        // const res = await this.$http({
        //   method: 'post',
        //   // 请求的是代理服务器(http://localhost:8888)
        //   // 第一次使用 建议写完整  baseURL + url
        //   url: 'http://localhost:8888/api/sys/login',
        //   data: this.loginForm
        // })
        // console.log(res)

        // const res = await reqLogin(this.loginForm)
        // console.log(res, 8989)

        // this.$store.dispatch('user/login', this.loginForm)
        // 请求之前 按钮loading
        this.loading = true

        this.login(this.loginForm).then((res) => {
          console.log(res, 5674)
          // 请求成功的回调
          // 提示
          this.$message.success('登录成功')
          // 跳转
          this.$router.push('/')
          // this.loading = false
        }).catch((err) => {
          // 请求失败的回调 +  请求成功且结果失败
          console.log(err)
          // 提示
          // this.$message.error('登录失败')
          // this.loading = false
        }).finally(() => {
          // 无论成功/失败 => 都执行
          this.loading = false
          console.log(9527)
        })
        // 需求: 等登录请求(异步操作)结束以后, 提示用户 跳转首页
        // 等异步操作结束 再做某些事(封装promise)
        // this.$router.push('/')

        // this.$store.state.user.token
      })
    },
    handleClick() {
      console.log(23333)
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray: #407ffe; // 修改输入框字体颜色
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.9); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }

   .el-form-item__error {
    color: #fff;
    font-size: 14px;
  }

  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
