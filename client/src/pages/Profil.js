import React, { useContext } from "react";
import Auth from "../components/Auth";
import UserContext from "../components/UserContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
    const [currentUser] = useContext(UserContext);

    return (
      <div className="profil-page">
        {currentUser ? (
          <UpdateProfil />
        ) : (
          <div className="log-container">
            <Auth signin={false} />
            <div className="img-container">
              <img src="./img/log.svg" alt="img-log" />
            </div>
          </div>
        )}
      </div>
    );
};

export default Profil;
