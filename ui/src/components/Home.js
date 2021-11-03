import React from 'react'
import Feed from './Feed.js'
import LeftBar from './LeftBar.js'
import Rightbar from './Rightbar.js'
import './Home.css'
import Navbar from './Navbar.js'

function Home() {
    return (
        <>
        <Navbar/>
            <div className='Components'>
                <LeftBar />
                <div className="freeSpace1">
                </div>
                <Feed />
                <div className="freeSpace2">
                </div>
                <Rightbar />
            </div>
        </>

    )
}

export default Home
