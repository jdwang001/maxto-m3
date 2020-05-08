<template>
  <div class="hello">
    <!-- <el-avatar>user</el-avatar> -->
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的视频" name='myvideo'>
        <span slot="label"><i class="el-icon-video-camera"></i> 我的视频</span>
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
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="configmanage">
        <span slot="label"><i class="el-icon-s-tools"></i> 配置管理</span>
        <div style="text-align: left;">
          <div style="margin-top: 20px">
            <el-radio-group v-model="configInfo.phonesize" @change="setconfig">
              <el-radio-button label="照片质量" disabled></el-radio-button>
              <el-radio-button label="1002_0">12M</el-radio-button>
              <el-radio-button label="1002_1">10M</el-radio-button>
              <el-radio-button label="1002_2">8M</el-radio-button>
              <el-radio-button label="1002_3">5M</el-radio-button>
              <el-radio-button label="1002_4">3M</el-radio-button>
              <!-- <el-radio-button label="2MHD"></el-radio-button> -->
            </el-radio-group>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="configInfo.resolution" @change="setconfig">
              <el-radio-button label="分辨率" disabled></el-radio-button>
              <el-radio-button label="2002_0">1080P</el-radio-button>
              <el-radio-button label="2002_1">720P</el-radio-button>
              <el-radio-button label="2002_2">WVGA</el-radio-button>
            </el-radio-group>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="configInfo.looprecording" @change="setconfig">
              <el-radio-button label="循环录制" disabled></el-radio-button>
              <el-radio-button label="2003_0">OFF</el-radio-button>
              <el-radio-button label="2003_1">1MIN</el-radio-button>
              <el-radio-button label="2003_2">3MIN</el-radio-button>
              <el-radio-button label="2003_3">5MIN</el-radio-button> 
            </el-radio-group>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group>
              <el-radio-button label="WDR" disabled></el-radio-button>
            </el-radio-group>
            <el-switch v-model="configInfo.wdr" active-value='2004_1' inactive-value='2004_0' active-text="开"  @change="setconfig"></el-switch>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group>
              <el-radio-button label="曝光" disabled></el-radio-button>
            </el-radio-group>
            <!-- <el-input-number v-model="configInfo.exposure" :precision="2" :step-strictly=true :step="0.33" :min="-2" :max="2"></el-input-number> -->
            <el-select v-model="configInfo.exposure"  @change="setexposureconfig">
              <el-option
                v-for="item in configInfo.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group>
              <el-radio-button label="运动检测" disabled></el-radio-button>
            </el-radio-group>
            <el-switch v-model="configInfo.montiondetec"  active-value='2006_1' inactive-value='2006_0' @change="setconfig" active-text="开"></el-switch>
          </div>
          <div style="margin-top: 20px">
            <!-- <el-radio-group v-model="configInfo.looprecording"> -->
              <el-radio-button label="是否录音" disabled></el-radio-button>
            <!-- </el-radio-group> -->
            <el-switch v-model="configInfo.recordaudio" active-value='2007_1' inactive-value='2007_0' @change="setconfig" active-text="开"></el-switch>
          </div>
          <div style="margin-top: 20px">
            <!-- <el-radio-group v-model="configInfo.looprecording"> -->
              <el-radio-button label="视频添加时间" disabled></el-radio-button>
            <!-- </el-radio-group> -->
            <el-switch v-model="configInfo.datestamp" active-value='2008_1' inactive-value='2008_0' @change="setconfig" active-text="开"></el-switch>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="configInfo.gsensor">
              <el-radio-button label="碰撞灵敏度" disabled></el-radio-button>
              <el-radio-button label="2011_0">关</el-radio-button>
              <el-radio-button label="2011_1">低</el-radio-button>
              <el-radio-button label="2011_2">中</el-radio-button>
              <el-radio-button label="2011_3">高</el-radio-button>
              <!-- <el-radio-button label="2MHD"></el-radio-button> -->
            </el-radio-group>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="configInfo.tvmode">
              <el-radio-button label="电视模式" disabled></el-radio-button>
              <el-radio-button label="3009_0">NTSC</el-radio-button>
              <el-radio-button label="3009_1">PAL</el-radio-button>
            </el-radio-group>
          </div>
          <div style="margin-top: 20px">
            <el-radio-group v-model="configInfo.vidfre">
              <el-radio-button label="录制频率" disabled></el-radio-button>
              <el-radio-button label="8114_0">50HZ</el-radio-button>
              <el-radio-button label="8114_1">60HZ</el-radio-button>
            </el-radio-group>
          </div>                     
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- <button @click="wzd"></button> -->
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
      activeName: 'myvideo',
      msg: 'Maxto M3',
      timer: '',
      videoInfos: [],
      playerOptions:[],
      videoOption : {
              playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
              autoplay: false, //如果true,浏览器准备好时开始回放。
              muted: false, // 默认情况下将会消除任何音频。
              loop: false, // 导致视频一结束就重新开始。
              preload: 'metadata', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
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
      },
      cmdNum:{
        '1002' : 'phonesize',
        '2002' : 'resolution',
        '2003' : 'looprecording',
        '2004' : 'wdr',
        '2005' : 'exposure',
        '2006' : 'montiondetec',
        '2007' : 'recordaudio',
        '2008' : 'datestamp',
        '2011' : 'gsensor',
        '3009' : 'tvmode',
        '8114' : 'vidfre'
      },
      configInfo : {
        phonesize : '5M',
        resolution: '1080P',
        looprecording: '5MIN',
        wdr:true,
        montiondetec: true,
        recordaudio:true,
        datestamp: true,
        gsensor: '低',
        tvmode: 'NTSC',
        vidfre: '50HZ',
        options: [{
          value: 0,
          label: '+2.0'
        }, {
          value: 1,
          label: '+5/3'
        }, {
          value: 2,
          label: '+4/3'
        }, {
          value: 3,
          label: '+1.0'
        }, {
          value: 4,
          label: '+2/3'
        },{
          value: 5,
          label: '+1/3'
        }, {
          value: 6,
          label: '+0.0'
        }, {
          value: 7,
          label: '-1/3'
        }, {
          value: 8,
          label: '-2/3'
        }, {
          value: 9,
          label: '-1.0'
        },{
          value: 10,
          label: '-4/3'
        }, {
          value: 11,
          label: '-5/3'
        }, {
          value: 12,
          label: '-2.0'
        }],
        exposure:0,
        value: 5
      }
    }    
  },
  mounted() {
    this.getVideo()
    setTimeout(() => {
      console.log('dynamic change options')
    }, 1000)
    this.timer = setInterval(this.m3heartbeat,10000)
    // var wzd = setInterval(()=>{
    //   console.log(this.configInfo.wdr)
    // },1000)
  },
  beforeDestroy() {
      clearInterval(this.timer);
  },
  components: {
    videoPlayer
  },
  methods:{
    transformObject(keyArr,valueArr) {
      var obj = {}
      keyArr.map( (v,i) => {
          obj[keyArr[i]] = valueArr[i]
      })
      return obj
    },
    setexposureconfig(value){
        var setcofurl = '/?custom=1&cmd=' + 2004 + '&par=' + value
        this.axios.get(setcofurl)
        .then( res => {
            var x2json = new x2js()
            var jsondata = x2json.xml2js(res.data)
            console.log('----conf json data----', JSON.stringify(jsondata))       
          }
        ).catch( res => {
          console.log('set config errors are ', res)
        })
    },
    setconfig(value){
      console.log(value)
      // http://192.168.1.254/?custom=1&cmd=2001&par=1
      var cmdpar = value.split('_')
      var setcofurl = '/?custom=1&cmd=' + cmdpar[0] + '&par=' + cmdpar[1]
      console.log(cmdpar,setcofurl)
      this.axios.get(setcofurl)
      .then( res => {
          var x2json = new x2js()
          var jsondata = x2json.xml2js(res.data)
          console.log('----conf json data----', JSON.stringify(jsondata))       
        }
      ).catch( res => {
        console.log('set config errors are ', res)
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
      console.log("display table name",tab.name)
      if (tab.name == 'configmanage') {
        // this.getConfig()
        this.getsaveConfig()
      }
    },
    m3heartbeat(){
      // 感觉抓包的时候,这个显示的是心跳请求
      console.log('heartbeat is ok')
      this.axios.get('/?custom=1&cmd=3016')
    },
    playerStateChanged(playerCurrentState){
      console.log('event info is ',playerCurrentState)
    },
    wzd(playevent){
      console.log('clicked wzd ')
    },
    getsaveConfig(){
      this.axios.get('/?custom=1&cmd=3014')
      // this.axios.get('saveconfig.xml')
      .then( res => {
          var x2json = new x2js()
          var jsondata = x2json.xml2js(res.data)
          console.log('----conf json data----', JSON.stringify(jsondata))
          var configval = this.transformObject(jsondata.Function.Cmd,jsondata.Function.Status)
          console.log('configval is ',configval)
          console.log('---------------------')
          console.log( JSON.stringify(this.configInfo))
          for(var key in configval){
            // console.log(key,configval[key])

            if (key == '2005') {
              this.configInfo[this.cmdNum[key]] =  parseInt(configval[key])
              continue
            }
            this.configInfo[this.cmdNum[key]] = key+'_'+configval[key]
          }
          console.log( JSON.stringify(this.configInfo))
          // console.log('cmdnum is ',this.configInfo[this.cmdNum['1002']])
          console.log('---------------------')
        }
      ).catch( res => {
        console.log('getsave config errors are ', res)
      })
    },
    getConfig(){
      this.axios.get('/?custom=1&cmd=3031&str=all')
      // this.axios.get('config.xml')
      .then( res => {
          console.log('config is ',res)
          var x2json = new x2js()
          var jsondata = x2json.xml2js( res.data )
          console.log('----conf json data----', JSON.stringify(jsondata))
        }
      ).catch( res => {
        console.log('erros is ', res)
      })
    },
    getVideo(){
      // /Users/aurora/Desktop/下载.xml 文件 为本地保存的文件 便于调试 
      // 另外由于使用node的代理,来进行请求操作
      // 其中 npm run dev 直接请求本地的/Users/aurora/Desktop/下载.xml  
      // npm run build 编译的文件直接会代理到m3 并且需要更改为请求命令this.axios.get('/?custom=1&cmd=3015')
      //我觉得基本说清楚了
      // this.axios.get('%E4%B8%8B%E8%BD%BD.xml')
      this.axios.get('/?custom=1&cmd=3015')
      .then( res => {
          console.log("right is ",res)
          var x2json = new x2js()
          var jsondata =  x2json.xml2js( res.data )
          console.log(JSON.stringify(jsondata.LIST.ALLFile))
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
              preload: 'metadata', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
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
