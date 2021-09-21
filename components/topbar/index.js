import styles from "./Topbar.module.scss";
import { SearchRounded, ExitToApp } from "@material-ui/icons";
import Image from "next/image";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function Topbar({ setLoading }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Image src="/logo.svg" width={200} height={50} />
      <div>
        <div className={styles.searchbar}>
          <SearchRounded />
          <input type="text" placeholder="Search" />
        </div>
        <Button
          variant="contained"
          onClick={() => {
            setLoading(true);
            removeCookie("token");
            router.push("/");
          }}
          color="inherit"
          endIcon={<ExitToApp />}
        >
          log out
        </Button>
      </div>
    </div>
  );
}
