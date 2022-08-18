import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getTokenFromCookie = (): string => {
  const token = cookies.get("token");
  console.log(token);
  return token;
};

export const setTokenToCookie = (token: string): void => {
  cookies.set("token", token);
};

export const removeTokenFromCookie = (): void => {
  console.log("removing token from cookie...");
  cookies.remove("token");
};
