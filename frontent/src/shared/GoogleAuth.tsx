import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserType } from '../types';

const LoginBtn = styled.button`
  margin-top: 8px;
  padding: 8px;
  border: 1px solid #dae2db40;
  background-color: #373945;
  border-radius: 4px;
  &:hover {
    background-color: #666a7e;
  }
`

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser?: string;
}

const GoogleAuth = (props: { setCurrentUser: React.Dispatch<React.SetStateAction<UserType>> }) => {
  const [googleUser, setGoogleUser] = useState<TokenResponse | undefined>()
  const [profile, setProfile] = useState<TokenResponse | undefined>();

  useEffect(
    () => {
      if (googleUser) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            const { email, name, picture, _id, } = res.data
            const newCurrentUser = {
              _id,
              email,
              username: name,
              image: picture,
              password: '',
            }
            props.setCurrentUser(newCurrentUser)
            localStorage.setItem("currentUser",JSON.stringify(newCurrentUser))
          })
          .catch((err) => console.log(err));
      }
    },
    [googleUser]
  );




  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse: Omit<TokenResponse, "error" | "error_description" | "error_uri">): void => {
      console.log(tokenResponse)
      setGoogleUser(tokenResponse)

    },
    onError: () => console.log("Log in failed"),
  });

  return (
    <LoginBtn onClick={() => loginWithGoogle()}>Sign with Google 🚀 </LoginBtn>
  );
}

export default GoogleAuth;