import React, { useState } from 'react'
import styled from 'styled-components'
import { useContext } from 'react';
import {useSomeContext} from '../shared/Context'

const Container = styled.div`
  padding: 10px;
  width: 100%;
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

const SignInButton = styled.button`
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


const Authorization = () => {
  const {currentUser, setCurrentUser} = useSomeContext();
  const [isSignIn,setIsSignIn] = useState<Boolean>(false)
  console.log(currentUser)
  return (
    <Container>
      {currentUser.id === '0'? (
        <SignContainer>
          {isSignIn? (
            <SignInContainer>
              <SignTitle>Sign In</SignTitle>
              <InputLabel>E-mail*:</InputLabel>
              <InputLogin placeholder='zermankarim@gmail.com'></InputLogin>
              <InputLabel>Password*:</InputLabel>
              <InputPassword></InputPassword>
              <SignInButton>Sign In</SignInButton>
              <Ask>Haven't account?</Ask>
              <Switcher onClick={() => setIsSignIn(!isSignIn)}>Sign Up</Switcher>
            </SignInContainer>
          ):(
            <SignUpContainer>
              <SignTitle>Sign Up</SignTitle>
              <InputLabel>Name*:</InputLabel>
              <InputName placeholder='Karim'></InputName>
              <InputLabel>E-mail*:</InputLabel>
              <InputLogin placeholder='zermankarim@gmail.com'></InputLogin>
              <InputLabel>Password*:</InputLabel>
              <InputPassword></InputPassword>
              <InputLabel>Repeat password*:</InputLabel>
              <InputRepeatPassword></InputRepeatPassword>
              <SignInButton>Sign Up</SignInButton>
              <Ask>Have account?</Ask>
              <Switcher onClick={() => setIsSignIn(!isSignIn)}>Sign in</Switcher>
            </SignUpContainer>
          )}
        </SignContainer>
      ):null } 
    </Container>// Current user profile should be here
  )
}

export default Authorization;