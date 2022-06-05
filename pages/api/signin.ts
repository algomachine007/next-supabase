import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";
import cookie from "cookie";

type Data = {
  message: string;
};

module.exports = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { user, error, session } = await supabase.auth.signIn({
    email: req.body.email,
    password: req.body.password,
  });
  const activeSession = supabase.auth.session();
  if (user && session && !error && activeSession) {
    if (activeSession.access_token) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize(
          "BEJAMAS_SUPABASE_ACCESS_TOKEN",
          activeSession.access_token,
          {
            httpOnly: true,
            maxAge: 8 * 60 * 60 * 1000,
            path: "/",
            sameSite: "lax",

            secure: process.env.NODE_ENV === "production",
          }
        )
      );
    }
    //@ts-ignore
    res.status(200).json({ user, activeSession, error });
  } else {
    res.status(401).json({ message: "Email or password incorrect" });
  }
};
