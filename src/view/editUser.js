import React, { Component } from 'react';
import authService from '../services/auth';
export default class EditUser extends Component {
    constructor(props){
        super(props);
        this.handleSubmission= this.handleSubmission.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.changeHandler =this.changeHandler.bind(this);
        this.state={
            email: this.props.app.state.user.getJson().email,
           picURL : "",
            firstName:this.props.app.state.user.getJson().firstName,
            lastName:this.props.app.state.user.getJson().lastName,
            socialHandle:this.props.app.state.user.getJson().socialHandle,
            bio:this.props.app.state.user.getJson().bio,
            website:this.props.app.state.user.getJson().website,
            spawnerHandle:this.props.app.state.user.getJson().spawnerHandle,
            
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
            picURL: URL.createObjectURL(event.target.files[0])
        })
    };

	handleChange = async (event) => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
        
	};
    componentDidMount(){
        this.setState({
            picURL: this.props.app.state.user.getJson().picURL
        })
    }


	async handleSubmission()  {
        
        let user =this.props.app.state.user
        if(this.state.changed){
        await authService.uploadPics(this.state.selectedFile, this.state.path);
         let picPath = await user?.getPicSrc(this.state.path);
        user.setJson({...user.getJson(), ...this.state, selectedFile:"", picURL:picPath});
    }
    else{
        user.setJson({...user.getJson(), ...this.state, selectedFile:""});

    }
        let componentList = this.props.app.state.componentList;
        await user.getOperationsFactory().cleanPrepareRun({update:user});
        
        debugger
        let list = componentList.getList("comment", user.getJson()._id);
        for(const key in list){
            await list[key].updateOwner(user.getJson().picURL, user.getJson().spawnerHandle)
        }
        componentList.getOperationsFactory().prepareRun({update:list});
        this.props.app.dispatch({popupSwitch:""})
    
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
                    <div style={{width:styles.menu.remainderW, height:"105vh", background:styles.colors.Grey2, position:'absolute', zIndex:"9700", borderRadius: "2vw"}}>


                        
                        <div style={{
                    fontFamily: styles.fonts.fontBold,
                    fontSize: styles.fonts.fontSubheader2,
                    marginBottom: styles.margins.marginMediumH,
                    cursor:"pointer",
                    color: styles.colors.color2,
                    position:"absolute", padding:"1vmin", 
                    right:"2vmin",
                    top:"1vmin",
                }} onClick={dispatch.bind(this, { myswitch: "spawn", switchcase: "spawn", popupSwitch:"", })}>Cancel</div>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center",marginLeft:"20px",marginTop: styles.margins.marginMediumH, }}>
                        <div style={{fontFamily: styles.fonts.fontTitle, color:styles.colors.linkVisitedColor,fontSize: styles.fonts.fontHeader5,}}>Edit Spawner Account</div>   

                        <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop: styles.margins.marginMediumH}} className="form-group">
                        
                            <label htmlFor="lastName"><div style={{display:"flex", flexDirection:"column", alignItems:"center",fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2,}}>Avatar</div></label>
                            {/* <input accept="image/png, image/gif, image/jpeg" style={{ cursor: "pointer", width: "4.79vw",
                        height: "3vh",  }} type="file" name="file" onChange={this.changeHandler}  /> */}
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}}>
                        <input style={{zIndex:"80", opacity:"0", cursor:"pointer", display:"flex", flexDirection:"column", position:"absolute", alignItems:"center", width:"9vw", height:"9vh"}} class="form-control" type="file" id="formFile" onChange={this.changeHandler}/>
                        <img style={{width:"11vmin", height:"11vmin", borderRadius:"50%",  objectFit:"cover"}} src={this.state.picURL}/>
                   
                 </div>
                        
                                                </div>  

                        <div style={{marginTop: styles.margins.marginSmallH}} className="form-group">
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2,}}>First Name</div></label>
                            <input 
                            style ={{...styles.inputStyle, width:"18vw", }} type="text" className="form-control" id="last"  value={this.state.firstName} onChange={this.handleChange} name="firstName"/>
                        </div>            
                        <div style={{marginTop: styles.margins.marginSmallH}} className="form-group">
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2,}}>Last Name</div></label>
                            <input 
                            style ={{...styles.inputStyle, width:"18vw", }} type="text" className="form-control" id="last" value={this.state.lastName}  onChange={this.handleChange} name="lastName"/>
                        </div>     
                        <div style={{marginTop: styles.margins.marginSmallH}} className="form-group">
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2,}}>Spawner Handle</div></label>
                            <input 
                            style ={{...styles.inputStyle, width:"18vw", }} type="text" className="form-control" id="last" minLength="3" maxLength="35" value={this.state.spawnerHandle}  onChange={this.handleChange} name="spawnerHandle"/>
                        </div>
                        <div style={{marginTop: styles.margins.marginSmallH}} className="form-group">
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2,}}>Bio</div></label>
                            <textarea rows="3" style ={{...styles.inputStyle, height:"8vh", width:"18vw", }} maxLength="1400"
                             type="text" className="form-control" id="last" value={this.state.bio}  onChange={this.handleChange} name="bio"/>
                        </div>
                        <div style={{marginTop: styles.margins.marginSmallH}} className="form-group">
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2,}}>Website</div></label>
                            <input 
                            style ={{...styles.inputStyle, width:"18vw", }} type="text" className="form-control" id="last" value={this.state.website}  onChange={this.handleChange} name="website"/>
                        </div>
                        <div style={{marginTop: styles.margins.marginSmallH}} className="form-group">
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2,}}>Social Link</div></label>
                            <input 
                            style ={{...styles.inputStyle, width:"18vw", }} type="text" className="form-control" id="last" value={this.state.socialHandle}  onChange={this.handleChange} name="socialHandle"/>
                        </div>
                        
                     <div style={{marginTop: styles.margins.marginSmallH}} className="form-group">
                            <label htmlFor="lastName"><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2,}}>Email Address</div></label>
                            <input 
                            disabled style ={{...styles.inputStyle, width:"18vw", }} type="text" className="form-control" id="last" value={this.state.email}  onChange={this.handleChange} name="email"/>
                        </div>

                        <div>
                         <button style={{...styles.buttons.buttonFollow, marginTop: styles.margins.marginMediumH, height:"4vmin"}} class= "btn" onClick={this.handleSubmission}>Save Changes</button>
                         
                        
                     </div>
                     </div>
                 </div>
             )
    }
	
}