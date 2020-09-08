<template>
  <div class="gateControllerBody">
    <div class="gateControllerTitle">
      <div class="bel-rowserControl">
        <el-button class="marginR10" icon="el-icon-rank" size="small " @click="handleFullScreen"></el-button>
        <el-button icon="el-icon-full-screen" size="small "></el-button>
      </div>
      <div class="pageBtn">
        <el-button type="primary">返回</el-button>
      </div>
    </div>
    <!-- 监视器 -->
    <div class="videos">
      <div class="explainTitle">大闸监视</div>
      <div class="video_body">
        <div class="video_windows">
          <div class="video" @click.stop="handleCheckVideo(index)">
            <video-player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="player1Options"
            ></video-player>
          </div>
          <div class="video" @click.stop="handleCheckVideo(index)">
            <video-player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="player2Options"
            ></video-player>
          </div>
          <div class="video" @click.stop="handleCheckVideo(index)">
            <video-player
              class="video-player vjs-custom-skin"
              ref="videoPlayer"
              :playsinline="true"
              :options="player3Options"
            ></video-player>
          </div>
        </div>
        <div class="video_control">
          <span class="video_control_label">窗格:</span>
          <el-select v-model="windowShowNum" @change="handleChangeShowWindow" placeholder="请选择">
            <el-option label="一行两格" value="一行两格"></el-option>
            <el-option label="一行三格" value="一行三格"></el-option>
          </el-select>
          <div class="video_control_label">视频:</div>
          <div class="control_btn_row">
            <div class="small_btn">
              <i class="el-icon-caret-top"></i>
            </div>
            <div class="small_btn">
              <i class="el-icon-caret-top"></i>
            </div>
            <div class="small_btn">
              <i class="el-icon-caret-top"></i>
            </div>
          </div>

          <div class="control_btn_row">
            <div style="display:inline-block;flex:1">变倍</div>
            <div style="display:inline-block;flex:1">光圈</div>
            <div style="display:inline-block;flex:1">变焦</div>
          </div>

          <div class="control_btn_row">
            <div class="small_btn">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="small_btn">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="small_btn">
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>

          <div class="control_btn_row">
            <div class="big_btn">
              <span style="display:block;transform: rotate(-45deg)">
                <i class="el-icon-caret-top"></i>
              </span>
            </div>
            <div class="big_btn">
              <i class="el-icon-caret-top"></i>
            </div>
            <div class="big_btn">
              <span style="display:block;transform: rotate(45deg)">
                <i class="el-icon-caret-top"></i>
              </span>
            </div>
          </div>

          <div class="control_btn_row">
            <div class="big_btn">
              <i class="el-icon-caret-left"></i>
            </div>
            <div class="big_btn">
              <i class="el-icon-refresh-right"></i>
            </div>
            <div class="big_btn">
              <i class="el-icon-caret-right"></i>
            </div>
          </div>

          <div class="control_btn_row">
            <div class="big_btn">
              <span style="display:block;transform: rotate(45deg)">
                <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
            <div class="big_btn">
              <i class="el-icon-caret-bottom"></i>
            </div>
            <div class="big_btn">
              <span style="display:block;transform: rotate(-45deg)">
                <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="video_control_label">控制器设置:</div>
          <el-select
            @change="handleChangeGate"
            v-model="selectGates"
            :clearable="true"
            multiple
            :multiple-limit="0"
            collapse-tags
          >
            <el-option v-for="item in NumList" :key="item.id" :value="item.name" :label="item.name"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <!-- 参数详情 -->
    <div class="controller_detail">
      <div class="controller_detail_item" v-for="item in showDetailList" :key="item.id">
        <div class="evenNum" v-if="item.Numtype === 'evenNum'">
          <div class="evenNum_item" v-for="detailitem in item.msgList" :key="detailitem.id">
            <div class="evenNum_item_title">
              <span>{{ detailitem.label }}</span>
              <span
                v-if="detailitem.state === '开启'"
                class="state_init"
                style=" color: #44c37a;border: 1px solid #44c37a;background: rgb(232, 243, 236);"
              >开启</span>
              <span
                v-else-if="detailitem.state === '故障'"
                class="state_init"
                style="color: #f78d0a;border: 1px solid #f78d0a;background: #fde9cf;"
              >故障</span>
              <span
                v-if="detailitem.state === '关闭'"
                class="state_init"
                style="color: #0984e3;border: 1px solid #0984e3;background: #b3d9ff;"
              >关闭</span>
              <span
                v-else-if="detailitem.state === '离线'"
                class="state_init"
                style="color: #9a9d9e;border: 1px solid #9a9d9e;background: #e0e0e0;"
              >离线</span>
            </div>
            <el-tabs value="name1">
              <el-tab-pane style="padding:0 10px" label="闸门控制" name="name1">
                <p class="detail_title">实时信息</p>
                <el-row :gutter="20" justify="space-around">
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">控制方式</div>
                      <div class="detail_msg_content">
                        <span
                          style="color:#079992"
                          v-if="detailitem.controlMode === '现场'"
                        >{{ detailitem.controlMode }}</span>
                        <span
                          style="color:#477ae3"
                          v-if="detailitem.controlMode === '远程'"
                        >{{ detailitem.controlMode }}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">最新采集时间</div>
                      <div class="detail_msg_content">{{detailitem.dataTime}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">当前开度(mm)</div>
                      <div class="detail_msg_content">{{detailitem.openValue}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">闸前水位(m)</div>
                      <div class="detail_msg_content">{{detailitem.waterDeep}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">当前荷重(kg/m³)</div>
                      <div class="detail_msg_content">{{detailitem.heavy}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">预警信息</div>
                      <div class="detail_msg_content">
                        <span
                          style="color:#2ecc71"
                          v-if="detailitem.warningMsg === '正常'"
                        >{{ detailitem.warningMsg }}</span>
                        <span style="color:#e84118" v-else>{{ detailitem.warningMsg }}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <p style="margin-top:20px" class="detail_title">闸门控制</p>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="detailitem.controlOpenValue">
                      <template slot="prepend">控制开度：</template>
                    </el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-button class="control_btn marginR10" size="mini" type="primary">启动</el-button>
                    <el-button class="control_btn marginR10" size="mini" type="danger">急停</el-button>
                    <el-button class="control_btn marginR10" size="mini" type="primary">上升</el-button>
                    <el-button class="control_btn marginR10" size="mini" type="primary">下降</el-button>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="操作记录" style="padding:0 10px" name="name2">
                <el-table
                  :data="detailitem.controlDetail"
                  :height="table.height"
                  border
                  style="width: 100%"
                >
                  <el-table-column label="序号" width="50" align="center"></el-table-column>
                  <el-table-column prop="kzq" label="控制器" width="100" align="center"></el-table-column>
                  <el-table-column prop="zb" label="闸板" width="100" align="center"></el-table-column>
                  <el-table-column prop="czlx" label="操作类型" width="80" align="center"></el-table-column>
                  <el-table-column prop="czz" label="操作值" width="80" align="center"></el-table-column>
                  <el-table-column prop="jg" label="结果" width="100" align="center"></el-table-column>
                  <el-table-column prop="czsj" label="操作时间" width="200" align="center"></el-table-column>
                  <el-table-column prop="czr" label="操作人" width="80" align="center"></el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="unevenNum" v-if="item.Numtype === 'unevenNum'">
          <div class="unevenNum_item" v-for="detailitem in item.msgList" :key="detailitem.id">
            <div class="evenNum_item_title">
              <span>{{ detailitem.label }}</span>
              <span
                v-if="detailitem.state === '开启'"
                class="state_init"
                style=" color: #44c37a;border: 1px solid #44c37a;background: rgb(232, 243, 236);"
              >开启</span>
              <span
                v-else-if="detailitem.state === '故障'"
                class="state_init"
                style="color: #f78d0a;border: 1px solid #f78d0a;background: #fde9cf;"
              >故障</span>
              <span
                v-if="detailitem.state === '关闭'"
                class="state_init"
                style="color: #0984e3;border: 1px solid #0984e3;background: #b3d9ff;"
              >关闭</span>
              <span
                v-else-if="detailitem.state === '离线'"
                class="state_init"
                style="color: #9a9d9e;border: 1px solid #9a9d9e;background: #e0e0e0;"
              >离线</span>
            </div>
            <el-tabs value="name1">
              <el-tab-pane style="padding:0 10px" label="闸门控制" name="name1">
                <p class="detail_title">实时信息</p>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">控制方式</div>
                      <div class="detail_msg_content">
                        <span
                          style="color:#079992"
                          v-if="detailitem.controlMode === '现场'"
                        >{{ detailitem.controlMode }}</span>
                        <span
                          style="color:#477ae3"
                          v-if="detailitem.controlMode === '远程'"
                        >{{ detailitem.controlMode }}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">最新采集时间</div>
                      <div class="detail_msg_content">{{detailitem.dataTime}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">当前开度(mm)</div>
                      <div class="detail_msg_content">{{detailitem.openValue}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">闸前水位(m)</div>
                      <div class="detail_msg_content">{{detailitem.waterDeep}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">当前荷重(kg/m³)</div>
                      <div class="detail_msg_content">{{detailitem.heavy}}</div>
                    </div>
                  </el-col>
                  <el-col :span="12">
                    <div class="detail_msg_item">
                      <div class="detail_msg_title">预警信息</div>
                      <div class="detail_msg_content">
                        <span
                          style="color:#2ecc71"
                          v-if="detailitem.warningMsg === '正常'"
                        >{{ detailitem.warningMsg }}</span>
                        <span style="color:#e84118" v-else>{{ detailitem.warningMsg }}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <p style="margin-top:20px" class="detail_title">闸门控制</p>
                <el-row :gutter="10">
                  <el-col :span="12">
                    <el-input placeholder="请输入内容" v-model="detailitem.controlOpenValue">
                      <template slot="prepend">控制开度：</template>
                    </el-input>
                  </el-col>
                  <el-col :span="12">
                    <el-button class="control_btn" size="mini" type="primary">启动</el-button>
                    <el-button class="control_btn" size="mini" type="danger">急停</el-button>
                    <el-button class="control_btn" size="mini" type="primary">上升</el-button>
                    <el-button class="control_btn" size="mini" type="primary">下降</el-button>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane
                style="padding:0 10px;overflow-y:auto;height:250px"
                label="操作记录"
                name="name2"
              >
                <div
                  class="control_detail_list"
                  v-for="controlDetailitem in detailitem.controlDetail"
                  :key="controlDetailitem.id"
                >
                  <div class="control_detail_list_left">
                    <div class="control_detail_list_item">
                      <div class="control_detail_title">操作时间：</div>
                      <div class="control_detail_content">{{ controlDetailitem.czsj }}</div>
                    </div>
                    <div class="control_detail_list_item">
                      <div class="control_detail_title">操作闸板：</div>
                      <div class="control_detail_content">{{ controlDetailitem.zb }}</div>
                    </div>
                    <div class="control_detail_list_item">
                      <div class="control_detail_title">操作结果：</div>
                      <div class="control_detail_content">{{ controlDetailitem.jg }}</div>
                    </div>
                  </div>
                  <div class="control_detail_list_right">
                    <div class="control_detail_list_item">
                      <div class="control_detail_title">操作人：</div>
                      <div class="control_detail_content">{{ controlDetailitem.czr }}</div>
                    </div>
                    <div class="control_detail_list_item">
                      <div class="control_detail_title">操作值：</div>
                      <div class="control_detail_content">{{ controlDetailitem.czz }}</div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 视频播放
      // 播放器1
      player1Options: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "http://localhost:3000/static/video/1.mp4", //url地址
          },
        ],
        poster: "../assets/video1.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      // 播放器2
      player2Options: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "http://localhost:3000/static/video/2.mp4", //url地址
          },
        ],
        poster: "../assets/video2.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      // 播放器3
      player3Options: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "http://localhost:3000/static/video/3.mp4", //url地址
          },
        ],
        poster: "../assets/video3.jpg", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      selectGates: [],
      NumList: [
        {
          name: "控制器1",
          Numtype: "evenNum",
          id: "1",
          msgList: [
            {
              label: "新圈节制闸-控制器1-1#闸板",
              id: "1-1",
              state: "开启",
              controlMode: "现场",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "正常",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "11",
                  kzq: "控制器1",
                  czlx: "流量",
                  zb: "右闸板",
                  czr: "王五",
                  czsj: "2020-01-01 11:11:11",
                  jg: "控制失败",
                  czz: "0.005",
                },
              ],
            },
            {
              label: "新圈节制闸-控制器1-2#闸板",
              id: "1-2",
              state: "故障",
              controlMode: "远程",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "未获取到实时数据",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "12",
                  kzq: "控制器1",
                  czlx: "开度",
                  zb: "左闸板",
                  czr: "张三",
                  czsj: "2020-01-01 11:11:11",
                  jg: "控制成功",
                  czz: "100",
                },
              ],
            },
          ],
        },
        {
          name: "控制器2",
          Numtype: "unevenNum",
          id: "2",
          msgList: [
            {
              label: "新圈节制闸-控制器2-1#闸板",
              id: "2-1",
              state: "关闭",
              controlMode: "现场",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "正常",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "21",
                  kzq: "控制器2",
                  czlx: "流量",
                  zb: "左闸板",
                  czr: "小C",
                  czsj: "2020-01-01 12:11:11",
                  jg: "控制成功",
                  czz: "80",
                },
              ],
            },
            {
              label: "新圈节制闸-控制器2-2#闸板",
              id: "2-2",
              state: "离线",
              controlMode: "远程",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "未获取到实时数据",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "22",
                  kzq: "控制器2",
                  czlx: "流量",
                  zb: "左闸板",
                  czr: "王麻子",
                  czsj: "2020-01-01 11:11:11",
                  jg: "控制成功",
                  czz: "100",
                },
              ],
            },
            {
              label: "新圈节制闸-控制器2-3#闸板",
              id: "2-3",
              state: "关闭",
              controlMode: "现场",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "正常",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "23",
                  kzq: "控制器2",
                  czlx: "开度",
                  zb: "左闸板",
                  czr: "张三",
                  czsj: "2020-01-01 11:11:11",
                  jg: "控制成功",
                  czz: "100",
                },
              ],
            },
          ],
        },
        {
          name: "控制器3",
          Numtype: "unevenNum",
          id: "3",
          msgList: [
            {
              label: "新圈节制闸-控制器3-1#闸板",
              id: "3-1",
              state: "开启",
              controlMode: "远程",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "正常",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "31",
                  kzq: "控制器3",
                  czlx: "开度",
                  zb: "左闸板",
                  czr: "小李",
                  czsj: "2020-01-01 13:11:11",
                  jg: "控制异常",
                  czz: "100",
                },
              ],
            },
            {
              label: "新圈节制闸-控制器3-2#闸板",
              id: "3-2",
              state: "离线",
              controlMode: "远程",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "未获取到实时数据",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "32",
                  kzq: "控制器3",
                  czlx: "开度",
                  zb: "左闸板",
                  czr: "小王",
                  czsj: "2020-01-01 15:11:11",
                  jg: "控制成功",
                  czz: "0.05",
                },
              ],
            },
            {
              label: "新圈节制闸-控制器3-3#闸板",
              id: "3-3",
              state: "故障",
              controlMode: "远程",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "正常",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "33",
                  kzq: "控制器3",
                  czlx: "流量",
                  zb: "左闸板",
                  czr: "小爱",
                  czsj: "2020-01-01 11:11:11",
                  jg: "控制成功",
                  czz: "60",
                },
              ],
            },
          ],
        },
        {
          name: "控制器4",
          Numtype: "evenNum",
          id: "4",
          msgList: [
            {
              label: "新圈节制闸-控制器4-1#闸板",
              id: "4-1",
              state: "开启",
              controlMode: "现场",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "正常",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "41",
                  kzq: "控制器4",
                  czlx: "流量",
                  zb: "右闸板",
                  czr: "张三",
                  czsj: "2020-01-01 11:11:11",
                  jg: "控制成功",
                  czz: "100",
                },
              ],
            },
            {
              label: "新圈节制闸-控制器4-2#闸板",
              id: "4-2",
              state: "故障",
              controlMode: "远程",
              dataTime: "2020-01-01 11:11:11",
              openValue: "100",
              waterDeep: "100",
              heavy: "100",
              warningMsg: "未获取到实时数据",
              controlOpenValue: "",
              controlDetail: [
                {
                  id: "42",
                  kzq: "控制器4",
                  czlx: "流量",
                  zb: "左闸板",
                  czr: "张三",
                  czsj: "2020-01-01 11:11:11",
                  jg: "控制成功",
                  czz: "100",
                },
              ],
            },
          ],
        },
      ],
      currentIndex: null,
      showDetailList: [],
      windowShowNum: "",
      table: {
        height: 240,
        page: 1,
        pageSize: 10,
      },
      fullscreen: false, // 是否全屏
    };
  },
  methods: {
    handleCheckVideo(index) {
      this.currentIndex = index;
    },
    // 全屏
    handleFullScreen() {
      let element = document.documentElement;
      // 判断是否已经是全屏
      // 如果是全屏，退出
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        // 否则，进入全屏
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      // 改变当前全屏状态
      this.fullscreen = !this.fullscreen;
    },
    handleChangeShowWindow(value) {
      if (value === '一行两格') {
        this.player3Options.sources[0].src = ""
      } else {
        this.player3Options.sources[0].src = "http://localhost:3000/static/video/3.mp4"
      }
    },
    handleChangeGate(value) {
      this.showDetailList = [];
      for (let i = 0; i < value.length; i++) {
        const result = this.NumList.find((item) => item.name === value[i]);
        if (result !== undefined) {
          const detailResIndex = this.showDetailList.findIndex(
            (item) => item.name === result.name
          );
          if (detailResIndex === -1) {
            this.showDetailList.push(result);
          }
        }
      }
    },
  },
  components: {},
};
</script>

