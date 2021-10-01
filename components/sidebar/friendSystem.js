const fetchFriends = (setFriendsLoading, setFriends, userData, token) => {
  setFriendsLoading(true);
  setFriends([]);
  if (userData.friends.length < 1) {
    setFriendsLoading(false);
  } else {
    for (let id of userData.friends) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFriends((prev) => [...prev, data]);
          userData.friends.indexOf(id) === userData.friends.length - 1 &&
            setFriendsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};
const fetchRequests = (setReqLoading, setRequests, userData, token) => {
  setReqLoading(true);
  setRequests([]);
  if (userData.requests.length < 1) {
    setReqLoading(false);
  } else {
    for (let id of userData.requests) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setRequests((prev) => [...prev, data]);
          userData.requests.indexOf(id) === userData.requests.length - 1 &&
            setReqLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};
const accept = (id, setDisabled, token, currentUserInfos) => {
  setDisabled(true);
  fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/accept/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        currentUserInfos();
        setDisabled(false);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
const decline = (id, setDisabled, token, currentUserInfos) => {
  setDisabled(true);
  fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/decline/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        currentUserInfos();
        setDisabled(false);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
const remove = (id, setFriendsLoading, currentUserInfos, token) => {
  setFriendsLoading(true);
  fetch(`${process.env.NEXT_PUBLIC_BASE_API}user/friend/remove/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        currentUserInfos();
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
export { fetchFriends, fetchRequests, accept, decline, remove };
