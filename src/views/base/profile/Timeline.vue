<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of list" :key="index" :timestamp="item.modifyDate" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import request from "../../../utils/request";

export default {
  name: 'AttendantInfo',
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      request.get('/api/User/getUserLog').then(response => {
        if (response.items) {
          this.list = response.items;
        } else {
          this.list = [];
        }
      })
    },
  },

}

</script>
