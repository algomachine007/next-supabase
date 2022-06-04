import React, { MouseEventHandler, useState } from 'react';

import { useRouter } from 'next/router';

import { supabase } from '../lib/initSupabase';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      alert(JSON.stringify(error));
    } else {
      router.push('/');
    }
  };

  const handleSignInWithGitHub: MouseEventHandler = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signIn(
      {
        provider: 'github',
      },
      {
        redirectTo: 'http://localhost:3000/',
      }
    );

    if (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <div>
      <div>
        <h1>
          Sign in to your account
        </h1>

        <div className="flex flex-col p-6">
          <button onClick={handleSignInWithGitHub}
          >
            Sign In with GitHub
          </button>

          <hr />

          <form onSubmit={handleSignIn}>
            <label htmlFor="email" >
              Email
            </label>
            <input

              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password" >
              Password
            </label>
            <input

              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button

              type="submit"
            >
              Sign in with Email
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;