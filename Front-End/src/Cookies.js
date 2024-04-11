import { Cookies } from "react-cookie";

let jwtTokenCookie = "jwtToken";
let userCookie = "user";

let cookies = new Cookies();

function SetCookie(cookieName, val) {
  let cookie = cookies.set(cookieName, val);
}

function ClearCookie(cookieName) {
  cookies.remove(cookieName);
}

function GetCookie(cookieName) {
  return cookies.get(cookieName);
}

export { jwtTokenCookie, userCookie, SetCookie, GetCookie, ClearCookie };
