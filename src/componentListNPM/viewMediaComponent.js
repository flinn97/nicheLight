import React, { Component } from 'react';
import auth from '../services/auth';
import { ref, } from "firebase/storage";
import { storage, } from '../firbase.config.js';
import VideoPlayer from './videoJS';



export default class ViewMedia extends Component {
  constructor(props) {
    super(props);


    this.state = {

    }
  }

  render() {
    let app = this.props.app;
    let state = app?.state;
    let dispatch = app?.dispatch;
    let componentList = state?.componentList;
    let styles = state?.styles;
    let s = this.props.scale ? this.props.scale : 1;
    let media = Array.isArray(this.props.media) ? this.props.media : [this.props.media];
    

    let mediaDisplay = {

      1: <div style={{ cursor: "pointer", display: "flex", textAlign: "center", flexDirection: "row", justifyContent: "center", borderRadius: "1vw", alignItems: "center" }}>
        <div style={{ position: "relative", borderRadius: "1vw", }}>
          {this.props.editable && <div style={ ///EXIT BUTTON
            { color: "#A80303", fontWeight: "600", fontSize: "2.5vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
          } onClick={() => { this.props.removeMedia({ content: media[0], index: 0 }) }}> X </div>}
          <div style={{ width: "100%", height: "100%" }}>
            {media[0]?.video ? (<VideoPlayer disablePlayButton= {this.props.disablePlayButton} options={{
              autoplay: false,
              bigPlayButton:this.props.disablePlayButton?false:true,
              controls: true,
              width: 200,
              height: 200,
              sources: [{
                src: media[0].file,
                type: "video/mp4"
              }]
            }
            } />) : (
              <img style={{
                width: (40 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "35vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[0]} />)}

          </div>
        </div>
      </div>,


      2: <div style={{ cursor: "pointer", display: "flex", textAlign: "center", flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: "1vw" }}>
        <div style={{ position: "relative", borderRadius: "1vw", marginRight: ".5vmin" }}>
          {this.props.editable && <div style={ ///EXIT BUTTON
            { color: "#A80303", fontWeight: "600", fontSize: "2.5vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
          } onClick={() => { this.props.removeMedia({ content: media[0], index: 0 }) }}> X </div>}
          <div style={{ width: "100%", height: "100%" }}>
            {media[0]?.video ? (<VideoPlayer disablePlayButton= {this.props.disablePlayButton} options={{
              autoplay: false,
              controls: true,
              width: 200,
              height: 200,
              sources: [{
                src: media[0].file,
                type: "video/mp4"
              }]
            }
            } />) : (
              <img style={{
                width: (20 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[0]} />)}</div>
        </div>
        <div style={{ position: "relative", borderRadius: "1vw", }}>
          {this.props.editable && <div style={ ///EXIT BUTTON
            { color: "#A80303", fontWeight: "600", fontSize: "2.5vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
          } onClick={() => { this.props.removeMedia({ content: media[2], index: 1 }) }}> X </div>}
          <div style={{ width: "100%", height: "100%" }}>
            {media[1]?.video ? (<VideoPlayer disablePlayButton= {this.props.disablePlayButton}  options={{
              autoplay: false,
              controls: true,
              width: 200,
              height: 200,
              sources: [{
                src: media[1].file,
                type: "video/mp4"
              }]
            }
            } />) : (
              <img style={{
                width: (20 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "40vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[1]} />)}</div>
        </div>
      </div>,



      3: <div style={{ cursor: "pointer", display: "flex", textAlign: "center", flexDirection: "row", justifyContent: "space-between", borderRadius: "1vw", alignItems: "center" }}>
        <div style={{ position: "relative", borderRadius: "1vw", marginRight: ".5vmin" }}>
          {this.props.editable && <div style={ ///EXIT BUTTON
            { color: "#A80303", fontWeight: "600", fontSize: "2.5vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
          } onClick={() => { this.props.removeMedia({ content: media[0], index: 0 }) }}> X </div>}
          <div style={{ width: "100%", height: "100%" }}>
            {media[0]?.video ? (<VideoPlayer disablePlayButton= {this.props.disablePlayButton}  options={{
              autoplay: false,
              controls: true,
              width: 200,
              height: 200,
              sources: [{
                src: media[0].file,
                type: "video/mp4"
              }]
            }
            } />) : (<img style={{
              width: (20 * s).toString() + "vw",
              height: "fit-content",
              maxHeight: "45vmax",
              objectFit: "contain", borderRadius: "1vw",
              background: ""
            }}
              className="picture" id="pic" src={media[0]} />)}</div></div>

        <div style={{ display: "flex", borderRadius: "1vw", flexDirection: "column", justifyContent: "space-between", }}>
          <div style={{ position: "relative", borderRadius: "1vw", }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.5vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[1], index: 1 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[1]?.video ? (<VideoPlayer disablePlayButton= {this.props.disablePlayButton}  options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[1].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (10 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[1]} />)}</div>
          </div>
          <div style={{ position: "relative", borderRadius: "1vw", }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.5vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[2], index: 2 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[2]?.video ? (<VideoPlayer disablePlayButton= {this.props.disablePlayButton}  options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[2].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (10 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[2]} />)}</div>
          </div>
        </div>
      </div>,




      4: <div style={{ cursor: "pointer", display: "flex", textAlign: "center", flexDirection: "row", justifyContent: "center", alignItems: "center", borderRadius: "1vw" }}>
        <div style={{ display: "flex", flexDirection: "column", marginRight: ".5vmin", justifyItems: "center" }}><div style={{ position: "relative", borderRadius: "1vw", display: "flex", flexDirection: "column" }}>
          {this.props.editable && <div style={ ///EXIT BUTTON
            { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
          } onClick={() => { this.props.removeMedia({ content: media[0], index: 0 }) }}> X </div>}
          <div style={{ width: "100%", height: "100%" }}>
            {media[0]?.video ? (<VideoPlayer disablePlayButton= {this.props.disablePlayButton}  options={{
              autoplay: false,
              controls: true,
              width: 200,
              height: 200,
              sources: [{
                src: media[0].file,
                type: "video/mp4"
              }]
            }
            } />) : (<img style={{
              width: (10 * s).toString() + "vw",
              height: "fit-content",
              maxHeight: "45vmax",
              objectFit: "contain", borderRadius: "1vw",
              background: ""
            }}
              className="picture" id="pic" src={media[0]} />)}</div></div>
          <div style={{ position: "relative", borderRadius: "1vw", }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[1], index: 1 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[1]?.video ? (<VideoPlayer disablePlayButton= {this.props.disablePlayButton}  options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[1].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (10 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[1]} />)}</div></div></div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ position: "relative", borderRadius: "1vw", }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[2], index: 2 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[2]?.video ? (<VideoPlayer  disablePlayButton= {this.props.disablePlayButton} options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[2].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (10 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[2]} />)}</div></div>
          <div style={{ position: "relative", borderRadius: "1vw", }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[3], index: 3 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[3]?.video ? (<VideoPlayer  disablePlayButton= {this.props.disablePlayButton} options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[3].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (10 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[3]} />)}</div></div>
        </div>
      </div>,


      5: <div style={{ cursor: "pointer", display: "flex", textAlign: "center", borderRadius: "1vw", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", borderRadius: "1vw", flexDirection: "row", }}>
          <div style={{ position: "relative", borderRadius: "1vw", }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[0], index: 0 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[0]?.video ? (<VideoPlayer  disablePlayButton= {this.props.disablePlayButton} options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[0].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (20 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[0]} />)}</div></div>
          <div style={{ position: "relative", borderRadius: "1vw", }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[1], index: 1 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[1]?.video ? (<VideoPlayer  disablePlayButton= {this.props.disablePlayButton} options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[1].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (20 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[1]} />)}</div></div></div>
        <div style={{ display: "flex", flexDirection: "row", }}>
          <div style={{ position: "relative", borderRadius: "1vw", marginLeft: "1.5vmin" }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[2], index: 2 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[2]?.video ? (<VideoPlayer  disablePlayButton= {this.props.disablePlayButton} options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[2].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (10.6 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[2]} />)}</div></div>
          <div style={{ position: "relative", borderRadius: "1vw", marginLeft: "1.5vmin" }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[3], index: 3 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[3]?.video ? (<VideoPlayer  disablePlayButton= {this.props.disablePlayButton} options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[3].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (10.6 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[3]} />)}</div></div>
          <div style={{ position: "relative", borderRadius: "1vw", marginLeft: "1.5vmin" }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[4], index: 4 }) }}> X </div>}
            <div style={{ width: "100%", height: "100%" }}>
              {media[4]?.video ? (<VideoPlayer  disablePlayButton= {this.props.disablePlayButton} options={{
                autoplay: false,
                controls: true,
                width: 200,
                height: 200,
                sources: [{
                  src: media[4].file,
                  type: "video/mp4"
                }]
              }
              } />) : (<img style={{
                width: (10.6 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[4]} />)}</div></div>
        </div>
      </div>,


      6: <div style={{ cursor: "pointer", display: "flex", textAlign: "center", borderRadius: "1vw", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "row", }}>
          <div style={{ position: "relative" }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[0], index: 0 }) }}> X </div>}<img style={{
              width: (20 * s).toString() + "vw",
              height: "fit-content",
              maxHeight: "45vmax",
              objectFit: "contain", borderRadius: "1vw",
              background: ""
            }}
              className="picture" id="pic" src={media[0]} /></div>
          <div style={{ position: "relative" }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[1], index: 1 }) }}> X </div>}
            <img style={{
              width: (20 * s).toString() + "vw",
              height: "fit-content",
              maxHeight: "45vmax",
              objectFit: "contain", borderRadius: "1vw",
              background: ""
            }}
              className="picture" id="pic" src={media[1]} /></div></div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ position: "relative" }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[2], index: 2 }) }}> X </div>}
            <img style={{
              width: (10 * s).toString() + "vw",
              height: "fit-content",
              maxHeight: "45vmax",
              objectFit: "contain", borderRadius: "1vw",
              background: ""
            }}
              className="picture" id="pic" src={media[2]} /></div>
          <div style={{ position: "relative" }}>
            {this.props.editable && <div style={ ///EXIT BUTTON
              { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
            } onClick={() => { this.props.removeMedia({ content: media[3], index: 3 }) }}> X </div>}
            <img style={{
              width: (10 * s).toString() + "vw",
              height: "fit-content",
              maxHeight: "45vmax",
              objectFit: "contain", borderRadius: "1vw",
              background: ""
            }}
              className="picture" id="pic" src={media[3]} /></div>
          <div style={{ position: "relative" }}>
            <div style={{
              position: "relative", width: (10 * s).toString() + "vw",
              height: "fit-content",
            }}>
              <div style={{ background: "black", opacity: ".5", position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}></div>
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                position: "absolute", width: "100%", height: "100%", top: 0, left: 0, color: "white"
              }}>+ {media.length - 5}</div>
              <div style={{ position: "relative" }}></div>
              {this.props.editable && <div style={ ///EXIT BUTTON
                { color: "#A80303", fontWeight: "600", fontSize: "2.3vmin", textShadow: "0px 0px 2px white", width: "fit-content", height: "fit-content", position: "absolute", cursor: "pointer", right: ".4vmin", top: ".35vmin", background: "", padding: ".3vmin" }
              } onClick={() => { this.props.removeMedia({ content: media[4], index: 4 }) }}> X </div>}
              <img style={{
                width: (10 * s).toString() + "vw",
                height: "fit-content",
                maxHeight: "45vmax",
                objectFit: "contain", borderRadius: "1vw",
                background: ""
              }}
                className="picture" id="pic" src={media[4]} /></div>
          </div>
        </div>
      </div>


    }
    return (
      <div onClick={(e) => {
        if (this.props.onClick) {
          this.props.onClick(e, this.props);
        }
      }}>
        {mediaDisplay[media.length > 5 ? 6 : media.length]}

      </div>

    )
  }

}


// import React, { Component } from 'react';
// import auth from '../services/auth';
// import { ref, } from "firebase/storage";
// import { storage,  } from '../firbase.config.js';

// export default class ViewMedia extends Component {
//     constructor(props){
//         super(props);
  

//         this.state={

//         }
//     }

// render(){
//         let app = this.props.app;
//         let state = app?.state;
//         let dispatch = app?.dispatch;
//         let componentList = state?.componentList;
//         let styles = state?.styles;
//         let s = this.props.scale? this.props.scale: 1;
//         let media = Array.isArray(this.props.media)? this.props.media: [this.props.media];

//         let mediaDisplay = {

// 1: <div style={{cursor:"pointer", display:"flex", textAlign:"center", flexDirection:"row", justifyContent:"center", borderRadius: "1vw", alignItems:"center"}}>
//                 <div style={{position:"relative",  borderRadius: "1vw",}}>
//                 {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.5vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[0], index: 0})}}> X </div>}
//                             <img style={{ 
//                 width: (40*s).toString()+"vw", 
//                 height: "fit-content",
//                 maxHeight: "35vmax",
//                 objectFit: "contain", borderRadius: "1vw",
//                 background: ""}} 
//                 className="picture" id="pic" src={media[0]} />
//                 </div>
//                 </div>,


// 2: <div style={{cursor:"pointer", display:"flex", textAlign:"center", flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderRadius: "1vw"}}>
//                      <div style={{position:"relative",  borderRadius: "1vw", marginRight:".5vmin" }}>
//                     {this.props.editable &&<div style={ ///EXIT BUTTON
//                              {color: "#A80303", fontWeight:"600", fontSize:"2.5vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[0], index: 0})}}> X </div>}
//                     <img style={{ 
//                     width:(20*s).toString()+"vw", 
//                     height: "fit-content",
//                                                     maxHeight: "45vmax",
//                     objectFit: "contain", borderRadius: "1vw",
//                     background: ""}} 
//                     className="picture" id="pic" src={media[0]} />
//                     </div>
//                      <div style={{position:"relative",  borderRadius: "1vw", }}>
//                     {this.props.editable &&<div style={ ///EXIT BUTTON
//                              {color: "#A80303", fontWeight:"600", fontSize:"2.5vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[2], index: 1})}}> X </div>}
//                     <img style={{ 
//                         width: (20*s).toString()+"vw", 
//                         height: "fit-content",
//                                                     maxHeight: "40vmax",
//                         objectFit: "contain", borderRadius: "1vw",
//                         background: ""}} 
//                         className="picture" id="pic" src={media[1]} />
//                         </div>
//                         </div>,



// 3: <div style={{cursor:"pointer", display:"flex", textAlign:"center", flexDirection:"row", justifyContent:"space-between", borderRadius: "1vw", alignItems:"center"}}>
//                              <div style={{position:"relative",  borderRadius: "1vw", marginRight:".5vmin"}}>
//                             {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.5vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[0], index: 0})}}> X </div>}<img style={{ 
//                             width: (20*s).toString()+"vw", 
//                             height: "fit-content",
//                                                     maxHeight: "45vmax",
//                             objectFit: "contain",borderRadius: "1vw",
//                             background: ""}} 
//                             className="picture" id="pic" src={media[0]} /></div>
                            
//                             <div style={{display:"flex", borderRadius: "1vw", flexDirection:"column", justifyContent:"space-between",}}>
//                             <div style={{position:"relative",  borderRadius: "1vw",}}>
//                             {this.props.editable &&<div style={ ///EXIT BUTTON
//                              {color: "#A80303", fontWeight:"600", fontSize:"2.5vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[1], index: 1})}}> X </div>}
//                             <img style={{ 
//                                width: (10*s).toString()+"vw", 
//                                height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                 objectFit: "contain", borderRadius: "1vw",
//                                 background: ""}} 
//                                 className="picture" id="pic" src={media[1]} />
//                                 </div>
//                                  <div style={{position:"relative",  borderRadius: "1vw",}}>
//                                 {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.5vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[2], index: 2})}}> X </div>}
//                                 <img style={{ 
//                                 width: (10*s).toString()+"vw", 
//                                 height: "fit-content",
//                                 maxHeight: "45vmax",
//                                 objectFit: "contain",borderRadius: "1vw",
//                                 background: ""}} 
//                                 className="picture" id="pic" src={media[2]} />
//                                 </div>
//                                 </div>
//                                 </div>,




// 4: <div style={{cursor:"pointer", display:"flex", textAlign:"center", flexDirection:"row", justifyContent:"center", alignItems:"center", borderRadius: "1vw"}}>
//                                 <div style={{display:"flex", flexDirection:"column", marginRight:".5vmin", justifyItems:"center"}}><div style={{position:"relative",  borderRadius: "1vw", display:"flex", flexDirection:"column"}}>
//                                     {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[0], index: 0})}}> X </div>}<img style={{ 
//                                     width: (10*s).toString()+"vw", 
//                                     height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                     objectFit: "contain", borderRadius: "1vw",
//                                     background: ""}} 
//                                     className="picture" id="pic" src={media[0]} /></div>
//                                     <div style={{position:"relative",  borderRadius: "1vw",}}>
//                                     {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[1], index: 1})}}> X </div>}
//                                     <img style={{ 
//                                        width: (10*s).toString()+"vw", 
//                                        height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                         objectFit: "contain",borderRadius: "1vw",
//                                         background: ""}} 
//                                         className="picture" id="pic" src={media[1]} /></div></div>
//                                     <div style={{display:"flex", flexDirection:"column"}}>
//                                          <div style={{position:"relative",  borderRadius: "1vw",}}>
//                                         {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[2], index: 2})}}> X </div>}
//                                         <img style={{ 
//                                        width: (10*s).toString()+"vw", 
//                                        height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                         objectFit: "contain",borderRadius: "1vw",
//                                         background: ""}} 
//                                         className="picture" id="pic" src={media[2]} /></div>
//                                          <div style={{position:"relative",  borderRadius: "1vw",}}>
//                                         {this.props.editable &&<div style={ ///EXIT BUTTON
//                            {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[3], index: 3})}}> X </div>}
//                                         <img style={{ 
//                                         width: (10*s).toString()+"vw", 
//                                         height: "fit-content",
//                                         maxHeight: "45vmax",
//                                         objectFit: "contain", borderRadius: "1vw",
//                                         background: ""}} 
//                                         className="picture" id="pic" src={media[3]} /></div>
//                                         </div>
//                                         </div>,


// 5: <div style={{cursor:"pointer", display:"flex", textAlign:"center", borderRadius: "1vw", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
//                                             <div style={{display:"flex", borderRadius: "1vw", flexDirection:"row",}}>
//                                             <div style={{position:"relative",  borderRadius: "1vw",}}>
//                                             {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[0], index: 0})}}> X </div>}
//                                                 <img style={{ 
//                                             width: (20*s).toString()+"vw", 
//                                             height: "fit-content",
//                                             maxHeight: "45vmax",
//                                             objectFit: "contain", borderRadius: "1vw",
//                                             background: ""}} 
//                                             className="picture" id="pic" src={media[0]} /></div>
//                                              <div style={{position:"relative",  borderRadius: "1vw",}}>
//                                             {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[1], index: 1})}}> X </div>}
//                                             <img style={{ 
//                                                  width: (20*s).toString()+"vw", 
//                                                  height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                 objectFit: "contain",borderRadius: "1vw",
//                                                 background: ""}} 
//                                                 className="picture" id="pic" src={media[1]} /></div></div>
//                                             <div style={{display:"flex", flexDirection:"row", }}>
//                                             <div style={{position:"relative",  borderRadius: "1vw", marginLeft:"1.5vmin"}}>
//                                             {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[2], index: 2})}}> X </div>}
//                                             <img style={{ 
//                                                 width: (10.6*s).toString()+"vw", 
//                                                 height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                 objectFit: "contain", borderRadius: "1vw",
//                                                 background: ""}} 
//                                                 className="picture" id="pic" src={media[2]} /></div>
//                                                  <div style={{position:"relative",  borderRadius: "1vw", marginLeft:"1.5vmin"}}>
//                                                 {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[3], index: 3})}}> X </div>}
//                                                 <img style={{ 
//                                                 width: (10.6*s).toString()+"vw", 
//                                                 height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                 objectFit: "contain", borderRadius: "1vw",
//                                                 background: ""}} 
//                                                 className="picture" id="pic" src={media[3]} /></div>
//                                                  <div style={{position:"relative",  borderRadius: "1vw", marginLeft:"1.5vmin"}}>
//                                                 {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[4], index: 4})}}> X </div>}
//                                                 <img style={{ 
//                                                 width: (10.6*s).toString()+"vw", 
//                                                 height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                 objectFit: "contain", borderRadius: "1vw",
//                                                 background: ""}} 
//                                                 className="picture" id="pic" src={media[4]} /></div>
//                                                 </div>
//                                                 </div>,


// 6: <div style={{cursor:"pointer", display:"flex", textAlign:"center", borderRadius: "1vw", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
//                                                 <div style={{display:"flex", flexDirection:"row",}}>
//                                                 <div style={{position:"relative"}}>
//                                                 {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[0], index: 0})}}> X </div>}<img style={{ 
//                                                 width: (20*s).toString()+"vw", 
//                                                 height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                 objectFit: "contain", borderRadius: "1vw",
//                                                 background: ""}} 
//                                                 className="picture" id="pic" src={media[0]} /></div>
//                                                  <div style={{position:"relative"}}>
//                                                 {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[1], index: 1})}}> X </div>}
//                                                 <img style={{ 
//                                                      width: (20*s).toString()+"vw", 
//                                                      height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                     objectFit: "contain",borderRadius: "1vw",
//                                                     background: ""}} 
//                                                     className="picture" id="pic" src={media[1]} /></div></div>
                                                    
//                                                 <div style={{display:"flex", flexDirection:"row"}}>
//                                                 <div style={{position:"relative"}}>
//                                                 {this.props.editable &&<div style={ ///EXIT BUTTON
//                            {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[2], index: 2})}}> X </div>}
//                                                 <img style={{ 
//                                                     width: (10*s).toString()+"vw", 
//                                                     height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                     objectFit: "contain", borderRadius: "1vw",
//                                                     background: ""}} 
//                                                     className="picture" id="pic" src={media[2]} /></div>
//                                                      <div style={{position:"relative"}}>
//                                                     {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[3], index: 3})}}> X </div>}
//                                                     <img style={{ 
//                                                     width: (10*s).toString()+"vw", 
//                                                     height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                     objectFit: "contain", borderRadius: "1vw",
//                                                     background: ""}} 
//                                                     className="picture" id="pic" src={media[3]} /></div>
//                                                      <div style={{position:"relative"}}>
//                                                     <div style={{position:"relative", width: (10*s).toString()+"vw", 
//                                                    height: "fit-content",}}>
//                                                         <div style={{background:"black", opacity:".5", position:"absolute", width:"100%", height:"100%", top:0, left:0}}></div>
//                                                         <div style={{display:"flex", justifyContent:"center", alignItems:"center", 
//                                                         position:"absolute", width:"100%", height:"100%", top:0, left:0, color:"white"}}>+ {media.length-5}</div>
//                                                          <div style={{position:"relative"}}></div>
//                                                         {this.props.editable &&<div style={ ///EXIT BUTTON
//                             {color: "#A80303", fontWeight:"600", fontSize:"2.3vmin", textShadow:"0px 0px 2px white", width:"fit-content", height:"fit-content", position:"absolute",cursor:"pointer", right:".4vmin", top:".35vmin" , background:"", padding:".3vmin" }
//                             } onClick={()=>{this.props.removeMedia({content: media[4], index: 4})}}> X </div>}
//                                                     <img style={{ 
//                                                     width:(10*s).toString()+"vw", 
//                                                     height: "fit-content",
//                                                     maxHeight: "45vmax",
//                                                     objectFit: "contain", borderRadius: "1vw",
//                                                     background: ""}} 
//                                                     className="picture" id="pic" src={media[4]} /></div>
//                                                     </div>
//                                                     </div>
//                                                     </div>


//         }
//         return(
//             <div onClick={(e)=>{
//                 if(this.props.onClick){
//                     this.props.onClick(e, this.props);
//                 }
//             }}>
//                 {mediaDisplay[media.length>5? 6: media.length]}
                
//                  </div>
                 
//              )
//     }

// }