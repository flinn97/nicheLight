import { Component } from 'react';
import SpawnPic from '../pics/spawnPic.png';
import SpawnBack from '../pics/spawnPicBck.png';
import TrashCan from '../pics/trash-can.png';
import Like2 from '../pics/like_grey.png';
import "../App.css";
import Keep2 from '../pics/keep_grey.png';
import ViewMedia from '../componentListNPM/viewMediaComponent';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

export default class MyContent extends Component {
  constructor(props){
    super(props);
    this.getMOV = this.getMOV.bind(this)

  }
  componentDidMount(){
    this.props.app.dispatch({switchcase: "spawn", myswitch:"spawn", });

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
 

  render(){
    let app = this.props.app
    let pic = [
      ...app.state.componentList?.getList("monsters", app.state.user.getJson()._id), 
      ...app.state.componentList?.getList("heroes", app.state.user.getJson()._id),
    ...app.state.componentList?.getList("maps", app.state.user.getJson()._id), 
    ...app.state.componentList?.getList("statblocks", app.state.user.getJson()._id), 
    ...app.state.componentList?.getList("worlds", app.state.user.getJson()._id)];
    let state = app.state;
    let styles =state.styles;
    let switchcase = app.state.switchcase;
    let dispatch= app.dispatch;
    let handle = app.state.user.getJson().spawnerHandle;
    let bio = app.state.user.getJson().bio;
    let website = app.state.user.getJson().website;
    let social = app.state.user.getJson().socialHandle;



    
  return (
    
    <div style={{
      display: "flex",
      
      flexDirection: "column", 
      alignItems: "center", alignSelf: "center", justifyContent: "center", height:"fit-content", marginBottom:"2vh", width:"fit-content",
      
      width:"100%"}}>
       
        
                  <div style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  
                  justifyContent: "space-around",
                  }}>
                <div style={{
                  alignSelf: "flex-start",
                  fontSize: styles.fonts.fontHeader5,
                  fontFamily: styles.fonts.fontTitle, overflowY: "hidden",
                  overflowX: "hidden",

                  //fontWeight: styles.fonts.fontweightMed,
                                        }}>My Content</div>
                </div> 

                  
                

      <div style= {{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight:styles.margins.marginMediumW,
        marginLeft:styles.margins.marginMediumW,
        marginTop:styles.margins.marginLargeH,
        justifyContent: "left",
        width: "100%"
        }}>

<div class="flip-card" onClick= {()=>{

  dispatch({login: true, operation: "cleanPrepare", operate: "addpic" , myswitch: "upload", uploadKey:"add", currentComponent:undefined });

}} 
      style={{...styles.buttons.buttonCreate, padding:"1.5vmin", flexDirection:"column", alignItems:"center"}}>

                              <div style={{ alignSelf:"center", width:"100%", height:"100%",}}
                                  >
                              <div style={{ alignSelf:"center", width:"100%", height:"100%",
                               minHeight:"11vh", background:"",}} 
                                  class="flip-card-inner">
                                <div style={{ alignSelf:"center", width:"100%", height:"100%",
                               
                              }}class="flip-card-front">
                                  <img style={{ maxHeight:"11vh", alignSelf:"center", width:"100%", height:"100%", objectFit:"contain"
                    }} src={SpawnPic}/>
                                </div>
                                <div class="flip-card-back">
                                <img style={{ maxHeight:"11vh",alignSelf:"center", width:"100%", height:"100%", objectFit:"contain"
                    }} src={SpawnBack}/>
                                </div>
                              </div>
                            </div>
        
      
      
                              <div style={{
                    
                    fontFamily: styles.fonts.fontLight,
                    letterSpacing: ".01rem", marginTop:"1vmin",
                    }}>Create Content</div></div>

                    <vl style={{border:"solid 1px #44444433", marginLeft:"2vmin", height:"9vh"}}></vl>

          {/* BIO and stuff */}
<div style={{
        display: "flex",
        flexDirection: "column",
        width: styles.mySpawn.bioW,
        
        marginLeft:styles.margins.marginMediumW,
        fontFamily: styles.fonts.fontLight,
        fontSize: styles.fonts.fontSubheader2,
        
        
        }}>
<div style={{display: "flex", flexDirection:"row", alignItems:"center", marginBottom:"1vmin"}}>

                  <img src={state.user.getJson().picURL} style={{marginRight:"2vmin", width:"9vmin", height:"9vmin", borderRadius:"50%", objectFit:"cover",}} />
                  <div style={{...styles.buttons.buttonCreate, cursor:"pointer", position: "relative", alignSelf: "center", padding: ".6vmin", color: "maroon", justifyContent: "space-around",
                marginTop: styles.margins.marginSmallH,
                  fontFamily: styles.fonts.fontNormal }}  
                onClick={dispatch.bind(this,{popupSwitch:"editUser"})}> 
                <div style={{padding:".6vh", fontFamily:styles.fonts.fontNormal, fontSize:"1.6vmin", textDecoration:"", width:"fit-content"}}>Update My Stats 
                  </div></div>
                  </div>

            <div style={{
            userSelect: "text",  
            fontFamily: styles.fonts.fontBold,           
            }}
        >{handle} </div>

<div style={{display: "flex", flexDirection:"row", alignItems:"flex-start", }}>
            <div style={{
            userSelect: "text",
            fontFamily: styles.fonts.fontNormal,
            marginRight:"1vmin"
            }} 
        >About: </div><div style={{
          userSelect: "text",
          fontFamily: styles.fonts.fontLight,
          }}>{bio} </div></div>

<div style={{display: "flex", flexDirection:"row",  alignItems:"flex-start", }}>
            <div style={{
            userSelect: "text",
            fontFamily: styles.fonts.fontNormal,
            marginRight:"1vmin"
            }} 
        >Website: </div><a style={{
          userSelect: "text",
          fontFamily: styles.fonts.fontLight,
          }}
          href= {website.includes("http") ? website:"https://"+website} target="_blank"
          >{website} </a></div>

<div style={{display: "flex", flexDirection:"row",  alignItems:"flex-start", }}>
            <div style={{
            userSelect: "text",
            fontFamily: styles.fonts.fontNormal,
            marginRight:"1vmin"
            }}
        >Social: </div><a style={{
          userSelect: "text",
          fontFamily: styles.fonts.fontLight,  marginBottom: "3vh", 
          }} 
          href= {social.includes("http") ? social:"https://"+social} target="_blank"
          >{social} </a>
          </div>
</div>



</div><div style={{fontFamily:styles.fonts.fontBold, fontSize: "1.9vmin", alignSelf:"flex-start",  marginBottom: ".3vh", }}>Content:</div>
{/* ARRAY */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        
        
        marginLeft:styles.margins.marginMediumW,
        
        justifyContent: "space-evenly",
        width: "100%", flexWrap: "wrap",
        }}>
<hr style={{height:"2px", width:"98%", marginBottom:"1vmin", borderRadius:"1vmin", opacity:".52"}}></hr>


