import React, { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleOutlined } from "@ant-design/icons";
import axios from "axios";

function GoogleLogin() {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => setUser(credentialResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);
  console.log(profile);
  return (
    <div className='w-full'>
      {profile ? (
        <div>
          <img src={profile.picture} alt='user image' />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
        </div>
      ) : (
        <button
          className='bg-[#ea4235] h-10 text-white rounded-lg custom-btn hover:bg-[#ea4235cc] w-full'
          onClick={login}
          type='button'
        >
          <GoogleOutlined className='mr-1' />
          Gmail
        </button>
      )}
    </div>
  );
}

export default GoogleLogin;
