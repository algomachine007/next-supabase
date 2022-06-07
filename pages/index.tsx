import Link from "next/link";
import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "./../hooks/useAuth";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import style from "./../styles/form.module.css";
import styles from "./../styles/wrapper.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import github from "./../public/github.png";
import Button from "../components/Button/Button";
import { LessonData } from "./lesson/LessonType";

const Home = ({ data }: LessonData) => {
  //@ts-ignore
  const { user, signOut, view } = useAuth();

  const router = useRouter();

  // const pushToProfile = () => {
  //   if (user) {
  //     router.push('/profile')
  //   }
  // }

  // useEffect(pushToProfile, [user])

  console.log("supabase", supabase);

  const signInWithGithub = async () => {
    const { user } = await supabase.auth.signIn({
      provider: "github",
    });
    console.log('GITHUB', user);
  };

  return (
    <Layout>
      <div className={styles.wrapper} data-variant={user ? "column" : ''}>
        {user && (
          <div className={styles.authView}>
            <h2>Welcome! {user.email}</h2>
            <div>
              <code className="highlight">{user.role}</code>
              <Link href="/profile">
                <a className="button">Go to Profile</a>
              </Link>

              <Button callback={signOut}>
                Sign Out <span>{user.email}</span>
              </Button>
            </div>

          </div>
        )}

        <div>
          <div>
            {user ? ' ' : <h2>Module 1: Authentication with Supabase UI</h2>}
          </div>
          {!user && (
            <div className={style.formWrapper}>
              <Auth
                view={view}
                supabaseClient={supabase}
                className={style.form}
              />
            </div>
          )}
        </div>
      </div>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.githubHeading}>
            <div className={styles.githubImageWrapper}>
              <Image src={github} alt="github" />
            </div>
            <h2>Module 2 : Signin with Github</h2>
          </div>

          <div className={styles.githubButtonWrapper}>
            <Button callback={signInWithGithub}>Sign in</Button>
            <Button callback={signOut} data-variant="sign-out">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>

        <div>
          <div>
            <h1>Module 3: Simple Query from Table </h1>
          </div>

          {data?.map(({ id, title }) => (
            <div key={id} className={style.link}>
              <Link
                href={{
                  pathname: "/lesson/[id]",
                  query: {
                    id: id,
                  },
                }}
              >
                <a>{title} </a>
              </Link>
            </div>
          ))}

          <li>
            <Link href='/lesson/new/lesson'>
              <a>+ New Lesson</a>
            </Link>
          </li>
        </div>

      </div>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {

  const { data } = await supabase.from("lessons").select("*")

  return { props: { data } };
};
