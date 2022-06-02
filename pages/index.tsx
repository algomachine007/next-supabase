import Link from "next/link";
import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../lib/auth";
import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import style from './../styles/form.module.css'

const Home = ({ user: usa }: any) => {
  console.log('USA', usa.data[0])
  //@ts-ignore
  const { user, signOut, view } = useAuth();

  console.log(user)
  console.log(view)
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

      <div style={{ display: 'flex', width: '20%', justifyContent: 'center', alignItems: 'center' }}>
        <div className={style.form}>
          {!user && <Auth view={view} supabaseClient={supabase} className={style.form} />}

          <Auth view={view} supabaseClient={supabase} className={style.form} />
        </div>

      </div>


    </Layout>
  );
};

export default Home;


export const getServerSideProps = async (ctx: any) => {

  const data = await fetch("https://bpnnhwohxfiawjecgcxw.supabase.co/rest/v1/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "apikey": `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }`,
    },
  }).then((res) => res.json());



  return {
    props: {
      user: { data },
    },
  };
}