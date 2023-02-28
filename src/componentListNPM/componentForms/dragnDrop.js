import React, { Component } from 'react';

class DragnDrop extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
           
        };
    }
    handleChange(e) {

        
        let { name, value } = e.target;
        
        this.setState({ value: value });
        this.props.handleChange(e);
    }

    componentDidMount() {
        if(this.props.defaultValue){
            let name = this.props.name;
            let value = this.props.defaultValue;
            this.props.handleChangeWithoutEvent({name:name, value:value})
            
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

        let inputType = {
            required: <select 
            className={this.props.class ? this.props.class : "form-control"}
            onChange={this.handleChange}
            name={this.props.name}
            size={this.props.size}
            style={this.props.inputStyle}
            id={this.props.id}
            onClick={this.props.onClick}
                required
               
            >
                 {this.props.selectOptions.map((option, index)=>
                <option value={option}>{option}</option>
                )}
            </select>,
            normal: <select 
            className={this.props.class ? this.props.class : "form-control"}
            onChange={this.handleChange}
            name={this.props.name}
            size={this.props.size}
            style={this.props.inputStyle}
            id={this.props.id}
            onClick={this.props.onClick}
            inputStyle={this.props.inputStyle}

            >
                {this.props.selectOptions.map((option, index)=>
                <option value={option}>{option}</option>
                )}
            </select>,
            disabled: <select 
            className={this.props.class ? this.props.class : "form-control"}
            name={this.props.name}
            style={this.props.inputStyle}
            id={this.props.id}
            onClick={this.props.onClick}
                disabled
            >
                 {this.props.selectOptions.map((option, index)=>
                <option value={option}>{option}</option>
                )}
            </select>,
            optGropu: <></>,
            multiple: <></>,
            form: <></>,
            autofocus: <></>
        }




        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle} className={this.props.wrapperClass}>
                {this.props.label && (<label style={this.props.labelStyle} className={this.props.labelClass}>{this.props.label}</label>)}
                {inputType[this.props.input]}
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default DragnDrop;