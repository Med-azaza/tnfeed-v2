import { useState, useEffect } from "react";

export default function Profile({ token }) {
  const [image, setImage] = useState(null);
  const uploadHandler = () => {
    console.log(image);
    console.log(token);
    const form = new FormData();
    form.append("avatar", image);
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/update/profile-pic`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    })
      .then((res) => {
        if (res.status === 200) {
          alert("updated");
        } else {
          alert("error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      update profile picture <br />
      <input onChange={(e) => setImage(e.target.files[0])} type="file" />
      <button onClick={uploadHandler} disabled={Boolean(!image)}>
        opload
      </button>
    </div>
  );
}
