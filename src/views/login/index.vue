<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
        <van-icon slot="left" name="cross" @click="$router.back()"/>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 登录组件 -->
    <van-form ref="loginForm" @submit="onSubmit">
    <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
    >
    <i slot="left-icon" class="toutiao ning-shouji"></i>
    </van-field>
    <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
    >
    <i slot="left-icon" class="toutiao ning-yanzhengma"></i>
    <template #button>
        <van-count-down v-if="isCountDownShow" :time="1000 * 3" format=" ss s" @finish="isCountDownShow = false"
        />
        <van-button v-else
        class="send-sms-btn"
        round
        size="large"
        type="default"
        native-type="button"
        @click="onSendSms"
        >发送验证码</van-button>
    </template>
    </van-field>
    <div class="login-btn-wrap">
        <van-button class="login-btn" round block type="info" native-type="submit">登录</van-button>
    </div>
    </van-form>
    <!-- 登录组件 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{ required: true, message: '验证码不正确' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
    // 获取表单数据
      const user = this.user
      // 表单验证
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁用背景点击
        duration: 0// 持续时间,默认为2000,为0则表示一直持续
      })
      // 提交表单数据
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // console.log('登录成功',res)
        // 登录成功，跳转回原来页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码不正确')
          // console.log('手机号或验证码不正确')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        // console.log('登录失败,请稍后重试',err)
        }
      }
      // 根据请求处理后续操作
    },

    async onSendSms () {
      // 验证手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 验证通过,显示倒计时
      this.isCountDownShow = true
      // 请求发送验证码
      try {
        const res = await sendSms(this.user.mobile)
        this.$toast('发送成功')
        console.log('发送成功', res)
      } catch (err) {
        // 发送失败,关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
          // console.log('失败',err)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
    .toutiao {
        font-size: 37px;
    }
}

.send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    color: #666;
    font-size: 22px;
    background-color: #ededed;
}

.login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
        background-color: #323233;
        border: none;
    }
}
</style>
