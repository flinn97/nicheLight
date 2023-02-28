export default class Opps {
    components=[];
    dispatch;
    backArray;
    constructor(components, dispatch){
        this.register=this.register.bind(this);
        this.add=this.add.bind(this);
        this.update=this.update.bind(this);
        this.del=this.del.bind(this);
        this.getBackArray=this.getBackArray.bind(this);
        this.dispatch=dispatch;
        this.backArray={};
        this.components=components;
    }
    getBackArray(){
        return this.backArray
    }
    async register(obj){
        debugger
        let operate={
            add: this.add,
            update: this.update,
            del: this.del
        }
        for(const key in obj){
            if(obj[key].length!==0){
                this.backArray[key]=(await operate[key](obj[key]));
            }
        }
        this.dispatch({user:{components:this.components}});
    }
    add(arr){
        for(const key in arr){
            let comp = [...this.components];
            arr[key].setJson({...arr[key].getJson(), _id: (Math.random(Date.now())+Date.now()+performance.now()).toString(),});
            comp.push(arr[key]);
            this.components=comp;
        }
        return arr;
    }
    update(arr){
        for(const key in arr){
            let json= arr[key][0].getJson();
            arr[key][0].setJson({...json, ...arr[key][1]})
        }
        return arr
    }
    del(arr){
        let backArr=[];
        for(const key in arr){
            let id = arr[key].getJson()._id;
            this.components = this.components.filter(data => data.getJson()._id !== id);
            backArr.push(id);
        }
        return backArr;
    } 
}
