import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";

type Data = {
  error: string;
};

module.exports = async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { error } = await supabase.auth.signOut();
  //@ts-ignore
  res.status(200).json({ error });
};
