import axios from 'axios'
import React, { useState } from 'react'
import './loginandreg.css'
import {useHistory} from 'react-router'
import { Link } from 'react-router-dom'

function Reg() {

    //states for register process
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const history=useHistory()
    //function to register user
    const registerUser = async (e) => {
        // setError(false)
        e.preventDefault()
        try {
           await axios.post('/auth/register', {
                username,
                email,
                password
            })
            history.push('/login')
        }
        catch (err) {
            setError(true)
        }
    }

    return (
        <>
            <div>
                <div class="box">
                    <h2 id="head">Register</h2>
                    <form>
                        <input type="text" name="text" className="email"
                            onChange={e => setUsername(e.target.value)} placeholder="Username"
                             />
                        <div id="emailcheck"></div>
                        <input type="email" name="email" className="email"
                            onChange={e => setEmail(e.target.value)} placeholder="Email"
                            />
                        <div id="emailcheck"></div>
                        <input type="password" name="password" id="pass"
                            onChange={e => setPassword(e.target.value)} placeholder="Password"
                        />
                        {/* <i class="far fa-eye"></i> */}
                    </form>
                    <input type="button" onClick={registerUser} class="btn1" value="Register" />
                    {error ? (<span className="Msg">Error : Username or Email is already taken</span>)
                        : (<span className="Msg"></span>)}

                          <hr style={{margin:"10px"}}/>
                    <Link to="/login">
                    <input type="button" class="btnn" value="Login"/>
                    </Link>

                </div>

                <div class="topic">
                    <h1 class="sum">Shareo</h1>
                    <hr />
                    <p id="parax">
                        Share Your posts with your connections all over the world</p>
                </div>
            </div>
        </>

    )
}

export default Reg
