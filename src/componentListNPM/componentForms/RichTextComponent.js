import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import moment from 'moment';

class RichTextComponent extends Component {
    constructor(props) {
        super(props);
        this.addTag=this.addTag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.wrapperRef = React.createRef();
        this.ref = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            html:<div></div>,
            index:1,
            n: 0,
            m:false,
            l:false,
            d:false,
            e:false,
            f:false,
            doubleSpace:false,
            backSlash: false,
            change:false,
            lastChar: "",
            colors:{
                m: 'orange',
                l: 'yellow',
                f: 'green',
                e: 'red',
                d:'#FFD700'

            }
        };
    }
    sanitizedData = (data) => ({
        __html: DOMPurify.sanitize(data)
      })

   async addTag(innerText, value, c){
    if(value===" " && this.state.backSlash){
        if(this.state.m || this.state.d ||this.state.l||this.state.e||this.state.f){
    for(let i=0; i<innerText.length; i++){
        let n = innerText[i];
        if(innerText[i]==="/" && innerText[i+1]===c){
            let text= "";
            let j = i+2;
            let bool = true;
        
            while(bool ){
                let bool1 = false;
                if(innerText[j]==="&"){
                    bool1=true;
                }
                if(bool1 && (innerText[j+6]==="&"||innerText[j+6]===" ") ){
                    bool=false;
                    break;
                }
                text+=innerText[j];
                j++;
            }
            
            let preText = innerText.substring(0, i);
            let newText = this.state.d? `<b n3z=${this.state.n} style=" color:#FFD700">${moment().format("MMM Do YY")}</b>` :`<b  n3z=${this.state.n} style=" color:${this.state.colors[c]}">${text} </b>`
            
            let postText = innerText.substring(j);
            innerText = preText+newText+postText;
            break;
        }
    }
}
    
    let offset = await Cursor.getCurrentCursorPosition(this.ref.current)-3;
   this.ref.current.innerHTML=innerText;
   
    this.setCaret(offset);
        let n = this.state.n+1;
        this.setState({
            backSlash:false,
            m:false,
            d:false,
            e:false,
            f:false,
            l:false,
            doubleSpace:false,
            change:true,
            n:n


        })
    }
   }



    async handleChange(e) {

        let value = e.key;
        let innerText =DOMPurify.sanitize(this.ref.current.innerHTML);
        
        if(value===" " &&this.state.lastChar===" " &&this.state.backSlash){
            await this.setState({doubleSpace:true})
        }
        
 if(this.state.doubleSpace){
    
    let c = 'm'
    let obj ={
        m: this.state.m,
        l: this.state.l,
        d: this.state.d,
        e: this.state.e,
        f: this.state.f,
    }
    for(const key in obj){
        if(obj[key]){
            c=key
            break;
        }
    }
    
           this.addTag(innerText, value,c )
        }
        if(value === "/"&& !this.state.backSlash){
            this.setState({backSlash:true});
        }
        if(this.state.backSlash && value === 'm' && this.state.lastChar==="/"){
            this.setState({m:true, d:false, e:false, f:false, l:false}) 
        }
        if(this.state.backSlash && value === 'd'&& this.state.lastChar==="/"){
            this.setState({m:false, d:true, e:false, f:false, l:false}) 
        }
        if(this.state.backSlash && value === 'e'&& this.state.lastChar==="/"){
            this.setState({m:false, d:false, e:true, f:false, l:false}) 
        }
        if(this.state.backSlash && value === 'f'&& this.state.lastChar==="/"){
            this.setState({m:false, d:false, e:false, f:true, l:false}) 
        }
        if(this.state.backSlash && value === 'l'&& this.state.lastChar==="/"){
            this.setState({m:false, d:false, e:false, f:false, l:true}) 
        }
        await this.setState({save:innerText, lastChar: value});

        let save =DOMPurify.sanitize(this.ref.current.innerHTML);
        this.props.handleHTMLChange(save);
    }



    setCaret(offset) {
        let richText = this.ref.current;
        
        // insert code here that does stuff to the innerHTML, such as adding/removing <span> tags
        Cursor.setCurrentCursorPosition(offset, richText);
        richText.focus();
}

    componentDidMount() {
        

       
        document.addEventListener('keyup', this.handleChange);
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
            normal:  <div 
            ref={this.ref}
             dangerouslySetInnerHTML= {this.props.html && {__html:this.sanitizedData(this.props.html)}}
            contentEditable={true} className={this.props.class ? this.props.class : "form-control"}
            style={this.props.style? this.props.style: {height:"200px"}}
            id="richText"
            onClick={this.props.onClick}></div>
           
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

// Credit to Liam (Stack Overflow)
// https://stackoverflow.com/a/41034697/3480193
class Cursor {
    static getCurrentCursorPosition(parentElement) {
        var selection = window.getSelection(),
            charCount = -1,
            node;
        
        if (selection.focusNode) {
            if (Cursor._isChildOf(selection.focusNode, parentElement)) {
                node = selection.focusNode; 
                charCount = selection.focusOffset;
                
                while (node) {
                    if (node === parentElement) {
                        break;
                    }

                    if (node.previousSibling) {
                        node = node.previousSibling;
                        charCount += node.textContent.length;
                    } else {
                        node = node.parentNode;
                        if (node === null) {
                            break;
                        }
                    }
                }
            }
        }
        
        return charCount;
    }
    
    static setCurrentCursorPosition(chars, element) {
        if (chars >= 0) {
            var selection = window.getSelection();
            
            let range = Cursor._createRange(element, { count: chars });

            if (range) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }
    
    static _createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count >0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                    range.setEnd(node, chars.count);
                    chars.count = 0;
                }
            } else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = Cursor._createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                    break;
                    }
                }
            }
        } 

        return range;
    }
    
    static _isChildOf(node, parentElement) {
        while (node !== null) {
            if (node === parentElement) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }
}

export default RichTextComponent;