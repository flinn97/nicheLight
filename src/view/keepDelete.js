import React, { Component } from "react";

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class KeepDel extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef;
        this.state = {
           objForDelete: this.props.objForDelete
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
        let styles=state.styles;
        let dispatch=app.dispatch;
        return (<div>
            
                                <div className="popup-box" style={{ zIndex: "1010" }}>
                <div ref={this.wrapperRef}  className="diapicboxa" style={{ zIndex: "1010", border:"solid 2px #444444", height:"fit-content", width:"fit-content", marginTop:"22vh" }}>
                    
                <div style={{ ///EXIT BUTTON
                                ...styles.buttons.buttonX,
                                alignSelf: "flex-end", marginBottom:styles.margins.marginSmallH,
                            }} onClick={this.props.handleClose}>X</div>
                            <div style={{marginBottom: "5.2vh",
                                marginTop: "5.2vh",
                                alignSelf:"center",
                                fontSize:styles.fonts.fontSubheader2,
                                fontFamily:styles.fonts.fontNormal
                            }}>
                     Are you sure you want to delete this?
                            </div>
                   
                        <div style={{ marginTop: "20px", flexDirection:"row", display:'flex', alignContent:"center", justifyContent:"center"  }}>

                        <div  className="btn  btn-block"  
                        onClick={dispatch.bind(this, {popupSwitch:"", operation:"run"})}
                        style={{ ...styles.buttons.buttonFollowing,
                            
                            height: "4vh", 
                            fontSize: "1.8vh", 
                            border: ".1rem solid rgba(15,15,15,.55)",
                            width: "20vw", 
                            display:"flex", 
                            flexDirection:"column", 
                            marginLeft:"1vw",
                            marginRight:"1vw",
                            justifyContent:"center", alignItems:"center"}}>Cancel</div>
                    
                   <div  className="btn  btn-block"  
                        onClick={()=>{
                            this.state.objForDelete.unKeep(state.user, state.componentList)
                            dispatch({popupSwitch:"", objForDelete:undefined})
                        }}
                        style={{ ...styles.buttons.buttonFollow,
                             height: "4vh",
                             fontSize: "1.8vh", 
                            width: "10vw", 
                            display:"flex", flexDirection:"column", 
                            justifyContent:"center", borderRadius: "16px", 
                             border: ".1rem solid rgba(15,15,15,.55)",
                             marginRight:"1vw",
                            alignItems:"center"}}>Delete</div>
                    </div>
                    

                </div>
                
            </div>

            </div>)
    }
};
export default KeepDel;