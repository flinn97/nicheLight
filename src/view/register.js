import React, { Component } from 'react';
import authService from '../services/auth';
import Registers from '../pics/jesus.jpg';
import Compressor from 'compressorjs';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";


export default class Register extends Component {
    constructor(props){
        super(props);
        this.handleSubmission= this.handleSubmission.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.changeHandler=this.changeHandler.bind(this);
        this.wrapperRef = React.createRef();

        this.setWrapperRef = this.setWrapperRef;
        this.state={
            selectedFile: undefined,
            path: undefined,
            email: "",
            password: "",
            firstName:"",
            lastName:"",
            socialHandle:"",
            bio:"",
            website:"",
            socialHandle:"",

        }
    }

    changeHandler = async (event) => {
        let path = "images/" + event.target.files[0].name;
        await fetch(event.target.files[0])
            .then(function (response) {
                return response.blob()
            })
            .then(function (blob) {
                // here the image is a blob
            });
        this.setState({
            selectedFile: event.target.files[0],
            path: path,
            changed: true,
            pic: URL.createObjectURL(event.target.files[0])
        })
    };
	handleChange = async (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
        
	};
    componentDidMount(){
        
        this.props.app.dispatch({operate:"adduser", operation:"cleanPrepare", object:1 })
    }
    


	async handleSubmission()  {
        if(this.state.firstName===""||this.state.firstName===undefined){
            this.setState({
                message:"Please fill out your first name"
                
            })
            return;
        }
        if(this.state.lastName===""||this.state.lastName===undefined){
            this.setState({
                message:"Please fill out your last name"
                
            })
            return;
        }
        if(this.state.spawnerHandle===""||this.state.spawnerHandle===undefined){
            this.setState({
                message:"Please fill out your Spiritual handle"
                
            })
            return;
        }
       
        
        
        if(this.state.email===""||this.state.email===undefined){
            this.setState({
                message:"Please fill out your email"
                
            })
            return;
        }
        if(this.state.password===""||this.state.password===undefined){
            this.setState({
                message:"Please enter a password"
                
            })
            return;
        }
        if(this.state.selectedFile && this.state.path){
            await authService.uploadPics(this.state.selectedFile, this.state.path);

        }
        debugger
        let user =await authService.register(this.state.email, this.state.password, true)
        debugger
        if(user){
            let u = this.props.app.state.componentList.getOperationsFactory().getUpdater("add");
            await this.props.app.state.componentList?.getOperationsFactory().componentDispatch({addemail:this.state.email, addhash: this.state.spawnerHandle+Math.floor(Math.random()*1000000), addspawnerHandle:this.state.spawnerHandle, addfirstName:this.state.firstName, addlastName:this.state.lastName, addbio:this.state.bio, addwebsite:this.state.website, addsocialHandle: this.state.socialHandle, add_id:this.state.email, addowner:this.state.email})
            await u[0]?.getPicSrc(this.state.path);
            await this.props.app.dispatch({ email: this.state.email})
            await this.props.app.state.componentList?.getOperationsFactory().run();
            await this.props.app.dispatch({login:true, register:false, loginPage:false, registerPage:false, user:u[0]})
            const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(3000);
            window.location.href='http://localhost:3000/'
        }
        else{
            this.setState({
                message:"Either this email is already in use. The email does not exist or your password is not secure enough"
            })
        }
        
        
	};
 
