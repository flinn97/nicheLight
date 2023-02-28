import React, { Component } from 'react';

class TextBoxComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max
        };
    }
    handleChange(e) {

        
        let { name, value } = e.target;
        
        this.setState({ value: value });
        this.props.handleChange(e);
    }

    componentDidMount() {
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
            required: <textarea 
            cols ={this.props.cols?this.props.cols:""}
            rows ={this.props.rows?this.props.rows:5}
            resize={this.props.resize?this.props.resize:false}
            className={this.props.class ? this.props.class : "form-control"}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            name={this.props.name}
            value={this.state.value}
            min={this.state.min}
            max={this.state.max}
            autoComplete={this.props.autoComplete ? this.props.autoComplete : "off"}
            style={this.props.inputStyle}
            id={this.props.id}
            checked={this.props.checked}
            spellCheck={(this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck}
            minLength={this.props.minLength}
            maxLength={this.props.maxLength}
            onClick={this.props.onClick}
                required
               
            ></textarea>,
            normal: <textarea 
            cols ={this.props.cols?this.props.cols:""}
            rows ={this.props.rows?this.props.rows:5}
            resize={this.props.resize?this.props.resize:true}
                type={this.props.type}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                onChange={this.handleChange}
                name={this.props.name}
                value={this.state.value}
                min={this.state.min}
                max={this.state.max}
                onClick={this.props.onClick}
                autoComplete={this.props.autoComplete ? this.props.autoComplete : "off"}
                style={this.props.inputStyle}
                id={this.props.id}
                checked={this.props.checked}
                spellCheck={(this.props.type === "password" || this.props.spellCheck === undefined) ? false : this.props.spellCheck}
                minLength={this.props.minLength}
                maxLength={this.props.maxLength}
            ></textarea>,
            disabled: <textarea 
            cols ={this.props.cols?this.props.cols:""}
            rows ={this.props.rows?this.props.rows:5}
            resize={this.props.resize?this.props.resize:false}
            id={this.props.id}
                type={this.props.type}
                style={this.props.inputStyle}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onClick={this.props.onClick}
                disabled


            ></textarea>
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



export default TextBoxComponent;