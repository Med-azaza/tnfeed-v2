import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import styles from "./Profile.module.scss";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Edit } from "@material-ui/icons";

const Input = styled("input")({
  display: "none",
});

export default function Profile({ token, userData }) {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [profileDial, setProfileDial] = useState(false);
  const [coverDial, setCoverDial] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const router = useRouter();

  const updateCoverPic = () => {
    setUploadLoading(true);
    let body = {};
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "preset");
    data.append("cloud_name", "medazcloud");
    fetch(process.env.NEXT_PUBLIC_UPLOAD, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        body.coverPicture = data.secure_url;
        fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
          .then((response) => {
            router.reload();
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  const updateProfilePic = () => {
    setUploadLoading(true);
    let body = {};
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "preset");
    data.append("cloud_name", "medazcloud");
    fetch(process.env.NEXT_PUBLIC_UPLOAD, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        body.profilePicture = data.secure_url;
        fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
          .then((response) => {
            router.reload();
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.coverPic} onClick={() => setCoverDial(true)}>
        {userData.coverPicture && (
          <img src={`${userData.coverPicture}`} alt="" />
        )}
        <Edit color="inherit" className={styles.coverIndicator} />
      </div>
      <div className={styles.profilePic} onClick={() => setProfileDial(true)}>
        {userData.profilePicture && (
          <img src={`${userData.profilePicture}`} alt="" />
        )}
        <Edit color="inherit" className={styles.profileIndicator} />
      </div>
      <p className={styles.name}>{userData.name}</p>
      <Dialog open={profileDial} onClose={() => setProfileDial(false)}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <label htmlFor="profilePic">
            <Input
              accept="image/*"
              id="profilePic"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button component="span">upload</Button>
          </label>
          <div className={styles.profileImgPre}>
            {file && (
              <>
                <img src={URL.createObjectURL(file)} />
              </>
            )}
          </div>
          <Button disabled={Boolean(!file)} onClick={() => setFile(null)}>
            cancel
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setProfileDial(false);
              setFile(null);
            }}
          >
            Cancel
          </Button>
          <LoadingButton onClick={updateProfilePic} loading={uploadLoading}>
            update
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog open={coverDial} onClose={() => setCoverDial(false)}>
        <DialogTitle>Update Cover Picture</DialogTitle>
        <DialogContent>
          <label htmlFor="coverPic">
            <Input
              accept="image/*"
              id="coverPic"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <Button component="span">upload</Button>
          </label>
          <div className={styles.coverImgPre}>
            {file && (
              <>
                <img src={URL.createObjectURL(file)} />
              </>
            )}
          </div>
          <Button disabled={Boolean(!file)} onClick={() => setFile(null)}>
            cancel
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setCoverDial(false);
              setFile(null);
            }}
          >
            Cancel
          </Button>
          <LoadingButton onClick={updateCoverPic} loading={uploadLoading}>
            update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
