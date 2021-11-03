export const loginStart = (userCredentials) => ({
    type: "LOGIN_START"
})

export const loginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
})


export const loginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
})

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId
})

export const Unollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId
})

export const logout = (error) => ({
    type: "LOGOUT"
})

