import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post.js";
import { auth, db } from "./firebase.js";
import { Modal, makeStyles, Button, Input } from "@material-ui/core";
function App() {
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [open, setopen] = useState(false);
  const [user, setuser] = useState(null);
  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();
  const signup = async (event) => {
    event.preventDefault();
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await auth.currentUser.updateProfile({
          displayName: username,
        });
        await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .set({
            uid: auth.currentUser.uid,
            email: email,
            username: username,
            password: password,
          })
          .then(() => alert("Signup successful"))
          .catch((error) => alert(error.message));
      })
      .catch((error) => alert(error.message));
  };
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((document) => ({
          id: document.id,
          post: document.data(),
        }))
      );
    });
  }, []);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setuser(authUser);
        if (!authUser.displayName) {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setuser(null);
      }
    });

    return () => unsubscribe();
  }, [user, username]);
  return (
    <div className="App">
      <Modal open={open} onClose={() => setopen(false)}>
        <center>
          <div style={modalStyle} className={classes.paper}>
            <div>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </div>
            <form className="app__signup">
              <Input
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signup}>
                Sign Up
              </Button>
            </form>
          </div>
        </center>
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {!user ? (
        <Button onClick={() => setopen(true)}>Sign Up</Button>
      ) : (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      )}

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageURL={post.imageURL}
        />
      ))}
    </div>
  );
}

export default App;
