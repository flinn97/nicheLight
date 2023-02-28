import { Component } from 'react';
import "../App.css";
import auth from '../services/auth';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import ViewMedia from '../componentListNPM/viewMediaComponent';
import {withRouter} from 'react-router-dom';

export default class Follower extends Component {
  constructor(props){
    super(props);

  }
  async componentDidMount(){
    debugger
    
    let url = window.location.href;
    let splitUrl = url.split('/');
    let id = splitUrl[splitUrl.length-1];
    let comp = this.props.app.state.componentList.getComponent("user", id, "hash")
    if(comp){
      this.props.app.dispatch({currentFollowing: comp, myswitch: "following", });
      return
    }
    if(Object.keys(this.props.app.state.hash).includes(id)){
      id= this.props.app.state.hash[id];
    
    let user = await auth.getPicOwner(this.props.app.state.componentList, id);
        this.props.app.dispatch({currentFollowing: user, myswitch: "following", });
      }
      else{
        let hash = this.props.app.state.hash
            let hashVal = Math.floor(Math.random()*1000000);
            let obj = {...hash, [hashVal]: id}
            splitUrl.pop();
            splitUrl.push(hashVal);
            let s = '';
            for(const key in splitUrl){
              if(parseInt(key)!== splitUrl.length-1){
                s+= splitUrl[key]+"/"

              }
              else{
                s+= splitUrl[key]

              }
            }
            window.history.replaceState({}, null, s);
            await this.props.app.dispatch({hash:obj, updateHash:true});

        
      }
      
 
  }
  async componentDidUpdate(){
    if(this.props.app.state.updateHash){
      await this.props.app.dispatch({updateHash:false})
      this.componentDidMount();

    }
  }

