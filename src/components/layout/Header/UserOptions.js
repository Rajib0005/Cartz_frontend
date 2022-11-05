import { SpeedDial, SpeedDialAction } from '@mui/material'
import React, { Fragment,useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import {useNavigate} from 'react-router-dom'
import { logout } from '../../../actions/userAction';


const UserOptions = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(
    (state) => state.user
  );
  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ]

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }
  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    //alert.success("Logout Successfully");
  }
  return (
    <Fragment>
     <SpeedDial
     ariaLabel="SpeedDial tooltip example"
     onClose={() => setOpen(false)}
     onOpen={() => setOpen(true)}
     style={{ zIndex: "11" }}
     open={open}
     direction="down"
     icon={
      <img
        className="speedDialIcon"
        src={user.avatar.url ? user.avatar.url : "/Profile.png"}
        alt="Profile"
      />
    } 
    >
      {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
     </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
