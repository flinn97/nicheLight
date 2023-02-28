import {User, Pic, Comment, Follow} from "../models/myComponents.js"


class Factory {
    operationsFactory;

    factory ={
        user:  User,
        monsters:  Pic,
        heroes:  Pic,
        statblocks:  Pic,
        worlds: Pic,
        maps: Pic,
        keepmonsters:  Pic,
        keepheroes:  Pic,
        keepstatblocks:  Pic,
        keepworlds: Pic,
        keepmaps: Pic,
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