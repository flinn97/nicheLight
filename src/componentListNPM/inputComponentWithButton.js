import React, { Component } from 'react';

class InputFormButtonComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.sub = this.sub.bind(this);

        this.wrapperRef = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: "",
            min: this.props.min,
            max: this.props.max
        };
    }
    sub(){
        this.props.handleChange(this.state.value);
        this.setState({value: ""});
        
        }
    handleChange(e) {

        
        let { name, value } = e.target;
        
        this.setState({ value: value });
        
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
            required: <input 
            type={this.props.type}
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
               
            />,
            normal: <input
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
            />,
            disabled: <input
            id={this.props.id}
                type={this.props.type}
                style={this.props.inputStyle}
                className={this.props.class ? this.props.class : "form-control"}
                placeholder={this.props.placeholder}
                value={this.state.value}
                onClick={this.props.onClick}
                disabled


            />
        }




        return (
            <div ref={this.wrapperRef} style={this.props.wrapperStyle} className={this.props.wrapperClass}>
                {this.props.label && (<label style={this.props.labelStyle} className={this.props.labelClass}>{this.props.label}</label>)}
                <div style={{display:'flex', flexDirection:"row", }}>{inputType[this.props.input? this.props.input: "normal"]} <div style={{marginLeft:"10px", borderRadius:"7px", height:"40px", width:"120px", backgroundColor:"#6C86F4", cursor:"pointer",color:"white", justifyContent:"center", alignItems:"center", display:"flex"}}onClick={this.sub}>{this.props.buttonText? this.props.buttonText: "Add Link"}</div></div>
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}



export default InputFormButtonComponent;