import React, { useState, useEffect } from 'react'
import './chats.css'
import axios from 'axios'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


function Chats({ infos, user }) {

    const [friend, setFriend] = useState("")

    useEffect(() => {
        const idOfFriend = infos.members.find((id) => id !== user._id)
        //finding that id which isnot equal to userId and saving to variable idOfFriend

        const fetchFriend = async () => {
                //Now getting that friend info with that id
            try {
                const gotFriendInfo = await axios.get(`/users/getuser?userId=${idOfFriend}`)
                setFriend(gotFriendInfo.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFriend()
    }, [user._id,infos.members]);



    return (
        <>
            <div
            className="onlinePeopleInfo onMess">
                <img className="onlinePeoplePic"
                    src="https://yt3.ggpht.com/ytc/AKedOLTdk17bNJIk-abI8wmTO1rb23QO97Awj_m564w=s900-c-k-c0x00ffffff-no-rj" alt="" srcset="" />
                <FiberManualRecordIcon className='doticon' />
              
                <div className="onlineName">
                    {friend.username}
                </div>

            </div>
        </>
    )
}

export default Chats