    render(){
        let app = this.props.app;
        let state = app.state;
        
        let styles =state.styles;
        let dispatch = app.dispatch;
        let component = state.currentComponent;
        let compJson = component?.getJson();
        let opps = component?.getOperationsFactory();
        let key =compJson?.collection? "update": "add";
        return(
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", overflow:"scroll",
                    width:"100%",  borderRadius:"10px, 10px, 10px, 10px", background:"white", opacity:"1", height:"90vh", padding:"1.8vh"}}>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"fit-content", height:"fit-content",
                        borderRadius:"2vw", marginTop: styles.margins.marginMediumH, background:styles.colors.Grey2 + "95", padding:"1vw", paddingRight:"4.5vw", paddingLeft:"4.5vw" }}>
                            <img 
                            style={{marginTop:"-3vw",width:"5vw", height:"fit-content", objectFit:"scale-down", filter:"saturate(90% ) drop-shadow(0px 0px 4px "+styles.colors.color2+")"}} 
                            src={Registers}/>
                        <div 
                        style={{display:"flex", flexDirection:"column",alignItems:"center", fontFamily: styles.fonts.fontTitle, marginTop: "-1vh", fontSize: styles.fonts.fontHeader5,}}>
                           
                            Create Spiritual Account
                             
                            </div>


                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", }}>
                            <img style={{width:"9vh", height:"9vh", objectFit:"cover", borderRadius:"50%",}}
                       
                         src = {this.state.pic}/>
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2, marginBottom:"1vh"}}>Avatar</div></label>
                            <input accept="image/png, image/gif, image/jpeg" style={{ cursor: "pointer", width: "10vw",
                        height: "3vh",  }} type="file" name="file" onChange={this.changeHandler}  />
                        
                                                </div>  
                       
    <div style={{marginBottom:"2vh",}}>
                        <div style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                            <label
                            htmlFor="lastName">
                                <div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader1,
                                marginBottom:".8vh",}}>
                                    First Name</div></label>
                            <input style ={{...styles.inputStyle, width:"18vw" }} 
                            type="text" className="form-control" id="last"   onChange={this.handleChange} name="firstName"/>
                        </div> 


                        <div style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                            <label htmlFor="lastName">
                                <div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader1,
                                marginBottom:".8vh",}}>
                                    Last Name</div></label>
                            <input style ={{...styles.inputStyle}} 
                            type="text" className="form-control" id="last"   onChange={this.handleChange} name="lastName"/>
                        </div>  


                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                            <label htmlFor="lastName">
                                <div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader1,
                                marginBottom:".8vh",}}>
                                Spiritual Handle</div></label>
                            <input style ={{...styles.inputStyle, width:"14vw"}} 
                            type="text" className="form-control" id="last"  minLength="3" maxLength="35" onChange={this.handleChange} name="spawnerHandle"/>
                        </div>


                        <div style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                            <label htmlFor="lastName">
                                
                                <div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader1,
                                marginBottom:".8vh", }}>
                                    Bio</div></label>
                            <textarea rows="3" style ={{...styles.inputStyle, height:"8vh" }} maxLength="1400"
                            type="text" className="form-control" id="last"   onChange={this.handleChange} name="bio"/>
        
                        </div>


                        <div style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                            <label htmlFor="lastName">
                                <div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader1,
                                marginBottom:".8vh",}}>
                                    Your Website</div></label>
                            <input style ={{...styles.inputStyle, }} 
                            type="text" className="form-control" id="last"   onChange={this.handleChange} name="website"/>
                        </div>


                        <div style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                            <label htmlFor="lastName">
                                <div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader1,
                                marginBottom:".8vh",}}>
                                    Social Link URL</div></label>
                            <input style ={{...styles.inputStyle}} 
                            type="text" className="form-control" id="last"   onChange={this.handleChange} name="socialHandle"/>
                        </div>
                        
                     <div style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                            <label htmlFor="lastName">
                                <div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader1,
                                marginBottom:".8vh",}}>
                                Email Address</div></label>
                            <input style ={{...styles.inputStyle}} 
                            type="text" className="form-control" id="last"   onChange={this.handleChange} name="email"/>
                        </div>


                        <div style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                            <label htmlFor="lastName">
                                <div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader1,
                                marginBottom:".8vh",}}>
                                    Password</div></label>
                            <input style ={{...styles.inputStyle}} 
                            type="password" className="form-control" id="last"   onChange={this.handleChange} name="password"/>
                        </div>

                        </div>
                        <div>
                         <button style={{...styles.buttons.buttonFollow, height:"3vh", marginTop: styles.margins.marginMediumH}} class= "btn" onClick={this.handleSubmission}>
                            Register</button>
                         
                         <Link to ="/login" style={{display:"flex", flexDirection:"column",alignItems:"center", marginTop: "4.2vh", cursor:"pointer", textDecoration:"underline 1px #888888"}} onClick={dispatch.bind(this, {registerPage:false})}> Go Back to Login</Link>
                     </div>
                     <div style={{color:"red"}}>{this.state.message}</div>
                     </div>
                 </div>
             )
    }
	
}