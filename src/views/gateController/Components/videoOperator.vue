<template>
  <div class="container video-container-main">
    <div class="player" style="height:100%;width:100%;">
      <video-player
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        class="video-player vjs-custom-skin"
        @play="onPlayerPlay($event)"
      />
    </div>
  </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';
import { haikangGetUrl } from '@/api/mt/sluiceControl';
export default {
  name: 'VideoOperator',
  components: {
    videoPlayer
  },
  props: {
    id: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放。
        techOrder: ['flash', 'html5'],
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'application/x-mpegURL',
          src: '' // 你的m3u8地址（必填)
        }],
        // poster: 'poster.jpg', // 你的封面地址
        width: '100%',
        height: '100%',
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        // controlBar: {
        //   timeDivider: true,
        //   durationDisplay: true,
        //   remainingTimeDisplay: false,
        //   fullscreenToggle: true
        // }
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  watch: {
    id(val) {
      this.playerOptions.sources[0].src = null;
      this.restData();
    }
  },
  created() {
    this.restData();
  },
  methods: {
    restData() {
      var mtVideoOperator = {};
      mtVideoOperator.deviceNo = this.id;
      haikangGetUrl(mtVideoOperator).then(response => {
        console.log('444444444444', response);
        // response.data = 'http://120.253.33.235:8003/openUrl/5O1zPfq/live.m3u8';
        this.playerOptions.sources[0].src = response.data;
        // openNotify('info', response.statusText);
      }).catch(err => {
        console.log(err.response.data.message);
      });
      // this.playerOptions.sources[0].src = 'http://211.93.4.214:7086/live/cameraid/' + this.id + '/substream/1.m3u8';
    },
    onPlayerPlay(player) {
      // alert("play");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
  .video-container-main{
    background-color: #efefef;
    min-height: 100%;
  }

.video-js .vjs-big-play-button{
    /*
    播放按钮换成圆形
    */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
  }

</style>
