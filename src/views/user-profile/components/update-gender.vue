<template>
    <div class="updata-gender">
        <van-picker
            title="性别"
            show-toolbar
            :columns="columns"
            :default-index="value"
            @confirm="onConfirm"
            @cancel="$emit('close')"
            @change="onPickerChange"
        />
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
        type: Number,
        required: true
    }
  },
  data () {
    return {
        columns: ['男', '女'],
        localGender: this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm () {
        this.$toast.loading({
            message: '保存中......',
            forbidClick: true,//禁止背景点击
            duration: 0//持续展示
        })
        try {
            await updateUserProfile({
                gender: this.localGender
            })

            //更新视图
            this.$emit('input', this.localGender)

            //关闭弹层
            this.$emit('close')

            //提示成功
            this.$toast('更新成功')
            // console.log(data)
        } catch (err) {
            this.$toast('更新失败')
            console.log(err)
        }
    },

    onPickerChange (picker, value, index) {
        this.localGender = index
    }
  },
}
</script>

<style lang="less" scoped>
</style>