<style>
.gateControllerBody {
  height: auto;
  border-radius: 10px;
}
.gateControllerTitle {
  height: 50px;
  padding: 0 10px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.videos,
.gateControllerTitle {
  border-radius: 10px;
}
.videos {
  height: 510px;
  margin-top: 10px;
  box-shadow: 0 0 10px #eee;
  background: #fff;
  border: 1px solid #dcdee2;
}
.video_control_label {
  font-size: 14px;
  margin-top: 10px;
  font-weight: 600;
}
/* 控制按钮 */
.small_btn,
.big_btn {
  height: 26px;
  display: inline-block;
  width: 36px;
  background: #2db7f5;
  margin: 0 auto;
  border-radius: 4px;
  color: #fff;
  font-size: 24px;
  line-height: 26px;
  cursor: pointer;
  position: relative;
}
.small_btn:active::after,
.big_btn:active::after {
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  width: 36px;
  height: 100%;
  background: rgba(0, 0, 0, 8%);
}
.control_btn_row {
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 5px;
}
.big_btn {
  width: 36px;
  height: 36px;
  line-height: 34px;
}
.bel-rowserControl {
  height: 100%;
  line-height: 47px;
  float: left;
}
.videoControlbtns {
  height: 250px;
  padding: 10px;
  background: #fff;
}
.video_body {
  width: 100%;
  height: 440px;
  display: flex;
  min-width: 1450px;
}
.video_control {
  padding: 15px;
  box-sizing: border-box;
  width: 200px;
  background: rgb(248, 248, 248);
}
.video_windows {
  display: flex;
  margin-left: 10px;
  box-sizing: border-box;
  flex: 1;
}
.video {
  flex: 1;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #eee;
}
.checkVideo {
  transform: scale(1.03);
  transition: 0.3s;
  border-radius: 6px;
}
.explainTitle {
  height: 60px;
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 60px;
  font-size: 18px;
}
.pageBtn {
  height: 100%;
  line-height: 47px;
  float: right;
}
.marginR10 {
  margin-right: 10px;
}
.marginR3 {
  margin-right: 3px;
}
.explainTitle {
  position: relative;
}
.explainTitle::after {
  position: absolute;
  content: "";
  height: 20px;
  top: 19px;
  left: 13px;
  width: 3px;
  background: #477ae3;
}
/* 详细参数 */
.controller_detail {
  background: #f5f5f5;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 10px;
}
.controller_detail_item {
  height: 320px;
  box-sizing: border-box;
  margin-bottom: 5px;
}
.evenNum_item_title {
  position: absolute;
  top: 0%;
  left: 2%;
  font-size: 16px;
  font-weight: 600;
  width: 500px;
  height: 35px;
  line-height: 35px;
}
.state_init {
  display: inline-block;
  margin-left: 20px;
  width: 60px;
  text-align: center;
  border-radius: 10px;
  background: #fff;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 28px;
  height: 28px;
}
.evenNum,
.unevenNum {
  display: flex;
  justify-content: space-around;
  background: #f5f7f9;
}
.evenNum_item,
.unevenNum_item {
  background: #fff;
  flex: 1;
  border-radius: 6px;
  margin-left: 5px;
  box-sizing: border-box;
  border: 1px solid #dcdee2;
  position: relative;
  height: 320px;
}
.evenNum_item:nth-of-type(1) {
  margin-left: 0;
}
.unevenNum_item:nth-of-type(1) {
  margin-left: 0;
}
.ivu-tabs-nav {
  padding-left: 0;
  margin: 0;
  float: right;
  list-style: none;
  box-sizing: border-box;
  position: relative;
  transition: transform 0.5s ease-in-out;
}
.ivu-tabs-content {
  box-sizing: border-box;
}
.detail_title {
  font-size: 12px;
  padding-left: 13px;
  color: #477ae3;
  position: relative;
  margin-bottom: 10px;
}
.detail_title::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  height: 11px;
  width: 3px;
  background: #477ae3;
}
.detail_msg_item {
  margin-top: 5px;
  width: 100%;
  height: 35px;
  display: flex;
  box-sizing: border-box;
  border: 1px solid #dcdee2;
  border-radius: 6px;
  overflow: hidden;
  line-height: 35px;
}
.detail_msg_title,
.detail_msg_content {
  box-sizing: border-box;
  text-align: center;
}
.detail_msg_content {
  flex: 1;
}
.detail_msg_title {
  width: 40%;
  border-right: 1px solid #dcdee2;
  background: #f8f8f9;
  color: #515a6e;
  font-size: 12px;
}
>>> .el-input-group__prepend {
  border-right: 0;
  width: 40% !important;
  text-align: center !important;
}
.el-input-group__append,
.el-input-group__prepend {
  width: 40% !important;
  text-align: center !important;
  color: #515a6e;
  font-size: 12px !important;
  border-right: 1px solid #dcdee2;
  background: #f8f8f9;
}
.el-tabs__nav {
  float: right !important;
  padding-right: 10px !important;
}
.control_detail_list {
  height: 100px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.control_detail_list::before {
  content: "";
  background: #ffc312;
  width: 10px;
  height: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  left: 12px;
  top: 8px;
  position: absolute;
}
.control_detail_list_left,
.control_detail_list_right {
  width: 50%;
  height: 100%;
  display: inline-block;
}
.control_detail_list_left {
  float: left;
}
.control_detail_list_item {
  height: 33.333%;
  background: #fff;
  display: flex;
}
.control_detail_title,
.control_detail_content {
  width: 50%;
  line-height: 2;
  text-align: center;
}
.control_detail_title {
  color: #515a6e;
}
.control_detail_content {
  color: #477ae3;
}
.video-player {
  height: 100%;
  width: 100%;
}
.vjs-custom-skin > .video-js {
  height: 100%;
}
</style>