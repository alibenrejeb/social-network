import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from '../../actions/user';

const FollowHandler = ({ followId, type }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(followUser(userData._id, followId));
        setIsFollowed(true);
    }

    const handleUnfollow = () => {
      dispatch(unfollowUser(userData._id, followId));
      setIsFollowed(false);
    };

    useEffect(() => {
      if (userData?.following?.includes(followId)) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    }, [userData, followId]);

    return userData._id && (
        <>
            {isFollowed ? (
                <span onClick={handleUnfollow}>
                    {type === "suggestion" && <button className="unfollow-btn">abonné</button>}
                    {type === "card" && <img src="./img/icons/checked.svg" alt="checked"/>}
                </span>
            ) : (
                <span onClick={handleFollow}>
                    {type === "suggestion" && <button className="follow-btn">Suivre</button>}
                    {type === "card" && <img src="./img/icons/check.svg" alt="check"/>}
                </span>
            )}
        </>
    );
};

export default FollowHandler;
