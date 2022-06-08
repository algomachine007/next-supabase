import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import React, { useState } from 'react'
import LessonForm from "../../components/LessonForm/LessonForm"
import { supabase } from "../../lib/initSupabase"


const UpdateLesson = ({ data }: any) => {

  const { id: identifier } = data

  const [text, setText] = useState("")
  const [title, setTitle] = useState("")

  const onTitleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setTitle(e.target.value)
  }
  const onTextChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    setText(e.target.value)
  }

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lesson = [{
      "title": title,
      "text": text,
    }]
    try {
      const { data } = await supabase.from('lessons').update(lesson).match({
        id: identifier
      });

      if (data) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>UPDATE</h1>

      <h2>{data.title}</h2>
      <p>{data.text}</p>

      <LessonForm
        onTitleChange={onTitleChange}
        onTextChange={onTextChange}
        title={title}
        text={text}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default UpdateLesson

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  console.log(ctx);

  const { query: { id } } = ctx

  const { data, error } = await supabase.from('lessons').select('*').eq('id', id).single()

  if (error) {
    return {
      notFound: true,
    }
  }


  return {
    props: {
      data
    },
  }
}
