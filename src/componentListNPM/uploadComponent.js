import React, { Component } from 'react';
import auth from '../services/auth';
import InputFormButtonComponent from './inputComponentWithButton';
import DragnDrop from './dragndrop.png';
import ViewMedia from './viewMediaComponent';
import ParentFormComponent from './parentFormComponent';
import Compressor from 'compressorjs';

class UploadComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            list : [],
            newPics: [],
            paths: [],
            showPics: false,
            loading:false,
            name: "",
            type: "monster",
            delList:[]


        };
    }
    createUUID(length){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789-#';
        var charactersLength = characters.length;
        for(var i =0; i<length; i++){
            result +=characters.charAt(Math.floor(Math.random()*charactersLength));
        }
        return result;
    }
    changeHandler = async (event) => {
        if(this.state.list.length<5){
        
        let list = [...this.state.newPics];
        let paths = [...this.state.paths];
        let oldList;
        if(event.target.files[0].name?.toLowerCase().includes('.mov')||event.target.files[0].name?.toLowerCase().includes('.mp4')){
            oldList=[...this.state.list, {video:true, file: URL.createObjectURL(event.target.files[0])}];
            var fileOfBlob = new File([event.target.files[0]], event.target.files[0].name, {type:event.target.files[0].type});
                    let path = "media/" +fileOfBlob.name;
                    list.push(fileOfBlob);
                    paths.push(path);
                    this.setState({newPics:list, paths:paths, list:oldList, showPics:true});
        }
        else{
            oldList=[...this.state.list, URL.createObjectURL(event.target.files[0])];
            let file = event.target.files[0];
            new Compressor(file, {
                quality: 0.6,
            
                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                success(result) {
                    debugger;
                    var compressedFile = new Blob([result], {type: file.type, lastModified: Date.now()});
                    let timestamp = Date.now() - 803333333;
                    let timestamper = Date.now();
                   
                    let extension = file.name.split('.')[0];
                    let filename = `${timestamp}${extension}`;
                    let theType = compressedFile.type.split('/')[1];
                    let path = `media/${filename}.`+ theType;
                    
                    list.push(compressedFile);
                    paths.push(path);
                    
                },
                
                error(err) {
                  console.log(err.message);
                },
              });
              this.setState({ newPics: list, paths: paths, list: oldList, showPics: true });
            
        }
        }
      
	};
    async handleSubmission()  {
        let component = this.props.app.state.currentComponent
        if(this.state.newPics.length===0 && this.state.list.length===0){
            this.setState({message:"You still need to Spawn something! Upload an image."})
            return
        }

        if(this.state.type="" || this.state.type===undefined) {
            this.setState({message:"You need a type for your Spawn."})
            return
        }

        debugger
        await this.setState({loading:true});
        let list = [...this.state.newPics];
        for(const key in list){
            await auth.uploadPics(list[key], this.state.paths[key]);

        }
       

        debugger
        component.setJson({...component.getJson(), owner:this.props.app.state.user.getJson()._id})
        await component.getPicSrc([...this.state.paths]);

        if(this.props.app.state.uploadKey==="update"){
            let li = Object.values(component.getJson().picURLs);
            let obj={}
            for(const key in li){
                if(!this.state.delList.includes(li[key])){
                    obj["media"+component.createUUID(3)]= li[key];

                }
            }
            component.setJson({...component.getJson(), picURLs:obj})
        }
        



        await component.getOperationsFactory().run();
        await this.setState({loading:false});


        this.props.app.dispatch({ myswitch: "feed", pic: component, newSpawn: false, switchcase:component.getJson().type })
        
        
        

	};
    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value,
        })
    }

    componentDidMount() {
        debugger
        let name=Object.keys(this.props.app.state.currentComponent?.getJson().picURLs).length!==0? "picURLs": "picURL";
        let obj = this.props.app.state?.currentComponent;
        let uploads = obj.getJson()[name];
        if(uploads!==""){
        let items = Object.prototype.toString.call(uploads) === "[object String]"? [uploads]: Object.values(uploads);;
        let list = []
        for(const key in items){
            list.push(items[key]);
        }
        this.setState({list:list});
    }
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined)
            {
                this.props.emitClickedOutside(this.state);
            }
        }
    }
    render() {

        let app = this.props.app;
        let state = app.state;
        let component = this.props.obj? this.props.obj: state.currentComponent;
                    
        let styles =state.styles;

        return (
            
            <div  ref={this.wrapperRef} style={this.props.wrapperStyle?this.props.wrapperStyle:{
                display:"flex", flexDirection:"column", alignItems:"center", alignContent:"center", alignSelf:"center", height:"87.1vh", marginTop:"0vmin", 
                fontFamily: styles.fonts.fontNormal, zIndex:"10000", padding: "2vh", border:"solid 2px #44444444", borderRadius:"2vmin",  marginBottom:"5vh", background:"#eeeeee",
                }} className={this.props.wrapperClass}>
                   <div style={{
                    fontFamily: styles.fonts.fontBold, 
                    fontSize: styles.fonts.fontSubheader2,
                    marginBottom: styles.margins.marginMediumH,
                    cursor:"pointer",
                    color: styles.colors.color2,
                    position:"absolute", padding:"1vmin", 
                    right:"1vmin",
                    top:"1vmin",
                }} onClick={() =>
                    this.props.app.dispatch({ myswitch: "", currentComponent:undefined })
                    } >Cancel</div>
                    <div style={{fontFamily:styles.fonts.fontTitle, color:styles.colors.linkVisitedColor, fontSize:"4vh", marginTop:"",  zIndex:"900"}}>
                    ~ New Spawn ~
                    </div>

                 {/* Title */}
                 <ParentFormComponent 
                 wrapperStyle={{...styles.wrapperStyle}} maxLength={120}
                placeholder={"Max 120 Characters"} 
                 inputStyle={{...styles.inputStyle, width:"42vw",  zIndex:"900"}} 
                    labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh", color:styles.colors.lightFontColor}}
                    label="Title: " name= "name" obj ={component} />

                    {/* // INPUT STYLE - inner style (text box, input etc) WRAPPER STYLE - outer style */}
                <div>
                {/* DESCRIPTION */}
                <ParentFormComponent 
                inputStyle={{...styles.inputStyle,  width:"42vw", height:"12vh", }}
                maxLength={1001}
                placeholder={"Describe your new spawn here. Max 1000 characters."} 
                wrapperStyle={{...styles.wrapperStyle,  }} 
                labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh"}}
                    
                    label="Description: " name= "description" obj ={component} type="textArea" /></div>
        {/* TYPE */}
        
            <ParentFormComponent  
        inputStyle={{...styles.inputStyle,  width:"9.6vw", }}
        wrapperStyle={{...styles.wrapperStyle, marginBottom:"2vh", }} 
        labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh"}} 
        type = "select" label="Type: " name="type" 
        defaultValue={(component.getJson().type!==""&&component.getJson().type!==undefined)? component.getJson().type:""} 
        selectOptions={["select", ...state.listItems.filter(word=> word!=="all")]} 
        textOptions ={["", ...state.listItems.map((word, index)=>{
            let char = word[0];
            char = char.toUpperCase();
            let w = word.slice(1);
            return char+w;
        })]} 
        obj={component}/>
               

                <div style={{fontFamily: styles.fonts.fontBold, fontSize:"1.6vh", color:styles.colors.color2}}>
              Limit: 5 Images
              </div>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", userSelect:"none", background:"#22222222", width:"28vw", borderRadius:"2vmin", marginBottom:"2vmin" }}>
                            <img style={{width:"24vw", height:"19.8vh", objectFit:"cover", marginTop:"1vmin", borderRadius:"2vmin", userSelect:"none"}}
                       
                         src = {DragnDrop}/>
                            <label><div style={{fontFamily: styles.fonts.fontNormal, fontSize: styles.fonts.fontHeader2, marginBottom:"1vh"}}></div></label>
                            <div style={{ cursor: "pointer", width:"24vw",
                        height:"20vh", marginTop:"-20vh"  }}> <input style={{ cursor: "pointer", width:"24vw",
                        height:"20vh", marginTop:"-22vh", opacity:"0"  }} type="file" name="file" onChange={this.changeHandler}  /></div>
                        
                                                </div>  

                    <ViewMedia removeMedia={(obj)=>{
                        debugger
                        let list = [...this.state.list];
                        let paths =[...this.state.paths];
                        let newPics = [...this.state.newPics];
                        let delList=[...this.state.delList];
                        delList.push(obj.content);
                        list.splice(obj.index, 1);
                        paths.splice(obj.index, 1);
                        newPics.splice(obj.index, 1);

                        this.setState({list:list, delList:delList, paths:paths, newPics:newPics});
                       
                    }} editable={true} media={[...this.state.list]} 
                    inputStyle={{objectFit:"scale-down"}}
                    wrapperStyle={{objectFit:"scale-down"}} 
                    labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh"}}/>

                <ParentFormComponent label="Link:  "  name= "destinationURL" obj ={component} wrapperStyle={{...styles.wrapperStyle}} 
                 inputStyle={{...styles.inputStyle, width:"42vw",}}  maxLength={120} 
                    labelStyle={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginBottom:"1vh", color:styles.colors.lightFontColor}} />


                    <div style={{...styles.buttons.buttonFollow, height:"5.9vh", marginTop:"2vmax", padding:"2vmin", cursor:"pointer", width:"3.9vmax"}} onClick={this.handleSubmission}>Create Spawn</div>
            <div style={{fontFamily: styles.fonts.fontBold, fontSize:"2.1vh", marginTop:"1vh", color:styles.colors.color2}}>{this.state.message}</div>
            </div>
        );
    }
}



export default UploadComponent;