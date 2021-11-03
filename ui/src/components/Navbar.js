import React, { useContext,useState } from 'react'
import './Navbar.css'
import { Context } from '../context/Context'
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import OtherHousesOutlinedIcon from '@mui/icons-material/OtherHousesOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios'

import {
    Link
} from "react-router-dom";
import ModalForSearch from './ModalForSearch';

function Navbar() {

    const { user, dispatch } = useContext(Context)

    //getting the first username
    let firstName = user.username.split(" ")[0]

    //logouting user
    const logoutUser = () => {
        dispatch({ type: "LOGOUT" })
    }

    //states for a search modal
    const [openmodal,setOpenmodal]=useState(false)
    const [searchnames, setSearchnames] = useState([])
    const [sresult,setSresult]=useState([])

    const searchPeople = async () => {
        try {
            const responseFound = await axios.get(`/users/search?username=${searchnames}`)
      
            setSresult(responseFound.data)
            console.log(responseFound.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="Nav">
                <div className="left-nav">
                    {/* left icons */}
                    <FacebookOutlinedIcon style={{ "font-size": "40" }} className='ficons' />
                    <div className="searchandsearchmodal">
                        <div className="searchcontainer">
                            <SearchOutlinedIcon style={{ "font-size": "25" }} className='sicon' />
                            <input type="text" onKeyPress={(e) => e.key === 'Enter' && searchPeople()}
                            onChange={e=>setSearchnames(e.target.value)}
                            onClick={e=>setOpenmodal(true)} name="search" id="srch" placeholder="Search" />
                        </div>
             
                    </div>

                </div>

                <div className="mid-nav">
                    {/* mid icons */}
                    <Link className="link" to='/'>
                        <HomeIcon htmlColor='Black'
                            style={{ "font-size": "35" }} className='micons' />
                    </Link>
                    <GroupIcon style={{ "font-size": "35" }} className='micons' />
                    <OndemandVideoIcon style={{ "font-size": "35" }} className='micons' />
                    <OtherHousesOutlinedIcon style={{ "font-size": "35" }} className='micons' />
                    < SportsEsportsOutlinedIcon style={{ "font-size": "35" }} className='micons' />
                </div>

                <div className="right-nav">
                    {/* right icons */}
                    <div className="profileInfo">
                        <AccountCircleOutlinedIcon style={{ "font-size": "25" }} className='ricons' />
                        <Link className="link" to={`/MainProfile/${user.username}`}>
                            <span className="usname">{firstName}</span>
                        </Link>
                    </div>
                    <Link className="link" to='/message'>
                        <ModeCommentOutlinedIcon style={{ "font-size": "25" }} className='ricons' />
                    </Link>
                    <FavoriteBorderOutlinedIcon style={{ "font-size": "25" }} className='ricons' />

                    <Link className="link" to="/login">
                        <LogoutIcon htmlColor="Black" onClick={logoutUser} style={{ "font-size": "25" }} className='ricons' />
                    </Link>
                </div>
                <ModalForSearch sresult={sresult} searchnames={searchnames} openmodal={openmodal}/>
            </div>
           
        </>
    )
}

export default Navbar
