import React from 'react'
import './mesagecompo.css'
import {format} from 'timeago.js'

function MessageCompo({ message,mine }) {
    return (
        <>
            <div className="messageContainer">
                <div className="imageandmess">
                    <img className={!mine ? `onlinePeoplePicMsg` : `NONE`}
                        src="https://yt3.ggpht.com/ytc/AKedOLTdk17bNJIk-abI8wmTO1rb23QO97Awj_m564w=s900-c-k-c0x00ffffff-no-rj" alt="" srcset="" />
                    <div className={mine ? `messageandtimemine` : `messageandtimefrom`}>
                        <p className={mine ? `messagemine` : `messagefrom`}>
                            {message.text}
                        </p>
                        <span className="time">{format(message.createdAt.toString())}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MessageCompo
