import React, { useContext, useState } from 'react'
import Navbar from './Navbar'
import './editprofile.css'
import axios from 'axios'
import { Context } from '../context/Context'

function EditProfile() {
    const { user } = useContext(Context)

    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [bio, setBio] = useState(user.bio)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState(user.phone)

    //handling edit info
    const handleEditUserInfo = async () => {
        try {
            await axios.put('/users/updateuser/' + user._id, {
                userId:user._id,
                name,
                username,
                bio,
                email,
                phone
            })
            alert("Edited Successfully")
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <div className="MainProfileEditContainer">
                <div className="firstpart">
                    <img className="postimg" src="https://static-prod.weplay.tv/users/avatar/user_350324_4a3e3bb8f1ca2042d2551c7328289511.2D2C32-A9ACAC-AC9D90.png"
                        alt="" srcset="" />
                    <div className="profileNameInEditPart">
                        {user.username}
                    </div>
                </div>
                <div className="secondpartedit">
                    <span className="infotoedit">Name</span>
                    <input value={name} onChange={e => setName(e.target.value)}
                        type="text" name="" className="textedit" />
                </div>
                <div className="infotouser">
                    Help people discover your account by using the name you're known by:
                    either your full name, nickname, or business name.
                </div>
                <div className="secondpartedit">
                    <span className="infotoedit">Username</span>
                    <input value={username} onChange={e => setUsername(e.target.value)}
                        type="text" name="" className="textedit" />
                </div>
                <div className="infotouser">
                    In most cases, you'll be able to change your
                    username back for another 14 days.
                </div>
                <div className="secondpartedit">
                    <span className="infotoedit">Bio</span>
                    <textarea value={bio} onChange={e => setBio(e.target.value)}
                        className="textareaaa" id="" cols="30" rows="5"></textarea>
                </div>
                <div className="personaluserinfo">
                    Personal Information
                </div>
                <div className="secondpartedit">
                    <span className="infotoedit">Email</span>
                    <input value={email} onChange={e => setEmail(e.target.value)}
                        type="text" name="" className="textedit" />
                </div>
                <div className="secondpartedit">
                    <span className="infotoedit">Phone Number</span>
                    <input value={phone} onChange={e => setPhone(e.target.value)}
                        type="text" name="" className="textedit" />
                </div>
                <div className="secondpartedit">
                    <label className="infotoedit" for="Gender">Gender</label>
                    <select className="texteditselect" name="Gender" >
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <button onClick={handleEditUserInfo}
                    className="btnUserEdit">
                    Submit
                </button>
            </div>
        </>
    )
}

export default EditProfile

