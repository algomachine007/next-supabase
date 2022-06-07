import { useRouter } from "next/router"
import { useState } from "react"
import LessonForm from "../../../components/LessonForm/LessonForm"
import { supabase } from "../../../lib/initSupabase"

const NewLesson = () => {
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
      const { data } = await supabase.from('lessons').insert(lesson)
      console.log(data);
      if (data) {
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
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

export default NewLesson