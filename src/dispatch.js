import './App.css';
import { Component } from 'react';
import Home from './view/home';
import Nav from './view/nav.js';

import './index.css';
import DeletePopup from './view/deletePopup';
import KeepDel from './view/keepDelete';
import ViewPics from './view/viewPicsPopup';


//model
export default class Dispatch extends Component {
  constructor(props){
    super(props);
  
  }


  render(){
    let app = this.props.app;
    let state = app.state;
    let styles =state.styles;
  return (
    <div style={{
      width:"100%", 
      height:"96vh",
      fontFamily: styles.fonts.fontNormal,
      
      }}>

     
      
       <div style={{
        width:"100%", 
        height:"100%", 
        display:"flex", 
        flexDirection:"row", padding:"1vmin",
        
        }}>

          {state.popupSwitch==="del" && <DeletePopup app={app} objForDelete={state.objForDelete} handleClose={app.dispatch.bind(this,{popupSwitch:"", objForDelete:undefined})}/>}
          {/* {state.popupSwitch==="unfollow" && <DeletePopup app={app} objForDelete={state.objForDelete} handleClose={app.dispatch.bind(this,{popupSwitch:"", objForDelete:undefined})}/>} */}
          {state.popupSwitch==="keepDel" && <KeepDel app={app} objForDelete={state.objForDelete} handleClose={app.dispatch.bind(this,{popupSwitch:"", objForDelete:undefined})}/>}
          {state.popupSwitch==="mod" && <ViewPics app={app} handleClose={app.dispatch.bind(this,{popupSwitch:"", })}/>}

     <Nav app={app}/> 

     <Home app={app}/> </div>
     </div>
    
   
  )}
}