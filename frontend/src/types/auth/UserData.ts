export type UserData = {
  username: string;
  password: string;
  age: number;
  gender: "M" | "F" | "O";
  height: number;
  level: "beginner" | "intermidate" | "advanced";
  isPasswordVisible?: boolean;
};

export type AuthData = {
  username: string;
  password: string;
};
