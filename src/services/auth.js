
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc,  orderBy, serverTimestamp } from "firebase/firestore";
import { db, storage,auth } from '../firbase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail,getAuth } from "firebase/auth";
class Auth {

    async getCurrentUser() {
        return localStorage.getItem("user");
    }

    async getuser(email, componentList) {
        // debugger
        debugger
        let list= componentList.getComponents();
        let IDlist = [];
        for(const key in list){
            IDlist.push(list[key].getJson()._id)
        }
        let rawData = [];
        const components = await query(collection(db, "Spiritualusers", "SpiritualAPP", "components"), where('owner', '==', email), orderBy("date"));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data()
            if(!IDlist.includes(data._id)){
            rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);
    }
    // async getComponentsAndUpdata(componentList) {
    //     // debugger
    //     debugger
       
    //     let rawData = [];
    //     const components = await query(collection(db, "DNDusers", "DNDAPP", "components"), where('collection', '!=', ""));
    //     let comps = await getDocs(components);
    //     for (const key in comps.docs) {
    //         let data = comps.docs[key].data()
            
    //         rawData.push(data);
            
    //     }
        
        
    //     await componentList.addComponents(rawData, false);
    //     let comps1 = componentList.getComponents();
    //     let obj = {update:comps1}
    //     this.dispatch(obj)
    // }

    async getPics( componentList) {
        
        let rawData = [];

        const components = await query(collection(db, "Spiritualusers", "SpiritualAPP", "components"), where('pic', '==', true), orderBy("date"));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
            
                rawData.push(data);

            
        }

        await componentList.addComponents(rawData.reverse(), false);
    }
    async getComments( componentList, id) {
        debugger
        let rawData = [];
        let IDlist = []
        let comments = componentList.getList("comment");
        for(const key in comments){
            IDlist.push(comments[key].getJson()._id)
        }
        const components = await query(collection(db, "Spiritualusers", "SpiritualAPP", "components"), where('picOwner', '==', id), );
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
                if(!IDlist.includes(data._id)){
                    rawData.push(data);
                }
        }

        await componentList.addComponents(rawData, false);
    }
    async getPicOwner(componentList, id) {
        debugger
        let rawData = [];
        let IDlist = [];
        let users = componentList.getList("user");
        for(const key in users){
            IDlist.push(users[key].getJson()._id)
        }
        const components = await query(collection(db, "Spiritualusers", "SpiritualAPP", "components"), where('_id', '==', id));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
            if(!IDlist.includes(data._id)){
                    rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);
        let picOwner = componentList.getComponent("user", id, "_id")
        return picOwner
    }
    async getFollower(componentList, id) {
        debugger
        let rawData = [];
        let IDlist = [];
        let follow = componentList.getList("follow");
        for(const key in follow){
            IDlist.push(follow[key].getJson()._id);
        }
        const components = await query(collection(db, "Spiritualusers", "SpiritualAPP", "components"), where('followID', '==', id));
        let comps = await getDocs(components);
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
            if(!IDlist.includes(data._id)){
                    rawData.push(data);
            }
        }
        await componentList.addComponents(rawData, false);
        let following = componentList.getComponent("follow", id, "followID");
        return following
    }


    async login(email, password, componentList) {
        let user;
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
            if(user){
                
            let del = componentList.getComponent("user");
            await componentList.getOperationsFactory().cleanPrepareRun({del: del});
                let saveUser =  user
                await localStorage.setItem("user", JSON.stringify(saveUser));
                await this.getuser(email, componentList);
                user=await componentList.getComponent('user');
            }
            return user;
    }
    async register(email, password, addToCache) {

        let user;
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
        })
            if(addToCache){
                localStorage.setItem("user", JSON.stringify(user));

            }

        return user;
    }
    async logout() {
        await localStorage.clear();
        let logouser;
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                logouser = user.uid;
                // ...
            }
        })
        if (logouser) {
            await signOut(auth);

        }
        window.location.reload();
    }
    async uploadPics(pic, name) {
        const storageRef = ref(storage, name);
        await uploadBytes(storageRef, pic).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
    async downloadPics(name) {
        let src;
        await getDownloadURL(ref(storage, name)).then((url) => {

            src = url;
        })
        return src;
    }
    deletePics(name) {
        debugger
        const delRef = ref(storage, name);
        // Delete the file
        deleteObject(delRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }
   
    sendForgotPasswordChange(email) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

  
 
/**
     * 
     * @param {*} role 
     * @param {*} id 
     * @param {*} changeData 
     * @returns change any data I want.
     */
    async dispatch(obj, email) {

        debugger
        for (const key in obj) {
            let operate = obj[key];
            for (let i = 0; i < operate.length; i++) {
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
                let component = key !== "del" ? operate[i].getJson() : operate[i];
                switch (key) {
                    case "add":
                        component.collection = email;
                        component.date = await serverTimestamp();
                        await setDoc(doc(db, 'Spiritualusers', "SpiritualAPP", 'components', component._id), component);
                        break;
                    case "del":
                        await deleteDoc(doc(db, 'Spiritualusers', "SpiritualAPP", 'components', component));
                        break;
                    case "update":
                        component.date = await serverTimestamp();
                        await updateDoc(doc(db, 'Spiritualusers', "SpiritualAPP", 'components', component._id), component);
                        break;
                }

            }
        }
    }


}
export default new Auth();