  render(){
    let app = this.props.app
    let pic = this.props.app.state.componentList?.getComponents();
    let state = app.state;
    let styles =state.styles;
    let switchcase = app.state.switchcase;
    let dispatch= app.dispatch;
    let spawnerHandle = state.currentFollowing?.getJson().spawnerHandle;
    let bio = state.currentFollowing?.getJson().bio;
    

    let picsource = state.currentFollowing?.getJson().picURL;
    // let bio = app.state.user.getJson().bio;
    // let website = app.state.user.getJson().website;
    // let social = app.state.user.getJson().socialHandle;
    let complist = app.state.componentList.getList("follow");
    let followIDarr = [];
    
     for(const key in complist){
      followIDarr.push(complist[key]?.getJson().followID);
     }
    
  return (
    <>{state.currentFollowing&&(
    <div style={{
      display: "flex", width:"100%",
      flexDirection: "column", height:"99vh", padding:"1vmin", height:"fit-content"}}> 
      {/* INFORMATION */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-around",
        marginBottom:"4vmin"}}>
{/* PICTURE and NAME */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems:"center", justifyContent:"center",
        marginLeft:"2vw",
        marginRight:"2vw",
        
        
        fontFamily: styles.fonts.fontLight,
        fontSize: styles.fonts.fontSubheader1,
      }}
      > 
      <div style={{
            userSelect: "text",  textAlign:"center",
            fontFamily: styles.fonts.fontBold, fontSize: "2.5vmin",  marginBottom:"1vh"   
            }}>{spawnerHandle}</div>
      <img  style={{
        width:"9vmax", height:"9vmax", borderRadius:"50%",
      }} src={picsource} />

 </div>



{/* BIO */}
      <div style={{display: "flex",
        flexDirection: "column", width: styles.mySpawn.bioW,
        alignItems:"flex-start", justifyContent:"center", 
        fontFamily:styles.fonts.fontLight,}}>
      <div style={{fontFamily:styles.fonts.fontLight, fontSize: "2.1vmin", marginBottom:"1vh",}}>{bio}</div>
      <div style={{fontFamily:styles.fonts.fontBold, display: "flex",  fontSize: "1.9vmin",
        flexDirection: "row",}}>Social: 
        <a style={{fontFamily:styles.fonts.fontLight, marginLeft:"1vmin", fontSize: "1.9vmin"}} href={state.currentFollowing.getJson().socialHandle.includes("http") ? state.currentFollowing.getJson().socialHandle:"https://"+ state.currentFollowing.getJson().socialHandle} target="_blank"> {state.currentFollowing.getJson().socialHandle}</a>
      </div>
      <div style={{fontFamily:styles.fonts.fontBold, display: "flex",  fontSize: "1.9vmin",
        flexDirection: "row",}}>Website: 
        <a style={{fontFamily:styles.fonts.fontLight, marginLeft:"1vmin",  fontSize: "1.9vmin"}} href={state.currentFollowing.getJson().website.includes("http") ? state.currentFollowing.getJson().website:"https://"+ state.currentFollowing.getJson().website} target="_blank"> {state.currentFollowing.getJson().website}</a>
      </div> 
      </div>
      
    

      </div>  
      
<div style={{...styles.buttons.buttonFollow, background: styles.colors.color2}}>
  {followIDarr.includes(state.currentFollowing?.getJson()._id)?(
  <div onClick={()=>{
    debugger
    let followinger = state.componentList.getComponent("follow", state.currentFollowing?.getJson()._id, "followID")
    followinger.unFollow(app.state.componentList)
  }} style={{ ...styles.buttons.buttonFollowing, height:"3vh",
}}>Unfollow</div>
):(
<div   style={{ ...styles.buttons.buttonFollow, border: ".1rem solid rgba(15,15,15,.00)", height:"3vh",
}}onClick= {() => {
            let complist = app.state.componentList.getList("follow");
          let arr = [];
          debugger
           for(const key in complist){
            arr.push(complist[key]?.getJson().followID);
           }
           if(!arr.includes(state.currentFollowing?.getJson()._id)){
            let user = app.state.componentList.getComponent("user", state.currentFollowing?.getJson()._id)
            app.state.user?.follow(user)
           }
           }}>
        Follow</div>)}</div>


      <div style={{fontFamily:styles.fonts.fontBold, fontSize: "1.9vmin", }}>
        {spawnerHandle}'s Spawns:
        </div>
      <hr></hr>
      

{/* FEED */}
     <div style={{display: "flex",
        flexDirection: "row", flexWrap:"wrap", justifyContent:"center", alignContent:"center",
        alignItems:"center",}}> 
        

      {pic?.map((picture, index)=>
      <div style={{display: "flex", flexDirection: "row", flexWrap:"wrap",  textAlign:"center", alignItems:"", }}>
        
        {(picture.getJson().type!=="comment" &&picture.getJson().type!=="follow" )&&(<>
        {(picture.getJson().owner===app.state.currentFollowing.getJson()._id && !picture.getJson().type.includes("keep") && !picture.getJson().type.includes("user")) &&(
          <div key={index} 
          
          style={{display: "flex",  flexDirection: "column", width:"18vw", flexWrap:"wrap", fontFamily:styles.fonts.fontBold, fontSize: "1.9vmin", width:"18vw",
          marginBottom:"1vh", padding:"1vmin",  borderRadius:"1.5vmin", justifyContent:"space-between", height:"fit-content",  marginTop:"1.1vmin", marginRight:".81vw", marginLeft:".81vw",
          maxHeight:"fit-content",  minHeight:"fit-content", background:"linear-gradient(to bottom, "+styles.colors.Grey2+", #FFFFFF" }}> 
          <Link to ={"../"+picture.getJson().type+"/"+picture.getJson()._id}>
            <div style={{fontFamily:styles.fonts.fontBold, cursor:"pointer", marginBottom:"1vmin",  textAlign:"left"}}>
          {picture.getJson().name}
          </div></Link>
         <Link to ={"../"+picture.getJson().type+"/"+picture.getJson()._id}>
          <ViewMedia  disablePlayButton= {true}
          style= {{objectFit: "contain", cursor:"pointer",
                      borderRadius:".3vmin",
                       maxHeight: styles.mySpawn.imgW, 
                      }} 
                      scale = {0.41} media= {Object.keys(picture.getJson().picURLs).length!==0? (Object.values(picture.getJson().picURLs)) : [picture.getJson().picURL]}/> 
                      
                      </Link>
                      
          
                      <div style={{display:"flex", alignItems:"flex-start", justifyItems:"flex-start", flexWrap:"wrap"}}>

                       
                      
                      <div style={{ display:"flex", flexWrap:"wrap", fontFamily:styles.fonts.fontNormal, fontSize: "1.7vmin", letterSpacing:"-.02em", marginLeft:".2vw", alignSelf:"flex-start",justifySelf:"flex-start", textAlign:"left"}}>
                        {picture.getJson().description}
                        </div> 
          
          </div> 
        </div>
)}
      </>  )}
  </div>
      )}</div>
    </div>)}</>
  )}
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}