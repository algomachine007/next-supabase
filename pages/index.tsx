import Link from "next/link";
import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "./../hooks/useAuth";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import style from './../styles/form.module.css'
import styles from './../styles/wrapper.module.css'
import { useRouter } from "next/router";
import Image from "next/image";
import github from './../public/github.png'
import Button from "../components/Button/Button";

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

    console.log('GITHUB USER', user)
  }


  return (
    <Layout>
      <div className={styles.wrapper}>
        {user && (
          <>
            <h2>Welcome! {user.email}</h2>
            <code className="highlight">{user.role}</code>
            <Link href="/profile">
              <a className="button">Go to Profile</a>
            </Link>

            <button type="button" className="button-inverse" onClick={signOut}>
              Sign Out
            </button>
          </>
        )}

        <div>
          <div>
            <h2>Module 1: Authentication with Supabase UI</h2>
          </div>
          {!user && <div className={style.formWrapper}>

            <Auth view={view} supabaseClient={supabase} className={style.form} />
          </div>
          }
        </div>
      </div>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.githubHeading}>
            <div className={styles.githubImageWrapper}>
              <Image src={github} alt='github' />
            </div>
            <h2>Module 2 : Signin with Github</h2>
          </div>

          <div className={styles.githubButtonWrapper}>
            <Button callback={signInWithGithub}>Sign in</Button>
            <Button callback={signOut} data-variant='sign-out'>Sign Out</Button>
          </div>

        </div>
      </div>
      <div>
        <h1>SIMPLE QUERY FROM TABLE </h1>

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






    </Layout >
  );
};

export default Home;


export const getStaticProps = async () => {

  //basic supabase queries
  const { data } = await supabase.from('lessons').select('*')

  return { props: { data } }
}