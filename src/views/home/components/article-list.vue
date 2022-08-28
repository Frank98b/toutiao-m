<template>
    <div class="article-list">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isreFreshLoading" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1000">
            <!-- 文章列表组件 -->
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            >
            <article-item
            v-for="(article, index) in list"
            :key="index"
            :article="article"/>
                <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title" /> -->
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 储存列表数据的数组
      loading: false, // 控制加载中loading状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功'// 下拉刷新成功提示文本
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
    async onLoad () {
      // 请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now()// 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        })
        // 把请求结果放到list数组中

        // //模拟发生错误的情况
        // if (Math.random() > 0.5) {
        //        JSON.parse('saldjflas')
        // }

        const { results } = data.data
        // ...是数组的展开操作符，将数组中元素逐个拿出来
        this.list.push(...results)

        // 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false

        // 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log(err)
        // 展示错误提示状态
        this.error = true

        // 请求失败，loading也需要关闭
        this.loading = false
      }
    },

    async onRefresh () {
      // 请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now()// 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        })
        // 将数据追加到列表顶部
        const { results } = data.data
        this.list.unshift(...results)
        // 关闭下拉刷新的loading状态
        this.isreFreshLoading = false

        // 更新下拉刷新成功提示的文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        // 关闭下拉刷新的loading状态
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .article-list {
        //视口单位，相当于当前视口的百分之一
        height: 79vh;
        overflow-y: auto;
    }
</style>
