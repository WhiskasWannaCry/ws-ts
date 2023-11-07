import axios from 'axios'
import {PostType, UserType} from './types'

// Get all posts from Posts Collection
// Return array of posts objects
export const getPosts = async ():Promise<PostType[]> => {
  const {data} = await axios.get('http://localhost:5000/get_posts')
  return data
}

// Now not working
export const signUpUser = async (user: UserType) => {
  const data = await axios.post('http://localhost:5000/sign_up_user', user)
  return data
}