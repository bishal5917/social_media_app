import React, { useRef, useContext } from 'react'
import './loginandreg.css'
import { Context } from '../context/Context'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const { user, dispatch } = useContext(Context)

    const loginUser = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post('/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value
            })

            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            console.log(user)
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" })
        }
    }

    return (
        <>
            <div>
                <div className="box">
                    <h2 id="head">Login</h2>
                    <form>
                        <input type="text" name="text" className="email"
                            placeholder="Email" ref={emailRef}
                        />
                        <div id="emailcheck"></div>
                        <input type="password" name="password" id="pass" placeholder="Password"
                            ref={passwordRef} />
                        <div id="passcheck"></div>
                        {/* <input type="checkbox" id="pos" onclick="myFunction()" /> */}
                        <input onClick={loginUser}
                            type="button" id="sub" className="btnn" value="Login" />
                    </form>
                    <hr></hr>
                    <p id="para"> Forgot Password ? </p>
                    <Link to="/register">
                    <input type="button" class="btn1" value="Create New Account"/>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Login
