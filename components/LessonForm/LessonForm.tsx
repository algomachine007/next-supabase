import React from 'react'
import { LessonFormType } from "./LessonFormType"


export default function LessonForm({
  onTitleChange,
  title,
  onTextChange,
  text,
  onSubmit
}: LessonFormType) {
  return (
    <form onSubmit={onSubmit}>
      <label>Title
        <input
          value={title}
          placeholder='title'
          onChange={onTitleChange}
        />
      </label>

      <label>Text
        <input
          type='text'
          value={text}
          placeholder='text'
          onChange={onTextChange}
        />
      </label>
      <button type='submit'>Save Lesson</button>
    </form>
  )
}