      {pic?.map((picture, index)=>
      <div style={{width: styles.mySpawn.keepWidth, marginBottom:"1vh", marginRight:"1vw",  flexWrap: "wrap", alignCo:"center",}}>
        
        {(picture.getJson().type!=="comment" &&picture.getJson().type!=="follow" )&&(<div style={{}}>

        {(picture.getJson().owner===app.state.email && !picture.getJson().type.includes("keep") && !picture.getJson().type.includes("user")) &&(

          <div key={index} style={{display:"flex", flexDirection:"row", flexWrap: "wrap", background:"linear-gradient(to bottom, "+styles.colors.Grey2+", #FFFFFF",
          borderRadius: "1vw",
           
          width:"fit-content",
          
          
            paddingTop: ".8vmax", paddingLeft: ".28vmax", paddingRight: ".28vmax", paddingBottom:".8vmax"
        }} >
          <div  style= {{width: styles.mySpawn.keepWidth, 
                        
                        height:"auto", cursor:"pointer", 
                      
                        borderColor: styles.colors.linkVisitedColor+"22",
                        borderRadius: "1vw",
                        objectFit: "scale-down", marginBottom: "-2vh",}} 
                        
                       > <Link to = {`/${picture.getJson().type}/`+ picture.getJson()._id}  style={{ fontFamily: styles.fonts.fontBold, fontSize: "2.5vh", width: "100%",  flexWrap: "wrap", cursor:"pointer", }}>
          <ViewMedia style={{borderRadius: "1vw",}} scale = {0.45} media= {Object.keys(picture.getJson().picURLs).length!==0? this.getMOV(Object.values(picture.getJson().picURLs)) : [picture.getJson().picURL]}/> </Link>
        </div>

          {/* <img style= {{width: styles.mySpawn.keepWidth, 
                        height:"auto", cursor:"pointer", background: styles.colors.Grey1,
                        borderRadius: "1vw",
                        borderColor: styles.colors.linkVisitedColor+"22",
                        borderStyle: "none solid none solid", padding: ".08vh" ,
                        objectFit: "scale-down"}} 
                        src={picture.getJson().picURL} onClick={dispatch.bind(this, {myswitch: "feed", pic: picture, picChange:true, switchcase:picture.getJson().type  })} /> */}


          <div style={{display:'flex', flexDirection:'column'}}>
{/* THIS IS THE FIRST ROW */}
            <div style={{display:"flex", flexDirection:"row",  justifyContent:"space-between", width: styles.mySpawn.keepWidth,}}>
              <div style={{ fontFamily: styles.fonts.fontNormal,  fontSize: styles.fonts.fontSubheader3, }}>
              <Link to = {`/${picture.getJson().type}/`+ picture.getJson()._id}  style={{ fontFamily: styles.fonts.fontBold, fontSize: "2.5vmin", width: "100%",  flexWrap: "wrap", cursor:"pointer", }} >
                {picture.getJson().name}</Link>
              </div>
              <div style={{ ...styles.buttons.buttonEdit,
                display:"flex", 
                flexDirection:"row", 
                cursor:"pointer", 
                textDecoration:"",
                alignSelf:"start",
                background:"",
                width: "12%",
                borderRadius:"29%",
                justifyContent: "center",
                marginBottom: "2vh",
                zIndex:"8000"

                }} 
              onClick={async ()=>{
                
                await dispatch({currentComponent:undefined})
                // const delay = ms => new Promise(res => setTimeout(res, ms));
                // await delay(1000);
                dispatch({myswitch: "upload", uploadKey: "update", operation: "cleanPrepare", operate:"update", object: picture})}}>
                EDIT</div>
            </div>


            <div style={{  display:"flex", fontFamily: styles.fonts.fontNormal,  fontSize: styles.fonts.fontSubheader2, wordWrap:"break-word",}}>

              <div style={{ display:"flex", flexDirection:"row", wordWrap:"break-word", flexWrap: "wrap",  
              fontFamily: styles.fonts.fontNormal, marginBottom:"1vh", fontSize: styles.fonts.fontSubheader3, wordBreak:"break-word", 
               textAlign:"left", width: "100%", maxWidth:styles.mySpawn.keepWidth, padding:".1px"
              }} >
                {picture.getJson().description}</div>
                
              </div>
              <hr ></hr>
              
            <div style={{display:"flex", minHeight:"1vmax",flexWrap: "wrap", flexDirection:"row", fontFamily: styles.fonts.fontNormal, width:styles.mySpawn.keepWidth, justifyContent:"space-between",}}>
            <div 
            style={{display:"flex",flexWrap: "wrap", flexDirection:"row", fontFamily: styles.fonts.fontNormal, width:"10vw"}}
            ><div style={{
              marginLeft:".5vw", ...styles.buttons.buttonUnfollow, cursor: "", background:"", border:"", justifyContent:"left",
              color: styles.colors.darkFontColor,
              fontFamily: styles.fonts.fontBold, 
              fontSize: styles.fonts.fontSubheader2, width:"fit-content"
          }}> {picture.getJson().keep} <img style={{ height:styles.fonts.fontSubheader2, objectFit: "scale-down",
          justifyContent: "space-around",
          marginLeft: ".15vw",
          marginBottom:"-.2vh"
          
          }} src={Keep2}/> </div>


            
            <div style={{...styles.buttons.buttonUnfollow, cursor: "", background:"", border:"", justifyContent:"left",  
              color: styles.colors.darkFontColor,
              fontFamily: styles.fonts.fontBold, 
              fontSize: styles.fonts.fontSubheader2, width:"fit-content"}}>{picture.getJson().like} <img style={{ height:styles.fonts.fontSubheader2, objectFit: "scale-down",
              justifyContent: "space-around",
              marginLeft: ".15vw", 
              marginBottom:"-.2vh"
              
              }} src={Like2}/></div>
            {/* REMOVED BECAUSE NOT IMPLEMENTED */}
            {/* <div style={{ fontFamily: styles.fonts.fontNormal,  fontSize: styles.fonts.fontSubheader3,}}>Promote</div> */}
</div>
            <div style={{ 
              
              display:"flex", position:"initial", flexDirection:"row", cursor:"pointer", alignContent:"center",
              width: "fit-content",padding:"2px", 
              fontFamily: styles.fonts.fontNormal,  fontSize: styles.fonts.fontSubheader2
            }}
          onClick={async ()=>{
            await app.dispatch({objForDelete:picture});
            app.dispatch({popupSwitch:"del"})

          }}
          >
            <img style={{ height: styles.fonts.fontHeader1, 
              width: "fit-content", padding: "2px",
                    }} src={TrashCan}/>
          </div>
            
            </div>
            
          
          </div> 
        </div>

)}
      </div>  )}
  </div>
      )}</div >

    </div>
  )}
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}