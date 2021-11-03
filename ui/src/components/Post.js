import React, { useState, useContext } from 'react'
import { Context } from '../context/Context'
import './post.css'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import MoodOutlinedIcon from '@mui/icons-material/MoodOutlined';
import axios from 'axios'

function Post() {
    const { user } = useContext(Context)

    //getting the first name of a person only
    let firstNameOfUser=user.username.split(' ')[0]

    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")

    const sharePostHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            username: user.username,
            userId:user._id,
            description
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            //date is used here to create a unique name
            data.append("name", filename)
            data.append("file", file)
            newPost.img = filename
            try {
                await axios.post('/upload', data)
            } catch (error) {
                console.log("error")
            }
        }
         await axios.post('/posts/createpost', newPost)
         window.location.reload()
        
    }

    return (
        <>
            <div className="feedContainer">
                <div className="firstpart">
                    <img className="postimg" src="https://static-prod.weplay.tv/users/avatar/user_350324_4a3e3bb8f1ca2042d2551c7328289511.2D2C32-A9ACAC-AC9D90.png"
                        alt="" srcset="" />
                    <input required={true} onChange={e => setDescription(e.target.value)}
                        className="poststatus" type="text" name="" id="" placeholder={`What's on Your Mind , ${firstNameOfUser}?` }/>
                </div>
                <hr />
                {file && <img className='sharedImageimg'
                    src={URL.createObjectURL(file)} alt="" />}

                <div className="secondpart">
                    <div className="spchild">
                        <label htmlFor="fileInput">
                            <InsertPhotoIcon htmlColor='green' />
                        </label>
                        <span className="Text">
                            Photo
                        </span>
                    </div>
                    {/* this is for choosing a file and its property is transferred to photoicon */}
                    <input onChange={e => setFile(e.target.files[0])}
                        style={{ display: "none" }} type="file" name="file" id="fileInput" />
                    <div className="spchild">
                        <VideoCameraBackIcon htmlColor='tomato' />
                        <span className="Text">
                            Video
                        </span>
                    </div>

                    <div className="spchild">
                        <MoodOutlinedIcon htmlColor='rgb(232, 120, 0)' />
                        <span className="Text">
                            Feeling
                        </span>
                    </div>
                    <button onClick={sharePostHandler} className="btnShare">
                        Share
                    </button>
                </div>
            </div>
        </>
    )
}

export default Post
