<template>
  <div>
    <div class="video-container">
      <div class="video-wrapper">
        <video id="localVideo" autoplay playsinline controls="false"></video>
      </div>
      <div class="video-wrapper">
        <video v-show="showVideo" id="remoteVideo" autoplay playsinline controls="false"></video>
      </div>
    </div>
    <div class="button-wrapper">
      <!-- 按钮包裹元素 -->
      <el-button v-show="showStartButtons" @click="requestAgree" type="primary" round>
        发起{{ this.buttonString }}
      </el-button>
      <el-button v-show="showAgreeButtons" @click="responeAgree('true')" type="success" round>
        同意
      </el-button>
      <el-button v-show="showAgreeButtons" @click="responeAgree('false')" type="danger" round>
        拒绝
      </el-button>
      <el-button v-show="showEndButtons" @click="endCall" type="danger" round>
        结束{{ this.buttonString }}
      </el-button>
    </div>
  </div>
</template>






    
  
<script>
    
    import Vue from 'vue'
    import VueNativeSock from 'vue-native-websocket'
    
     
  export default {
      name: 'videoPlayer',
      data() {
      return {
        peerConnection: null,
        configuration :{ 'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }] },
        fromID :null,
        toID:null,
        showAgreeButtons: false,
        showStartButtons:true,
        showEndButtons:false,
        showVideo:false,
        type:null,
        buttonString:null
      
      };
    },
  
    mounted() {

      this.toID = this.$route.params.toID;
      this.fromID = this.$cookies.get("userID");
      this.type=this.$route.params.type;
    
      this.createSocket();

      this.webSocketInit();

      this.peerConnectionInit();

      this.playVideoFromCamera();
    
               
      
      
      if(this.type==='audio'){
        this.buttonString='语音'
      }else{
        this.buttonString='视频'
      }

      

      

      

     
     
      
            
            
      
    },
    methods: {

      //打开本地视频，并将本地媒体流添加到PeerConnection中
      async playVideoFromCamera() {
        try {
          let constraints=null;
          if(this.type==='audio'){
            constraints = {  audio: true };
          }else{
            constraints = { video: true, audio: true };
          }
          
          
          const localStream = await navigator.mediaDevices.getUserMedia(constraints);

          localStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, localStream);
          });
          const videoElement = document.querySelector('video#localVideo');
          videoElement.srcObject = localStream;
        } catch (error) {
          console.error('Error opening video camera.', error);
        }
      },
  
      
  
      //创建webSocket示例
      async createSocket() {
            console.log(111);
            Vue.use(VueNativeSock, this.NET.BASE_URL.ws +  'videoWebsocket/'+this.fromID, {
                format: 'json',
                reconnection: true, // 自动重连
                reconnectionAttempts: 5, // 重连尝试次数
                reconnectionDelay: 3000, // 重连延迟（毫秒）
            })
        },
  
      
      //开始发起视频，发生offer
      async creatOffer(){       
        this.peerConnection.createOffer().then(offer => {
        this.peerConnection.setLocalDescription(offer);
        this.$socket.sendObj({
            toID:this.toID,
            event: "offer",
            data: {
                sdp: offer
            }
          });
        
      });
    
    },
      
    //实例化peerConnection并添加事件
      async peerConnectionInit(){
        this.peerConnection = new RTCPeerConnection(this.configuration);  
  
        this.peerConnection.onicecandidate = (e)=> {
  
          if (e.candidate) {
            this.$socket.sendObj({
                toID:this.toID,
                event: "iceCandidate",
                data: {
                    candidate: e.candidate
                }
            });
          }
        }
  
        this.peerConnection.onaddstream = (e) =>{        
          const videoElement = document.querySelector('video#remoteVideo');
          videoElement.srcObject = e.stream;
        }
  
      },

      

      async requestAgree(){
      
        this.$socket.sendObj({
                toID:this.toID,
                event: "requestAgree",
            });
      },

      async responeAgree(isAgree){
        this.$socket.sendObj({
                toID:this.toID,
                event: "responeAgree",
                data:{
                  isAgree:isAgree
                }
            });
            this.showAgreeButtons = false;
            this.showStartButtons =true;
      },
      async endCall(){
        this.$socket.sendObj({
                toID:this.toID,
                event: "endCall",
            });
        this.showEndButtons=false;
        this.showStartButtons =true;
        this.showVideo=false;
      },
  
  
      async webSocketInit(){
        //连接成功
        this.$socket.onopen = async() =>{
          console.log('连接成功')
        };
        //server端请求关闭
        this.$socket.onclose = async()=> {
          console.log('连接关闭')
          
        };
        //error
        this.$socket.onerror = async()=> {
          console.log('发生错误')
        };
        //收到消息
        this.$socket.onmessage = (event)=> {
        
          var json = JSON.parse(event.data);
                    
          if(json.toID ===this.fromID){
              
            //如果是一个ICE的候选，则将其加入到PeerConnection中，否则设定对方的session描述为传递过来的描述
            if(json.event === "iceCandidate"&&json.data.candidate) {
              this.peerConnection.addIceCandidate(new RTCIceCandidate(json.data.candidate));
            }else if(json.event==='offer'){
              console.log("offer:"+json.toID); 
              this.showVideo =true;
              this.showStartButtons=false;
              this.showEndButtons=true;   
              this.peerConnection.setRemoteDescription(json.data.sdp);
              this.peerConnection.createAnswer().then(answer => {
                this.peerConnection.setLocalDescription(answer);                       
                this.$socket.sendObj({
                  toID:this.toID,
                  event: "answer",
                  data: {
                    sdp: answer
                  }
                });
              })
            }else if(json.event ==='answer'){
                console.log("answer:"+json.toID);
              this.peerConnection.setRemoteDescription(json.data.sdp);                    
            }else if(json.event ==='noOnline'){
              window.alert('对方不在线');
            }else if(json.event ==='requestAgree'){
              this.showAgreeButtons = true;
              this.showStartButtons = false;
            }else if(json.event === 'responeAgree'){
              if(json.data.isAgree==='true'){
                this.creatOffer();
                this.showVideo =true;
                this.showStartButtons=false;
                this.showEndButtons=true;
              }else{
                window.alert('对方拒绝'+this.buttonString)
              }
            }else if(json.event === 'endCall'){
              this.showEndButtons=false;
              this.showStartButtons =true;
              this.showVideo=false;
              window.alert('对方结束'+this.buttonString)
            }
          }        
        };
      },

      

      
  
      
          
  
    },
  };
  
  
</script>

<style>
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.small-video {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 200px;
  height: 150px;
}
.video-container {
  display: flex;
}

.video-wrapper {
  flex: 1;
  margin: 10px;
}

.video-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.video-wrapper {
  flex: 1;
  margin: 10px;
}

.button-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 10px;
}


</style>
  
  
  