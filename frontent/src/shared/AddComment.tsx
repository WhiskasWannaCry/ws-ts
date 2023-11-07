import styled from "styled-components";
import React, { useState } from "react";
import { addNewComment } from '../utils'
import { Comment } from '../types'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  margin-top: 12px;
`

const Input = styled.input`
  border: 1px solid #dae2db40;
  padding: 4px;
  width: 60%;
  height: 100%;
`

const AddNewCommentBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 100%;
  border: 1px solid #dae2db40;
  background-color: #37394571;
  font-size: 10px;
`

const AddComment = () => {
  const [commentText, setCommentText] = useState<Comment>({
    id: '',
    authorID: '',
    text: '',
  })

  let userLS = localStorage.getItem("currentUser")
  if(userLS !== null) {
    userLS = JSON.parse(userLS)
  }

  const newComment = async () => {
    // addNewComment(commentText)
    console.log(userLS)
  }

  return (
    <Container>
      <Input placeholder='Добавьте комментарий'
        onChange={(e) => setCommentText(prev => ({
          ...prev,
          id: String(Date.now()),
          //NOW NOT WORKING
          // authorID: userLS ? userLS._id : "",
          text: (e!.target as HTMLInputElement)!.value,
        }))}
        value={commentText.text}>
      </Input>
      {commentText ? <AddNewCommentBtn onClick={newComment}>Добавить комментарий</AddNewCommentBtn> : null}
    </Container>
  )
}

export default AddComment;