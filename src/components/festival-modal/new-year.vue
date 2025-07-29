<template>
  <div class="wrap" v-if="open">

    <canvas ref="canvas" class="canvas"></canvas>
    <img class="backbg" src="../../assets/ny1.jpg" alt="">
    <audio ref="audio" autoplay  style="position: absolute; z-index: 3;">
      <source src="../../assets/jinggebei.mp3"/>
    </audio>

    <span class="play-btn" @click="playAudio">
       <img src="https://img.soogif.com/Ny5Ky1FDdZpDEJEpY89CO3hGpIoa9kN6.gif" alt="" >
    </span>
    <span class="close" @click="closeDialog">
     <CloseCircleFilled />
    </span>
<!--    <div class="con1"><span style="display: block">签约签到手发软</span></div>
    <div class="right"><span style="display: block">数钱数到手抽筋</span></div>
    <div class="con2"><span>根本停不下来</span></div>-->
    <div class="dep">开发部祝全体同仁新年快乐！每天都是好日子！<img src="https://n.sinaimg.cn/hb/gif_image/400/w200h200/20180821/zH7c-hhzsnea3127985.gif" alt=""></div>

    <!--      <img :src="imgList[0]" alt="" class="sdimg1">
          <img :src="imgList[1]" alt="" class="sdimg2">
          <img :src="imgList[0]" alt="" class="sdimg3">
          <img :src="imgList[2]" alt="" class="sdimg4">
          <img :src="imgList[5]" alt="" class="sdimg5">
          <img :src="imgList[6]" alt="" class="sdimg6">-->
  </div>
</template>

<script>
class Snowflake {
  constructor(x, y, speed, radius) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
  }
  update() {
    this.y += this.speed;
    if (this.y > window.innerHeight) {
      this.y = -this.radius;
    }
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }
}

export default {

  name: "NewYear",
  created() {},
  data() {
    return {
      open: false,
      snowflakes: [],
      imgList: [
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F8773640%2Ff92891a48c1e4b348bb76f9addc50c05.gif%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvODc3MzY0MC9mOTI4OTFhNDhjMWU0YjM0OGJiNzZmOWFkZGM1MGMwNS5naWY%3D%2Fsign%2F603d0893f794e63b5d3befab8740db53.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706247946&t=dc2d994933557e773f599017e62ef9fd',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F79216279%2F3d2821939bd4029e2e8a5b6a770de576.gif%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNzkyMTYyNzkvM2QyODIxOTM5YmQ0MDI5ZTJlOGE1YjZhNzcwZGU1NzYuZ2lm%2Fsign%2F7550102f982c65941d30716448b6d723.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706248619&t=184967ce2cc81981f8114b879746769c',
        'https://img.zcool.cn/community/0195cd568f2eeb6ac725af2323ea2a.gif',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F66676783%2F73e2a6c6faae0216063ed2d3b041cc6e.gif%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNjY2NzY3ODMvNzNlMmE2YzZmYWFlMDIxNjA2M2VkMmQzYjA0MWNjNmUuZ2lm%2Fsign%2F6759bcc400de1a68aa3b9a44fd9cc368.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1705892827&t=834d5e9c7cf8116f7b1e521e13ba0aeb',
        'https://uploadfile.bizhizu.cn/up/93/3a/cf/933acf27085f05773b41da2da8385ddd.jpg.source.jpg',
        'https://file2.rrxh5.cc/2017/01/11/1484098478926.gif',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage109.360doc.com%2FDownloadImg%2F2019%2F01%2F0116%2F151003079_9_20190101043858310&refer=http%3A%2F%2Fimage109.360doc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1706249573&t=bbe9af84122042a2b64b33cad14c8aab'
      ],

    };
  },
  mounted(){
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
    this.animate()
  },
  props: {},
  wactch:{
    open: function(v){
      const audio = this.$refs.audio
      if(!v){
        audio.pause()
      }
    }
  },
  methods: {
    closeDialog(){
      this.open = false
    },
    animate() {
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (Math.random() < 0.05) {
        const x = Math.random() * window.innerWidth;
        const y = -10;
        const speed = Math.random() * 3 + 1;
        const radius = Math.random() * 3 + 1;
        this.snowflakes.push(new Snowflake(x, y, speed, radius));
      }
      this.snowflakes.forEach((snowflake) => {
        snowflake.update();
        snowflake.draw(this.ctx);
      });
      requestAnimationFrame(this.animate);
    },
    playAudio(){
      const audio = this.$refs.audio

      if(audio.paused){
        audio.play()
      }else{
        audio.pause()
      }
    }
  },
};
</script>

