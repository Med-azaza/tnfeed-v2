import styles from "./Sidebar.module.scss";
import { Button, Avatar } from "@mui/material";

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>REQUESTS</p>
        <span>2</span>
      </div>
      <div className={styles.request}>
        <div>
          <Avatar variant="rounded">A</Avatar>
          <p>
            <span>userName</span> wants to add you to friends
          </p>
        </div>
        <div>
          <Button>accept</Button>
          <Button>decline</Button>
        </div>
      </div>
      <div className={styles.request}>
        <div>
          <Avatar variant="rounded">A</Avatar>
          <p>
            <span>userName</span> wants to add you to friends
          </p>
        </div>
        <div>
          <Button>accept</Button>
          <Button>decline</Button>
        </div>
      </div>
    </div>
  );
}
