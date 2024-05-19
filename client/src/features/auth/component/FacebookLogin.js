import React, { useState } from "react";
import { FacebookOutlined } from "@ant-design/icons";
import { LoginSocialFacebook } from "reactjs-social-login";

function FacebookLogin() {
  const [profile, setProfile] = useState();
  return (
    <div className='w-full'>
      <LoginSocialFacebook
        appId='984411069788733'
        onResolve={(res) => {
          console.log(res);
          setProfile(res.data);
        }}
        onReject={(err) => console.log(err)}
      >
        <button
          className='bg-blue-500 h-10 rounded-lg text-white custom-btn hover:bg-[#4096ff] w-full'
          type='button'
        >
          <FacebookOutlined className='mr-1' />
          Facebook
        </button>
      </LoginSocialFacebook>
      {profile && (
        <div>
          <h1>{profile.name}</h1>
          <h1>{profile.email}</h1>
          <h1>{profile.userId}</h1>
          <img src={profile.picture.data.url} alt='img' />
        </div>
      )}
    </div>
  );
}

export default FacebookLogin;
