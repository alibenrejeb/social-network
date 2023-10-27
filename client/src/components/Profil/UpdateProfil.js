import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import env from "react-dotenv";
import LeftNav from "../LeftNav";
import FollowHandler from "./FollowHandler";
import UpdatePicture from "./UpdatePicture";
import { updateBio } from "../../actions/user";
import { dateParser } from "../Utils";

export default function UpdateProfil() {
  const [updateForm, setUpdateForm] = useState(false);
  const [bio, setBio] = useState("");
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, { bio }));
    setUpdateForm(false);
  };

  return (
    userData && (
      <div className="profil-container">
        <LeftNav />
        <h1> Profil de {userData.username}</h1>
        <div className="update-container">
          <div className="left-part">
            <h3>Photo de profil</h3>
            <img src={env.API_BASE_URL + userData.picture} alt="user-pic" />
            <UpdatePicture />
            {/* <p>{error.maxSize}</p> */}
            {/* <p>{error.format}</p> */}
          </div>
          <div className="right-part">
            <div className="bio-update">
              <h3>Bio</h3>
              {updateForm ? (
                <>
                  <textarea
                    type="text"
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <button onClick={handleUpdate}>Valider modifications</button>
                </>
              ) : (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.bio}
                  </p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier bio
                  </button>
                </>
              )}
            </div>
            <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
            <h5 onClick={() => setFollowingPopup(true)}>
              Abonnements :{" "}
              {userData.following ? userData?.following?.length : ""}
            </h5>
            <h5 onClick={() => setFollowersPopup(true)}>
              Abonnés : {userData.followers ? userData?.followers?.length : ""}
            </h5>
          </div>
        </div>
        {Array.isArray(usersData) &&
          userData?.following?.length > 0 &&
          followingPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Abonnements</h3>
                <span
                  className="cross"
                  onClick={() => setFollowingPopup(false)}
                >
                  &#10005;
                </span>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.following.length; i++) {
                      if (user._id === userData.following[i]) {
                        return (
                          <li key={user._id}>
                            <img
                              src={env.API_BASE_URL + user.picture}
                              alt="user-pic"
                            />
                            <h4>{user.username}</h4>
                            <div className="follow-handler">
                              <FollowHandler
                                followId={user._id}
                                type={"suggestion"}
                              />
                            </div>
                          </li>
                        );
                      }
                    }
                    return null;
                  })}
                </ul>
              </div>
            </div>
          )}
        {Array.isArray(usersData) &&
          userData?.followers?.length > 0 &&
          followersPopup && (
            <div className="popup-profil-container">
              <div className="modal">
                <h3>Abonnés</h3>
                <span
                  className="cross"
                  onClick={() => setFollowersPopup(false)}
                >
                  &#10005;
                </span>
                <ul>
                  {usersData.map((user) => {
                    for (let i = 0; i < userData.followers.length; i++) {
                      if (user._id === userData.followers[i]) {
                        return (
                          <li key={user._id}>
                            <img
                              src={env.API_BASE_URL + user.picture}
                              alt="user-pic"
                            />
                            <h4>{user.username}</h4>
                            <div className="follow-handler">
                              <FollowHandler
                                followId={user._id}
                                type={"suggestion"}
                              />
                            </div>
                          </li>
                        );
                      }
                    }
                    return null;
                  })}
                </ul>
              </div>
            </div>
          )}
      </div>
    )
  );
}
