type InputProps = {
  email: string;
  password: string;
};

export type ModeType = { mode: "signin" | "signup" };

export type AuthServerlessHookProps = {
  mode: "signin" | "signup";
  input: InputProps;
};

export type AuthServerlessHookReturnType = {
  user: null;
  signin: (event: React.FormEvent) => Promise<void>;
  signout: () => Promise<void>;
};
