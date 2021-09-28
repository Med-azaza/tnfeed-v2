import { useState, useEffect } from "react";
import styles from "./Settings.module.scss";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/router";

export default function Settings({ token, userData, currentUserInfos }) {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [name, setName] = useState(false);
  const [user, setUser] = useState(false);
  const [email, setEmail] = useState(false);
  const [pass, setPass] = useState(false);
  const [oldpass, setOldpass] = useState("");

  const router = useRouter();

  const updateInfo = (body) => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        currentUserInfos();
        setEmail(false);
        setPass(false);
        setName(false);
        setUser(false);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className={styles.container}>
      <section>
        <div>
          <span>Display Name</span>
          {userData.name}
        </div>
        <Button
          onClick={() => {
            setText(userData.name);
            setName(true);
          }}
        >
          edit
        </Button>
      </section>
      <section>
        <div>
          <span>Username</span>
          {userData.username}
        </div>
        <Button
          onClick={() => {
            setText(userData.username);
            setUser(true);
          }}
        >
          edit
        </Button>
      </section>
      <section>
        <div>
          <span>Email</span>
          {userData.email}
        </div>
        <Button
          onClick={() => {
            setText(userData.email);
            setEmail(true);
          }}
        >
          edit
        </Button>
      </section>
      <section>
        <div>
          <span>Password</span>
          **********
        </div>
        <Button
          onClick={() => {
            setPass(true);
          }}
        >
          change
        </Button>
      </section>
      <Dialog open={name} onClose={() => setName(false)}>
        <DialogTitle>Update Display Name</DialogTitle>
        <DialogContent>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Name"
            variant="standard"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setName(false);
              setText("");
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={() => {
              let body = { name: text };
              updateInfo(body);
            }}
            loading={loading}
          >
            update
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={user} onClose={() => setUser(false)}>
        <DialogTitle>Update Username</DialogTitle>
        <DialogContent>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Username"
            variant="standard"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setUser(false);
              setText("");
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={() => {
              let body = { username: text };
              updateInfo(body);
            }}
            loading={loading}
          >
            update
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={email} onClose={() => setEmail(false)}>
        <DialogTitle>Update Email</DialogTitle>
        <DialogContent>
          <TextField
            type="email"
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Email"
            variant="standard"
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setEmail(false);
              setText("");
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={() => {
              let body = { email: text };
              updateInfo(body);
            }}
            loading={loading}
          >
            update
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={pass} onClose={() => setPass(false)}>
        <DialogTitle>Update Password</DialogTitle>
        <DialogContent>
          <TextField
            type="Password"
            value={oldpass}
            onChange={(e) => setOldpass(e.target.value)}
            label="Old password"
            variant="standard"
            autoFocus
          />
          <TextField
            type="Password"
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="New password"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPass(false);
              setText("");
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            onClick={() => {
              let body = { password: text, old: oldpass };
              updateInfo(body);
            }}
            loading={loading}
          >
            update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
