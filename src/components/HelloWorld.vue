<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
      <el-row :gutter="10"> 
        <div v-for='(item,index) in playerOptions' :key='index'>
          <el-col :span="24">
              <div class="grid-content bg-purple-light">
                <el-row>
                  <!-- <video-player  class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions[index]"
                  customEventName="changed"
                  @changed="playerStateChanged($event)"
                  ></video-player> -->
                  <video-player id = 'index' class="video-player vjs-custom-skin vjs-big-play-centered"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions[index]"
                  @changed="wzd($event)"
                  ></video-player>                  
                </el-row>
              </div>
          </el-col>
        </div>
      </el-row>
    
    <button @click="wzd"></button>
  </div>
</template>

<script>
// require styles
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
// const x2js = require('x2js')
import x2js from 'x2js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Maxto M3',
      videoInfos: [],
      playerOptions:[],
      videoOption : {
              playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: false, //如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: 'zh-CN',
              aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: '',
              // sources: [{
              //   src: 'http://0.0.0.0:8000/679a0c7eb9583bf6aaf04d4121ce789b.mp4',  // 路径
              //   type: 'video/mp4'  // 类型
              // }, {
              //   src: 'http://vjs.zencdn.net/v/oceans.mp4',
              //   type: 'video/mp4'
              // }],
              // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg", //你的封面地址
              // width: document.documentElement.clientWidth,
              notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
              }
        }
    }    
  },
    mounted() {
      this.getVideo()
      var x2json = new x2js()
      var xmlText = "<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>";
      var jsonObj =  x2json.xml2js( xmlText )
      console.log('jsonobg ',jsonObj)
      console.log('this is current player instance object', this.videoPlayer)
      setTimeout(() => {
        console.log('dynamic change options')
      }, 1000)
    },  
  components: {
    videoPlayer
  },
  methods:{
    playerStateChanged(playerCurrentState){
      console.log('event info is ',playerCurrentState)
    },
    wzd(playevent){
      console.log('clicked wzd ')
    },
    getVideo(){
      this.axios.get('http://0.0.0.0:8000/%E4%B8%8B%E8%BD%BD.xml')
      // this.axios.get('/?custom=1&cmd=3015')
      .then( res => {
          console.log("right is ",res)
          var x2json = new x2js()
          var jsondata =  x2json.xml2js( res.data )
          // console.log(JSON.stringify(jsondata.LIST.ALLFile))
          for (let index = 0; index < jsondata.LIST.ALLFile.length; index++) {
            const element = jsondata.LIST.ALLFile[index].File;
            console.log(element)
            var videoinfo = {'videoname':element.NAME,'path':element.FPATH.split(':')[1],'time':element.TIME}
            var serurl = 'http://192.168.1.254'
            var videoplayerinfo = this.getplayerinfo()
            videoplayerinfo['sources'] = {'type':'video/mp4','src':serurl+element.FPATH.split(':')[1],'videoname':element.NAME}
            this.playerOptions.push(videoplayerinfo)
          }
          //test
          var vidtestinfo = this.getplayerinfo()
          vidtestinfo['sources'] = {'type':'video/mp4','src':'http://localhost:8000/679a0c7eb9583bf6aaf04d4121ce789b.mp4','videoname':'M3蓝牙耳机'}
          this.playerOptions.push(vidtestinfo)
          console.log(JSON.stringify(this.playerOptions))
        }
      ).catch( res => {
        console.log("error is ",res)
      })
    },
    getplayerinfo() {
      return {
              playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: false, //如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
              language: 'zh-CN',
              aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
              fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
              sources: '',
              // sources: [{
              //   src: 'http://0.0.0.0:8000/679a0c7eb9583bf6aaf04d4121ce789b.mp4',  // 路径
              //   type: 'video/mp4'  // 类型
              // }, {
              //   src: 'http://vjs.zencdn.net/v/oceans.mp4',
              //   type: 'video/mp4'
              // }],
              // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg", //你的封面地址
              // width: document.documentElement.clientWidth,
              notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
              controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
              }
        }   
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
