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
            value:this.props.obj.getJson().note,
            clicked: false,
        }
    }
    handleChange = (event) => {
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
    let component = state.componentList.getComponent(this.props.noteType, this.props.noteID);
    console.log(component);
        return(
            <>
            {component?(
            <div style= {{background:styles.colors.White1, padding:".5vw", borderRadius:".7vw",
                fontSize: styles.fonts.fontBody, height:"fit-content"}}>

                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                 
                     <div>
                            <label htmlFor="lastName"><div style= {{fontFamily: styles.fonts.fontNormal,
              fontSize: "1.49vmin",}}></div></label>
<ParentFormComponent  name={"note"} obj={component} wrapperStyle={{...styles.wrapperStyle,}}
                            maxLength={1090} rows={4}
                            minLength={1}
                             inputStyle={{...styles.inputStyle,
                                display:"flex", flexDirection:"column", flexWrap:"wrap", 
                            width:"14.55vw",}} >
                    
                </ParentFormComponent>
                            
                        </div>
                        <div style={{...styles.buttons.buttonX,}} onClick={this.props.handleClose}>X</div>
                        
                        </div>

                        <div style= {{display: "flex", flexDirection:"flex-end"}}>
                         <div style= {{...styles.buttons.buttonSubmit, fontSize: "1.7vmin", color:styles.colors.linkVisitedColor}} 
                         onClick={this.handleSubmission}>Submit</div>
                     </div>
                 </div>):(<></>)}
                 </>
             )
    }

}