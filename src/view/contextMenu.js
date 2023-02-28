import React, { Component } from "react";
import auth from "../services/auth";

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class ContextMenu extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
        }

    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
                this.props.handleClose();
            
        }
    }
            
        
    

    render() {

        let app = this.props.app;
        let state = app.state;
        let styles = state.styles;
        let dispatch=app.dispatch;
        return (<div>
            
                                <div style={{ marginTop:"-1.1vh", zIndex: "1012", background:"white", fontFamily:styles.fonts.fontNormal, color:styles.colors.linkVisitedColor,
  fontSize: styles.fonts.fontSubheader1, }}>
                <div ref={this.wrapperRef} style={{marginTop: "1vh", zIndex: "1013", padding:"1vh", outline:"thin double "+styles.colors.color1, height:"fit-content", fontFamily:styles.fonts.fontNormal, width:"fit-content", display:"flex", flexDirection:"column" }}>
                <div style={{cursor:"pointer", fontFamily:styles.fonts.fontNormal, textDecoration:this.state.textDecoD1}} 


                onMouseEnter={()=>{
                    this.setState({textDecoD1: styles.myFeed.textDeco + styles.colors.linkVisitedColor})
                 }}
                 onMouseLeave={()=>{
                  this.setState({textDecoD1:"none"})
                  }}
                
                
                
                onClick={()=>{
                    debugger
                    this.props.user.block({userID: this.props.content.getJson().owner, contentID: this.props.content.getJson()._id});
                    dispatch({popupSwitch:"blocked"})

                }}>{Object.keys(this.props.user.getJson().blocked).includes(this.props.content.getJson().owner)?(<>Unblock</>): (<>Block</>)}</div>
                <div style={{cursor:"pointer", fontFamily:styles.fonts.fontNormal,textDecoration:this.state.textDecoD2}} 


onMouseEnter={()=>{
    this.setState({textDecoD2: styles.myFeed.textDeco + styles.colors.linkVisitedColor})
 }}
 onMouseLeave={()=>{
  this.setState({textDecoD2:"none"})
  }} 
                
                onClick={()=>{
                    debugger
                    this.props.user.hide({contentID: this.props.content.getJson()._id, content: this.props.content.getJson()[this.props.name]});
                    dispatch({popupSwitch:"hide"})

                }}>{Object.keys(this.props.user.getJson().hidden).includes(this.props.content.getJson()._id)?(<>Unhide</>): (<>Hide</>)}</div>
                <div style={{cursor:"pointer", marginTop:".2vh", fontFamily:styles.fonts.fontNormal, color:styles.colors.color2, textDecoration:this.state.textDecoD3}} 


onMouseEnter={()=>{
    this.setState({textDecoD3: styles.myFeed.textDeco + styles.colors.color1})
 }}
 onMouseLeave={()=>{
  this.setState({textDecoD3:"none"})
  }}
                
                
                onClick={()=>{
                    
                    this.props.reportUser.report();
                    dispatch({popupSwitch:"report"})

                }}>{this.props.reportUser.getJson().flagged? (<>Reported</>):(<>Report</>)}</div>


                <div style={{cursor:"pointer", fontFamily:styles.fonts.fontNormal, color:styles.colors.darkFontColor, 
                marginTop:".5vh", textDecoration:this.state.textDecoD11}} 


onMouseEnter={()=>{
    this.setState({textDecoD11: styles.myFeed.textDeco + styles.colors.linkVisitedColor})
 }}
 onMouseLeave={()=>{
  this.setState({textDecoD11:"none"})
  }} 
                
                
                onClick={()=>{
                    this.props.handleClose();

                }}>Cancel</div>

                    </div>
                    

                </div>
                
        

            </div>)
    }
};
export default ContextMenu;