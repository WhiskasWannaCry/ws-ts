interface Comment {
    id: String,
    authorID: String,
    text: String,
}

export type PostType = {
  authorID:string,
  text:string,
  likes:number,
  image:string,
  subscribersIds:Array<string>,
  comments: Array<Comment>,
}

export type UserType = {
  id: string,
  email: string,
  username: string,
  image: string,
  password: string | null,
}