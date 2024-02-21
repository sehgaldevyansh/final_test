import { useFetchUsersQuery } from "../../store";
import PropTypes from "prop-types";
import "./Header.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HeaderLogoImage from "../../assets/Header/Logo.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Chip, Menu, MenuItem } from "@mui/material";
// import userIcon from '../../assets/Flaticons/userIcon.svg'
// import homeIcon from '../../assets/Flaticons/homeIcon.svg'
// import bellIcon from '../../assets/Flaticons/bellIcon.svg'

import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { loginClient } from "../../common-partner-login-sdk/lib/esm";

const Header = ({ isHome = false }) => {
  const { data } = useFetchUsersQuery("tom@maruti.co.in");
  console.log(data);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    Cookies.remove("jwtToken");
    Cookies.remove("email");

    loginClient.federatedLogout(
      "3ltd5pa3k574vbblodke8ofd5c",
      `${import.meta.env.VITE_APP_URL}/logout`
    ); // `${import.meta.env.VITE_APP_URL}/home`
    setAnchorEl(null);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setValue(0);
    } else {
      setValue(1);
    }
  }, [location.pathname]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Update the route based on the selected tab
    if (newValue === 0) {
      navigate("/dashboard");
    } else if (newValue === 1) {
      navigate("/filler/modellist");
    }
  };

  return (
    <div className="main-header flex flex-row items-center justify-between mt-1">
      <div className="logo-container ">
        <img src={HeaderLogoImage} alt="Header Logo" />
      </div>
      <div className="header-tabs-container">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          indicatorclassname="custom-indicator"
          sx={{
            ".MuiTabs-indicator": {
              top: { xs: "7vh", sm: "7vh", md: "9vh", xl: "4.5vh", lg: "7vh" },
            },
          }}
        >
          <Tab
            label="Dashboard"
            className={value === 0 ? "tab-item-active" : "tab-item"}
            indicatorclassname="custom-indicator"
          />
          <Tab
            label="Models"
            className={value === 1 ? "tab-item-active" : "tab-item"}
            indicatorclassname="custom-indicator"
          />
        </Tabs>
      </div>
      <div className="user-info-container">
        <div className="user-icons-div">
          <i
            className="home-icon-style"
            onClick={() => {
              if (!isHome) navigate("/creator/modellist");
            }}
          >
            {/* <img src={homeIcon} /> */}
            <FontAwesomeIcon
              icon={faHouse}
              className={
                !isHome ? "home-icon-style" : "home-icon-style-inactive"
              }
            />
          </i>
          {/* <i><img src={bellIcon} /></i> */}

          <Chip
            label={
              <Button
                data-testid="basic-button"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  color: "#000",
                }}
              >
                {data && (
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#66696B",
                    }}
                  >
                    {data?.results?.name}
                    <FontAwesomeIcon
                      style={{ marginRight: "6px", marginLeft: "4px" }}
                      icon={faUser}
                      className="header-user-icon"
                    />
                    <FontAwesomeIcon icon={faCaretDown} />
                  </p>
                )}
              </Button>
            }
          />
        </div>
        <div className="user-division-div">
          {
            <p>
              MSIL/{data?.results?.vertical}/{data?.results?.department}/
              {data?.results?.division}
            </p>
          }
        </div>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

Header.propTypes = {
  isHome: PropTypes.bool,
};

export default Header;
