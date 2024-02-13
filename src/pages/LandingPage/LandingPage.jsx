import React from 'react';
import { useEffect,useState } from 'react';
import { useFetchModelListsQuery } from '../../store';
import { Link } from 'react-router-dom';
import CardComponent from '../../components/LandingPage/CardComponent';
import './LandingPage.css'
import { loginClient } from '../../common-partner-login-sdk/lib/esm';
import landingPageBackgroundImage from '../../assets/LandingPage/landing-page-bg-image.png'
//////////////
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_BASE_URL, GET_USERDATA_PATH } from '../../store/Apiconstants';


const LandingPage = () => {
const [userData,setUserdata]=useState();
  useEffect(() => {
    loginClient.getToken()
    .then((res) => {
      const Email = res?.data?.attributes?.email;
      const Token= res?.data?.session?.accessToken?.jwtToken;  
          axios({
            method:"POST",
            url:API_BASE_URL+GET_USERDATA_PATH,
            data:{
              "email":Email
            }
          })
          .then((respo2)=>{
            console.log("respo2", respo2?.data);
            setUserdata(respo2?.data);
            
            Cookies.set('jwtToken', respo2?.data?.results?.token, { secure: true, sameSite: 'strict' });
            Cookies.set('email', Email, { secure: true, sameSite: 'strict' });
          })
          console.log("adfs data ", res); 
    })
    .catch((err)=>{
      console.log("respo2 errro",err);
      if(import.meta.env.VITE_APP_URL==='https://dev.msilsmarttaskflow.com'){
          Cookies.set('jwtToken', "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJLUE1HX1ByYWthc2guTmlraGlsQG1hcnV0aS5jby5pbiIsInVuaXF1ZV9pZCI6IjBkMTJiMjZiLTgyMmItNGRiYi1iNTdjLWQxMGY1NThmODNjYyIsImV4cCI6MTcxMzI4MjIxMSwiaWF0IjoxNzA3MjgyMjExLCJlbWFpbCI6IktQTUdfUHJha2FzaC5OaWtoaWxAbWFydXRpLmNvLmluIn0.VrlJMeqMhV1Tksol7XUQdLfg4rakvfZY_34G7fXKZcLFI8ms7e_oY-9LgiI2w6Gf4j-OCqdGoSY-LUrwnxlZvQ", { secure: true, sameSite: 'strict' });
          Cookies.set(
            // 'email', "tom@maruti.co.in",
            // 'email',"KPMG_Neelanshu.Parnami@maruti.co.in",
            'email',"KPMG_Prakash.Nikhil@maruti.co.in",
          { secure: true, sameSite: 'strict' }
          );
    }
    })
  },[])

  // divisionalPMG
  // filler


  // const removeToken = () => {
  //   // only when logout
  //   Cookies.remove('jwtToken');
  // };

  // const response=useFetchModelListsQuery();
  // console.log("From landing page",response);
  return (
    <header className="bg-blue-900 flex flex-col items-stretch">
      <section className="flex-col overflow-hidden relative flex  w-full items-center pt-12 max-md:max-w-full"
        style={{
          width: '100vw',
          height: '100vh',
          backgroundSize: '100% 100%',
          // backgroundColor: 'red',
          backgroundImage: `url(${landingPageBackgroundImage})`,
          backgroundRepeat: 'no-repeat',
          overflow: 'auto'

        }}>
        <div className="relative z-[1] flex w-full  flex-col  items-start max-md:max-w-full">
          <div className="px-2">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a04f004d-f9e8-4df1-82ea-a49c164e164c?apiKey=1895f78b588e49a4bae3291cc83ac703&"
              className=""
              alt="Logo"
            />
          </div>
          <div className="flex items-center justify-center flex-col w-full gap-16" style={{ marginTop: '5%', gap: '17vh' }}>
            <div className="landing-page-textbox">
              <span className="landing-page-heading"> MSIL R&D <br /> </span>
              <span data-testid="landing-page-subheading" className="landing-page-subheading">Design Change Management System</span>
            </div>
            <div className="justify-center w-full">
              <form className="gap-5 flex w-full justify-evenly">
               {userData?.results?.divisionalPMG && <CardComponent title="Create / Edit Model Flow" subtitle="For PMG" to="/creator/modellist" /> }
               {userData?.results?.filler &&  <CardComponent title="Filler Activity Flow" subtitle="For PIC / TL / GL" to="/filler/modellist" />}
                {/* <CardComponent title="Checker / Approver Flow" subtitle="For PIC / TL / GL" to="/checker/approverflow" /> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </header >
  );
}

export default LandingPage;
// export {removeToken,retrieveToken};
