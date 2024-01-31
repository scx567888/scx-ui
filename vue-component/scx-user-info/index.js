/**
 * 用户信息类
 */
class ScxUserInfo {

    loginStatus = false; // 登录状态
    id = ""; // 用户 id
    username = ""; // 用户名
    isAdmin = false;// 是否为管理员
    avatar = ""; // 用户头像
    phoneNumber = "";
    emailAddress = "";
    perms = [];//通用权限
    pagePerms = []; // 页面权限
    pageElementPerms = []; // 页面元素权限
    tombstone = false; // 是否使用真实删除 (这是后台的信息)

    reset() {
        this.id = "";
        this.username = "";
        this.isAdmin = false;
        this.avatar = "";
        this.phoneNumber = "";
        this.emailAddress = "";
        this.perms = [];
        this.pagePerms = [];
        this.pageElementPerms = []; // 页面元素权限
        this.tombstone = false; // 是否使用真实删除 (这是后台的信息
    }

    fill(rawOptions = {}) {
        const {
            id,
            username,
            isAdmin,
            avatar,
            phoneNumber,
            emailAddress,
            perms,
            pagePerms,
            pageElementPerms,
            tombstone,
        } = rawOptions;
        this.id = id;
        this.username = username;
        this.isAdmin = isAdmin;
        this.avatar = avatar;
        this.phoneNumber = phoneNumber;
        this.emailAddress = emailAddress;
        this.perms = perms;
        this.pagePerms = pagePerms;
        this.pageElementPerms = pageElementPerms;
        this.tombstone = tombstone;
        return this;
    }

}


export {ScxUserInfo};
