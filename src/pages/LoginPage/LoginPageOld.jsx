/* v8 ignore start */

import * as React from "react";
import { useEffect } from "react";
import myImage from '../../../src/assets/LoginPage/Login_bg.png'
// import {loginClient} from '../../common-partner-login-sdk/lib/esm'
import logo from '../../assets/LoginPage/Logo_maruti.png'
import { ButtonLogin } from "../../components/LoginPage/ButtonLogin";
const LoginPage = () => {

  // useEffect(()=>{
  //    loginClient.init("enter the key here")
  // },[])


  return (
    <div className="bg-blue-900 
    "
      style={{
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        // backgroundColor: 'red',
        backgroundImage: `url(${myImage})`,
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'

      }}
    >
      <div className="flex-col overflow-hidden  flex w-full justify-center px-16 py-12 items-start max-md:max-w-full max-md:px-5">
        {/* <img
          loading="lazy"
          srcSet={`
            ${myImage} 100w,
            ${myImage}?w=200 200w,
            ${myImage}?w=400 400w,
            ${myImage}?w=800 800w,
            ${myImage}?w=1200 1200w,
            ${myImage}?w=1600 1600w,
            ${myImage}?w=2000 2000w
          `
          }
          className="absolute h-full w-full object-cover inset-0"
        /> */}
        <div className=" flex  flex-col justify-start items-start max-md:mb-10" style={{ width: '100vw' }}>
          <img
            loading="lazy"
            src={logo}
            className="aspect-[9.29] object-contain object-center w-70 justify-center items-center overflow-hidden max-w-full"
          />
          <div className="justify-center items-center bg-white bg-opacity-40 flex flex-col rounded-2xl mt-5 max-md:mt-10 max-md:px-5" style={{ width: '50%', height: '50%', position: 'absolute', top: '50%', right: '50%', transform: 'translate(50%,-50%)' }}>
            <div className="flex  w-96 max-w-full flex-col items-stretch">
              <div className="text-white text-center text-6xl leading-[69px] uppercase max-md:text-4xl max-md:leading-[56px]">
                <span className="font-black">
                  MSIL R&D
                  <br />
                </span>
                <span className="">Application</span>
              </div>
              <div className="text-white text-center text-2xl font-medium uppercase whitespace-nowrap items-stretch border  self-center justify-center mt-8  rounded-md  max-md:px-5" >
                <ButtonLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
/* v8 ignore stop */
