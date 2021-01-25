<template>
  <div class="login-container">
    <div class="login-form">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" autocomplete="on"
               label-position="left">
        <el-form-item prop="username">
                            <span class="svg-container">
                                <scx-icon icon-class="user"/>
                            </span>
          <el-input
              ref="username"
              v-model="loginForm.username"
              :placeholder="$t('login.username')"
              autocomplete="on"
              maxlength="20"
              name="username"
              tabindex="1" type="text"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" :content="$t('login.capsLockOn')" manual placement="right">
          <el-form-item prop="password">
                                <span class="svg-container">
                                    <scx-icon icon-class="password"/>
                                </span>
            <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :placeholder="$t('login.password')"
                :type="passwordType"
                autocomplete="on"
                maxlength="20"
                name="password"
                show-password
                tabindex="2"
                @blur="capsTooltip = false"
                @keyup.native="checkCapslock"
                @keyup.enter.native="handleLogin"
            />
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" class="login-button" style="width:100%;margin-bottom:30px;"
                   type="primary"
                   @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>
      </el-form>

    </div>

  </div>
</template>

<script>

import {login} from "@/store";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        //此处是为了方便开发 实际部署时记得 设置为空
        username: '',
        password: ''
      },
      loginRules: {
        username: [{required: true, trigger: 'change', validator: this.validateUsername}],
        password: [{required: true, trigger: 'change', validator: this.validatePassword}],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {

  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const {key} = e;
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          login(this.loginForm)
              .then(() => {
                this.$router.push({path: this.redirect || '/', query: this.otherQuery})
                this.loading = false
              }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    validateUsername(rule, value, callback) {
      if (value.trim() === '') {
        callback(new Error(this.$t('login.validateUsername')))
      } else {
        callback()
      }
    },
    validatePassword(rule, value, callback) {
      if (value.length === 0) {
        callback(new Error(this.$t('login.validatePassword')))
      } else {
        callback()
      }
    },
  }
}
</script>

<style lang="css" scoped>


.aaa .el-form-item__label {
  background: transparent;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;

  color: #fff;
  height: 47px;
  caret-color: #fff;
}

.aaa.el-form-item {
  border: none !important;
  background: transparent !important;
}

.aaa .el-radio__label {
  color: white;
}


.login-container .el-input input :-webkit-autofill {
  box-shadow: 0 0 0px 1000px #283443 inset !important;
  -webkit-text-fill-color: #fff !important;
}

.login-container .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  color: #454545;
}

/*控制 tabs 文字白色*/
.login-container .login-tabs .el-tabs__item {
  color: white;
}

.login-container .login-tabs .el-tabs__item:hover {
  color: #409EFF;
}

.login-container .login-tabs .el-tabs__item.is-active {
  color: #409EFF;
}


.login-container {
  position: absolute;
  min-height: 100%;
  width: 100%;
  background-image: url('/static/img/login-bg-face.png');
  background-size: 100% 100%;
  overflow: hidden;
}

.login-container .login-form {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 20% 40% 0;
  margin: 0;
  overflow: hidden;
}

.login-container .tips span:first-of-type {
  margin-right: 16px;
}

.login-container .svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

.login-container .title-container {
  margin-bottom: 10%;
  position: relative;
}


.login-container .title-container .title-container-logo {
  height: 44px;
  width: 50px;
  fill: #00a73e;
  vertical-align: top;
  margin-right: 2%;
  border-style: none;
}

.login-container .title-container .title-container-span {
  font-size: 33px;
  color: rgba(255, 252, 248, 0.85);
  font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
  font-weight: 600;
  position: relative;
  top: 2px;
}

.login-container .title-container .set-language {
  color: #fbfbfb;
  position: absolute;
  top: 3px;
  font-size: 18px;
  right: 3px;
  cursor: pointer;
}
</style>
<style>
/* 重置  element-ui css */
.login-container .el-input {
  display: inline-block;
  height: 47px;
  width: 90%;
}

.login-container .el-input input {
  background: transparent;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #fff;
  height: 47px;
  caret-color: #fff;
}
</style>