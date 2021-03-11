<template>
    <div class="login-container">
        <div class="login-form">
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" autocomplete="on"
                     label-position="left">
                <el-form-item prop="username">
                            <span class="svg-container">
                                <svg-icon icon-class="user"/>
                            </span>
                    <el-input
                            ref="username"
                            v-model="loginForm.username"
                            :placeholder="$t('login.username')"
                            name="username"
                            type="text"
                            tabindex="1"
                            autocomplete="on" maxlength="20"
                    />
                </el-form-item>

                <el-tooltip v-model="capsTooltip" :content="$t('login.capsLockOn')" placement="right" manual>
                    <el-form-item prop="password">
                                <span class="svg-container">
                                    <svg-icon icon-class="password"/>
                                </span>
                        <el-input
                                :key="passwordType"
                                ref="password"
                                v-model="loginForm.password"
                                :type="passwordType"
                                :placeholder="$t('login.password')"
                                name="password"
                                tabindex="2"
                                autocomplete="on"
                                @keyup.native="checkCapslock"
                                @blur="capsTooltip = false"
                                show-password
                                maxlength="20"
                                @keyup.enter.native="handleLogin"
                        />
                    </el-form-item>
                </el-tooltip>

                <el-button :loading="loading" class="login-button" type="primary"
                           style="width:100%;margin-bottom:30px;"
                           @click.native.prevent="handleLogin">
                    {{ $t('login.logIn') }}
                </el-button>
            </el-form>

        </div>

    </div>
</template>

<script>
    import {registerUser} from '../../../api/core/login/index'
    import {Message} from 'element-ui'
    import {addClass, removeClass} from '../../../utils'

    export default {
        name: 'Login',
        data() {
            return {
                activeName: 'loginTab',
                loginForm: {
                    //此处是为了方便开发 实际部署时记得 设置为空
                    username: '',
                    password: ''
                },
                loginFormRegister: {
                    registerUsername: '',
                    registerPassword: '',
                    registerPasswordAgain: '',
                    userType: 3
                },
                loginRules: {
                    username: [{required: true, trigger: 'change', validator: this.validateUsername}],
                    password: [{required: true, trigger: 'change', validator: this.validatePassword}],

                },
                registerRules: {
                    registerUsername: [{required: true, trigger: 'change', validator: this.validateRegisterUsername}],
                    registerPassword: [{required: true, trigger: 'change', validator: this.validateRegisterPassword}],
                    registerPasswordAgain: [{
                        required: true,
                        trigger: 'change',
                        validator: this.validateRegisterPasswordAgain
                    }]
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
                        this.$store.dispatch('user/login', this.loginForm)
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
            handleRegister() {
                this.$refs['loginFormRegister'].validate(valid => {
                    if (valid) {
                        const newUser = {
                            "username": this.loginFormRegister.registerUsername,
                            "password": this.loginFormRegister.registerPassword,
                            "userType": this.loginFormRegister.userType,
                        };
                        registerUser(newUser).then(response => {
                            if (response.message === 'userAlreadyExists') {
                                Message({
                                    message: this.$t('login.userAlreadyExists'),
                                    type: 'error',
                                    duration: 5 * 1000
                                })
                            } else if (response.message === 'registerSuccess') {
                                this.activeName = 'loginTab';
                                this.loginForm.username = this.loginFormRegister.registerUsername + '';
                                this.loginForm.password = this.loginFormRegister.registerPassword + '';
                                this.loginFormRegister.registerUsername = ''
                                this.loginFormRegister.registerPassword = ''
                                this.loginFormRegister.registerPasswordAgain = ''
                                Message({
                                    message: this.$t('login.registerSuccess'),
                                    type: 'success',
                                    duration: 5 * 1000
                                })
                                this.$nextTick(() => {
                                    this.$refs['loginFormRegister'].clearValidate()
                                })
                            } else {
                                Message({
                                    message: '未知错误 !!!',
                                    type: 'error',
                                    duration: 5 * 1000
                                })
                            }
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
            validateRegisterUsername(rule, value, callback) {
                if (value.length < 4) {
                    callback(new Error(this.$t('login.validateRegisterUsername')))
                } else {
                    callback()
                }
            },
            validateRegisterPassword(rule, value, callback) {
                if (value.length < 6) {
                    callback(new Error(this.$t('login.validateRegisterPassword')))
                } else {
                    callback()
                }
            },
            validateRegisterPasswordAgain(rule, value, callback) {
                if (value === '') {
                    callback(new Error(this.$t('login.validateRegisterPasswordIsNull')));
                } else if (value !== this.loginFormRegister.registerPassword) {
                    callback(new Error(this.$t('login.validateRegisterPasswordAgain')));
                } else {
                    callback();
                }
            },
        }
    }
</script>

<style lang="css">
    @import "style/login.css";
</style>
