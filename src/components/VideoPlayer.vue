<template>
  <div>
    <div>
      <video id="localVideo"  autoplay playsinline controls="false"></video>
      <video id="remoteVideo"  autoplay playsinline controls="false"></video>
        
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
        localVideoId: 'localVideo',
        remoteVideoId: 'remoteVideo',
        isSmallVideo: false
      };
    },
  
    mounted() {
    
    
      console.log("111"+this.$route.query.toID)         
      this.toID = this.$route.query.toID;
      this.fromID = this.$cookies.get("userID");
      
      this.createSocket();
  
      this.webSocketInit();

      
      this.peerConnectionInit();
      this.creatOffer();
      
      
                   
      
  
      
  
      
  
      
  
      
      
  
      
  
      
    },
    methods: {

      //打开本地视频，并将本地媒体流添加到PeerConnection中
      async playVideoFromCamera() {
        try {
          const constraints = { video: true, audio: true };
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
        console.log("222"+this.NET.BASE_URL.http)
            Vue.use(VueNativeSock, this.NET.BASE_URL.http+'videoWebsocket/'+this.fromID, {
                format: 'json',
                reconnection: true, // 自动重连
                reconnectionAttempts: 5, // 重连尝试次数
                reconnectionDelay: 3000, // 重连延迟（毫秒）
            })
        },
  
      
      //开始发起视频，发生offer
      async creatOffer(){
        
        this.playVideoFromCamera();

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
            }
          }        
        };
      },

      //控制视频界面切换
      toggleVideoSize() {
        this.isSmallVideo = !this.isSmallVideo;
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
</style>
  
  
  