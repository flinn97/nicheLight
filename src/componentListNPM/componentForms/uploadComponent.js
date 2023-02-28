import { list } from 'firebase/storage';
import React, { Component } from 'react';
import wolf from "../../assets/place1.png"
import authService from "../../services/auth.service.js"
import ParentFormComponent from '../parentFormComponent';
import InputFormButtonComponent from './inputComponentWithButton';
import DragnDrop from '../../assets/dragndrop.png'
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

        };
    }
    createUUID(length){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
        var charactersLength = characters.length;
        for(var i =0; i<length; i++){
            result +=characters.charAt(Math.floor(Math.random()*charactersLength));
        }
        return result;
    }
    changeHandler = async (event) => {
        
        // let opps = this.props.app.state.currentComponent?.getOperationsFactory();
        let list = [...this.state.list]
            var fileOfBlob = new File([event.target.files[0]], event.target.files[0].name, {type:event.target.files[0].type});
            let path = "media/" +fileOfBlob.name;
            await authService.uploadPics(fileOfBlob, path);
            let pdf = await authService.downloadPics(path);
            let pushObj = {[fileOfBlob.name]: pdf}
            list.push(pushObj);

            this.setState({list:list});
            let obj = this.props.obj;
            let media = obj.getJson().media;
            let changeMedia = {...media, ...pushObj}
            obj.setJson({...obj.getJson(), [this.props.name]: changeMedia})
            this.props.dispatch(changeMedia)
      
	};
    async handleSubmission()  {
        // await this.setState({loading:true});
        // await authService.uploadPics(this.state.selectedFile, this.state.path);
        // await this.props.app.state.currentComponent.getPicSrc();
        // await this.props.app.state.currentComponent?.getOperationsFactory().run();
        
        // this.props.app.dispatch({updatePics:true});
        // this.props.handleClose();

	};
    handleChange(e) {

        
        // let { name, value } = e.target;
        
        // this.setState({ value: value });
        // this.props.handleChange(e);
    }

    componentDidMount() {
        
        let obj = this.props.obj;
        let items = obj.getJson()[this.props.name];
        let list = []
        for(const key in items){
            list.push({[key]: items[key]});
        }
        this.setState({list:list});

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

       

        return (
            <div  ref={this.wrapperRef} style={this.props.wrapperStyle?this.props.wrapperStyle:{display:"flex", flexDirection:"column", alignItems:"center", width:"100%"}} className={this.props.wrapperClass}>
                
                <div  style={{ position: "relative", width:"80%", height:"20vh" }}>
                    <input  style={{ cursor: "pointer", position: "absolute",  width:"100%", height:"100%", left: "0px", opacity: '0' }} type="file" name="file" onChange={this.changeHandler} />
                    <img src={DragnDrop} style={{width:"100%", height:"100%"}}/>

                </div>
                   
                 <div style={{marginTop:"20px", marginBottom:"20px", color:"grey"}}>Or Link to file, video, or website</div>
                    
                 <InputFormButtonComponent handleChange={(text)=>{
                    if(text.includes("www") && !text.includes("http")){
                        text = "https://" +text;
                    }
                    let list =[...this.state.list]
                     let pushObj = {[text]: text}
                     list.push(pushObj);
         
                     this.setState({list:list});
                     let obj = this.props.obj;
                     let media = obj.getJson().media;
                     let changeMedia = {...media, ...pushObj}
                     obj.setJson({...obj.getJson(), [this.props.name]: changeMedia})
                     this.props.dispatch(changeMedia)
                 }}/>
                 

<div className='scroller' style={{marginTop:"30px", height:"200px", width:"80%"}}>
                    {this.state.list.map((item, index)=>
                    <div style={{  width:"100%", height:"40px", backgroundColor:"#57BA8E", marginTop:"7px", borderRadius:"7px", padding:"10px", cursor:"pointer", position:"relative"}} key ={index}><a style={{marginLeft:"10px", color:"white", textDecoration:"none"}} href={item[Object.keys(item)[0]]} target="_blank">{Object.keys(item)[0]}</a>
                    <div onClick={()=>{
                        
                        let list=[];
                        let obj1 = {};
                        for(const key in this.state.list){
                            if(this.state.list[key]!==item){
                                list.push(this.state.list[key])
                                
                            }
                        }
                        this.setState({list:list})

                        for(const key in list){
                            obj1 = {...obj1, ...list[key]} 
                        }
                        let obj = this.props.obj;
            let changeMedia = {...list}
            obj.setJson({...obj.getJson(), [this.props.name]: obj1})
            this.props.dispatch(changeMedia)
                    }} style={{position:"absolute", right:15, color:"white", top:7}}>x</div>
                    </div>
                    )}
                 </div>

            </div>
        );
    }
}



export default UploadComponent;