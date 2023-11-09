import axios from 'axios'
import {PostType, Comment, UserSignInType, UserSignUpType, UserClientType} from './types'

// Get all posts from Posts Collection
// Return array of posts objects
export const getPosts = async ():Promise<PostType[]> => {
  const {data} = await axios.get('http://localhost:5000/get_posts')
  return data
}

export const signUpUser = async (user: UserSignUpType) => {
  const data = await axios.post('http://localhost:5000/auth/registration', user)
  return data
}

export const signInUser = async (user: UserSignInType) => {
  const data = await axios.post('http://localhost:5000/auth/login', user, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return data
}

export const addNewComment = async (comment: Comment, postID:string) => {
  const data = await axios.post('http://localhost:5000/add_new_comment', {comment,postID})
  return data
}

export const validationCurrentUser = async (userLS:UserClientType) => {
  const data = await axios.get('http://localhost:5000/validation_current_user', {params:userLS})
  return data
}

export const addOrRemoveLike = async (userLSID:string, postID:any) => {
  const data = await axios.post('http://localhost:5000/add_or_remove_like', {userLSID,postID})
  return data
}