<template>
  <div class="cpm-mask" :style="{ backgroundColor: maskBgColor }">
    <div
      class="cpm_popup cpm_popup_in"
      :class="{ cpm_popup_out: !popupShow }"
      v-fixed
    >
      <component
        :is="componenTag"
        v-bind="$attrs"
        :rData="rData"
        @onSuccess="onSuccess"
        @onCancel="onCancel"
      />
    </div>
  </div>
</template>
  <script>
export default {
  props: {
    componenTag: {
      type: Object,
      default: "",
    },
    maskBgColor: {
      type: String,
      default: "rgba(0,0,0,.85)",
    },
    rData: {
      type: Object,
      default: () => {
        //定义默认的对象数据
        return {};
      },
    },
    onSuccess:{
      type:Function,
      default:()=>{}
    },
    onCancel:{
      type:Function,
      default:()=>{}
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
      promise: null,
    };
  },
  methods: {
    vshow() {
      this.popupShow = true;
      this.promise = new Promise((resolve, reject) => {});
      return this.promise;
    },
    onClose() {
      this.popupShow = false;
      this.destory();
    },
    destory() {
      setTimeout(() => {
        this.$destroy();
        document.body.removeChild(this.$el);
      }, 280);
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
  animation: scale-in-center 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.cpm_popup_out {
  animation: fade-out 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
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
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>