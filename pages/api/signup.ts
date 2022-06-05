import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";

type Data = {
  name: string;
};

module.exports = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { user, error, session } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });

  const activeSession = supabase.auth.session();

  console.log(session);

  console.log("active session", activeSession);

  console.log(user);

  //@ts-ignore
  res.status(200).json({ user, activeSession, error });
};
