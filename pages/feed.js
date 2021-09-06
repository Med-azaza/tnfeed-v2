import styles from "../styles/Feed.module.scss";
import { useCookies } from "react-cookie";

export default function Feed() {
  const [cookies, setCookie] = useCookies(["token"]);
  const token = cookies.token;
  return token ? <h1>Homepage your token {token}</h1> : <h1>unauthaurized</h1>;
}
