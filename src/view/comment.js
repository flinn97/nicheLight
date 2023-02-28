import React, { Component } from 'react';
import auth from '../services/auth';
import { ref, } from "firebase/storage";
import { storage,  } from '../firbase.config.js';
import ParentFormComponent from '../componentListNPM/parentFormComponent';

export default class Notes extends Component {
    constructor(props){
        super(props);
  
        this.handleSubmission=this.handleSubmission.bind(this);
        this.handleChange=this.handleChange.bind(this);

     
        this.state={
            selectedFile: undefined,
            path: undefined,
            name: "",
            type: "",
            value:this.props.obj? this.props.obj.getJson().note: "",
        }
    }
    handleChange = (event) => {
        debugger
        const { name, value } = event.target
        this.setState({
            [name]: value,
            value:value
        })
    }
   


    async handleSubmission()  {
       
        
        await this.props.app.state.componentList.getOperationsFactory().run();

        this.props.handleClose()
        

    };
    
   
render(){
        let app = this.props.app;
        let state = app.state;
        let dispatch = app.dispatch;
                
        let styles =state.styles;
        let component = state.componentList?.getOperationsFactory()?.getUpdater(this.props.updaterKey)[0];
        console.log(component);
        

        return(
            <>{component?(
            <div style= {{background:styles.colors.White1, padding:".5vw", borderRadius:".7vw", background:styles.colors.Grey1,
                fontSize: styles.fonts.fontBody, height:"fit-content"}}>

                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                 
                     <div>
                            <label htmlFor="lastName"><div style= {{fontFamily: styles.fonts.fontNormal, marginBottom:".3vmin",
              fontSize: "2vmin"}}>Comment:</div></label>
                            <ParentFormComponent 
                            wrapperStyle={{...styles.wrapperStyle}}
                            maxLength={290}
                            minLength={1}
                             inputStyle={{...styles.inputStyle, width:"40vw",}} 
                            obj={component} name="note"/>
                        </div>
                        <div style={{...styles.buttons.buttonX}} onClick={this.props.handleClose}>X</div>
                        
                        </div>

                        <div style= {{display: "flex", flexDirection:"flex-end", color:styles.colors.linkVisitedColor}}>
                         <div
                         onMouseEnter={()=>{
                         this.setState({textD: styles.myFeed.textDeco + styles.colors.linkVisitedColor})
                                                }}
                        onMouseLeave={()=>{
                                 this.setState({textD:"none"})
                                                 }} 
                         style= {{...styles.buttons.buttonSubmit, textDecoration: this.state.textD, color:styles.colors.linkVisitedColor }} onClick={this.handleSubmission}>Submit</div>
                     </div>
                 </div>):(<></>)}
                 </>
             )
            }
            
    

}
