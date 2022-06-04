import React from 'react'
import { supabase } from "../../lib/initSupabase"

const Description = ({ data }: any) => {
  return (
    <div>
      <h1>Description</h1>

      <h2>{data.title}</h2>
      <p>{data.text}</p>
    </div>
  )
}

export default Description

export const getServerSideProps = async (ctx: any) => {
  console.log('ctx', ctx)
  const { query: { id } } = ctx

  const { data } = await supabase.from('lessons').select('*').eq('id', id).single()


  return {
    props: {
      data
    },
  }
}
