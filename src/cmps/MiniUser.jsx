import { Link } from "react-router-dom";
import defaultAvatar from '/img/default-avatar.png'
import { log10 } from "chart.js/helpers";

export function MiniUser({ user }) {
    console.log('user in MiniUser:', user);
    
    return <div className="mini-user">

        <div className="avatar-logo-container">
            <img className='avatar-logo' src="/img/logo.png" alt="logo" />
        </div>


        {/* <Link to={`user/${user._id}`}> */}
        {/* <img className="avatar-img" src={'/img/danPic.jpg'} />  */}
             <img className="avatar-img" src={user?.imgUrl ? user.imgUrl : defaultAvatar} />
        {/* </Link> */}

    </div>
}