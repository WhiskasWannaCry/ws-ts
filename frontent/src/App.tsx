import React, {useState,useEffect} from 'react';
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import MainMenu from './components/MainMenu';
import {Post} from './types'

const {getPosts} = require('./utils')


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

const App = () => {
  const [posts,setPosts] = useState<Post[]|undefined>([])
  const getData = async () => {
    const data = await getPosts();
    return data
  }
  getData()
  useEffect(() => {
    getData().then((data) => {
      setPosts(data)
    })
  },[])

  return (
    <Container>
      <MainMenu></MainMenu>
      <HR></HR>
      <Routes>
        <Route path='/' element={<Home posts={posts}></Home>}></Route>
        <Route path='/Contacts' element={<Contacts></Contacts>}></Route>
      </Routes>
    </Container>
  );
}

export default App;
