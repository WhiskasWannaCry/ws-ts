import styled from "styled-components";
import React, { useState } from "react";

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
  const [commentText, setCommentText] = useState<string>("")

  return (
    <Container>
      <Input placeholder='Добавьте комментарий'
        onChange={((e) => setCommentText((e!.target as HTMLInputElement)!.value))}
        value={commentText}>
      </Input>
      {commentText ? <AddNewCommentBtn>Добавить комментарий</AddNewCommentBtn> : null}
    </Container>
  )
}

export default AddComment;