import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useContext } from 'react';
import { useSomeContext } from '../shared/Context'
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';
import GoogleAuth from './GoogleAuth';
import { UserType } from '../types';
const { signUpUser } = require('../utils')

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  padding: 10px;
  height: 100%;
`

const SignContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
border: 1px solid #dae2db40;
width: 100%;
min-height: 300px;
padding: 10px;
`

const SignInContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
width: 100%;
`

const SignUpContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
width: 100%;
`

const SignTitle = styled.div`
font-size: 20px;
`

const InputLabel = styled.label`
margin-top: 12px;
margin-bottom: 8px;
width: 100%;
font-size: 12px;
`

const InputName = styled.input`
width: 100%;
height: 32px;
border: 1px solid #dae2db40;
border-radius: 4px;
padding: 4px;
`

const InputLogin = styled.input`
width: 100%;
height: 32px;
border: 1px solid #dae2db40;
border-radius: 4px;
padding: 4px;
`

const InputPassword = styled.input`
width: 100%;
height: 32px;
border: 1px solid #dae2db40;
border-radius: 4px;
padding: 4px;
`

const InputRepeatPassword = styled.input`
width: 100%;
height: 32px;
border: 1px solid #dae2db40;
border-radius: 4px;
padding: 4px;
`

const SignButton = styled.button`
  cursor: pointer;
  margin-top: 12px;
  width: 40%;
  height: 32px;
  border: 1px solid #dae2db40;
  background-color: #373945;
  border-radius: 4px;
  &:hover {
    background-color: #666a7e;
  }
`

const Ask = styled.span`
font-size: 12px;
margin: 8px;
`

const Switcher = styled.span`
cursor: pointer;
color: #5f5f99;
&:hover {
  color: #7979bb;
  }
`

const GoogleTitle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color:#666a7e;
  font-size: 12px;
  margin-top: 16px;
  width: 100%;
`

const AccountInfo = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 16px;
border: 1px solid #dae2db40;
`

const ImageAndName = styled.div`
display: flex;
width: 100%;
justify-content: space-around;
align-items: center;
`

const AccountImageContainer = styled.div`
cursor: pointer;
display: flex;
justify-content: center;
padding: 4px;
border: 1px solid #dae2db40;
align-items: center;
width: 30%;
`

const AccountImage = styled.img`
width: 100%;
`

const AccountName = styled.span`
  width: 50%;
`

const AccountEmail = styled.span`
  margin-top: 8px;
  width: 100%;
  color: #dae2db65;
`

const LogoutBtn = styled.button`
  cursor: pointer;
  padding: 16px;
  border: 1px solid #dae2db40;
  background-color: #373945;
  border-radius: 4px;
  &:hover {
    background-color: #666a7e;
  }
`

const Authorization = () => {
  const { currentUser, setCurrentUser } = useSomeContext();
  const [isSignIn, setIsSignIn] = useState<Boolean>(false)
  // console.log(currentUser)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [repassword, setRepassword] = useState<string>("")
  // log out function to log the user out of google and set the profile array to null
  const logOutWithGoogle = () => {
    const guest: UserType = {
      _id: "0",
      username: 'Guest',
      image: '',
      password: '',
      email: "",
    }
    googleLogout();

    // When user logout, return to default guest account to state and local storage
    setCurrentUser(guest)
    localStorage.setItem("currentUser", JSON.stringify(guest))
  }

  const clearFormStates = () => {
    // setFormStates("")
    setName("")
    setEmail("")
    setPassword("")
    setRepassword("")
  }

  const sendSignUpUser = async (user: UserType) => {
    try {
      const data = await signUpUser(user);
      return data
    } catch (e) {
      console.log(e)
    }
  }

  const signUp = () => {
    // Here must be sign up logic
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!name || !email || !password || !repassword) {
      alert("Incorrect value of fields")
      return
    }
    if (password !== repassword) {
      alert("Password and repeat password should be match")
      return
    }
    if (!emailRegex.test(email)) {
      alert("Incorrect e-mail")
      return
    }
    console.log("Succesful validation on client")
    const user: UserType = { username: name, email, password, _id: String(Date.now()), image: "" }

    // Now not working
    signUpUser(user)
  }

  const signIn = () => {
    // Here must be sign in logic
    if (!email || !password) {
      alert("Incorrect value of fields")
      return
    }
  }

  return (
    <Container>
      {currentUser._id === '0' ? (
        <SignContainer>
          {isSignIn ? (
            <SignInContainer>
              <SignTitle>Sign In</SignTitle>
              <InputLabel>E-mail*:</InputLabel>
              <InputLogin placeholder='zermankarim@gmail.com'
                onChange={(e) => setEmail((e!.target as HTMLInputElement)!.value)}
                value={email}></InputLogin>
              <InputLabel>Password*:</InputLabel>
              <InputPassword type='password'
                onChange={(e) => setPassword((e!.target as HTMLInputElement)!.value)}
                value={password}></InputPassword>
              <SignButton onClick={signIn}>Sign In</SignButton>
              <Ask>Haven't account?</Ask>
              <Switcher onClick={() => {
                setIsSignIn(!isSignIn)
                clearFormStates()
              }}>Sign Up</Switcher>

            </SignInContainer>
          ) : (
            <SignUpContainer>
              <SignTitle>Sign Up</SignTitle>
              <InputLabel>Name*:</InputLabel>
              <InputName placeholder='Karim'
                onChange={(e) => setName((e!.target as HTMLInputElement)!.value)}
                value={name}></InputName>
              <InputLabel>E-mail*:</InputLabel>
              <InputLogin placeholder='zermankarim@gmail.com'
                onChange={(e) => setEmail((e!.target as HTMLInputElement)!.value)}
                value={email}></InputLogin>
              <InputLabel>Password*:</InputLabel>
              <InputPassword type='password'
                onChange={(e) => setPassword((e!.target as HTMLInputElement)!.value)}
                value={password}></InputPassword>
              <InputLabel>Repeat password*:</InputLabel>
              <InputRepeatPassword type='password'
                onChange={(e) => setRepassword((e!.target as HTMLInputElement)!.value)}
                value={repassword}></InputRepeatPassword>
              <SignButton onClick={signUp}>Sign Up</SignButton>
              <Ask>Have account?</Ask>
              <Switcher onClick={() => {
                setIsSignIn(!isSignIn)
                clearFormStates()
              }}>Sign in</Switcher>
            </SignUpContainer>
          )}
          <GoogleTitle>Or Sign  with Google Account</GoogleTitle>
          <GoogleAuth setCurrentUser={setCurrentUser}></GoogleAuth>
        </SignContainer>
      ) : (
        <AccountInfo>
          <ImageAndName>
            <AccountImageContainer>
              <AccountImage src={currentUser.image} alt="user image" />
            </AccountImageContainer>
            <AccountName>{currentUser.username}</AccountName>
          </ImageAndName>
          <AccountEmail>{currentUser.email}</AccountEmail>
          <br />
          <br />
          <LogoutBtn onClick={logOutWithGoogle}>Log out</LogoutBtn>
        </AccountInfo>
      )}
    </Container>// Current user profile should be here
  )
}

export default Authorization;