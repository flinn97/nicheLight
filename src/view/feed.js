import { Component } from 'react';
import "../App.css"
// import Gallery from './pictures';
import left from '../pics/left.webp'
import right from '../pics/right.webp'
import picservice from '../services/picservice';

import Notes from './comment';
import Keep from '../pics/keep.png';
import LikeHeart from '../pics/likeheart.webp';
import styleService from '../services/styleService';
import EditQuill from '../pics/EditQuill.png';
import ViewMedia from '../componentListNPM/viewMediaComponent';
import ContextMenu from './contextMenu';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

export default class Feed extends Component {
  constructor(props) {
    
    super(props);
    this.getPic=this.getPic.bind(this);
    this.changePic=this.changePic.bind(this);

    this.state = {
      comment: false,
      arr:[]
    }
  }
  getMOV(list){
    
    let l = [];
    for(const key in list){
      if(list[key].toLowerCase().includes(".mov")){
        l.push({video:true, file: list[key]})
      }
      else{
        l.push(list[key])
      }
    }
    return(l)

  }
  componentDidMount(){
    if(!this.props.id){
      debugger
      this.changePic(this.props.switchcase);
    }
    else{
      
      let url = window.location.href;
      let splitUrl = url.split('/');
      let id = splitUrl[splitUrl.length-1]

      let mpic = this.props.app.state.componentList.getComponent(this.props.switchcase, id)
    this.props.app.dispatch({ myswitch: "feed", pic: mpic, picChange: true, switchcase: this.props.switchcase })

    }
    

  }
  componentDidUpdate(state, props){
    
    if(this.props.switchcase!==state.switchcase){
      this.changePic(this.props.switchcase);
    }

  }


  changePic(type){
    let app = this.props.app;
    let changeType =false;
    if(type === "all"){
      type = app.state.listItems[0]
      changeType=true
    }
    let comp = app.state.componentList.getComponent(type);
    app.dispatch({switchcase:changeType?"all" :type, myswitch:"feed", picChange:true, pic: comp, index: 0, currentComponent:comp})
  }

  getPic(){
    
    let app = this.props.app;
    let state = app.state;
    let pic = state.pic;
    let arr =[]
    if(pic){
    if(Object.keys(pic.getJson().picURLs)[0]){
      
      for (const key in app.state.pic?.getJson().picURLs){
        arr.push(app.state.pic?.getJson().picURLs[key]);
      }
    }
    else{
      arr=[pic.getJson().picURL]
    }
    arr = this.getMOV(arr);
    return arr
  }
  }
  getMappedPic(pic){

    let arr =[]

    if(Object.keys(pic.getJson().picURLs)[0]){
      
      for (const key in pic.getJson().picURLs){
        arr.push(pic.getJson().picURLs[key]);
      }
    }
    else{
      arr=[pic.getJson().picURL]
    }
    return arr
  }


