<template>
    <div class="cpm-mask" :style="{ backgroundColor: maskBgColor }">
      <div class="cpm_popup cpm_popup_in" v-fixed>
        <component :is="componentTag" v-bind="$attrs" :rData="rData" @onSuccess="onSuccess" @onCancel="onCancel" />
      </div>
    </div>
  </template>
  
  <script>
  /**
   * 1.使用方法
   * this.vshow(String/Object)  //预留了String类型，目前未使用
   * 传入的需要页面展示的数据放在rData对象中，hasType为不同类型弹窗标识
   * 2.接受参数
   * 接受参数：String,Object
   * Object:
   *    1.hasType:各组件标识
   *    2.maskBgColor:蒙层背景色（已默认可不传）
   *    3.rData:相关数据信息
   *    4.onSuccess:成功回调
   *    5.onSuccess:关闭回调 
   * 调用事例:
   * this.vshow({
   *    hastype:<type>,
   *    rData:<object>,
   *    onSuccess:<fn(参数)>,
   *    onCancel:<fn(参数)>
   * })
   * 
   * tip:
   * 1.各组件按照vue的$emit方法调用onSuccess，onCancel方法 
   * 2.可根据不用的业务需求传入自定义的参数判断执行不用的逻辑
   * */
  export default {
    components: {
      Rules
    },
    props: {
      hasType: {
        type: Number,
        default: 0
      },
      maskBgColor: {
        type: String,
        default: "rgba(0,0,0,.85)"
      },
      rData: {
        type: Object,
        default: () => { //定义默认的对象数据
          return {
          }
        },
      }
    },
    directives: {
      fixed: {
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
          document.body.scrollTop = document.documentElement.scrollTop =
            -parseInt(top);
          body.style.top = "";
          body.style.overflow = "initial";
        },
      },
    },
    data() {
      return {
        popupShow: false,
        resolve: "",
        reject: "",
        promise: null,
        componentTag: ""  //动态组件
      };
    },
    mounted() {
      this.$nextTick(() => {
          this.componentTag = {
            // 0:""
          }[this.hasType]
      })
    },
    methods: {
      onCancel() {
        this.popupShow = false;
        this.reject()
        this.destroy();
      },
      onSuccess() {
        this.popupShow = false;
        this.resolve()
        this.destroy();
      },
      vshow() {
        this.popupShow = true;
        this.promise = new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        })
        return this.promise;
      },
      destroy() {
        setTimeout(() => {
          this.$destroy();
          document.body.removeChild(this.$el);
        }, 100)
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .cpm-mask {
    position: fixed;
    z-index: 99;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .cpm_popup_in {
    animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }
  
  .cpm_popup_out {
    animation: fade-out 1s ease-out both;
  }
  
  // 进入动画效果
  @keyframes scale-in-center {
    0% {
      transform: scale(0);
      opacity: 1;
    }
  
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  </style>