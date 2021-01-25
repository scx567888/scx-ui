<template>
  <!-- 登录背景 -->
  <div class="login-bg">
    <!-- 小星星 -->
    <div class="stars"></div>
    <!-- 中间登录的div   -->
    <div class="login-form-bg">

      <!-- 上面的说明文字 -->
      <div class="title-container">
        <scx-icon icon="scx-logo"/>
        <span>{{ $t('login.title') }}</span>
        <scx-lang-select class="set-language"/>
      </div>

      <el-tabs v-model="activeTab" stretch>
        <el-tab-pane :label="$t('login.loginUser')" name="loginTab">

          <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">

            <el-form-item prop="username">
              <el-input v-model="loginForm.username" :placeholder="$t('login.username')" @keyup.enter="onLogin">
                <template v-slot:prefix>
                  <scx-icon icon="user" type="outlined"/>
                </template>
              </el-input>
            </el-form-item>

            <el-tooltip v-model="capsTooltip" :content="$t('login.capsLockOn')" manual placement="right">
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" :placeholder="$t('login.password')" show-password
                          @blur="capsTooltip = false" @input="checkCapslock">
                  <template v-slot:prefix>
                    <scx-icon icon="unlock" type="outlined"/>
                  </template>
                </el-input>
              </el-form-item>
            </el-tooltip>

          </el-form>

          <el-button :loading="loginForm.loginBtnLoading" style="width: 100%" type="primary" @click="onLogin">
            {{ $t('login.logIn') }}
          </el-button>

        </el-tab-pane>

        <el-tab-pane :label="$t('login.registerUser')" name="registerTab">

          <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules">

            <el-form-item prop="registerUsername">
              <el-input v-model="registerForm.registerUsername" :placeholder="$t('login.registerUsername')">
                <template v-slot:prefix>
                  <scx-icon icon="user" type="outlined"/>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="registerPassword">
              <el-input v-model="registerForm.registerPassword" :placeholder="$t('login.registerPassword')"
                        show-password>
                <template v-slot:prefix>
                  <scx-icon icon="unlock" type="outlined"/>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="registerPasswordAgain">
              <el-input v-model="registerForm.registerPasswordAgain" :placeholder="$t('login.registerPasswordAgain')"
                        show-password>
                <template v-slot:prefix>
                  <scx-icon icon="unlock" type="outlined"/>
                </template>
              </el-input>
            </el-form-item>

          </el-form>
          <el-button :loading="registerForm.registerBtnLoading" style="width: 100%" type="success" @click="onRegister">
            {{ $t('login.register') }}
          </el-button>

        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="login-footer">Powered By SCX @2018-2021</div>
  </div>

</template>

<script>
import {computed, reactive, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {t} from "../../../i18n";
import {login} from "../../../utils/permUtil";
import request from "../../../utils/request";
import {ElMessage} from "element-plus";

export default {
  name: "login",
  setup() {
    const router = useRouter();
    const route = useRoute();

    const redirect = computed(() => route.query.redirect);
    const otherQuery = computed(() => getOtherQuery(route.query));

    function getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }


    const activeTab = ref('loginTab')

    //改变 tab
    function changeActiveTab(e) {
      activeTab.value = e
    }

    const capsTooltip = ref(false);

    function checkCapslock(e) {
      console.log(e)
      const {key, shiftKey} = e;
      if (key === 'Enter') {
        onLogin()
      } else {
        capsTooltip.value = !shiftKey && key && key.length === 1 && (key >= 'A' && key <= 'Z')
      }
    }

    //登录开始
    const loginFormRef = ref(null)
    const loginForm = reactive({username: 'admin', password: '123456', loginBtnLoading: false}); // 在这里使用ref包裹一层引用容器
    const loginFormRules = {
      username: [{
        type: 'string',
        trigger: 'change',
        required: true,
        validator: (rule, value, callback) => {
          if (value.trim() === '') {
            return callback(t('login.validateUsername'));
          } else {
            callback();
          }
        }
      }],
      password: [{
        type: 'string',
        required: true,
        trigger: 'change',
        validator: (rule, value, callback) => {
          if (value.length === 0) {
            return callback(t('login.validatePassword'));  // reject with error message
          } else {
            callback();
          }
        }
      }]
    };

    function onLogin() {
      loginFormRef.value.validate((valid) => {
        if (valid) {
          loginForm.loginBtnLoading = true
          login(loginForm).then(() => {
            router.push({path: redirect.value || '/', query: otherQuery.value})
            loginForm.loginBtnLoading = false
          }).catch(error => {
            loginForm.loginBtnLoading = false
          })
        }
      });
    }

    //登录结束

    //注册开始
    const registerFormRef = ref(null)
    const registerForm = reactive({
      registerUsername: '',
      registerPassword: '',
      registerPasswordAgain: '',
      registerBtnLoading: false
    });
    const registerFormRules = {
      registerUsername: [{
        type: 'string',
        trigger: 'change',
        required: true,
        validator: (rule, value, callback) => {
          if (value.length < 4) {
            callback(t('login.validateRegisterUsername'));
          } else {
            return callback();
          }
        }
      }],
      registerPassword: [{
        type: 'string',
        required: true,
        trigger: 'change',
        validator: (rule, value, callback) => {
          if (value.length < 6) {
            callback(t('login.validateRegisterPassword'));  // reject with error message
          } else {
            return callback();
          }
        }
      }],
      registerPasswordAgain: [{
        type: 'string',
        required: true,
        trigger: 'change',
        validator: (rule, value, callback) => {
          if (value.trim() === '') {
            callback(t('login.validateRegisterPasswordIsNull'));
          } else if (value !== registerForm.registerPassword) {
            callback(t('login.validateRegisterPasswordAgain'));
            resolve();
          } else {
            return callback();
          }
        }
      }]
    };

    // 注册方法
    function onRegister() {
      registerFormRef.value.validate((valid) => {
        if (valid) {
          registerForm.registerBtnLoading = true
          const newUser = {
            "username": registerForm.registerUsername,
            "password": registerForm.registerPassword,
          };
          request.post('/api/core/user/register', newUser).then(response => {
            if (response.message === 'userAlreadyExists') {
              ElMessage.error(t('login.userAlreadyExists'));
            } else if (response.message === 'registerSuccess') {
              loginForm.username = registerForm.registerUsername + '';
              loginForm.password = registerForm.registerPassword + '';
              registerForm.registerUsername = ''
              registerForm.registerPassword = ''
              registerForm.registerPasswordAgain = ''
              ElMessage.success('login.registerSuccess');
              //移除校验结果
              registerFormRef.value.clearValidate()
              activeTab.value = 'loginTab';
            } else {
              ElMessage.error(t('未知错误 !!!'));
            }
            registerForm.registerBtnLoading = false
          })
        }
      })
    }

    //注册结束

    return {
      capsTooltip,
      checkCapslock,
      activeTab,
      changeActiveTab,
      loginFormRef,
      loginForm,
      loginFormRules,
      onLogin,
      registerFormRef,
      registerForm,
      registerFormRules,
      onRegister
    }
  }
}
</script>

<style>
@import "./index.css";
@import "./stars.css";
</style>
