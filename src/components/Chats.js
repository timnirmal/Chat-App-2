import React, {useContext, useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import { ChatEngine } from 'react-chat-engine';
import {auth} from "../firebase";

import {useAuth} from "../contexts/AuthContext";
import axios from "axios";

const Chats  = () => {
    const history = useHistory();
    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await  auth.signOut();

        history.push('/');
    }

    useEffect( ()=> {
         if (!user){
             history.push('/');

             return;
         }

         const getFile = async (url) => {
             const response = await fetch(url);
             const data = await response.blob();

             return new File([data], "userPhoto.jpg", {type : 'image.jpeg'})
         }

         //If user Already Exists
         axios.get('https://api.chatengine.io/users/me',{
             headers: {
                 "project-id" : "c74afe29-eafc-47e1-ab97-206530b9532b",
                 "user-name" : user.email,
                 "user-secret" : user.uid,
             }
         })
             .then( ()=> {
                 setLoading(false);
             })
        //If user isn't already exists
             .catch( ()=>{
                 let formdata = new FormData();
                 formdata.append('email',user.email);
                 formdata.append('username', user.displayName);
                 formdata.append('secret', user.uid);

                 getFile(user.photoURL)
                     .then((avatar)=> {
                         formdata.append('avatar', avatar, avatar.name);

                         axios.post('http://api.chatengine.io/users',
                             formdata,
                             {headers: {"private-key": "6d4bec81-49c5-4293-be17-a0a51576b1e0"}}
                         )
                             .then(() => setLoading(false))
                             .catch((error) => console.log(error))
                     })
             })
    }, [user, history]);

    //if (!user || loading) return 'Loading ...';
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    DAPP
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height = "calc(100vh-66px)"
                projectID='c74afe29-eafc-47e1-ab97-206530b9532b'
                userName = {user.email}
                userSecret = {user.uid}
            />
        </div>
    );
}

export default Chats;





