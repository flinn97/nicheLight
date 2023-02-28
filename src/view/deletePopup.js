import React, { Component } from "react";

//details my existingEmail.js component. creates some buttons that use methods embedded in props from the profile page. Choice will update the backend.
class DeletePopup extends Component {
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
        let styles = state.styles;
        let dispatch=app.dispatch;
       
    
        return (<div>
            
                                <div className="popup-box" style={{ display:"flex", zIndex: "1010", border:"solid 2px #444444", overflowY:"scroll", justifyContent:"center", padding:"2%", width:"101%", }}>
                <div ref={this.wrapperRef} style={{ display:"flex", flexDirection:"column",
                  zIndex: "1011", height:"fit-content", width:"15.5vw", background: styles.colors.White1, objectFit: "scale-down", marginTop:"1v",
                borderRadius: "1vw", alignContent:"center", paddingLeft:"1vw", paddingRight:"1vw", paddingTop:"1vh",  paddingBottom:"3vh"}}>
                    
                <div style={{
                                display:"flex", flexDirection:"row", justifyContent:"space-around",
                                }}>
                    <div style={{width:"100%"}}> </div>
                    <div style={{ ///EXIT BUTTON
                                ...styles.buttons.buttonX,
                                color: styles.colors.Black1,
                                // position: "absolute",
                                justifyContent: "flex-end",
                                marginRight:".5vw",
                                fontSize: "3.2vh",
                              
                }} onClick={this.props.handleClose}> X </div></div>
                <div style={
                                {...styles.buttons.buttonX, cursor:"",
                                   color:styles.colors.color1}
                            } onClick={this.props.handleClose}> Are you sure you want to delete this? </div>
                   
                   
                        <div 
                        style={{ marginTop: "20px", flexDirection:"row", display:'flex', alignContent:"center", justifyContent:"center"  }}>
                        <div  
                        onClick={dispatch.bind(this, {popupSwitch:"", operation:"run"})}
                        style={{ 
                            ...styles.buttons.buttonFollowing, height:"3.2vh", fontSize:"2.2vh"
                            }}>Cancel</div>
                    
                   <div
                        onClick={dispatch.bind(this, {popupSwitch:"", operation:"cleanPrepareRun", object:this.state.objForDelete, operate:"del",objForDelete:undefined})}
                        style={{ ...styles.buttons.buttonFollowing,  fontSize:"2.2vh", background: "#F56060", height:"3.2vh", color: "#F0F2EF", width:"10vw", display:"flex", flexDirection:"column", justifyContent:"center", borderRadius: "16px",  alignItems:"center"}}>Delete
                        </div>
                    </div>
                    

                </div>
                
            </div>

            </div>)
    }
};
export default DeletePopup;