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
import { Edit, PersonAddAlt, CheckRounded } from "@mui/icons-material";
import { CircularProgress } from "@material-ui/core";
import Post from "../post";

const Input = styled("input")({
  display: "none",
});

export default function Profile({
  token,
  userData,
  current,
  id,
  setShowProfile,
  setSelectedId,
  currentUserInfos,
}) {
  const [profileDial, setProfileDial] = useState(false);
  const [coverDial, setCoverDial] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [data, setData] = useState(userData);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [addLoading, setAddLoading] = useState(false);

  const router = useRouter();

  const fetchPosts = (userId) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}posts/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
        setAddLoading(false);
      })
      .catch((err) => console.error(err));
  };
  const addFriend = () => {
    setAddLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/add/${data._id}`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          currentUserInfos();
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!current) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          fetchPosts(data._id);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      fetchPosts(data._id);
    }
  }, [userData]);

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
            currentUserInfos();
            setUploadLoading(false);
            setCoverDial(false);
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
            currentUserInfos();
            setUploadLoading(false);
            setProfileDial(false);
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  return loading ? (
    <div className={styles.loadingScreen}>
      <CircularProgress size={80} color="inherit" />
    </div>
  ) : (
    <div className={styles.container}>
      <div
        className={styles.coverPic}
        onClick={() => current && setCoverDial(true)}
      >
        {data.coverPicture && <img src={`${data.coverPicture}`} alt="" />}
        {current && <Edit color="inherit" className={styles.coverIndicator} />}
      </div>
      <div
        className={styles.profilePic}
        onClick={() => current && setProfileDial(true)}
      >
        {data.profilePicture && <img src={`${data.profilePicture}`} alt="" />}
        {current && (
          <Edit color="inherit" className={styles.profileIndicator} />
        )}
      </div>
      <p className={styles.name}>
        {data.name}
        {!current && (
          <LoadingButton
            disabled={data.friends.includes(userData._id) ? true : false}
            onClick={addFriend}
            loading={addLoading}
            startIcon={
              !data.friends.includes(userData._id) &&
              data.requests.includes(userData._id) ? (
                <CheckRounded />
              ) : (
                <PersonAddAlt />
              )
            }
            variant="outlined"
            sx={{
              marginLeft: "10px",
              color: "#a975ff",
              borderColor: "#a975ff",
              "&:hover": { borderColor: "#a975ff" },
              textTransform: "capitalize",
            }}
          >
            {!data.friends.includes(userData._id)
              ? data.requests.includes(userData._id)
                ? "request sent"
                : "add friend"
              : "friends"}
          </LoadingButton>
        )}
      </p>
      <div className={styles.posts}>
        {posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            likes={post.likes}
            content={post.content}
            date={post.date}
            comments={post.comments}
            userData={userData}
            ownerId={post.ownerId}
            token={token}
            media={post.media}
            setShowProfile={setShowProfile}
            setSelectedId={setSelectedId}
          />
        ))}
      </div>
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
          <LoadingButton
            disabled={Boolean(!file)}
            onClick={updateProfilePic}
            loading={uploadLoading}
          >
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
          <LoadingButton
            disabled={Boolean(!file)}
            onClick={updateCoverPic}
            loading={uploadLoading}
          >
            update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
