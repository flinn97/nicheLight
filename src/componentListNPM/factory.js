import {User, Pic, Comment, Follow} from "../models/myComponents.js"


class Factory {
    operationsFactory;

    factory ={
        user:  User,
        quotes:  Pic,
        heroes:  Pic,
        history:  Pic,
       
        keepquotes:  Pic,
        keepheroes:  Pic,
        keephistory:  Pic,
       
        pic: Pic,
        comment: Comment,
        follow: Follow,

    }
    registerComponents(register){
        this.factory[register.name]= register.component;
    }
    setOperationsFactory(operationsFactory){
        this.operationsFactory= operationsFactory
    }

    getComponent(obj){
        
        if(Object.keys(this.factory).includes(obj.component)){
            let key = Object.keys(this.factory).includes(obj.component)? obj.component:"baseClass"
            let comp = new this.factory[key](this.operationsFactory);
            comp.setJson({...comp.getJson(), ...obj.json});
            return comp;     
        }
        else{
            let key = 'monsters';
            let comp = new this.factory[key](this.operationsFactory);
            comp.setJson({...comp.getJson(), ...obj.json});
            return comp;   
        }
        
    }
}
export default Factory;