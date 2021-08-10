import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
function Post({username,caption,imageURL}) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="sss"
          src={imageURL}
        />
        <h3>{username}</h3>
      </div>
      <img
        src="https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg"
        className="post__image"
      />
      <h4 className="post__text">
        <strong>{username} </strong>{caption}
      </h4>
    </div>
  );
}

export default Post;
