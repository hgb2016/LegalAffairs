<template>
    <div class="share">
        <p>请点击右上角，将它发送给指定朋友或分享到朋友圈</p>
        <span></span>
        <strong @click="close">我知道了</strong>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("ievent", false);
    }
  }
};
</script>
<style lang='less'>
.share {
  background: #000;
  opacity: 0.67;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 9991;
  p {
    color: #fff;
    font-size: 16px;
    width: 155px;
    height: 100px;
    text-align: center;
    position: absolute;
    right: 45px;
    top: 100px;
  }
  span {
    position: absolute;
    top: 40px;
    right: 20px;
    width: 100px;
    height: 50px;
    background: url(../assets/img/shareArrow.png) no-repeat;
    background-size: contain;
  }
  strong {
    position: absolute;
    top: 200px;
    right: 83px;
    color: #fff;
    border: 1px solid #fff;
    padding: 6px;
    border-radius: 5px;
  }
}
</style>

