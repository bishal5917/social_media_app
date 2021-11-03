import React, { useState, useEffect, useRef } from 'react'
import './chatbox.css'
import MessageCompo from './MessageCompo'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { io } from 'socket.io-client'

function Chatbox({ openchat, user }) {
    //this openchat contains everything about conversations
    //Now i will use this to fetch messages
    const [msgs, setMsgs] = useState([])

    useEffect(() => {
        const fetchMesages = async () => {
            try {
                //openchat._id=conversation id
                const gotMessages = await axios.get('/messages/' + openchat._id)
                setMsgs(gotMessages.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMesages()
    }, [openchat._id]);

    //sending a message or a post req

    //useState for msg input fiels
    const [msginput, setMsginput] = useState("")

    const sendMessagehandler = async () => {
        const friendId = openchat.members.find((id) => user._id !== id)
        const message = {
            conversationId: openchat._id,
            senderId: user._id,
            text: msginput
        };
   
        //receiver is our friend
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: friendId,
            text: msginput
        })

        try {
            const messagePosted = await axios.post('/messages', message)
            setMsgs([...msgs, messagePosted.data])
            setMsginput(" ")
        } catch (error) {
            console.log(error)
        }
    }

    //for scrolling the bar to the last
    const scrollToLast = useRef()

    useEffect(() => {
        scrollToLast.current?.scrollIntoView({ behaviour: "smooth" })
        //   ?/checks id it is last or not
    }, [msgs]);
    //whenever msgs (messages) changes we have to do this


    //for sockets
    const socket = useRef()

    const [receivingmsg, setReceivingmsg] = useState(null)

    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        socket.current.on("getMessage", data => {
            setReceivingmsg({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, []);
    //connecting the react to socket server (ws=websocket) Note:This isnot http
    //user will be connected after opening a chatbox

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            console.log(users)
        })
    }, [user]);


    useEffect(() => {
        receivingmsg && openchat?.members.includes(receivingmsg.sender) &&
            setMsgs((prev) => [...prev, receivingmsg])
    }, [receivingmsg,openchat]);


    return (
        <>  {openchat ? <>
            <div className="messageWrapper">
                {
                    msgs.map((m) => (
                        <div ref={scrollToLast} className="msgScroll">
                            <MessageCompo message={m} mine={m.senderId === user._id} />
                        </div>
                    ))
                }
            </div>
            <div className="typemessage">
                <input onKeyPress={(e) => e.key === 'Enter' && sendMessagehandler()}
                    value={msginput} onChange={(e) => setMsginput(e.target.value)}
                    type="text" className="msgInput" placeholder="Aa" name="" id="" />
                <SendIcon
                    onClick={sendMessagehandler} className='sendMess' />
            </div>
        </> : <span className="info">Press button to open a chat</span>
        }
        </>
    )
}

export default Chatbox
