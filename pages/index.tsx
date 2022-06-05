import Link from "next/link";
import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../lib/auth";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import style from './../styles/form.module.css'
import { useRouter } from "next/router";

const Home = ({ data }: any) => {
  console.log('lessons', data)

  //@ts-ignore
  const { user, signOut, view, setUser } = useAuth();

  const router = useRouter()

  // const pushToProfile = () => {
  //   if (user) {
  //     router.push('/profile')
  //   }
  // }

  // useEffect(pushToProfile, [user])

  console.log('supabase', supabase)

  const signInWithGithub = async () => {
    const { user } = await supabase.auth.signIn(
      {
        provider: "github",
      },
    );

    console.log(user)
  }

  const signOutFromGithub = async () => {
    await supabase.auth.signOut();
  }

  return (
    <Layout>
      {user && (
        <>
          <h2>Welcome!</h2>
          <code className="highlight">{user.role}</code>
          <Link href="/profile">
            <a className="button">Go to Profile</a>
          </Link>
          <button type="button" className="button-inverse" onClick={signOut}>
            Sign Out
          </button>
        </>
      )}


      <div className={style.formWrapper}>

        {!user && <Auth view={view} supabaseClient={supabase} className={style.form} />}

      </div>



      <div>
        <h1>View description </h1>

        {data.map((lesson: any) => (
          <div key={lesson.id}>
            <Link href={{
              pathname: "/lesson/[id]",
              query: {
                id: lesson.id
              }
            }
            }>
              {lesson.title}

            </Link>
          </div>

        ))}
      </div>

      {/* <div>
        Signin with Github
        <button onClick={signInWithGithub}>Sign in</button>
        <button onClick={signOutFromGithub}>Sign Out</button>
      </div> */}




    </Layout >
  );
};

export default Home;


export const getStaticProps = async () => {

  //basic supabase queries
  const { data } = await supabase.from('lessons').select('*')

  return { props: { data } }
}