import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";
import { SupaBaseApiProps } from "./SupabaseTypes";

module.exports = async (
  req: NextApiRequest,
  res: NextApiResponse<SupaBaseApiProps>
) => {
  const { user, error } = await supabase.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });

  const activeSession = supabase.auth.session();

  res.status(200).json({ user, activeSession, error });
};
