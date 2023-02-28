import React, { Component } from 'react';
import authService from '../services/auth';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

export default class Login extends Component {
    constructor(props){
        super(props);
        this.handleChange= this.handleChange.bind(this);
        this.handleSubmission=this.handleSubmission.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.state={
            selectedFile: undefined,
            path: undefined,
            email: "",
            password: ""
        }
    }
    componentDidMount(){
        window.addEventListener('keydown', (e)=>{
            
            if(e.key==="Enter"){
                                this.handleSubmission(e);
                
            }
        })
    }

	handleChange = async (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
        
	};


	async handleSubmission()  {
        debugger
        if(!this.state.email||!this.state.password){
            this.setState({
                message:"fill out the login information"
            })
            return
        }
        
        let user =  await authService.login(this.state.email, this.state.password, this.props.app.state.componentList)
        if(user){
            
            await this.props.app.dispatch({login:true, register:false, loginPage:false, registerPage:false, user:user, email:this.state.email});
            window.location.href='http://localhost:3000/'
        }
        else{
            this.setState({
                message:"email or password incorrect"
            })
        }
        
        
	};
    render(){
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
        let component = state.currentComponent;
       
        let styles =state.styles;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        let key =compJson?.collection? "update": "add";
        return(
                    <div style={{
                        
                        width: "98vw", 
                        borderRadius: styles.borders.radius1,
                        marginLeft:"1vw",
                        marginTop:"3vh",
                        minHeight: "88vh",
                        maxHeight: "50vh",
                        background: styles.colors.Grey1,
                        boxShadow: styles.shadows.homeShadow,
                        paddingTop: "2vh",
                        paddingLeft: "1vw",
                        paddingRight: "1vw",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                        }}>
                        <div 
                        style={{display: "flex", flexDirection:"column", justifyContent:"center",
                         alignContent: "center",
                         alignItems: "center",
                         alignSelf: "center",
                        marginTop:styles.margins.marginSmallH, width:"100%"}}>
                        <div style={{fontFamily: styles.fonts.fontTitle, fontSize: styles.fonts.fontHeader5,}}>Login</div>                     
                     <div style={{marginTop:"2vh",}} >
                    
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, marginRight: styles.margins.marginSmallW, fontSize: styles.fonts.fontHeader1,}}>Email</div></label>
                            <input style ={{fontFamily: styles.fonts.fontNormal, height: "3vh", width: "18vw", fontSize:"2vmin",
                    borderWidth: styles.mySpawn.border ,}} type="text" id="last"   onChange={this.handleChange} name="email"/>
                        </div>
                        {!this.state.forgot&&(
                        <div style={{marginTop:"2vh", marginBottom:styles.margins.marginSmallH}} >
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal,marginRight: styles.margins.marginSmallW, fontSize: styles.fonts.fontHeader1,}}>Password</div></label>
                            <input  style ={{fontFamily: styles.fonts.fontNormal, height: "3vh", fontSize:"2vmin",
                    borderWidth: styles.mySpawn.border, width: "18vw"}} type="password" id="pwd"   onChange={this.handleChange} name="password"/>
                        </div>)}
                        <div style={{display: "flex", flexDirection:"column", justifyContent:"center",
                         alignContent: "center",
                         alignItems: "center",
                         alignSelf: "center",}}>
                         {!this.state.forgot&&(<button id="submitButton" 
                         style={{...styles.buttons.buttonFollow, padding:"2px", marginTop:"2vh", fontSize: styles.fonts.fontHeader1, 
                         minWidth:"fit-content", minHeight:"fit-content"}} 
                         class= "btn" onClick={this.handleSubmission}>Login</button>)}
                         {!this.state.forgot&&(<Link to="/register" style={{...styles.buttons.buttonFollow, padding:"2px", background: "", color: styles.colors.Grey3, minWidth:"fit-content", minHeight:"fit-content", fontFamily: styles.fonts.fontNormal, marginTop:"2vh", cursor:"pointer", fontSize: styles.fonts.fontHeader1,}} > 
                         Register</Link>)}

                         {!this.state.forgot&&(<div style={{cursor:"help", fontFamily:styles.fonts.fontNormal, fontSize:"2vmin", marginTop:"2vmin"}}
                         onClick={()=>{this.setState({forgot:true})}}>Forgot Password?</div>)}
                         {this.state.forgot&&(<>
                                    <div style={{display:"flex:", flexDirection:"column", alignContent:"center", textAlign:"center", width:"22vw" }}>
                                        <div style={{display:"flex:", flexDirection:"column", 
                                    marginTop:"3vmin",  marginBottom:"2.8vmin", fontFamily:styles.fonts.fontNormal, fontSize:"1.9vh",}}>
                                       Send us the email you used to sign up. You'll get an email to change your password.</div>
                                    <button style={{ ...styles.buttons.buttonLog, cursor:"pointer", padding:".8vmin", 
                                    background:styles.colors.color2+"f2", marginBottom:"1vh", fontSize:"2vmin", 
                                    borderRadius:".63vmin", color:"white", fontFamily:styles.fonts.fontBold,
                                }} 
                                    onClick={authService.sendForgotPasswordChange.bind(this,this.state.email)} >
                                        <div>Submit</div>
                                    </button>
                                    <div style={{marginTop:"2vmin", cursor:"pointer", fontSize:"2vmin", fontFamily:styles.fonts.fontNormal}}
                                    onClick={()=>{this.setState({forgot:false})}}>Back</div>

                                </div></>)}
                     </div>
                     <div style={{color:"red", fontSize:"2vmin", fontFamily:styles.fonts.fontNormal}}>{this.state.message}</div>
                     </div>
                 </div>
             )
    }
	
}