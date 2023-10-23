import React from 'react';
import styled from 'styled-components'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import MainMenu from './components/MainMenu';


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const HR = styled.div`
width: 1px;
height: 100%;
background-color: #dae2db40;
`

function App() {
  return (
    <Container>
      <MainMenu></MainMenu>
      <HR></HR>
      <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/Contacts' element={<Contacts></Contacts>}></Route>
    </Routes>
    </Container>
  );
}

export default App;
