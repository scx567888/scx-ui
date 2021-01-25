<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <span class="username text-muted">用户管理</span>
      </div>
      <p>
        控制应用系统登录用户的基本信息及权限管理，具体包括用户的基本信息、登录账号、登录密码及所属角色：<br>
        操作：<br>
        1) 搜索查询：本模块支持用户名及昵称模糊匹配查询的功能，具体操作为在左上添加相关用户名或昵称，点击搜索按钮即可<br>
        2) 添加用户：点击添加按钮，开启添加用户表单，补充表单内相关数据即可完成添加用户功能，具体操作如下图：<br>
        3) 修改用户：点击列表内数据的编辑按钮，即可打开编辑表单，做相应修改后，点击确定即可完成数据编辑功能，具体操作如下图：<br>
        4) 删除用户：点击列表内数据的删除按钮，即可完成删除操作<br>
      </p>
    </div>
    <div class="post">
      <div class="user-block">
        <span class="username text-muted">角色管理</span>
      </div>
      <p>
        控制用户的角色权限，赋予不同用户的角色，给予不同的权限，访问权限相关的页面。<br>
        操作：<br>
        1) 添加（修改）角色，点击角色组织机构树添加新建角色，并在左侧填写详细信息及勾选相关权限。<br>
        2) 删除角色，点击角色树左侧删除按钮实现删除功能
      </p>
    </div>
    <div class="post">
      <div class="user-block">
        <span class="username text-muted">考勤日志</span>
      </div>
      <p>
        考勤日志管理维护修正人员考勤信息，包括考勤人照片，抓拍照片，考勤人基本信息和打卡情况等数据:<br>
        操作：<br>
        1) 考勤基本信息查询：考勤日志管理管理模块支持通过人员名称、考勤开始时间、考勤结束时间、身份证以及打开情况查询考勤日志信息的功能，具体操作为在左上添加相关查询数据，点击搜索按钮即可。
      </p>
    </div>
    <div class="post">
      <div class="user-block">
        <span class="username text-muted">修正人员管理</span>
      </div>
      <p>
        说明：修正人员由远程设备提供，主要显示人员姓名、身份证、所属单位等基本信息，提供维护人员修正日期的功能:<br>
        操作：<br>
        1) 同步人员数据：点击同步人员数据按钮，从远程设备中更新人脸库信息。<br>
        2) 查询修正人员信息：修正人员管理模块支持通过人员名称查询修正人员的功能，具体操作为在左上添加相关人员名称，点击搜索按钮即可。<br>
        3) 编辑修正人员修正日期：点击列表内数据的编辑按钮，即可打开编辑表单，做相应修改后，点击确定即可完成数据编辑功能

      </p>
    </div>
    <div class="post">
      <div class="user-block">
        <span class="username text-muted">考勤设备管理</span>
      </div>
      <p>

        考勤设备管理模块负责维护考勤设备的基本信息，包括设备名称、IP、端口号、设备登录账号、密码以及所属单位等基本数据，用于与各所属单位管理模块建立关联关系，便用用户通过所属单位，查看设备信息及甄别修正人员数据来自哪个设备<br>
        操作：<br>
        1) 查询设备信息：设备信息管理模块支持通过设备名称查询设备信息的功能，具体操作为在左上添加相关设备名称，点击搜索按钮即可。<br>
        2) 添加设备：点击添加按钮，开启添加设备表单，补充表单内相关数据即可完成添加设备功能，<br>
        3) 修改设备：点击列表内数据的编辑按钮，即可打开编辑表单，做相应修改后，点击确定即可完成数据编辑功能，<br>
        4) 重连设备：点击重连按钮实现与远程设备重现操作<br>
        5) 删除设备：点击列表内数据的删除按钮，即可完成删除操作。<br>

      </p>
    </div>
    <div class="post">
      <div class="user-block">
        <span class="username text-muted">所属单位管理</span>
      </div>
      <p>
        维护修正单位基本信息，包括单位名称、地址、联系人、联系电话、修正时间和次数等基本数据:<br>
        操作：<br>
        1) 查询单位信息：所属单位管理模块支持通过单位名称查询所属单位的功能，具体操作为在左上添加相关单位名称，点击搜索按钮即可。<br>
        2) 添加所属单位信息：点击添加按钮，开启添加单位表单，补充表单内相关数据即可完成添加设备功能：<br>
        3) 修改所属单位信息：点击列表内数据的编辑按钮，即可打开编辑表单，做相应修改后，点击确定即可完成数据编辑功能：<br>
        4) 删除所属单位信息：点击列表内数据的删除按钮，即可完成删除操作。
      </p>
    </div>

  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'
const carouselPrefix = '?imageView2/2/h/440'

export default {
  data() {
    return {
      avatarPrefix,
      carouselPrefix
    }
  }
}
</script>

<style lang="css" scoped>
.user-activity .user-block .username,
.user-activity .user-block .description {
  display: block;
  margin-left: 0px;
  padding: 2px 0;
}

.user-activity .user-block .username {
  font-size: 16px;
  color: #000;
}

.user-activity .user-block :after {
  clear: both;
}

.user-activity .user-block .img-circle {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  float: left;
}

.user-activity .user-block span {
  font-weight: 500;
  font-size: 12px;
}

.user-activity .post {
  font-size: 14px;
  border-bottom: 1px solid #d2d6de;
  margin-bottom: 15px;
  padding-bottom: 15px;
  color: #666;
}

.user-activity .post .image {
  width: 100%;
  height: 100%;
}

.user-activity .post .user-images {
  padding-top: 20px;
}

.user-activity .list-inline {
  padding-left: 0;
  margin-left: -5px;
  list-style: none;
}

.user-activity .list-inline li {
  display: inline-block;
  padding-right: 5px;
  padding-left: 5px;
  font-size: 13px;
}

.user-activity .list-inline .link-black:hover, .user-activity .list-inline .link-black:focus {
  color: #999;
}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
