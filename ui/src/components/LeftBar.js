import React, { useContext } from 'react'
import './leftbar.css'
import { Context } from '../context/Context'

function LeftBar({ username }) {
    const { user } = useContext(Context)

    return (
        <>
 
        <div className='leftbarx'>
            <div className="profileContainer">
                <img className="coverPhoto" src="https://images.ctfassets.net/7thvzrs93dvf/wpImage18536/5bad272ce24d9ce3b6b76a78ada6fa7b/abstract-pyrimid-upsplash.png?w=900&h=225&q=90&fm=png"
                    alt="" srcset="" />
                <img className="postimgProfile" src="https://static-prod.weplay.tv/users/avatar/user_350324_4a3e3bb8f1ca2042d2551c7328289511.2D2C32-A9ACAC-AC9D90.png"
                    alt="" srcset="" />
            </div>
            <div className="nameContainer">
                <div className="profileName">
                    {user.username}
                </div>
                <span className="position">
                    Student at IOE
                </span>
                <div className="followersDiv">
                    <span className="followersInfo">
                        Followers
                    </span>
                    <span className="numss">{user.followers.length}</span>
                </div>
                <div className="followingDiv">
                    <span className="followersInfo">
                        Following
                    </span>
                    <span className="numss">{user.following.length}</span>
                </div>
            </div>

        </div>
        </>
    )
}

export default LeftBar
