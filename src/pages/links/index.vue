<template>
  <b-container class="friendly-link">
    <h1>友情链接</h1>
    <el-divider content-position="center">以下友情链接，排名不分先后</el-divider>
    <div class="links">
      <a :href="item.url" target="blank" v-for="(item,index) in links" :key="index">
        <img :src="item.ico" alt />
        <span>{{item.name}}</span>
      </a>
    </div>
    <el-divider content-position="center">添加您的链接</el-divider>
    <el-collapse>
      <el-collapse-item title="在这里添加你的链接" name="4">
        <el-form ref="form" :hide-required-asterisk="true" :model="form" label-width="80px">
          <el-form-item
            label="网站名称"
            prop="name"
            :rules="[
                { required: true, message: '网站名称不能为空'},
             ]"
          >
            <el-input v-model="form.name" style="width:400px" placeholder="请输入您的站点名称"></el-input>
          </el-form-item>
          <el-form-item
            label="网站地址"
            prop="url"
            :rules="[
                { required: true, message: '网站地址不能为空'},
             ]"
          >
            <el-input v-model="form.url" style="width:400px" placeholder="请输入您的站点地址"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" style="padding:10px 20px">立即提交</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import HttpRequest from "@/assets/api/modules/index";

@Component({
  name: "FriednlyLinkModule",
})
export default class FriednlyLinkModule extends Vue {
  private form: { [key: string]: any } = {
    name: "",
    url: ""
  };
  // 链接数组
  private links: Array<FriendlyLinkInfo> = [];

  /**
   * 请求链接
   */
  private getAllLinksList() {
    let page: number = 1;
    const getAlldata = async (page: number) => {
      const res: ApiResponse<ListResponse<
        Array<FriendlyLinkInfo>
      >> = await HttpRequest.BannerModule.getFriendlyLinkList({
        page,
        isShelves: 1
      });

      if (res && res.data) {
        const datas = res.data.data;
        this.links = [...this.links, ...datas];
        if (res.data.total > this.links.length) {
          getAlldata(page + 1);
        }
      }
    };
    getAlldata(page);
  }
  /**
   * 提交
   */
  private onSubmit() {
    const form: any = this.$refs.form;
    form.validate(async (valid: any) => {
      if (valid) {
        const { name, url } = this.form;
        const res: ApiResponse<boolean> = await HttpRequest.BannerModule.getFriendlyLinkAdd(
          {
            name,
            url
          }
        );
        if (res && res.data) {
          this.$message({
            message: "已成功提交后台审核，恭喜您",
            type: "success"
          });
          form.resetFields();
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
  created() {
    this.$nextTick(() => {
      this.getAllLinksList();
    });
  }
}
</script>
<style lang="less" scoped>
.friendly-link {
  background: #fff;
  padding: 20px;
  h1 {
    margin-left: 15px;
  }
  .links {
    min-height: 100px;
    padding: 10px 0;
    a {
      text-decoration: none;
      display: inline-block;
      padding: 4px 18px 6px 16px;
      border: 1px solid #eee;
      border-radius: 5px;
      margin: 0 10px;
      font-size: 15px;
      span {
        cursor: pointer;
        color: #06a5ff;
      }
      img {
        position: relative;
        bottom: 2px;
        width: 20px;
        height: 20px;
        border-radius: 50px;
      }
    }
    a:hover {
      transform: translateY(-2px);
    }
  }
  .el-collapse {
    padding: 0 15px;
  }
}
@media screen and (max-width: 400px) {
  .friendly-link {
    padding: 10px;
    h1 {
      font-size: 20px;
      margin-left: 5px;
    }
    .links {
      padding: 0;
      a {
        padding: 4px;
        margin: 6px 12px;
        font-size: 12px;
        span {
          margin-left: 2px;
        }
      }
    }
    .el-divider__text .is-center {
      padding: 0 !important;
    }
    .el-collapse {
      padding: 0 15px;
    }
  }
}
</style>
<style>
@media screen and (max-width: 400px) {
  .el-input__inner {
    width: 56% !important;
  }
}
.el-collapse-item__header {
  color: #06a5ff;
}
</style>