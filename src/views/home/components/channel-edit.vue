<template>
    <div class="channel-edit">
      <van-cell :border="false">
        <div slot="title" class="title-text">我的频道</div>
        <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{isEdit ? '完成' : '编辑'}}</van-button>
      </van-cell>
      <!-- 频道分类 -->
      <van-grid class="my-grid" :gutter="10">
        <van-grid-item @click="onMyChannelClick(channel, index)"
          class="grid-item" 
          v-for="(channel, index) in myChannels" :key="index" 
          >
          <van-icon 
          slot="icon" 
          name="clear"
          v-show="isEdit && !fixedChannels.includes(channel.id)"
          ></van-icon>
          <span class="text" :class="{ active: index === active }" slot="text">{{channel.name}}</span>
        </van-grid-item>
      </van-grid>

      <!-- 频道推荐-->
      <van-cell :border="false">
        <div slot="title" class="title-text">频道推荐</div>
      </van-cell>
      <!-- 频道分类 -->
      <van-grid class="recommend-grid" :gutter="10">
        <van-grid-item 
        class="grid-item" 
        v-for="(channel, index) in recommendChannels" 
        :key="index" 
        :text="channel.name" 
        icon="plus"
        @click="onAddChannel(channel)"
        />
      </van-grid>
      <!-- 频道推荐-->
    </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channels'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannels: [0],
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(channel => {
        //find遍历数组，找到满足条件的元素项
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        //如果我的频道中不包括该频道项，则收集到推荐频道中
        if(!ret) {
          channels.push(channel)
        }
      })
      //把计算结果返回
      return channels
    }
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {},
  methods: {
    async deleteChannel (channel) {
      try {
          if (this.user) {
          //已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          //未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)        
        }
      } catch (err) {
        console.log(err)
        this.$toast('操作失败，请稍后重试')
      }
    },

    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      }catch (err) {
        this.$toast('数据获取失败')
      }
    },

    async onAddChannel (channel) {
      this.myChannels.push(channel)
      //数据持久化处理
      if (this.user) {
        try {
          //已登录，把数据请求接口放到线上
          await addUserChannel({
            id: channel.id, //频道ID
            seq: this.myChannels.length //序号
          })
        } catch(err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
      //未登录，把数据存储到本地
      setItem('TOUTIAO_CHANNELS', this.myChannels)
      }


    },

    onMyChannelClick (channel, index) {
      // console.log(channel, index)
      if (this.isEdit) {
      if (this.fixedChannels.includes(channel.id)) {
        return//如果是固定频道则不删除
      }
      //编辑状态，执行删除频道
      if (index <= this.active) {
        this.$emit('update-active', this.active - 1, true)
      }
      // console.log('1')
      this.myChannels.splice(index, 1)

      //处理持久化
      this.deleteChannel(channel)
      } else {
      //非编辑状态，执行切换频道
      this.$emit('update-active', index, false)
      }
    },
  }
}
</script>

<style lang="less" scoped>
  .channel-edit {
    padding: 85px 0;

    .title-text {
      font-size: 32px;
      color: #333333;
    }

    .edit-btn {
      width: 104px;
      height: 48px;
      font-size: 26px;
      color: #f85959;
      border: 1px solid #f85959;
    }

    /deep/.grid-item {
      width: 160px;
      height: 86px;
      .van-grid-item__content {
        white-space: nowrap;
        background-color: #f4f5f6;
        .van-grid-item__text, .text {
          font-size: 28px;
          color: #222;
          margin-top: 0;
        }
        .active {
          color: red;
        }
        .van-grid-item__icon-wrapper{
          position: unset;
        }
      }
    }

    /deep/.my-grid {
      .grid-item {
        .van-icon-clear {
          position: absolute;
          right: -5px;
          top: -5px;
          font-size: 15px;
          // color: #cacaca;
          z-index: 2;
        }
      }
    }

    /deep/.recommend-grid {
      .grid-item {
        .van-grid-item__content {
          flex-direction: row;
          .van-icon-plus {
            font-size: 28px;
            margin-right: 6px;
          }
        }
      }
    }
  }
</style>