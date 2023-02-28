import BaseClass from "../componentListNPM/baseClass";
import auth from "../services/auth";
class BaseObject extends BaseClass{
    constructor(operationsFactory){
        super(operationsFactory);
        this.createUUID=this.createUUID.bind(this);
    }
    json;
    starting={
        name:"",
        type: "",
        _id: "",
    }
    createUUID(length){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
        var charactersLength = characters.length;
        for(var i =0; i<length; i++){
            result +=characters.charAt(Math.floor(Math.random()*charactersLength));
        }
        return result;
    }

}

class Pic extends BaseObject{
    constructor(operationsFactory){
        super(operationsFactory);
        this.keep=this.keep.bind(this);
        this.like=this.like.bind(this);
        this.unlike=this.unlike.bind(this);
        this.unKeep=this.unKeep.bind(this);
    }
    json={
        ...this.starting,
        pics: "", 
        keep: 0,
        picURL: "",
        picURLs: {},
        pic:true,
        ogref:"",
        description: "",
        note: "",
        keepers: {},
        like: 0,
        ogOwner: "",
        likers: {},
        flagged: false,
        destinationURL: "",
        owner:""
        
    }

    async getPicSrc(path){
        let obj={}
        for(const key in path){
            let pic = await auth.downloadPics(path[key]);
            obj["media"+this.createUUID(3)]= pic;
        }
        obj = {...obj, ...this.json.picURLs}

        
        this.json.picURLs = obj
        
    }
    async unKeep(user, compList){
        debugger
        let ogPic =compList.getComponent(this.json.type.substring(4), this.json.ogref);
        let keepers = ogPic.getJson().keepers;
        delete keepers[user.getJson()._id];
        await ogPic.setJson({...ogPic.getJson(), keepers:keepers})
        await this.operationsFactory.cleanPrepare({update: ogPic})
        this.operationsFactory.prepareRun({del: this});
    }
   async keep(user){
        
        this.json.keep= this.json.keep+1;
        let userjson = user.getJson();
        let id = (Math.random(Date.now())+Date.now()+performance.now()).toString();
        let picobj = {...this.json, owner: userjson._id, ogref: this.json._id,type: "keep" + this.json.type, pic: false, _id: id, ogOwner:this.json.owner}
        this.json.keepers[user.getJson()._id] = user.getJson().spawnerHandle
        
        await this.operationsFactory.jsonPrepareRun({["add" + picobj.type]: picobj}) 
        await this.operationsFactory.cleanPrepare({"update" : this});
    }
    async like(user){
        debugger
        this.json.like= this.json.like+1;
        this.json.likers[user.getJson()._id] = user.getJson().name
        await this.operationsFactory.cleanPrepareRun({"update" : this}) 
    }
    async unlike(user){
        debugger
        this.json.like= this.json.like-1;
        delete this.json.likers[user.getJson()._id];
        await this.operationsFactory.cleanPrepareRun({"update" : this}) 
    }
}

class User extends BaseObject{
    constructor(operationsFactory){
        super(operationsFactory);
        this.follow=this.follow.bind(this);
        this.getPicSrc=this.getPicSrc.bind(this);
        this.block=this.block.bind(this);
        this.report=this.report.bind(this);
        this.hide=this.hide.bind(this);
    }
    json={
        ...this.starting,
        email:"",
        type: "user",
        owner: "",
        keeps:[],
        firstName:"",
        lastName:"",
        spawnerHandle:"",
        bio:"",
        website:"",
        socialHandle:"",
        picURL: "",
        hidden: {},
        blockCount:0,
        flagged: false,
        blocked: {}
        

    }
    report(){
        this.json.flagged=true;
        this.operationsFactory.cleanPrepareRun({update:this})

    }
    block(userInfo){
        this.json.blocked[userInfo.userID] = userInfo.contentID;
        this.json.blockCount++;
        this.operationsFactory.cleanPrepareRun({update:this})
    }
    hide(contentInfo){
        this.json.hidden[contentInfo.contentID] = contentInfo.content;
        this.operationsFactory.cleanPrepareRun({update:this})
    }
    async getPicSrc(path){
        let pic = await auth.downloadPics(path);
        this.json.picURL = pic
        return pic
        
    }
    async follow(picOwner){
        let userFJson = {owner: this.json._id, following: true, name: picOwner.getJson().name, followID:picOwner.getJson()._id };
        let picOwnerFJson = {owner: picOwner.getJson()._id , name:this.json.name, followID: this.json._id, picURL: picOwner.getJson().picURL, 
            //spawnerHandle:picOwner.getJson().spawnerHandle
         };
        debugger
        this.operationsFactory.cleanJsonPrepareRun({addfollow:[userFJson, picOwnerFJson]});
    }
}

class Follow extends BaseObject{
    constructor(operationsFactory){
        super(operationsFactory);
        this.unFollow=this.unFollow.bind(this);
    }
    json={
        ...this.starting,
        following: false,
        type: "follow",
        owner: "",
        followID: "",
        website: "",
        picURL: ""
        
    }
    async unFollow(componentList){
        
        let follow = await auth.getFollower(componentList, this.json.owner)
        debugger
        this.operationsFactory.cleanPrepareRun({del: [this, follow]})
    }
}

class Comment extends BaseObject{
    constructor(operationsFactory){
        super(operationsFactory);
        this.updateOwner=this.updateOwner.bind(this);
    }

    json={
        ...this.starting,
        picOwner: "",
        type: "comment",
        owner: "",
       note: "",
       picURL: "",
       commentOwner: ""
       
        
    }
    updateOwner(pic, handle){
        this.json.picURL= pic;
        this.json.commentOwner=handle;
    }
}

// class Factory {
//     factory ={
//         pic: new Pic(),
//         user: new User(),
//     }

//     getComponent(component, json){
//         let comp = this.factory[component];
//         comp = Object.assign(Object.create(Object.getPrototypeOf(comp)), comp);
//         comp.setJson({...comp.getJson(), ...json,});
//         return comp;
//     }
// }
export {User, Pic, Comment, Follow};
