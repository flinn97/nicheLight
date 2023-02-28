import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class VideoPlayer extends React.Component {

  // Instantiate a Video.js player when the component mounts
  componentDidMount() {
    debugger
    let el = document.getElementById("videoJSComponent");
    if(el){
      let id = this.createUUID(5)
      el.id = id
      this.player = videojs(el.id, this.props.options, () => {
        videojs.log('onPlayerReady', this);
      });
    }
    console.log(this.player)
   
  }

  createUUID(length){
    var result = 'id';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789-';
    var charactersLength = characters.length;
    for(var i =0; i<length; i++){
        result +=characters.charAt(Math.floor(Math.random()*charactersLength));
    }
    return result;
}

  // Dispose the player when the component will unmount
  componentWillUnmount() {
    // if (this.player) {
    //   this.player.dispose();
    // }
  }

  // Wrap the player in a `div` with a `data-vjs-player` attribute, so Video.js
  // won't create additional wrapper in the DOM.
  //
  // See: https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        {/* {this.props.disablePlayButton?(<div><video style={{marginLeft:-2000, position:"absolute", pointerEvents:"none"}} id="videoJSComponent" className="video-js"></video><img src = {this.player?.poster}/></div>):(<video id="videoJSComponent" className="video-js"></video>)} */}
       <video style={{pointerEvents:this.props.disablePlayButton?"none":"auto"}} id="videoJSComponent" className="video-js"></video>

      </div>
    );
  }
}