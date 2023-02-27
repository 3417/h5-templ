const fixed = {
  inserted() {
    let scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText +=
      "position:fixed;overflow:hidden;width:100%;top:-" + scrollTop + "px;";
  },
  unbind() {
    let body = document.body;
    body.style.position = "";
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
    body.style.top = "";
    body.style.overflow = "initial";
  },
}

const eruda = {
  inserted(el, binding, vnode) {
    const setEruda = () => {
      binding.value--;
      if (window.eruda) { return };
      if (binding.value === 0) {
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function () {
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            window.eruda && window.eruda.init();
          }
        };
        script.src = '//cdn.bootcss.com/eruda/1.2.4/eruda.min.js';
        head.appendChild(script);
      }
    }
    el.addEventListener("click", setEruda, false);
  }
}

const clog = {
  inserted(el, binding, vnode) {
    const setConsole = () => {
      binding.value--;
      if (window.VConsole) { return };
      if (binding.value === 0) {
        let head = document.getElementsByTagName('head')[0];
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function () {
          if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
            window.VConsole && new window.VConsole();
          }
        };
        script.src = '//unpkg.com/vconsole@latest/dist/vconsole.min.js';
        head.appendChild(script);
      }
    }
    el.addEventListener("click", setConsole, false);
  }
}
// 使用 :v-debounce="{fn:<handFn>,event:'click',delay:200}"
const debounce = {
  inserted(el, binding) {
    if (typeof binding.value.fn !== 'function' || !binding.value.event) return
    let delay = 200;
    el.timer = null;
    el.handler = function () {
      if (el.timer) {
        clearTimeout(el.timer);
        el.timer = null;
      }
      el.timer = setTimeout(() => {
        binding.value.fn.apply(this, arguments);
        el.timer = null;
      }, binding.value.delay || delay);
    }
    el.addEventListener(binding.value.event, el.handler)
  },
  // 元素卸载的时候清理定时器移除监听事件
  unbind(el, binding) {
    if (el.timer) {
      clearTimeout(el.timer);
      el.timer = null;
    }
    el.removeEventListener(binding.value.event, el.handler);
  }
}
// 使用 :v-throttle="{fn:<handFn>,event:'input',delay:200}"
const throttle = {
  inserted(el, binding) {
    if (typeof binding.value.fn !== 'function' || !binding.value.event) return;
    let delay = 200;
    el.timer = null;
    el.handler = function () {
      if (el.timer) return;
      el.timer = setTimeout(() => {
        if (el.timer) return;
        binding.value.fn.apply(this, arguments);
        el.timer = null;
      }, binding.value.delay || delay);
    }
    el.addEventListener(binding.value.event, el.handler);
  },
  unbind(el, binding) {
    if (el.timer) {
      clearTimeout(el.timer)
    }
    el.removeEventListener(binding.value.event, el.handler);
  }
}
// v-clickOutSide
const clickOutSide = {
  bind(el, binding, vnode) {
    function clickHandler(e) {
      if (el.contains(e.target)) {
        return false;
      } else {
        if (vnode.context.isShow) {
          vnode.context.isShow = false;  //data定义的参数
        }
      }
    }
    el.__vueClickOutSide = clickHandler;
    document.addEventListener("click", clickHandler);
  },
  unbind(el, binding) {
    document.removeEventListener("click", el.__vueClickOutSide);
    delete el.__vueClickOutSide;
  },
}
// 使用v-h5drag 携带：animation则有动画
const h5drag = {
  bind: function (el, binding) {
    let isDrag = true;
    let tempX = 0;
    let x = 0;
    let tempY = 0;
    let y = 0;
    let endX = 0;
    el.style.position = "absolute";
    el.ontouchstart = e => {
      isDrag = true;
      tempX = parseInt(el.style.left + 0);
      tempY = parseInt(el.style.top + 0);
      // 获取当前移动模块的位置
      x = e.touches[0].pageX;
      y = e.touches[0].pageY;
      el.style.transition = "none";
    };

    el.ontouchmove = e => {
      if (isDrag) {
        let curX, curY;
        curX = e.touches[0].pageX - (el.offsetWidth / 2);
        curY = e.touches[0].pageY - (el.offsetHeight / 2);
        // curX = tempX + e.touches[0].pageX - x;
        // curY = tempY + e.touches[0].pageY - y;
        // let height = document.documentElement.clientHeight;
        let height = document.documentElement.clientHeight >= document.body.scrollHeight ? document.documentElement.clientHeight : document.body.scrollHeight
        if (binding.value) {
          height = el.parentElement.clientHeight;
        }
        let clientWidth = document.documentElement.clientWidth - el.clientWidth - 2;
        let clientHeight = height - el.clientHeight - 2;
        //边界判断
        curX = curX < 0 ? 0 : curX;
        curY = curY < 0 ? 0 : curY;
        curX = curX < clientWidth ? curX : clientWidth;
        curY = curY < clientHeight ? curY : clientHeight;
        endX = curX;
        // 定位位于左侧移动
        el.style.left = curX + "px";
        el.style.top = curY + "px";
        //阻止浏览器继续处理触摸(和鼠标)事件。
        e.preventDefault();
      }
    };
    el.ontouchend = e => {
      if (binding.arg === 'animation') {
        el.style.left = (Math.floor(document.documentElement.clientWidth / 2) > endX + (el.clientWidth / 2)) ? 0 : (document.documentElement.clientWidth - el.clientWidth) + 'px'
        el.style.transition = "all .18s linear";
      }
      isDrag = false;
    };
  }
}

const Plugin = {
  fixed,
  eruda,
  clog,
  debounce,
  throttle,
  clickOutSide,
  h5drag
}

export default (app) => {
  Object.keys(Plugin).forEach(item => {
    app.directive(item, Plugin[item]);
  })
}
