import React from 'react'


export default function LessonForm({
  onTitleChange,
  title,
  onTextChange,
  text,
  onSubmit
}: any) {
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
