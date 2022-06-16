import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "./../actions/user.actions";
import { dateParser } from "./../components/Utils";
import FollowHandler from "./../components/Profil/FollowHandler";
import UploadImg from "./../components/Profil/UploadImg";

const Profil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state: any) => state.userReducer);
  const usersData = useSelector((state: any) => state.usersReducer);
  const dispatch = useDispatch();
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch<any>(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <>
      <h1>Profil de {userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  modifier bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <input
                  type="textarea"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          <h5
            onClick={() => {
              setFollowingPopup(true);
            }}
          >
            Abonnements : {userData.following ? userData.following.length : ""}
          </h5>
          <h5
            onClick={() => {
              setFollowersPopup(true);
            }}
          >
            Abonnés : {userData.followers ? userData.followers.length : ""}
          </h5>
        </div>
      </div>
      {followingPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span className="cross" onClick={() => setFollowingPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user: any) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} />
                        </div>
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </div>
        </div>
      )}
      {followersPopup && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span className="cross" onClick={() => setFollowersPopup(false)}>
              &#10005;
            </span>
            <ul>
              {usersData.map((user: any) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler idToFollow={user._id} />
                        </div>
                      </li>
                    );
                  }
                }
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Profil;
