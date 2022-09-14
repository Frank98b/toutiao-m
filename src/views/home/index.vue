<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed>
        <van-button
        class="search-btn"
        slot="title"
        type="info"
        round
        icon="like-o"
        to="/search"
        >
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
        <div slot="nav-right" class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao ning-gengduo" ></i>
        </div>
      </van-tabs>
      <!-- 频道列表 -->

      <!-- 频道列表弹出层 -->
      <van-popup
        v-model="isChannelEditShow"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
      <channel-edit 
      :my-channels="channels"
      :active="active"
      @update-active="onUpdateActive"
       />
      </van-popup>
      <!-- 频道列表弹出层 -->
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'

export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      isChannelEditShow: false,
      active: 0,
      channels: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        // const { data } = await getUserChannels()
        // this.channels = data.data.channels
        // console.log(data)
        let channels = []

        if (this.user) {
        //   //已登录，请求获取用户频道列表
          const  { data } = await getUserChannels()
          channels = data.data.channels
        } else {
        //   //未登录，判断是否有本地的频道列表数据
          const localChannels = getItem ('TOUTIAO_CHANNELS')
        //   //有，拿来使用
          if (localChannels) {
            channels = localChannels
          } else {
        //     //没有，请求获取默认频道列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    onUpdateActive (index, defaultValue = true) {
      // console.log('home',index);
      //更新激活的频道项
      this.active = index
      //关闭编辑频道弹层
      this.isChannelEditShow = defaultValue
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
