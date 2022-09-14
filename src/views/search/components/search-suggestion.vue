<template>
    <div class="search-suggestion">
      <van-cell 
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
      >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'

import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      //当searchText发生变化时会调用handler函数
        handler: debounce(function (value) {
        //debounce函数
        //参数1：一个函数
        //参数2：延迟时间，单位是毫秒
        //返回值：防抖之后的函数
        this.loadSearchSuggestions(value)
      }, 500),
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        // console.log(data)
        this.suggestions = data.data.options 
      } catch (err) {
        // console.log(err)
        this.$toast('请求失败，请稍后重试')
      }
    },
    highlight (text) {
      if(text){
        const highlightStr = `<span class='active'>${this.searchText}</span>`
        //正则表达式，如果需要根据数据变量动态的创建正则表达式，需要手动new RegExp
        //RegExp 正则表达式构造函数
        //参数1：匹配模式字符串，它会根据这个字符串创建正则对象
        //参数2：匹配模式，要写到字符串中
        const reg = new RegExp(this.searchText, 'gi')
        return text.replace(reg, highlightStr)
      } else {
        return//防止后台没有相匹配的数据，导致传入text为空时报错，添加判断，为空则直接return
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .search-suggestion {
    /deep/span.active {
      color: red;
    }
  }
</style>