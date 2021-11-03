import React, { useContext, useState, useEffect } from 'react'
import Navbar from './Navbar'
import './mainprofile.css'
import { Context } from '../context/Context'
import Feed from './Feed'
import { useParams } from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

function MainProfile() {

    const username = useParams().username
    //getting the username from the params as we will have params if we open user profile

    //now we have to get the user with the help of username from params
    const [userfromparams, setUserfromparams] = useState("")


    useEffect(() => {
        const getUserFromParams = async () => {
            const xuserfromparams = await axios.get(`/users/getuser?username=${username}`)
            setUserfromparams(xuserfromparams.data)
        }
        getUserFromParams()
    }, [username])

    const { user,dispatch } = useContext(Context)  //this is logged in user from context
    let checkWhichUserIsIt = user.username === username

    //states for unfollow or unfollow status
    const [follow, setFollow] = useState(false)

    useEffect(() => {
        //follow will be true if the username id(i.e id of that profile page opened) is in 
        //the following array of the user(i.e logged in user)
        setFollow(user.following.includes(userfromparams._id))
    }, [user, userfromparams._id]);


    const handleFollow = async () => {
        try {
            if (follow) {     //follow is false by default
                await axios.put('/users/unfollow/' + userfromparams._id, {
                    userId: user._id
                })
                dispatch({type:"UNFOLLOW",payload:userfromparams._id})
            }
            else {
                await axios.put('/users/follow/' + userfromparams._id, {
                    userId: user._id
                })
                dispatch({type:"FOLLOW",payload:userfromparams._id})
            }
        } catch (error) {
            console.log(error)
        }
        setFollow(!follow)

    }
    //for fetching a conversation
    const [xuserchats, xsetUserchats] = useState([])

    //for creating a conversation for messenger
    const history = useHistory()
    let convoexists;
    const createConversation = async () => {
        // fetching a conversation to check if it already exists
        try {
            const gotchats = await axios.get('/conversations/' + user._id)
            xsetUserchats(gotchats.data)

        } catch (error) {
            console.log(error)
        }

        xuserchats.map((e)=>(
            convoexists = e.members.includes(userfromparams._id)
         
        ))
       if (convoexists){
           history.push('/message')
        //    alert("exists")
       }
       else{
        try {
            await axios.post('/conversations', {
                senderId: user._id,
                receiverId: userfromparams._id  //username=name from params
            })
            history.push('/message')
        } catch (error) {
            console.log(error)
        }
    }
    }


    return (
        <>
            <Navbar />
            <div className="mainContainer">
                <div className="leftContainerProfile">
                    <img className="postimgMainProfile" src="https://static-prod.weplay.tv/users/avatar/user_350324_4a3e3bb8f1ca2042d2551c7328289511.2D2C32-A9ACAC-AC9D90.png"
                        alt="" srcset="" />
                    <div className="otherDetails">
                        <div className="usernameNEdit">
                            <div className="username">
                                {username}
                            </div>
                            {checkWhichUserIsIt ?
                                (<Link className="link" to="/editprofile"><input type="button" className="editPBtn" value="Edit Profile" /></Link>) :
                                (<input type="button" onClick={handleFollow}
                                    className="editPBtn" value={follow ? `Disconnect` : `Connect`} />)
                            }
                            {!checkWhichUserIsIt &&
                                (<input type="button" onClick={createConversation}
                                    className="editPBtn" value="Send Message" />)
                            }
                        </div>
                        <div className="infoFP">
                            <div className="postsNums">
                                <span className='NumsInfo'>3</span>
                                <span className='InfoName'>Posts</span>
                            </div>
                            <div className="postsNums">
                                <span className='NumsInfo'>{userfromparams.followers?.length}</span>
                                <span className='InfoName'>Followers</span>
                            </div>
                            <div className="postsNums">
                                <span className='NumsInfo'>{userfromparams.following?.length}</span>
                                <span className='InfoName'>Following</span>
                            </div>
                        </div>
                        <div className="bio">
                            {userfromparams.bio}
                        </div>
                    </div>
                </div>
                <div className="rightContainerPosts">
                    <Feed username={username} />
                </div>
            </div>
        </>
    )
}

export default MainProfile
