<template>
    <div class="update-photo">
        <img :src="img" class="img" ref="img">

        <div class="toolbar">
            <div class="cancel" @click="$emit('close')">取消</div>
            <div class="confirm" @click="onConfirm">完成</div>
        </div>
    </div>
</template>

<script>
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';
import { updateUserPhoto } from '@/api/user'

export default {
  name: 'UpdatePhoto',
  components: {},
  props: {
    img: {
        type: [String, Object],
        required: true
    }
  },
  data () {
    return {
        cropper: null
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'move',
        aspectRatio: 1,
        autoCropArea: 1,
        cropBoxMovable: false,
        cropBoxResizable: false,
        background: false
    })
    // console.log(cropper)
  },
  methods: {
    onConfirm () {
        //基于服务端的裁切使用getData方法获取裁切参数
        //console.log(this.cropper.getData())
        //纯客户端的裁切使用getCroppedCanvas获取裁切的文件对象
        this.cropper.getCroppedCanvas().toBlob( blob => {
            this.updateUserPhoto(blob)
        })
    },
    
    async updateUserPhoto (blob) {
        try {
        this.$toast.loading({
        message: '保存中......',
        forbidClick: true,//禁止背景点击
        duration: 0//持续展示
        })
        //如果接口要求Content-Type是application/json，则传普通JavaScript对象
        //updateUserPhoto({
        //    photo：blob
        //})
        //如果接口要求Content-Type是multipart/form-data，则必须传递FormData对象
        
        const formData = new FormData()
        formData.append('photo', blob)
        
        const { data } = await updateUserPhoto(formData)
        // console.log(data)
        //关闭弹出层
        this.$emit('close')
        //更新视图
        this.$emit('update-photo', data.data.photo)
        //提示chengg
        this.$toast('头像修改成功')
        } catch (err) {
            console.log(err)
            this.$toast('更新失败,请重试')
        }
    },
  },
}
</script>

<style lang="less" scoped>
    .update-photo {
        background-color: #000;
        height: 100%;
        .toolbar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            .cancel, .confirm {
                width: 90px;
                height: 90px;
                font-size: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
            }
        }
    }

    .img {
        display: block;
        max-width: 100%;
    }
</style>