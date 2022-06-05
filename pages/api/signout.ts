import { ApiError } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";

type Data = {
  error: ApiError | null;
};

module.exports = async (_req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { error } = await supabase.auth.signOut();
  res.status(200).json({ error });
};
