<template>
    <div class="my-container">
      <!-- 已登录头部 -->
      <div v-if="user" class="header user-info">
        <div class="base-info">
          <div class="left">
            <van-image
            class="avatar"
              :src="userInfo.photo"
            round
            fit="cover"
            />
            <span class="name">{{userInfo.name}}</span>
          </div>
          <div class="right">
            <van-button 
            size="mini" 
            round
            to="/user/profile"
            >编辑资料</van-button>
          </div>
        </div>
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
      <!-- 已登录头部 -->

      <!-- 未登录头部 -->
      <div v-else class="header not-login">
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="">
          <span class="text">登录 / 注册</span>
        </div>
      </div>
      <!-- 未登录头部 -->
      <!-- 导航 -->
      <van-grid class="grid-nav" :column-num="2" clickable>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao ning-shoucang"></i>
          <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
          <i slot="icon" class="toutiao ning-lishi"></i>
          <span slot="text" class="text">历史</span>
        </van-grid-item>
      </van-grid>
      <!-- 导航 -->

      <!-- 消息通知，小智同学，退出登录 -->
      <van-cell title="消息通知" is-link></van-cell>
      <van-cell title="小智同学" is-link></van-cell>
      <van-cell v-if="user" title="退出登录" clickable class="back-btn" @click="onLogout"></van-cell>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {}// 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      // 退出提示
      // 在组件中需要使用this.$dialog来调用用弹窗组件
      // 确认退出
      this.$dialog.confirm({
        title: '你确定要退出登录吗？'
      }).then(() => {
        // 点确认执行
        // console.log('1')
        // 确认退出，清除登录状态（清除容器中的user和本地存储中的user）
        this.$store.commit('setUser', null)
      }).catch(() => {
        // 点取消执行
        // console.log('2')
      })
    },

    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 1px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
  }
  .data-stats {
    display: flex;
    .data-item {
      height: 130px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .ning-shoucang {
        color: #eb5253;
      }
      .ning-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .back-btn {
    color: #d86262;
    text-align: center;
    margin-top: 9px;
  }
}
</style>
