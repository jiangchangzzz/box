
class TrackPlayer{
  constructor(){
    this.audios=[];
    this.timers=[];
    this.trackNum = 0;
    this.playNum = 0;
    this.ended = null;
  }

  onEnded(callback){
    this.ended = callback;
  }

  playAudio(tracks){
    let index = 0;
    Object.keys(tracks).forEach(key => {
      tracks[key].list.forEach(item => {
        if(this.audios.length < index + 1){
          const innerAudioContext = wx.createInnerAudioContext();
          innerAudioContext.onEnded(() => {
            this.playNum++;
            if(this.playNum >= this.trackNum){
              this.ended && this.ended();

              this.playNum = 0;
              this.trackNum = 0;
              this.timers = [];
            }
          });
          this.audios.push(innerAudioContext);
        }
        this.audios[index].src = item.src;
        

        ((index) => {
          const timer = setTimeout(()=>{
            this.audios[index].play();
          }, item.start * 1e3);
          this.timers.push(timer);
        })(index);

        index++;
      });
    });
    this.trackNum = index;
  }

  stopAudio(){
    for(let i=0;i<this.trackNum;i++){
      this.audios[i].stop();
    }

    this.timers.forEach(timer => {
      clearTimeout(timer);
    });

    this.timers=[];
    this.trackNum = 0;
    this.playNum = 0;
  }
}

export default TrackPlayer;