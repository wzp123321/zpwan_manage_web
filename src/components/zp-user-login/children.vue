<template>
  <el-dialog title="少侠,留个名吧！" :visible.sync="dialogFormVisible" width="420px">
    <el-form :model="form" ref="form">
      <el-form-item
        prop="name"
        label="用户名:"
        label-width="70px"
        :rules="[
      { required: true, message: '游客名不能为空'},
      { max: 10, message: '游客名不得超过10个字符'}
    ]"
      >
        <el-input
          v-model="form.name"
          style="width:280px"
          autocomplete="off"
          size="small"
          placeholder="请填写您的用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像:" label-width="60px">
        <template v-for="(item,index) in avatars">
          <span :key="index" class="avatar-span">
            <img
              :src="item"
              :class="{'choosed-img' :avatarUrl===item}"
              @click="()=>{avatarUrl = item}"
              alt
            />
          </span>
        </template>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button size="small" type="primary" style="width:100%;" @click="handleUserLogin">登 录</el-button>
      </el-form-item>
      <div class="other-login">
        <div class="title">您还可以选择其他登录方式:</div>
        <div @click="handleGithubLogin" style="text-align:center">
          <svg class="icon" aria-hidden="true" style="width:24px;height:24px">
            <use xlink:href="#icon-github" />
          </svg>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
import { generateUUId } from "@/utils/index";
import { avatars } from "@/assets/js/common";
const env = process.env.NODE_ENV;


@Component({
  name: "UserLoginModal",
})
export default class UserLoginModal extends Vue {
  private dialogFormVisible: boolean = false;
  //表单数据
  private form: { [key: string]: any } = {};
  // 头像地址数组
  private avatars: string[] = avatars;

  // 选择头像
  private avatarUrl: string = "";
  /**
   * 用户登录
   */
  private handleUserLogin() {
    const form: any = this.$refs.form;
    form.validate((valid: any) => {
      if (valid) {
        const user_id: string = generateUUId(16);
        const userInfo = this.$store.state.permission.userInfo;
        userInfo.user_id = user_id;
        userInfo.name = this.form.name;
        userInfo.avatar_url = this.avatarUrl;
        this.$store.dispatch("permission/setUserInfo", userInfo);
        this.dialogFormVisible = false;
      }
    });
  }
  /**
   * github登录
   */
  private handleGithubLogin() {
    const url =
      env === "production"
        ? "http://zpwan-yz.com/signin_github"
        : "http://localhost:8088/signin_github";
    window.location.href =
      "/githubAuthorize?client_id=e8066bfd81332a5fd345&redirect_uri=" + url;
  }
  // 显示对话框
  handleLoginModalShow(args: boolean) {
    this.dialogFormVisible = args;
  }
  mounted() {
    window.eventBus.$on("handleLoginModalShow", this.handleLoginModalShow);
    // 利用hook监听组件销毁钩子函数 并取消监听事件
    this.$once("hook:beforeDestroy", () => {
      console.log("测试是否监听到了");
      window.eventBus.$off("handleLoginModalShow", this.handleLoginModalShow);
    });
  }
}
</script>
<style lang="less" scoped>
.title {
  margin-left: 15px;
  font-size: 12px;
  margin-bottom: 10px;
}
.avatar-span {
  display: inline-block;
  cursor: pointer;
  padding: 3px;
  .choosed-img {
    border: 1px dashed #c7c7c7;
  }
  img {
    width: 40px;
    height: 40px;
    padding: 5px;
    border: 0;
    border-radius: 4px;
  }
}
</style>
<style lang="less">
.el-form-item__content {
  line-height: 0 !important;
}
@media screen and (max-width: 400px) {
  .el-dialog {
    width: 320px !important;
  }
  .el-input__inner {
    width: 66% !important;
  }
}
</style>
