import React, { useState, useEffect, useContext} from 'react'
import Navbar from '../Navbar'
import './mess.css'
import Chats from './Chats'
import Chatbox from './Chatbox'
import axios from 'axios'
import { Context } from '../../context/Context'

export default function Mess() {

    const { user } = useContext(Context)

    //for opening a chat or not 
    const [openchat, setOpenChat] = useState(false)

    //name of friends with whom a user chatted with
    const [userchats, setUserchats] = useState([])

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const gotchats = await axios.get('/conversations/' + user._id)
                setUserchats(gotchats.data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchChats()
    }, [user._id]);


    return (
        <>
            <Navbar />
            <div className="messengerContainer">
                <div className="showPeople">
                    <div className="inputSearch">
                        <input type="text" name="" className="Searchforfriend" placeholder="Search for a friend..." />
                    </div>
                    <div className="peopleInfo">
                        {
                            userchats.map((c) => (
                                //we set openchat to c which is a conversation on clickevent
                                <div onClick={() => setOpenChat(c)} className="containerForchat">
                                    <Chats infos={c} user={user} />
                                </div>
                            ))
                            //now infos will have everything about conversations
                        }
                    </div>
                </div>
                <div className="showMessage">
                    <Chatbox openchat={openchat} user={user} />
                    {/* openchat is passed as prop to chatbox and openchat contains info about conversations */}
                </div>
                <div className="onlinePeopleInfos">

                </div>
            </div>
        </>

    )
}
