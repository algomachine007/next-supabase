import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";
import cookie from "cookie";
import { Message, SupaBaseApiProps } from "./SupabaseTypes";

module.exports = async (
  req: NextApiRequest,
  res: NextApiResponse<SupaBaseApiProps | Message>
) => {
  const { email, password } = req.body;
  const { user, error, session } = await supabase.auth.signIn({
    email,
    password,
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
    res.status(200).json({ user, activeSession, error });
  } else {
    res.status(401).json({ message: "Email or password incorrect" });
  }
};
