<template>
    <div>
      <button @click="startRecording" :disabled="recording">开始录音</button>
      <button @click="stopRecording" :disabled="!recording">停止录音</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        mediaRecorder: null,
        audioChunks: [],
        recording: false
      };
    },
    methods: {
      startRecording() {
        if (!this.recording) {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              this.audioChunks = [];
              this.mediaRecorder = new MediaRecorder(stream);
  
              this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                  this.audioChunks.push(event.data);
                }
              };
  
              this.mediaRecorder.start();
              this.recording = true;
            })
            .catch((error) => {
              console.error('获取麦克风访问权限失败:', error);
            });
        }
      },
      stopRecording() {
        if (this.recording) {
          this.mediaRecorder.stop();
          this.recording = false;
  
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
          // 处理 audioBlob，可以上传到服务器或进行其他操作
        }
      }
    }
  };
  </script>
  