  render() {
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let dispatch = app.dispatch;
    let complist = app.state.componentList.getList("follow");
    let followIDarr = [];
    
     for(const key in complist){
      followIDarr.push(complist[key]?.getJson().followID);
     }
    let currentComponent = app.state.currentComponent;
    let user = app.state.componentList?.getComponent("user");
    return (
      <div style={{ 
        display:"flex", flexDirection: "column", alignItems: "center", alignSelf: "center", justifyContent: "center", width:"fit-content"}}>
        <div style={{  display:"flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", }}>
          <div style={{
            display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"80vw",
            overflow:"hidden"}}>


            <div style={{marginBottom:styles.margins.marginSmallH, justifyContent:"center", }}>
  {/* TITLE */}
  
          <div style={{justifyContent:"center", 
                fontSize: styles.fonts.fontHeader4,
                fontWeight: styles.fonts.fontweightMed,
                fontFamily: styles.fonts.fontNormal,
                userSelect: "text",
                marginLeft: styles.margins.marginSmallW,
                textTransform: "capitalize",
               
                marginBottom: ".2vh",

        }}>{app.state.pic?.getJson().name}</div>
        <div style={{position:"absolute", marginLeft:-2000 }}> 
          {state.componentList.getList( window.location.href.split('/')[window.location.href.split('/').length-1]).map((pic, index)=>
    <div key={index}>
<ViewMedia  disablePlayButton= {true}  scale={.5} media={this.getMappedPic(pic)}  />

    </div>
  )} </div>
{/* SUBTITLE */}
          <div 
          style={{ 
              display:"flex", flexWrap:"wrap", wordBreak:"break-word",
                width: "98%",
                fontSize: "2vh",
                fontWeight: styles.fonts.fontweightMed,
                fontFamily: styles.fonts.fontLight,
                marginLeft: styles.margins.marginSmallW,
                
                userSelect: "text",}}
          >{app.state.pic?.getJson().description}</div>
          </div>

{/* KEEP HERE */}
          <div 
          style={{
          display: "flex", 
          flexDirection:"column",
          justifyContent:"center", 
          alignItems: "center",
          width:styles.myFeed.keepItemW}}>

{app.state.pic&&(<>
{(Object.keys(app.state.pic?.getJson()?.keepers)?.includes(app.state.user?.getJson()._id))
                  ||(app.state.pic?.getJson().owner === app.state.email) ? (
                    
                    <img
                    
                    style={{
                      width:"auto", 
                      height: styles.myFeed.keepH, 
                      cursor: "pointer", 
                      objectFit:"contain"}} 
                src={Keep}/>
                  ):(
                  
                  <img
                  onClick={()=>{
                    debugger
                    if(app.state.user.getJson().owner!=="not logged in"){
                      this.props.app.state?.pic?.keep(app.state.user)

                    }
                  } } 
                   style={{
                    width:"auto", 
                    height: styles.myFeed.keepH, 
                    cursor: "pointer", 
                    objectFit:"contain",
                    filter: styles.mySpawn.satFilter,}}
              src={Keep}/>)
            }</>)}
            {app.state.pic&&(<>
            {
          (Object.keys(app.state.pic?.getJson().keepers).includes(app.state.user?.getJson()._id))
          ||(app.state.pic?.getJson().owner === app.state.email) ? (  <div 
            style={{
              alignSelf:"center", textAlign:"center",
              color:styles.colors.linkVisitedColor, 
              fontWeight: "600", 
              fontSize: styles.fonts.fontSubheader2,
                fontWeight: styles.fonts.fontweightMed,
                fontFamily: styles.fonts.fontTitle,
              cursor: "pointer"}}>
                {app.state.pic?.getJson().keep} Keeps</div> ):(
        <div onClick={this.props.app.state.pic?.keep?.bind(this, app.state.user)}   style={{
          alignSelf:"center",  textAlign:"center",
          color:styles.colors.lightFontColor, 
          fontWeight: "600", 
          fontSize: styles.fonts.fontSubheader1,
            fontWeight: styles.fonts.fontweightMed,
            fontFamily: styles.fonts.fontTitle,
          cursor: "pointer"}}>{app.state.pic?.getJson().keep} Keeps</div>)}</>)}
        </div>


          </div>
          <hr style={{marginBottom:styles.margins.marginSmallH}}></hr>
          

        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", padding:"1vmin", background:"#33333311", borderRadius:"1vmin", alignItems:"center", width:"70vw", marginBottom:"1vmin"}}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width:"70vw", marginLeft:"-10vmin", marginRight:"-10vmin"}}>
        
        <img  onClick={() => {
          let list = [];
          if( app.state.switchcase==="all"){
            for(let comp of app.state.listItems){
              list= [...list, ...app.state.componentList?.getList(comp),];
            }
              
          }
          else{
            list = app.state.componentList.getList(app.state.switchcase)

          }
            let i = app.state.index;
            if (i - 1 < 0 ) {
              i = list.length-1
            }
            else {
              i = i - 1
            }
            if(Object.keys(state.user.getJson().blocked).includes(list[i].getJson().owner)){
              if (i - 1 <= 0 ) {
                i = 0
              }
              else {
                i = i - 1
              }
            }
            if(Object.keys(state.user.getJson().hidden).includes(list[i].getJson()._id)){
              if (i - 1 <= 0 ) {
                i = 0
              }
              else {
                i = i - 1
              }
            }


            dispatch({ pic: list[i], index: i, picChange: true })
          }} 
          ///ARROW LEFT
          style={{ width: styles.myFeed.arrowSizeW, height: styles.myFeed.arrowSizeH, marginRight: styles.myFeed.arrowMargin, cursor:"pointer", }} src={left} />

          <ViewMedia  disablePlayButton= {true}  scale={1.05} media={this.getPic()} onClick={(obj)=>{
            debugger
            dispatch({popupSwitch:"mod", modObj:state.pic});
          }}
          />
          
        {/* <img style={{ 
          width: styles.myFeed.feedW, 
          height: styles.myFeed.feedH,
          objectFit: "scale-down", 
          background: "black"}} 
          className="picture" id="pic" src={app.state.pic?.getJson().picURL} /> */}


        <img
          onClick={() => {
            debugger
            let list = [];
          if( app.state.switchcase==="all"){
            for(let comp of app.state.listItems){
              list= [...list, ...app.state.componentList?.getList(comp),];
            }
              
          }
          else{
            list = app.state.componentList.getList(app.state.switchcase)

          }
            let i = app.state.index;
            if (i + 1 === list.length) {
              i = 0
            }
            else {
              i = i + 1
            }
            if(Object.keys(state.user.getJson().blocked).includes(list[i].getJson().owner)){
              if (i + 1 === list.length) {
                i = 0
              }
              else {
                i = i + 1
              }
            }
            if(Object.keys(state.user.getJson().hidden).includes(list[i].getJson()._id)){
              if (i + 1 === list.length) {
                i = 0
              }
              else {
                i = i + 1
              }
            }


            dispatch({ pic: list[i], index: i, picChange: true })
          }}

          ///ARROW RIGHT
          style={{ width: styles.myFeed.arrowSizeW, height: styles.myFeed.arrowSizeH, marginLeft: styles.myFeed.arrowMargin, cursor:"pointer" }} src={right} />
          



{/* ///below the image\\\ */}
</div><div style={{ display:"flex", justifySelf:"center", display:"flex", flexDirection:'row', alignSelf:"center", justifyContent:"space-between", alignContent:"center", marginLeft:"2vmin", marginRight: "2vmin", fontSize:"1.44vh", alignItems: "center", width:"fit-content"
}}>
        <a 
        /// LINK
        style={{ display:"flex", alignContent:"flex-end", fontSize:"1.82vmin", 
        paddingLeft:"1.8vh",  marginTop:"-1.82vmin", zIndex:"160",
        paddingRight:"1.8vh", 
        paddingBottom:".3vh", 
        width:"fit-content",
          fontFamily:styles.fonts.fontNormal, color: styles.colors.linkVisitedColor, cursor:"pointer",
        }}  href= {app.state.pic?.getJson().destinationURL.includes("http") ? app.state.pic?.getJson().destinationURL:"https://"+app.state.pic?.getJson().destinationURL} target="_blank"> {app.state.pic?.getJson().destinationURL}
        </a></div></div>

      

          <div style={{display:"flex",flexDirection:'row', alignContent:"center", justifyContent:"space-between",
          alignItems:"center",paddingLeft:"4vmax", paddingRight:"4vmax", width:"78vw",
            overflow:"hidden"}}>

{/* THIS IS NAME AND FOLLOW BUTTON */}
{app.state.user.getJson().owner!=="not logged in" &&(
<div style={{display:"flex", flexDirection:'row', justifyContent:"space-between"}}>

<div  style={{display:"flex", flexDirection:'column', justifyContent:"space-between"}}>
          <Link
          to={"../follow/following/"+ (app.state.picOwner?.getJson()?.hash? app.state.picOwner?.getJson()?.hash:app.state.picOwner?.getJson()?._id)}
          onMouseEnter={()=>{
            this.setState({textDeco2: styles.myFeed.textDeco + "grey"})
         }}

           
           
           onMouseLeave={()=>{
            this.setState({textDeco2:"none"})
            }}

       style={{
            cursor:"pointer",
            fontWeight: styles.fonts.fontweightMed,
            fontFamily: styles.fonts.fontLight,
            fontSize: styles.fonts.fontSubheader2,
            marginBottom: styles.margins.marginSmallH,
            textDecoration: this.state.textDeco2,
            
}}> {app.state.picOwner?.getJson().spawnerHandle} 
          
          </Link>
      
{app.state.pic?.getJson().owner !== app.state.user?.getJson()._id && 
(<div style={{...styles.buttons.buttonFollow, background: styles.colors.color2}}>
  {followIDarr.includes(app.state.picOwner?.getJson()._id)?(<div style={{ ...styles.buttons.buttonFollowing, height:"3vh",
}}>Following</div>):(<div   style={{ ...styles.buttons.buttonFollow, border: ".1rem solid rgba(15,15,15,.00)", height:"3vh",
}}onClick= {() => {
            let complist = app.state.componentList.getList("follow");
          let arr = [];
          debugger
           for(const key in complist){
            arr.push(complist[key]?.getJson().followID);
           }
           if(!arr.includes(app.state.picOwner?.getJson()._id)){
            app.state.user?.follow(app.state.picOwner)
           }
           }}>
        Follow</div>)}</div>)}

        {/* ///MENU */}

        <div style={{display:"flex", position:"relative", marginTop:".4vh", zIndex:"16200"}}>
  <div onMouseEnter={()=>{
              this.setState({textDeco: styles.myFeed.textDeco + styles.colors.linkVisitedColor})
           }}
           onMouseLeave={()=>{
            this.setState({textDeco:"none"})
            }}
            style={{cursor:"pointer", 
  fontFamily:styles.fonts.fontNormal, color:styles.colors.linkVisitedColor,
  fontSize: styles.fonts.fontSubheader1, textDecoration: this.state.textDeco, height:"fit-content", 
}} onClick={()=>
  {dispatch({popupSwitch: "contextMenuSpawn", 

})}}
>Menu</div>
  {state.popupSwitch==="contextMenuSpawn"&&(
    <div 
    
    style={{zIndex:"18300", position:"relative", marginLeft:"-2.1vw", marginTop:".4vmin", 
    borderWidth:".25vmin",
    borderStyle:"solid",
    borderImage:"linear-gradient(to bottom, "+styles.colors.color2+", #00000000) 2"}}>
  <ContextMenu app={app} user={state.user} content={state.pic} reportUser={state.picOwner} 
  name={state.pic.getJson().picURL!=="" ?"picURL":"picURLs" } handleClose={()=>{dispatch({popupSwitch:""})}}/>
  </div>)}
  </div>

  </div>
  </div>
  )}


{/* ///LIKES\\\ */}
        <div style={{display: "flex", justifyContent: "center", cursor:"pointer", marginTop:".2vh" }}>
{app.state.pic?.getJson().owner === app.state.email?(<div 
        style={{ display:"flex", position:"relative", height: styles.myFeed.likeItemW, justifyContent: "center",}}> <img style={{ 
          width: "100%",
          objectFit: "contain", alignItems:"center",
        }} 
          src={LikeHeart} />
          <div
          style={{display: "flex",
                      position:"absolute",
                      top:"17%",
                     
                      justifyContent: "center",
                      
                      color: styles.colors.linkVisitedColor,
                      fontSize: "1vmax",
                      fontFamily: styles.fonts.fontBold,
                      fontWeight: styles.fonts.fontweightMed,
                      width:"100%",
                      
        
        }}> 
        {app.state.pic?.getJson().like}</div></div>):(<>
               {app.state.pic&&(<>
        {(Object.keys(app.state.pic?.getJson().likers).includes(app.state.user?.getJson()._id))  ? (
// LIKED
        (<div onClick={(app.state.pic?.unlike.bind(this, app.state.user))}  
        style={{ display:"flex", position:"relative", height: styles.myFeed.likeItemW, justifyContent: "center",}}> <img style={{ 
          width: "100%", 
          objectFit: "contain", alignItems:"center",
        }} 
          src={LikeHeart} />
          
          <div
          style={{display: "flex",
          
                      position:"absolute",
                      top:"17%",
                      
                      justifyContent: "center",
                     
                      color: styles.colors.linkVisitedColor,
                      fontSize: "1vmax",
                      fontFamily: styles.fonts.fontBold,
                      fontWeight: styles.fonts.fontweightMed,
                      width:"100%",
                      
        
        }}> 
        
        
        {app.state.pic?.getJson().like}</div></div>)):(
// NOT LIKED
        (<div onClick={(app.state.pic?.like.bind(this, app.state.user))} 
        style={{ display:"flex", position:"relative", height: styles.myFeed.likeItemW, justifyContent: "center",}}> <img style={{ 
          width: "100%",
          objectFit: "contain", alignItems:"center",
          filter: styles.mySpawn.satFilter,
        }} 
          src={LikeHeart} />
          
          <div style={{
                      position:"absolute",
                      top:"17%",
                      display: "flex",
                      justifyContent: "center",
                      opacity:"66%",
                      color: styles.colors.Grey3,
                      fontSize: "1vw",
                      fontFamily: styles.fonts.fontNormal,
                      fontWeight: styles.fonts.fontweightMed,
                      width:"100%",
                      
        }}> 
        
        
        {app.state.pic?.getJson().like}</div></div>))
          }</>)}</>)}   
        </div>
        </div>


        </div>


        {/* ///COMMENTS\\\ */}
        <div  style={{background:"white", marginTop:styles.margins.marginMediumH, borderRadius: "2vw", padding:"1.8vmin", width: styles.myFeed.feedW,}}> 

        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", verticalAlign:"center", marginTop: styles.margins.marginSmallH, 
            marginBottom: styles.margins.marginMediumH, 
            margins:styles.margins.marginSmallW ,
            }}>
          
