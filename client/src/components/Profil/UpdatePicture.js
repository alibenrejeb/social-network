import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePicture } from "../../actions/user";

export default function UpdatePicture() {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userData.username);
    formData.append("userId", userData._id);
    formData.append("image", file);

    dispatch(updatePicture(formData, userData._id, "profil"));
  }

  return (
    <form
      action=""
      onSubmit={handlePicture}
      className="upload-pic"
      encType="multipart/form-data"
    >
      <label htmlFor="file">Changer votre avatar</label>
      <input
        type="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Envoyer" />
    </form>
  );
}
