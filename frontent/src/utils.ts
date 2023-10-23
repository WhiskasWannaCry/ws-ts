import axios from 'axios'
import {Post} from './types'

// Get all posts from Posts Collection
// Return array of posts objects
export const getPosts = async ():Promise<Post[]> => {
  const {data} = await axios.get('http://localhost:5000/get_posts')
  return data
}