type InputProps = {
  email: string;
  password: string;
};

export type AuthServerlessHookProps = {
  mode: "signin" | "signup";
  input: InputProps;
};

export type AuthServerlessHookReturnType = {
  user: null;
  signin: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  signout: () => Promise<void>;
};

// : ReturnType< typeof useAuthServerless>
