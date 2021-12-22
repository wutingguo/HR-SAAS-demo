<template>
  <button class="hm-button" @click="clickFn">按钮</button>
</template>

<script>
export default {
  methods: {
    clickFn() {
      // 通知父组件, 触发click自定义事件
      this.$emit('click')
    }
  }
}
</script>

<style>
.hm-button {
  width: 100px;
  height: 30px;
  border-radius: 15px;
  background-color: #8df;
  border: 0;
}
</style>
