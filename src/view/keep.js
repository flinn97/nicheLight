import { Component } from 'react';
import "../App.css"
import Following from './follow';
import Notes from './notes';
import TrashCan from '../pics/trash-can.png';
import Keeps from '../pics/keep.png';
import EditQuill from '../pics/EditQuill.png';
import ViewMedia from '../componentListNPM/viewMediaComponent';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import auth from '../services/auth';
import KeepItem from './keepItem';

export default class Keep extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this)

    this.addnote = this.addnote.bind(this)
    this.state = {

    }
  }
  async componentDidMount(){
    let app = this.props.app;
    
    if(this.props.switchcase==="keep"){
      this.props.app.dispatch({switchcase: "keep", myswitch:"keep", });

    }else{
      this.props.app.dispatch({switchcase: "follow" });

    }
    
    debugger
    let keep = [];
    let l = this.props.app.state.listItems
            for(let comp of l){
              keep= [...keep, ...this.props.app.state.componentList?.getList("keep"+comp),];
            }
              
          

    
    for(const key in keep){
      let ogOwner = keep[key].getJson().ogOwner;
      let owner = app.state.componentList?.getComponent("user", ogOwner, "_id");
      if(owner){
        keep[key].setJson({...keep[key].getJson(), displayHandle: owner.getJson().spawnerHandle});

      }
      else{
       let user= await auth.getPicOwner(app.state.componentList, ogOwner);
       keep[key].setJson({...keep[key].getJson(), displayHandle: user.getJson().spawnerHandle});

      }
      console.log( keep[key].getJson().displayHandle)
    }
    
  }
  componentDidUpdate(props, state){
    
      if(this.props.switchcase!==props.switchcase){
        if(this.props.switchcase==="keep"){
          this.props.app.dispatch({switchcase: "keep", myswitch:"keep", });
        }
        else{
          this.props.app.dispatch({switchcase: "follow" });
        }
      }
}

  addnote(obj) {
    this.setState({ [obj.getJson()._id + "note"]: true })
    this.props.app.dispatch({ operation: "cleanPrepare", operate: "update", object: obj })
  }
  handleClose(key) {

    this.setState({ [key]: false })
  }
  render() {
    let app = this.props.app
    let pic = app.state.componentList?.getComponents();
    let switchcase = app.state.switchcase;
    let dispatch = app.dispatch;
    let state = app.state;
    let styles =state.styles;
    
    return (
      <div style={{ display: "flex", flexDirection: "row", display:"flex", flexDirection: "column", alignItems: "center", alignSelf: "center", justifyContent: "center", height:"fit-content", width:"fit-content" }} >
                    


        <div style={{ display: "flex", flexDirection: "column", width: "99%",}}>
          <div style={{ display: "flex", 
                        flexDirection: "row",
                        justifyContent: "space-between",
                        minWidth:"80vw",
                        alignItems: "center",
                        alignSelf:"center",
                        background: styles.colors.Grey1,
                       
                        
          }}>
            
            <Link to="/keep"  style={{ 
                          display: "flex", 
                          flexDirection: "row", 
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          marginRight:".25vw",
                          background: state.switchcase==="keep" ? styles.colors.Grey2:styles.colors.Grey1,
                          paddingTop: ".9vh",
                          paddingBottom: ".9vh",
                          borderRadius: "1.5vw",
                          marginBottom: styles.margins.marginSmallH,
                          color: state.switchcase==="keep" ? styles.colors.darkFontColor:styles.colors.Grey3+"99",
                          border: state.switchcase==="keep" ? "1px solid black":"1px solid #22222233",
                          borderWidth: state.switchcase==="keep" ? "1 px":".2px 0 .2px 0",
                          fontSize: styles.fonts.fontHeader5, 
                          fontFamily: styles.fonts.fontTitle,
                          cursor: "pointer"
          }}
                    >

                         
                                <img style={{ 
                    width: styles.mySpawn.keepcardW,
                    height: "auto",                  
                    objectFit: "contain",
                    filter: state.switchcase==="keep" ? "saturate(1)":styles.mySpawn.satFilter,
                    marginRight: styles.mySpawn.keepcardMargin, 
                    
                    }} src={Keeps} />
                                
              
                    
                    View Keep</Link>
                        <Link to="/follow" style=
          {{ 
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
           
            background: state.switchcase==="follow" ? styles.colors.Grey2:styles.colors.Grey1,
            paddingTop: ".9vh",
            paddingBottom: ".9vh",
            borderRadius: "1.5vw",
            
            marginBottom: styles.margins.marginSmallH,
            fontSize: styles.fonts.fontHeader5, 
            fontFamily: styles.fonts.fontTitle,
            cursor: "pointer",
            border: state.switchcase==="follow" ? "1px solid black":"1px solid #22222233",
            borderWidth: state.switchcase==="follow" ? "1 px":".2px 0 .2px 0",
            color: state.switchcase==="follow" ? styles.colors.darkFontColor:styles.colors.Grey3+"99",
            
            
          }}>
            <img style={{ 
                    width: styles.mySpawn.keepcardW,
                    height: "auto",                  
                    objectFit: "contain", 
                    filter: state.switchcase==="follow" ? "saturate(1)":styles.mySpawn.satFilter,
                    marginRight: styles.mySpawn.keepcardMargin, 
                    
                    }} src={Keeps} />
            View Spawners</Link>

          </div>

<hr style={{marginBottom: styles.margins.marginMediumH,}}></hr>

{/* //CASE// */}
          {switchcase === "follow" ? (<Following app={app} />) : (<div 
          style= {{display:"flex", position:"relative",  flexDirection:"row", flexWrap:"wrap", width:"100%", justifyContent:"center"}} >

            {pic?.map((picture, index) =>
              <div key={index}  style={{ display:"flex", flexDirection:"row", textAlign:"center", justifyContent:"space-evenly"}}>
                {picture.getJson().type.includes('keep')&&(
                <KeepItem app ={app} switchCase={picture.getJson().type} picture={picture}/>
                )}
                  </div>
                )}


              </div>
            )}
        </div>
      </div>
    )
  }
}
//           {/* <Gallery state = {this.props.state} handlechange = {this.props.handlechange} /> */}