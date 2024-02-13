/* v8 ignore start */

import { useFetchUsersQuery } from '../../store';
import './Header.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HeaderLogoImage from '../../assets/Header/Logo.png';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCaretDown, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button, Chip, Menu, MenuItem } from '@mui/material';
import userIcon from '../../assets/Flaticons/userIcon.svg'
import homeIcon from '../../assets/Flaticons/homeIcon.svg'
import bellIcon from '../../assets/Flaticons/bellIcon.svg'
import logoutIcon from '../../assets/Flaticons/logoutIcon.svg'
import { useNavigate } from 'react-router-dom';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Header = () => {
  const { data, error, isLoading } = useFetchUsersQuery("tom@maruti.co.in");
  console.log(data);
  const [value, setValue] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => { console.log('data header :- ', data) }, [isLoading]);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='main-header flex flex-row items-center justify-between mt-1'>
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
            '.MuiTabs-indicator': {
              top: { xs: "7vh", sm: '7vh', md: '9vh', xl: '4.5vh', lg: '7vh' }
            },
          }}
        >
          <Tab
            label="Dashboard"
            {...a11yProps(0)}
            // style={{
            //   color: value === 1 ? '#171c8f' : '',
            // }}
            disabled
            className={value === 0 ? 'tab-item-active' : 'tab-item'}
          />
          <Tab
            label="Models"
            {...a11yProps(1)}
            // style={{
            //   color: value === 0 ? '#171c8f' : '',
            // }}
            className={value === 1 ? 'tab-item-active' : 'tab-item'}
            indicatorclassname="custom-indicator"
          />

        </Tabs>
      </div>
      <div className="user-info-container">
        <div className="user-icons-div">
          <i className='home-icon' onClick={() => {
            navigate('/creator/modellist')
          }}><img src={homeIcon} /></i>
          {/* <i><img src={bellIcon} /></i> */}

          <Chip label={
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                color: '#000'
              }}
            >
              {data && <p style={{ fontSize: '12px', fontWeight: '600', color: '#66696B' }}>{data?.results?.name}<FontAwesomeIcon style={{ marginRight: '6px', marginLeft: '4px' }} icon={faUser} className='header-user-icon' /><FontAwesomeIcon icon={faCaretDown} /></p>}
            </Button>} />
        </div>
        <div className="user-division-div">{<p>MSIL/{data?.results?.vertical}/{data?.results?.department}/{data?.results?.division}</p>}</div>
      </div>

      {/* "engineering_type": "Vehicle",
      "engineering_department": "Body",
      "engineering_type_code": "EN-B1", */}


      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <div className="flex justify-between items-center gap-5">
            <div className="">Logout</div>
            <div className="">
            <i>
            <img src={logoutIcon}/>
          </i>
            </div>
          </div>
           </MenuItem>
      </Menu>
    </div>
  );
};

export default Header;
/* v8 ignore stop */
