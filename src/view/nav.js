import { Component } from 'react';
import auth from '../services/auth';
import "../App.css";
import SpawnPic from '../pics/spawnPic.png';
import Keep from '../pics/keep.png';

import { BrowserRouter, Route, Link, Routes } from "react-router-dom";



export default class Nav extends Component {
  constructor(props){
    super(props);
  }
 

  render(){
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
    let pic = this.props.app.state.componentList?.getComponents();
    
    let switchcase = app.state.switchcase;
    let dispatch= app.dispatch;
    let handle = app.state.user?.getJson().spawnerHandle;
    let bio = app.state.user?.getJson().bio;
    let website = app.state.user?.getJson().website;
    let social = app.state.user?.getJson().socialHandle;
  return (
        <div style={{
          
                      display:"flex",
                     userSelect: "none",
                     flexDirection:"column",
                     fontSize: "2.3vmin",
                     background: styles.colors.White1,
                     boxShadow: styles.shadows.sideShadow,
                     
                     
                     width: styles.menu.menuW,
                     
                     zIndex:"0",
                     minHeight: styles.logoTop.stripRemainder,
                     fontFamily: styles.fonts.fontNormal,
                     fontWeight: styles.fonts.fontweightMenu,
                     }}> 
{app.state.login &&(
<div style={{ display:"flex",
                     
                     flexDirection:"column", alignItems:"center", fontFamily:styles.fonts.fontNormal, fontSize:"1.2vmin",
         alignSelf:"center", marginTop:styles.margins.marginMediumH, marginBottom: "-1.5vmax", }} >
           <img src={state.user?.getJson().picURL} style={{width:"9vmin", height:"9vmin", borderRadius:"50%", objectFit:"cover",}} />{handle} </div>)}

{/* MENU ITEMS WHOLE */}
    <div style={{ display: "flex",
                  flexDirection: "column",
                  marginLeft: styles.menu.marginLeft,
                  marginRight: styles.menu.marginLeft,
                  marginTop: styles.menu.marginTop,  
                  alignContent: "space", 
                  width: styles.menu.menuInnerW, 
                  
                               
                  }}> 



{/* KEEP */}
    {app.state.login && (<>
    
      {state.switchCase?.filter(obj => obj.feed === undefined).map((obj, index) =>
      <Link to={obj.path}
      style={{ 
          cursor:"pointer", 
          display: "flex", 
          flexDirection: "row", 
          alignItems: "center",
          marginBottom: styles.menu.marginBottom,
          fontFamily: "inherit",
                }}>
            <div  class="flip-card" style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center", justifyContent:"space-around"}}>
            
            <div style={{
                                  marginRight:"1.25vmax",
                                    height: styles.menu.menuCardh,
                                             
                                    }} >
                            <div style={{
                                   marginRight:styles.menu.menuCardmargin,
                                    height: styles.menu.menuCardh,                                      
                                            
                                    }} class="flip-card-inner">
                              <div style={{
                                  
                                    height: styles.menu.menuCardh,                                  
                                             
                                    }} class="flip-card-front">
                                <img style={{
                                  
                                    height: styles.menu.menuCardh,                                      
                                    objectFit: "contain",          
                                    }} src={obj.icon}/>
                              </div>
                              <div style={{}} class="flip-card-back">
                              <img style={{                                     
                                    height: styles.menu.menuCardh,
                                    objectFit: "contain",          
                                    }} src={obj.icon}/>
                              </div>
                            </div>
                          </div>

              <div 
               
          
          style={{
                marginLeft: state.switchcase===obj.switchCase||(obj.switchcase==="keep" &&state.switchcase==="follow") ? styles.menu.marginLeft:"",
                fontFamily: styles.fonts.fontNormal,
                 color:styles.colors.Black1,
                fontSize:"2vmin",
                letterSpacing: ".01rem",
                
              
              }}>
    {obj.name} </div>
    </div>
    </Link>
      )}
    
    </>)}



        
{/* WITHOUT SYMBOL               */}
<div style={{
      marginLeft: "2.24vw",
      
}}>

{state.switchCase?.filter(obj => obj.feed === true).map((obj, index) =>
<>{(state.componentList.getList(obj.switchcase).length!==0 ||state.componentList.getList(obj.switchcase)!==undefined)&&(
                 <Link to={obj.path}  style={{cursor:"pointer", display: "flex", flexDirection: "row", alignItems: "center",

                 marginBottom: styles.menu.marginBottom,
                 height: styles.menu.menuListh,
        }}>
           <div style={{
                       marginLeft:  state.switchcase===obj.switchcase ? styles.menu.marginLeft:"",
                       fontFamily: styles.fonts.fontNormal, color:styles.colors.Black1,
                         letterSpacing: styles.menu.menuSpacing,fontSize:"2vmin",
                     }}>
                   {obj.name}
                   </div></Link>)}</>

              )}

      </div>
      {app.state.user.getJson().owner!=="not logged in" &&(
          <div onClick={auth.logout} style={{
                      
                      cursor:"pointer",
                      color: styles.colors.color2,
                      marginTop: "",
                      alignContent: "center",
                      fontFamily: styles.fonts.fontNormal,
                      marginLeft: styles.menu.marginLeft, fontSize:"2vmin",

              }}>
              Logout</div>
              )} 
      

{/* LOGOUT FUNCTION */}

        <div style={{
          marginTop: "33.1vh",
          marginBottom: "3.1vmax",
          height: styles.menu.menuListh,
        }}>
          {!app.state.login && (<Link to="/login"
      style={{cursor:"pointer", 
              marginBottom: styles.menu.marginBottom, fontSize:"2vmin",
              }}>Login</Link>)}
          {/* /LOG OUT PERMANENT */}
          
              </div>


              </div>
    </div>
  )}
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}