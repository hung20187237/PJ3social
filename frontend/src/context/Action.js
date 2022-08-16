export const Login = (user) => ({
    type: "LOG_IN",
    payload: user,
});

export const SavePost = (userId) => ({
    type: "SAVEPOST",
    payload: userId,
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});
  
export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const Logout = () => ({
    type: "LOG_OUT",
});