import React, { useEffect, useState } from "react";
import PageLayout from "./PageLayout";
import styles from "../styles/indexpage.module.css";
import PostCard from "../components/PostCard";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/config";
import { Modal } from "../utils/Modal";
import { FcSearch } from "react-icons/fc";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState({ status: false, id: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postArr = [];
      querySnapshot.forEach((doc) => {
        postArr.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <PageLayout>
      <Modal show={show} setShow={setShow} />
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <input
            value={search}
            type="text"
            className={styles.SearchInput}
            onChange={(e) => setSearch(e.target.value)}
          />{" "}
          <span className={styles.search}>
            <FcSearch />
          </span>
        </div>
        <div className={styles.cardsWrapper}>
          {posts &&
            posts
              .filter((p) => p.title.toLowerCase().includes(search))
              .map((post) => (
                <PostCard key={post.id} post={post} setShow={setShow} />
              ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default IndexPage;
