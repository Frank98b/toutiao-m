<template>
    <div class="update-birthday">
        <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="$emit('close')"
        @confirm="onConfirm"
        />
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value: {
        type: String,
        required: true
    }
  },
  data () {
    return {
        minDate: new Date(1970, 0, 1),
        maxDate: new Date(),
        currentDate: new Date(this.value),
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
            const currenDate = dayjs(this.currentDate).format('YYYY-MM-DD')

            await updateUserProfile({
                birthday: currenDate
            })

            //更新视图
            this.$emit('input', currenDate)

            //关闭弹层
            this.$emit('close')

            //提示成功
            this.$toast('更新成功')
            // console.log(data)
        } catch (err) {
            this.$toast('更新失败')
        }
    }
  },
}
</script>

<style lang="less" scoped>
</style>