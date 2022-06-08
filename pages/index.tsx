import Link from "next/link";
import Layout from "../components/Layout/Layout";
import { useAuth } from "./../hooks/useAuth";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import style from "./../styles/form.module.css";
import styles from "./../styles/wrapper.module.css";
import Image from "next/image";
import github from "./../public/github.png";
import Button from "../components/Button/Button";
import { LessonData } from "./lesson/LessonType";
import { toast } from "react-toastify";

const Home = ({ data }: LessonData) => {
  const { user, signOut, view } = useAuth();

  const signInWithGithub = async () => {
    await supabase.auth.signIn({
      provider: "github",
    });
  };

  const handleDeleteLesson = async (id: number, title: string) => {
    try {
      await supabase
        .from('lessons')
        .delete()
        .match({ id })
      toast(`${title} removed`, {
        type: "warning",
      });
      window.location.reload();
    } catch (error) {
      toast(`${error} removed`, {
        type: "error",
      });
    }
  }

  return (
    <Layout>
      <div className={styles.wrapper} data-variant={user ? "column" : ''}>
        {user && (
          <div className={styles.authView}>
            <h2>Welcome! {user.email}</h2>
            <div className={styles.authenticated}>
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
            <h2>Module 3: Simple Query from Table </h2>
          </div>

          {data?.map(({ id, title }) => (
            <div key={id} className={styles.lessonWrapper} >
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
              <Button data-variant='delete' callback={() => handleDeleteLesson(id, title)}>Delete</Button>
            </div>
          ))}

          <li className={styles.link}>
            <Link href='/lesson/new/lesson'>
              <a> &#x2B; New Lesson</a>
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
