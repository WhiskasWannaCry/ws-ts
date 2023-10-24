export type PostType = {
  whoPostedID:string,
  text:string,
  likes:number,
  image:string,
  subscribersIds:Array<string>,
}

export type UserType = {
  id: string,
  email: string,
  username: string,
  age: number,
  image: string,
  password: string,
}