// 注册自定义指令封装在这
export const defImg = {
  // 对象里有一个重要的钩子函数 inserted 有两个参数,第一个 el ,指令所在的元素,第二个,binding指令的信息对象
  inserted(el, binding) {
    // 触发时机: 指令所在的dom元素插入页面中的时候
    // console.log(binding, el)
    // img标签有一个error的事件,需要图片不能正常展示才能触发
    el.onerror = function() {
      // binding.value 指令的值 就是指令等于号后面的值
      el.src = binding.value
    }
  }
}

// 封装的一个改变颜色的指令
export const color = {
  inserted(el, binding) {
    el.style.color = binding.value
  }
}
