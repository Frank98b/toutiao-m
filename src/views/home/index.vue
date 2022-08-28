<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed>
        <van-button
        class="search-btn"
        slot="title"
        type="info"
        round
        icon="like-o">
          搜索
        </van-button>
      </van-nav-bar>
      <!-- 导航栏 -->

      <!-- 频道列表 -->
      <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
      <!-- 通过 animated 属性可以开启切换标签内容时的转场动画。 -->
      <!-- 通过 swipeable 属性可以开启滑动切换标签页。 -->
      <van-tabs v-model="active" animated swipeable class="channel-tabs">
        <van-tab
        v-for="channel in channels" :key="channel.id"
        :title="channel.name">
        <!-- 文章列表 -->
        <article-list :channel="channel" />
        <!-- 文章列表 -->
        </van-tab>
        <div slot="nav-right" class="placeholder"></div>
        <div slot="nav-right" class="hamburger-btn">
          <i class="toutiao ning-gengduo" ></i>
        </div>
      </van-tabs>
      <!-- 频道列表 -->
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
        // console.log(data)
      } catch (err) {
        this.$toast('获取频道失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  //

/deep/ .van-nav-bar__content {
    .van-nav-bar__title {
      display:block;
      max-width: unset;
    }
  }

  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #555;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
/deep/  .channel-tabs {
  .van-tabs__wrap{
    position: fixed;
    top: 94px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
      min-width: 200px;
      // height: 82px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #232333;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.9;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
  }
}
</style>
