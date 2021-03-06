import "./Topbar.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useContext,useRef,useState,useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CreateIcon from '@mui/icons-material/Create';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { format } from "timeago.js";


export default function Topbar(socket) {
  const { user, dispatch, notifyFlag } = useContext(Context);
  const [notificationAlert, setNotificationAlert] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [countNewNotifications, setCountNewNotifications] = useState(-1);
  const [newNotification, setNewNotification] = useState();
  const [deletedfriendRequestNotification, setDeletedFriendRequestNotification] = useState();
  const  usernameSearch = useRef();
  const scrollRef = useRef()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 

  let navigate = useNavigate()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [notifications]);

  useEffect(() => {
        const getNotifications = async () => {
          try {
            const res = await axios.get("http://localhost:8800/api/notification/" + user._id);
            const data = [...res.data].reverse();
            setNotifications(data);
            setCountNewNotifications(res.data.length);
          } catch (err) {
            console.log(err);
          }
        };
        getNotifications();
      }, [notifyFlag]);

      useEffect(() => {
        socket.current?.on("getNotification", (data) => {
          console.log(data)
          setNewNotification({
            sendUserId: data.sendUserId,
            sendUserName: data.sendUserName,
            receiveUserId: data.receiveUserId,
            type: data.type,
            post: data.post,
            createdAt: data.timestamp
          })
        });
      }, [socket.current]);

  useEffect(() => {
        newNotification &&
          setNotifications((prev) => [...prev, newNotification]);
          setCountNewNotifications(countNewNotifications + 1)
      }, [newNotification]);
    

  useEffect(() => {
        deletedfriendRequestNotification &&
          setNotifications(notifications.filter((notification)=>{
            let deletedValue = {...deletedfriendRequestNotification,type:4}
            
            return (notification.sendUserName !== deletedValue.sendUserName && notification.type !== deletedValue.type) && notification !== deletedfriendRequestNotification
          }));
      }, [deletedfriendRequestNotification]);
    

      const handleClickAcceptAddFriend = async (deletefriendRequestNotification) => {
        try {
            await axios.put(`http://localhost:8800/api/user/` + user._id +'/addfriend', {userId: deletefriendRequestNotification.sendUserId,});
            await axios.delete(`http://localhost:8800/api/notification`, {
              data: {
                sendUserId: deletefriendRequestNotification.sendUserId,
                receiveUserId: user._id,
                type: 4
              }
            });
            await axios.post(`http://localhost:8800/api/conversation/`, {firstUserId: deletefriendRequestNotification.sendUserId,secondUserId: user._id});
          dispatch({ type: "ADDFRIEND", payload: deletefriendRequestNotification.sendUserId });
          setNotifications(notifications.filter((notification)=>{
            return notification != deletefriendRequestNotification
          }))

          socket.current?.emit("sendNotification", {
            sendUserName: user.username,
            sendUserId: deletefriendRequestNotification.receiveUserId,
            receiveUserId: deletefriendRequestNotification.sendUserId,
            type:5
          });

        } catch (err) {
        }
      };

      const handleClickRejectAddFriend = async (deletefriendRequestNotification) => {
        try {
            await axios.delete(`http://localhost:8800/api/notification`, {
              data: {
                sendUserId: deletefriendRequestNotification.sendUserId,
                receiveUserId: user._id,
                type: 4
              }
            });
          setNotifications(notifications.filter((notification)=>{
            return notification != deletefriendRequestNotification
          }))
          socket.current?.emit("sendNotification", {
            sendUserName: user.username,
            sendUserId: deletefriendRequestNotification.receiveUserId,
            receiveUserId: deletefriendRequestNotification.sendUserId,
            type:6
          });
        } catch (err) {
        }
    };
  
    const handleClickNotificationAlert = ()=>{
      setNotificationAlert(!notificationAlert)
    }


  const handleClickLogout = (e)=>{
    dispatch({ type: "LOG_OUT" });
    navigate('/')
  }

  const handleClickSearch = async (e)=>{
    try{
      const res = await axios.get(`http://localhost:8800/api/user?username=${usernameSearch.current.value}`);
      navigate(`/profile/${usernameSearch.current.value}`)
    }
    catch(err){
      alert('Kh??ng t???n t???i username')
    }
  }

  

  const NotificationAlertContainer = () => {
    return (
      <div className='notificationAlert'>
            {notifications.map((notification)=> {
              let action;
          

              if (notification.type === 1) {
                action = "liked";
                return (
                  <div className="notificationAlertItem" ref={scrollRef}>       
                  <span className="notificationAlertItemDesc">{`${notification.sendUserName} ${action} your post:  "${notification.post.substring(0,50)}..."`}</span>
                  <div className="notificationDate">{format(notification.createdAt)}</div>
                  </div>
                )
              } 
              if(notification.type === 2){
                action = "commented";
                return (
                  <div className="notificationAlertItem" ref={scrollRef}>
                  <span className="notificationAlertItemDesc">{`${notification.sendUserName} ${action} your post:  "${notification.post.substring(0,50)}..."`}</span>
                  <div className="notificationDate">{format(notification.createdAt)}</div>
                  </div>
                )
              }
              if(notification.type === 3){
                setDeletedFriendRequestNotification(notification)
              }
              if(notification.type === 4){
                return (
                  <div className="notificationAlertItem" ref={scrollRef}>
                  <span className="notificationAlertItemDesc">{` You have a friend request from ${notification.sendUserName}`}</span>
                  <div className="notificationDate">{format(notification.createdAt)}</div>
                  <div className="friendRequestAlertItemButtons">
                          <button className='friendRequestAlertItemButton' onClick={()=>{handleClickAcceptAddFriend(notification)}}>Accept</button>
                          <button className='friendRequestAlertItemButton' onClick={()=>{handleClickRejectAddFriend(notification)}}>Reject</button>
                      </div>
                  </div>
                )
              }
              if(notification.type === 8){
                return (
                  <div className="notificationAlertItem" ref={scrollRef}>
                  <span className="notificationAlertItemDesc">{`${notification.sendUserName} send you a message:  "${notification.post.substring(0,50)}..."`}</span>
                  <div className="notificationDate">{format(notification.createdAt)}</div>
                  </div>
                )
              }
              } )}
      </div>
    )
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">AplusReviewFood</span>
        </Link>
        <div className="khampha">
            <Link  to="/newfeed" style={{ textDecoration: "none", color: "white" }}>
                <FindInPageIcon/>
                <span className="textReview"> Kh??m Ph??</span>
            </Link>
        </div>
      </div>
          
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" onClick={handleClickSearch}/>
          <input
            placeholder="Search for friends"
            className="searchInput"
            ref = {usernameSearch}
          />
        </div>
      </div>
      <div className="topbarRight">
          <div className="writeReview">
            <Link  to="/review" style={{ textDecoration: "none", color: "white" }}>
                <CreateIcon/>
                <span className="textReview"> Vi???t Review</span>
            </Link>
          </div>
          <div className="topbarRightNotificationAlert" onClick={handleClickNotificationAlert}>
            <NotificationsIcon/>
            <span className="topbarRightNotificationAlertIconBadge">{countNewNotifications}</span>
            {notificationAlert ? <NotificationAlertContainer/>: null}
          </div>
          <Link to={'/profile/'+ user.username}>
          <img
            src={
              user.avatar
                ? PF + user.avatar
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
          </Link>
        <span className="topbarRightLogout" onClick={handleClickLogout}>Log out</span>
      </div>
    </div>
  );
}