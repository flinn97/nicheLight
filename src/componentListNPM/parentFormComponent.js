import React, { Component } from 'react';
import InputFormComponent from './componentForms/inputComponent.js'
import RichTextComponent from './componentForms/RichTextComponent.js';
import SelectComponent from './componentForms/selectComponent.js';
import TextBoxComponent from './componentForms/TextBoxComponent.js';

class ParentFormComponent extends Component {
    constructor(props) {
        //create state
        super(props);
        this.handleChange=this.handleChange.bind(this);
        this.prepareOnClick=this.prepareOnClick.bind(this);
        this.handleHTMLChange=this.handleHTMLChange.bind(this);
        this.handleChangeWithoutEvent=this.handleChangeWithoutEvent.bind(this);
        this.state = {
            obj: undefined,
            start: false
        };
    }
    handleHTMLChange(change){
          
          
          for(const key in this.state.obj){
              this.state.obj[key].setJson({...this.state.obj[key].getJson(), [this.props.name]:change});
          }
          // this.setState({obj:this.state.obj});
    }

    isArray(obj){
        let arr;
        if(Number.isInteger(obj)){
            arr = obj;
        }
        else{
            arr = Array.isArray(obj)? obj: [obj];
        }
        return arr
    }
    componentDidMount(){
        if(!this.props.prepareOnClick){

        
       let obj =   this.props.obj? this.props.obj: this.props.app?.state?.currentComponent;
       if(obj){
        obj = this.isArray(obj)
       }
       this.setState({
        obj:obj,
        start:true
       })
    }
    else{
        this.setState({
            start:true
           })
    }
    }
    async prepareOnClick(){
        
        if(this.props.prepareOnClick && this.props.app){
            let obj =  this.props.obj;
            if(obj){
             obj = this.isArray(obj)

            }
            obj =await this.props.app?.state.componentList.getOperationsFactory()[this.props.prepareOnClick.operation]({[this.props.prepareOnClick.operate]:obj});

            obj = obj[this.getSplice(this.props.prepareOnClick.operate)];
            this.setState({
                obj:obj
            })
        }
        
        
    }
    getSplice(word){
        if( word.includes("add")){
            word="add";
        }
        else if(word.includes("update")){
            word="update";
        }
        else if(word.includes("del")){
            word="del";
        }
        return word;
    }
    handleChange = async (event) => {
        debugger
        // 
        const { name, value } = event.target
        for(const key in this.state.obj){
            this.state.obj[key].setJson({...this.state.obj[key].getJson(), [this.props.name]:value});
        }
        // this.setState({obj:this.state.obj});

    }
    handleChangeWithoutEvent = async (obj) => {
        // 
        let name  = obj.name;
        let value = obj.value
        for(const key in this.state.obj){
            this.state.obj[key].setJson({...this.state.obj[key].getJson(), [this.props.name]:value});
        }
        // this.setState({obj:this.state.obj});

    }
    
    render() {
        let types ={
            select: <SelectComponent 
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            inputStyle={this.props.inputStyle}
            label={this.props.label}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labelStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            handleChangeWithoutEvent={this.handleChangeWithoutEvent}
            name={this.props.name} 
            input={this.props.input? this.props.input: "normal"}
            requiredMessage={this.props.requiredMessage}
            defaultValue={this.props.defaultValue}
            selectOptions={this.props.selectOptions}
            textOptions={this.props.textOptions}

            />,
            text: <InputFormComponent 
            rows={this.props.rows}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props.labelStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            min={this.props.min}
            max={this.props.max}
            autoComplete={this.props.autoComplete}
            checked={this.props.checked}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />,

            textArea:<TextBoxComponent 
            rows={this.props.rows}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props. labelStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            min={this.props.min}
            max={this.props.max}
            autoComplete={this.props.autoComplete}
            checked={this.props.checked}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}/>,

            richEditor: <RichTextComponent 
            rows={this.props.rows}
            handleHTMLChange={this.handleHTMLChange}
            cols={this.props.cols}
            emitClickedOutside={this.props.emitClickedOutside}
            id={this.props.id}
            inputStyle={this.props.inputStyle}
            spellCheck={this.props.spellCheck}
            label={this.props.label}
            type={this.props.type? this.props.type: 'text'}
            prepareOnClick={this.props.prepareOnClick}
            labelStyle={this.props. labelStyle}
            onClick={this.props.prepareOnClickFunc? this.props.prepareOnClickFunc:this.prepareOnClick}
            wrapperStyle={this.props.wrapperStyle}
            class = {this.props.class} 
            placeholder={this.props.placeholder} 
            handleChange={this.props.func? this.props.func:this.handleChange} 
            name={this.props.name} 
             value={!this.state.obj?"": this.state.obj[0].getJson()[this.props.name]}
            min={this.props.min}
            max={this.props.max}
            autoComplete={this.props.autoComplete}
            checked={this.props.checked}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            input={this.props.required? "required": this.props.disabled? "disabled": "normal"}
            requiredMessage={this.props.requiredMessage}
            />
        }
        return (
           <>{this.state.start&&(
            <>{this.props.type? types[this.props.type]:types.text} </>
           )}</>
        );
    }
}

export default ParentFormComponent;