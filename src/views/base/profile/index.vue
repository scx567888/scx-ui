<template>
  <div style="padding: 10px">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user"/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="功能说明" name="activity">
                <activity/>
              </el-tab-pane>
              <el-tab-pane label="操作日志" name="timeline">
                <timeline/>
              </el-tab-pane>
              <el-tab-pane label="我的信息" name="account">
                <account :user="user"/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import {state} from "../../../store";
import UserCard from './UserCard.vue'
import Activity from './Activity.vue'
import Timeline from './Timeline.vue'
import Account from './Account.vue'

export default {
  name: 'Profile',
  components: {UserCard, Activity, Timeline, Account},
  data() {
    return {
      user: {},
      activeTab: 'account'
    }
  },
  computed: {
    name() {
      return state.user.name
    },
    avatar() {
      return state.user.name
    },
    perms() {
      return state.user.name
    },
    realName() {
      return state.user.name
    }

  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = {
        nickName: this.nickName,
        idCard: this.idCard,
        phoneNumber: this.phoneNumber,
        nativePlace: this.nativePlace,
        avatar: this.avatar
      }
    }
  }
}
</script>
