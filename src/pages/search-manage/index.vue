<template>
  <b-container class="search-wrapper">
    <div class="search-input flex-row">
      <el-input v-model="key" placeholder="请输入内容进行搜索" :clearable="true"></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="height:40px;padding:12px 10px;margin-left:15px"
        @click="handleSearchByKey"
      >搜索</el-button>
    </div>
    <b-row
      class="search-content"
      v-show="JSON.stringify(articles)!=='[]' || JSON.stringify(intro_articles)!=='[]'"
    >
      <b-col xl="9" md="12" cols="12" class="article-list">
        <div class="article-result" v-if="JSON.stringify(articles)!=='[]'">
          <p>
            已为您找到共{{total}}篇关于"
            <span class="em">{{this.key}}</span>"的文章
          </p>
          <zp-article-item v-for="(item,index) in articles" :key="index" :articleInfo="item"></zp-article-item>
        </div>
        <div class="article-result" v-else>
          <p>
            未能找到如下有关"
            <span class="em">{{this.key}}</span>"，为您智能推荐以下文章
          </p>
          <zp-article-item v-for="(item,index) in intro_articles" :key="index" :articleInfo="item"></zp-article-item>
        </div>
        <el-pagination
          v-if="total>5 &&(JSON.stringify(articles)!=='[]' || JSON.stringify(intro_articles)!=='[]')"
          style="text-align:center;margin-top:20px"
          background
          :page-size="5"
          layout="prev, pager, next"
          :current-page="page"
          :total="total"
          @current-change="handlePaginationChange"
        ></el-pagination>
      </b-col>
      <b-col xl="3" md="12" cols="12" class="tags">
        <zp-recommend-article></zp-recommend-article>
      </b-col>
    </b-row>
  </b-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HttpRequest from "@/assets/api/modules/index";
@Component({
  name: "SearchModule",
})
export default class SearchModule extends Vue {
  private key: string = "";
  private articles: Array<ArticleModule.ArticleInfo> = [];
  private intro_articles: Array<ArticleModule.ArticleInfo> = [];
  private total: number = 0;
  private page: number = 1;
  handlePaginationChange(value: number) {
    this.page = value;
    this.handleSearchByKey();
  }
  /**
   * 搜索事件
   */
  private async handleSearchByKey() {
    if (this.key === "") {
      return;
    }
    const res: ApiResponse<ListResponse<
      Array<ArticleModule.ArticleInfo>
    >> = await HttpRequest.ArticleModule.getArticleSearchByKey({
      key: this.key,
      limit: 5,
      page: this.page
    });

    if (res && res.data) {
      const total = res.data.total;
      const articles = res.data.data;
      this.total = total;
      this.articles = [...this.articles, ...articles];
      this.handleSearchListFilter();
      if (JSON.stringify(res.data.data) === "[]") {
        const newres = await HttpRequest.ArticleModule.getArticleList({
          page: 1,
          limit: 10
        });
        if (newres && newres.data) {
          const datas = newres.data.data;
          this.intro_articles = [...this.intro_articles, ...datas];
        }
      }
    }
  }
  /**
   * 替换关键字
   */
  private handleSearchListFilter() {
    this.articles.forEach((item: ArticleModule.ArticleInfo, index: number) => {
      item.title = item.title.replace(
        new RegExp(this.key, "g"),
        `<span class='em'>${this.key}</span>`
      );
      item.description = item.description.replace(
        new RegExp(this.key, "g"),
        `<span class='em'>${this.key}</span>`
      );
    });
  }
}
</script>
<style lang="less" scoped>
.search-wrapper {
  position: relative;
  .search-input {
    position: absolute;
    z-index: 999;
    top: 0%;
    width: 50%;
    left: 21%;
    background: #fff;
    padding: 20px 50px;
    border-radius: 4px;
  }
  .search-content {
    position: relative;
    padding-top: 90px;
    .article-list {
      flex: 1;
    }
    .tags {
      margin-left: 20px;
    }
  }
}
@media screen and (max-width: 1100px) {
  .search-wrapper {
    .search-input {
      width: 100%;
      left: 0%;
      padding: 15px;
    }
    .search-content {
      padding-top: 70px;
      .article-list {
        flex: 1;
      }
      .tags {
        margin-left: 0 !important;
      }
    }
  }
}
</style>