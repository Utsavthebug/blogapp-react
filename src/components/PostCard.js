import React from "react";
import styles from "../styles/components/postcard.module.css";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post, setShow }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.cardWrapper} onClick={() => navigate(`/${post.id}`)}>
      <div>
        <div className={styles.imageWrapper}>
          <img src={post.imageURL} alt="uploaded" />
        </div>
        <div>
          <h3 className={styles.postTitle}>{post.title}</h3>
          <p>
            {post.description.length > 200
              ? `${post.description.substr(0, 200)}...`
              : post.description}
          </p>
        </div>
      </div>
      <div className={styles.cardButtons} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.updateBtn}
          onClick={() => navigate(`/update/${post.id}`)}
        >
          Update
        </button>
        <button
          onClick={() =>
            setShow((prev) => ({ ...prev, status: true, id: post.id }))
          }
          className={styles.deleteBtn}
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