          <div style={{
            fontFamily: styles.fonts.fontBold,
            fontSize: styles.fonts.fontHeader2, marginBottom:"1vmin", marginTop:"-1vmin",
            }}>Comments:</div>

        {!this.state.comment ? (
          <div style={{
            ...styles.buttons.buttonComment, marginLeft:"1vmin",
            fontFamily: styles.fonts.fontNormal,
          }} onClick={() => {
            dispatch({ operate: "addcomment", object: { commentOwner: app.state.user?.getJson().spawnerHandle,  picOwner: app.state.pic?.getJson()._id, owner: app.state.user?.getJson()._id, name: app.state.user?.getJson().name, picURL: app.state.user?.getJson().picURL } })
            this.setState({ comment: !this.state.comment })
          }}>+ Add a Comment</div>) : (<Notes  updaterKey="add"  app={app}  handleClose={() => { this.setState({ comment: !this.state.comment }) }} />)}

</div>
{/* INDEX */}
<div style={{display:"flex", flexDirection: "column", width:"100%", }}>
        {app.state.componentList.getList("comment", app.state.pic?.getJson()._id, "picOwner")?.map((comment, index) =>
                <div style={{height:"fit-content", marginBottom:".6vmin"}}
            
            
           key={index}>
            {!this.state[index + "comment"] ? (
              <div 
              style={{display:"flex", flexDirection: "row", width:"100%", alignContent:"center", }}>
          
            <div 
              style={{ display:"flex", flexDirection: "row",    
              
              
            }}>
              
              <img 
              style={{ 
                width:"5.1vmin", height:"5.1vmin", 
                marginRight:"1.1vmin", objectFit:"cover", borderRadius:"2.55vmin",}}
            src={(comment.getJson().picURL===""||comment.getJson().picURL===undefined)? Keep: comment.getJson().picURL }/>

            <div  style={{...styles.comments, display:"flex", flexWrap:"nowrap", flexDirection:"column", objectFit:"contain",width: "52.1vw",}}>



              
              <div style={{
              color:styles.colors.Grey3+"8f", marginRight:".8vmin", 
              fontSize:"1.7vmin",flexWrap:"wrap", }}>
                {(comment.getJson().commentOwner===""||comment.getJson().picURL===undefined)? "unanimous": comment.getJson().commentOwner} said:
                </div>

            {comment?.getJson().note}
            </div>{app.state.user?.getJson()._id===comment?.getJson().owner && (

<div 
  style={{...styles.buttons.buttonEdit, width: styles.myFeed.editW, height: styles.myFeed.editW, cursor:"pointer"  }}>

<img onClick={() => {
  debugger
dispatch({ operate: "update", operation: "cleanPrepare", object: comment })
this.setState({ [index + "comment"]: true })}}

style={{ 
width: styles.myFeed.editW, height: styles.myFeed.editW, 
objectFit: "contain", filter:"drop-shadow(1px 0px 1px grey)"
              }} 
className="picture" id="pic" src={EditQuill} />
</div>)}

            </div>
            
            
          
          </div>
          ) : (<Notes updaterKey="update" app={app} obj={comment} handleClose={() => { this.setState({ [index + "comment"]: !this.state[index + "comment"] }) }} />)}
                  </div>
        )}</div>
</div>
      </div>

    )
  }
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}
// update:[[app.state.pic, {keep: app.state.pic?.getJson().keep +1}]]}, true)