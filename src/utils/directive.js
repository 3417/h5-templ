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
// 使用 :v-debounce="{fn:()=>{<handFn>},event:'click',delay:200}"
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
// 使用 :v-throttle="{fn:()=>{<handFn>},event:'input',delay:200}"
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
// v-clickOutSide 默认 判断组件中的isShow变量值，可以自定义传参
const clickOutSide = {
  bind(el, binding, vnode) {
    function clickHandler(e) {
      if (el.contains(e.target)) {
        return false;
      } else {
        switch(binding.value){
          // case 'iShow':
          //   vnode.context.isShow ? vnode.context.isShow = false :''
          //   break;
          default:
            vnode.context.isShow ? vnode.context.isShow = false :''
            break;  
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
// 使用v-h5drag 携带：animation则有动画=>v-h5drag:animation
const h5drag = {
  bind: function (el, binding, vnode) {
    let isDrag = true, tempX = 0, x = 0, tempY = 0, y = 0, endX = 0;
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
        const { width } = window.screen;
        const { left } = window.getComputedStyle(el);
        let px = left.match(/\d+/)[0];
        let lft = (px < width / 2) ? 0 : left;
        el.style.left = (Math.floor(document.documentElement.clientWidth / 2) > endX + (el.clientWidth / 2)) ? lft : (document.documentElement.clientWidth - el.clientWidth) + 'px'
        el.style.transition = "all .18s linear";
      }
      isDrag = false;
    };
  }
}

// 生成防删除的水印,使用v-waterMark="{container:'xxx',....}"
const waterMark = {
  bind(el, binding, vnode) {
    let scale = window.screen.width / 375;  //根据设计图变换
    const _define = {
      container: el,  //不传使用指令绑定的DOM
      width: `${(80 * scale).toFixed(2)}px`, //默认100px
      height: `${(80 * scale).toFixed(2)}px`,
      textAlign: 'center',
      verticalAlign: 'center',
      font: '18px Microsoft Yahei', //字体样式
      fillStyle: 'rgba(100,100,100,.2)', //水印颜色
      content: '机密', //水印文字
      rotate: -14 //旋转角度
    };
    const props =  Object.assign(_define, binding.value)
    const { container, width, height, textAlign, verticalAlign, font, fillStyle, content, rotate } = props;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    ctx.textAlign = textAlign;
    ctx.verticalAlign = verticalAlign;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 100 * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
    const base64Url = canvas.toDataURL('image/png', .92);
    const _wm = document.querySelector('._wm');
    const watermarkDiv = _wm || document.createElement('div');
    const styleStr = `
      width:100%;
      height:100%;
      position:absolute;
      top:0;
      left:0;
      background:url(${base64Url});
      pointer-events:none;
    `
    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add('_wm');
    if (!_wm) {
      container.style.position = 'relative';
      container.insertBefore(watermarkDiv, container.firstChild);
    }
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    if (MutationObserver) {
      let observer = new MutationObserver(() => {
        const _wm = document.querySelector('._wm');
        if ((_wm && _wm.getAttribute('style') !== styleStr) || !_wm) {
          observer.disconnect();
          observer = null;
          watermark(props);
        }
      })
      observer.observe(container, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      })
    }
  }
}

// 倒计时 v-countdown[30]="{fn:<fn>,msg}",组件中的fn方法需要使用promise返回值
const countdown = {
  inserted(el, binding, vnode) {
    console.log(el,binding,vnode);
    let flag = false, that = vnode.context;  //that为当前组件的this
    el.onclick = async function () {
      let getMsg = await binding.value.fn();
      console.log(getMsg,flag)
      if(!getMsg || flag){return};
      flag = true;
      let i = binding.arg || 60;  //获取倒计时 时间
      el.innerHTML = i + 's';
      vnode.elm.style = 'filter:grayscale(1);pointer-events:none';
      let t = setInterval(() => {
        if (i < 1) {
          clearInterval(t);
          flag = false;
          el.innerHTML = binding.value.msg;
          vnode.elm.style = 'filter:grayscale(0);pointer-events:auto';
          return;
        };
        i--;
        el.innerHTML = i + 's';
      }, 1000)
    }
  }
}

const Plugin = {
  fixed,
  eruda,
  clog,
  debounce,
  throttle,
  clickOutSide,
  h5drag,
  waterMark,
  countdown
}

export default (app) => {
  Object.keys(Plugin).forEach(item => {
    app.directive(item, Plugin[item]);
  })
}
