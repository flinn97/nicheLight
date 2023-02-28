import { Component } from 'react';
import "../App.css"
import auth from '../services/auth';
import Notes from './comment';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

export default class Following extends Component {
  constructor(props){
    super(props);
    
    this.handleClose = this.handleClose.bind(this)

    this.addnote = this.addnote.bind(this)
      this.state={

      }

    }
async componentDidMount(){
  debugger
  let follow = this.props.app.state.componentList?.getList("follow", this.props.app.state.user.getJson()._id)
  
  for(const key in follow){
    let ogOwner = follow[key].getJson().followID;
    let owner = this.props.app.state.componentList?.getComponent("user", ogOwner, "_id");
    if(owner){
      follow[key].setJson({...follow[key].getJson(), displayHandle: owner.getJson().spawnerHandle, picURL:owner.getJson().picURL});

    }
    else{
     let user= await auth.getPicOwner(this.props.app.state.componentList, ogOwner);
     follow[key].setJson({...follow[key].getJson(), displayHandle: user.getJson().spawnerHandle, picURL:user.getJson().picURL});

    }
    this.setState({start:true})
    console.log( follow[key].getJson().displayHandle)
  }
}
  addnote(obj){
      this.setState({[obj.getJson()._id + "note"]: true})
      this.props.app.dispatch({operation: "cleanPrepare", operate: "update", object: obj})
  }
  handleClose(key){
    
    this.setState({[key]: false})
  }
  render(){
    let app = this.props.app
    let state = app.state;
    let styles =state.styles;
    let following = app.state.componentList?.getList("follow", state.user.getJson()._id);
    
    let switchcase = app.state.switchcase;
    let dispatch= app.dispatch;
    
   
  return (
    <div style={{display: "flex", 
    flexDirection: "row", width:"80vw", flexWrap: "wrap", justifyContent:"center"}}> 
    {this.state.start&&
      <>
      {following?.map((followinger, index)=>
      
        
      <>
      {followinger.getJson()._id===""?(<></>):(
        
      <div style={{
        maxWidth:"13.3333333333vw", width:"13.3333333333vw", height:"32vh", marginBottom:"2vh",
        fontFamily:styles.fonts.fontBold, background: styles.colors.White1, 
        
        justifyContent: "space-between",
        display: "flex", 
        flexDirection: "column", paddingLeft:"1.25vw", paddingRight:"1.25vw", paddingTop:"1vh", 
        paddingBottom:"1vh", borderRadius:"2vh", marginRight:"1vw", textAlign:"center", alignContent:"center", alignItems:"center",
        fontSize: styles.fonts.fontSubheader1, 
       }} key={index }> 
       {followinger.getJson().following &&( 
        <div style={{display: "flex", 
        flexDirection: "column",
    alignItems:"center",
          cursor:"pointer", width:"fit-content", }}> <Link to={ "following/"+ 
          ((state.componentList.getComponent("user", followinger.getJson().followID)?.getJson()?.hash!==""&&state.componentList.getComponent("user", followinger.getJson().followID)?.getJson()?.hash!==undefined)?
          state.componentList.getComponent("user", followinger.getJson().followID)?.getJson()?.hash:
          followinger.getJson().followID ) }>
            {state.componentList.getComponent("user", followinger.getJson().followID)?.getJson()?.picURL&&
            <img style={{
              borderRadius:"50%", objectFit:"cover", width:"10vw", height:"10vw"
            }} onClick={async ()=>{
        debugger
        let user = await auth.getPicOwner(app.state.componentList, followinger.getJson().followID);
        dispatch({currentFollowing: user, myswitch: "following"})
      }} 
      src = {followinger.getJson().picURL===""?"//ssl.gstatic.com/accounts/ui/avatar_2x.png": followinger.getJson().picURL} 
      />}</Link>
          <Link to={ "following/"+ 
            ((state.componentList.getComponent("user", followinger.getJson().followID)?.getJson()?.hash!==""&&state.componentList.getComponent("user", followinger.getJson().followID)?.getJson()?.hash!==undefined)?
            state.componentList.getComponent("user", followinger.getJson().followID)?.getJson()?.hash:
            followinger.getJson().followID )  } style={{
            display:"flex", flexDirection:"row", flexWrap:"wrap",
        fontFamily:styles.fonts.fontBold, 
        
        fontSize: "2.2vmin",  cursor: "pointer", marginBottom:"1vh", marginTop:".9vh"}}
        >{followinger.getJson().displayHandle} </Link>
      </div>)}
      
      <div style={{...styles.buttons.buttonUnfollow, fontSize:"fit-content", padding:"2%", height:"2vh", marginBottom:".2vh", alignSelf:"center"}} onClick={followinger.unFollow?.bind(this, app.state.componentList)}>Unfollow</div></div>
      )}</> )}</>}
    </div>
  )}
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}
//