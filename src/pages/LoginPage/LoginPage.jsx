import loginBgImage from '../../assets/LoginPage/login-page-bg-image.png'
import logo from '../../assets/LoginPage/Logo_maruti.png'
import loginIcon from '../../assets/Flaticons/loginIcon.svg'
import loginIconBlue from '../../assets/Flaticons/loginIconBlue.svg'
import './LoginPage.css'
import { loginClient } from '../../common-partner-login-sdk/lib/esm'
import { useState, useEffect } from 'react'

const LoginPage = () => {

    useEffect(() => {
        loginClient.init("3ltd5pa3k574vbblodke8ofd5c")
    }, [])
    const handleLoginClick = () => {
        // loginClient.signInWithFederation(`https://uat.msilsmarttaskflow.com/home`)
        loginClient.signInWithFederation(`${import.meta.env.VITE_APP_URL}/home`)
    }

    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className="bg-blue-900 
    "
            style={{
                width: '100vw',
                height: '100vh',
                backgroundSize: 'cover',
                backgroundImage: `url(${loginBgImage})`,
                backgroundRepeat: 'no-repeat',
                overflow: 'hidden'

            }}
        >
            <div className="flex-col overflow-hidden  flex w-full justify-center px-16 py-12 items-start max-md:max-w-full max-md:px-5">
                <div className=" flex  flex-col justify-start items-start max-md:mb-10" style={{ width: '100vw' }}>
                    <img
                        loading="lazy"
                        src={logo}
                        className="aspect-[9.29] object-contain object-center w-70 justify-center items-center overflow-hidden max-w-full"
                    />
                    <div className="justify-center items-center  flex flex-col  login-page-textbox gap-5" >
                        <div className="flex flex-col items-stretch login-page-inside-textbox p-3">
                            <div className="text-white text-center uppercase flex flex-col items-center">
=                                <span data-testid="MSIL"  className="">

                                    MSIL R&D
                                    <br />
                                </span>
                            </div>
                        </div>
                        <div className="login-button-container-div" onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} onClick={handleLoginClick}>
                            <div className="login-btn-text">LOGIN</div>
                            <div className="login-btn-icon">
                                <i>
                                    <img src={hovered ? loginIconBlue : loginIcon} />
                                </i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