<style lang="less" scoped>
.wrap{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  z-index: 9999999;
  canvas{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
}
.audioCtr{
  display: block;
  position: absolute;
  top: 30%;
  left: 20%;
  z-index: 3;
  color: #fff;
  .el-button{
    animation: rotatebtn 1s linear infinite;
  }
}
@keyframes rotatebtn{
  0%{transform:rotate(0deg)
  }
  100%{transform:rotate(360deg)
  }
}
.backbg{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.sdimg1{
  position: absolute;
  top: 15%;
  right: -150px;
}
.sdimg2{
  width: 600px;
  position: absolute;
  top: 5%;
  left: 35%;
}
.sdimg3{

  position: absolute;
  top: 15%;
  left: -150px;
}
.sdimg4{

  position: absolute;
  bottom: 10%;
  left: 5%;
}
.sdimg5{
  position: absolute;
  top: 45%;
  left: 25%;
}
.sdimg6{
  position: absolute;
  top: 45%;
  left: 60%;
}
.play-btn{

  position: absolute;
  top: 10%;
  left: 20%;
  z-index: 3;
  cursor: pointer;
  img{
    width: 150px;
  }
}
.close{
  position: absolute;
  top: 20px;
  right: 40px;
  z-index: 3;

    :deep(.anticon-close-circle){
      font-size: 40px;
      cursor: pointer;
    }

}
.con1{
  position: absolute;
  width: 200px;
  height: 0;
  top: 10%;
  left: 5%;
  background-color: #cc0018;
  border-radius: 10px;
  overflow: hidden;
  animation: expend 2s linear forwards;
  span{
    width: 60px;
    height: 100%;
    font-size: 60px;
    line-height: 1.5;
    display: block;
    margin: 0 auto;
    color: #000;
    padding: 10px 0;
    font-weight: bold;
  }
}
.right{
  position: absolute;
  width: 200px;
  height: 0;
  top: 10%;
  right: 5%;
  background-color: #cc0018;
  border-radius: 10px;
  overflow: hidden;
  animation: expend 2s linear forwards;
  animation-delay: 2s;
  span{
    width: 60px;
    height: 100%;
    font-size: 60px;
    display: block;
    margin: 0 auto;
    line-height: 1.5;
    color: #000;
    padding: 10px 0;
    font-weight: bold;
  }
}
.con2{
  width: 600px;
  text-align: center;
  height: 0;
  position: absolute;
  top: 3%;
  left: 34%;
  background-color: #cc0018;
  text-align: center;
  font-size: 50px;
  color: #000;
  font-weight: bold;
  line-height: 100px;
  letter-spacing: 10px;
  border-radius: 10px;
  overflow: hidden;
  animation: expend1 1s linear forwards;
  animation-delay: 4s;
  span{
    letter-spacing: 15px;
  }
}
@keyframes  expend{
  0%{
    height: 0;
  }
  100%{
    height: 650px;
  }
}
@keyframes  expend1{
  0%{
    height: 0;
  }
  100%{
    height: 100px;
  }
}
@keyframes  expendwidth{
  0%{
    width: 0;
    color: transparent;
  }
  100%{
    width:400px;
    color: #fff;
  }
}
.dep{
  position: absolute;
  width: 100%;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  bottom: 30px;
  font-size: 40px;
  font-weight: bold;
  color: transparent;
  text-align: center;
}
</style>
