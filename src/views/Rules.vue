<template>
  <div class="warp">
    <!-- <div class="toast"> -->
      <!-- 我是弹窗{{$attrs.rData.num}} -->
    <!-- </div> -->
    <!-- <div class="btn" @click="$emit('onSuccess','Ok')">确认</div> -->
    <!-- <div class="close" @click="$emit('onCancel','Fail')">X</div> -->
    <!-- <div class="button" v-waves.light="{color:'green'}">水波纹</div> -->
  
      <div class="breath">

      </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  mounted() { },
  methods: {},
};
</script>
<style lang="scss" scoped>
.toast {
  width: 300px;
  height: 300px;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 4px;
}

.btn{
  width: 120px;
  text-align: center;
  padding: 2px 0;
  color: #fff;
  font-size: 22px;
  border: 1px solid #fff;
  border-radius: 4px;
  margin:20px auto 0;
}

.close {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  font-size: 24px;
  color: #fff;
  border: 1px solid #fff;
  margin: 10px auto;
}

.button {
  width: 240px;
  height: 45px;
  line-height: 45px;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 0 10px #ddd;
  background: #2196f3 !important;
  color: #000;
  margin: 200px auto 0;
  font-size: 2em;
  user-select: none;
  transition: all 0.2s ease-out;
}


.breath{
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #2196f3;
  background-blend-mode: multiply;

  animation: hue-rotate 8s linear infinite;

  &::before{
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: radial-gradient(rgba(255,0,0,.75), transparent, transparent);
  }
  &::after{
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(rgba(255,0,0,.75), transparent, transparent);
  }

  @keyframes hue-rotate {
    from{
      filter: hue-rotate(0deg);
    }
    to{
      filter: hue-rotate(360deg);
    }
  }
}
</style>