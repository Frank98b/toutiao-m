<template>
<div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />

    <!-- 标签导航栏 -->
    <van-tabbar route class="layout-tabbar" v-model="active" active-color="#232333" inactive-color="#C0C0C0">

    <van-tabbar-item to="/home" icon="home-o">
     <i slot="icon" class="toutiao ning-shouye"></i>
     <span class="text">首页</span>
    </van-tabbar-item>

    <van-tabbar-item to="/q&a" icon="home-o">
     <i slot="icon" class="toutiao ning-wenda"></i>
     <span class="text">问答</span>
    </van-tabbar-item>

    <van-tabbar-item to="/video" icon="home-o">
     <i slot="icon" class="toutiao ning-shipin"></i>
     <span class="text">视频</span>
    </van-tabbar-item>

    <van-tabbar-item to="/my" icon="home-o">
     <i slot="icon" class="toutiao ning-wode"></i>
     <span class="text">{{ $store.state.user ? '我的' : '未登录'}}</span>
    </van-tabbar-item>

    </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.layout-container {
    .layout-tabbar {
        i.toutiao {
            font-size: 40px;
        }
        span.text {
            font-size: 20px;
        }
    }
}
</style>
