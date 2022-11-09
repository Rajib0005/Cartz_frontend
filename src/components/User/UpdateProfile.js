import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { clearErrors, updateProfile, loadUser } from "../../actions/userAction";
// import Loader from "../layout/Loader/Loader"
import { useNavigate} from 'react-router-dom'
import './UpdateProfile.css'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(
    (state) => state.user
  );
  // const route = useRoutes();
  const { error, isUpdated } = useSelector((state) => state.profile);
  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    let userData={
      "name":e.target[0].value,
      "email":e.target[1].value,
      "avatar":e.target[2].value
    }
    // console.log();

    // const myForm = new FormData();

    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("avatar", avatar);
    // console.log(myForm);
    dispatch(updateProfile(userData));
    // window.location.href='/'
    
  };

  const updateProfileDataChange = (e) => {
    // if (e.target.name === "avatar") {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
    // else {
    //   setUser({ ...user, [e.target.name]: e.target.value });
    // }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (isUpdated) {
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      })
    }
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, user, error, isUpdated]);

  return (
    <Fragment>
      <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
          <h2 className="updateProfileHeading">Update Profile</h2>
          <form
            className="updateProfileForm"
            // ref={registerTab}
            encType="multipart/form-data"
            onSubmit={updateProfileSubmit}
          >
            <div className="updateProfileName">
              <PersonOutlineIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              {/* <UploadFileIcon /> */}
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              />
            </div>
            <input type="submit" value="Update" className="updateProfileBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default UpdateProfile
