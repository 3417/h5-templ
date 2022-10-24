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
        script.src = '//cdn.jsdelivr.net/npm/eruda';
        head.appendChild(script);
      }
    }
    el.addEventListener("click", setEruda,false);
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
    el.addEventListener("click", setConsole,false);
  }
}

const Plugin = {
  fixed,
  eruda,
  clog
}

export default (app) => {
  Object.keys(Plugin).forEach(item => {
    app.directive(item, Plugin[item]);
  })
}
