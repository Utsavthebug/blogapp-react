import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/config";
import styles from "../styles/detailPage.module.css";
import { IoArrowBackCircle } from "react-icons/io5";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function getPost() {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost(docSnap.data());
    }
    getPost();
  }, [id]);

  console.log(post);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
        </button>
        <div className={styles.titlediv}>
          <h3 className={styles.title} style={{ textAlign: "center" }}>
            {post.title}
          </h3>
        </div>
      </div>

      <div className={styles.detailPage}>
        <div className={styles.imgWrapper}>
          <img src={post.imageURL} alt="uploaded" />
        </div>

        <div className={styles.content}>
          <div className={styles.descWrapper}>
            <h3 className={styles.desc}>{post.description}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
