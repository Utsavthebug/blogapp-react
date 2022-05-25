import React, { useEffect, useState } from "react";
import PageLayout from "./PageLayout";
import styles from "../styles/indexpage.module.css";
import PostCard from "../components/PostCard";
import {
  collection,
  query,
  limit,
  getDocs,
  startAfter,
  endBefore,
  limitToLast,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils/config";
import { Modal } from "../utils/Modal";
import { FcSearch } from "react-icons/fc";
import { BsFillSkipBackwardFill } from "react-icons/bs";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState({ status: false, id: "" });
  const [search, setSearch] = useState("");
  const [documentSnap, setdocumentSnap] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  async function handleNext() {
    const lastVisible = documentSnap.docs[documentSnap.docs.length - 1];
    const next = query(
      collection(db, "posts"),
      orderBy("title"),
      startAfter(lastVisible),
      limit(1)
    );

    const documentSnapshots = await getDocs(next);
    setdocumentSnap(documentSnapshots);

    const postArr = [];
    documentSnapshots.forEach((doc) => {
      postArr.push({ ...doc.data(), id: doc.id });
    });
    setPosts(postArr);
    setCurrentPage((prev) => prev + 1);
  }

  async function handlePrevious() {
    const lastVisible = documentSnap.docs[documentSnap.docs.length - 1];
    const previous = query(
      collection(db, "posts"),
      orderBy("title"),
      endBefore(lastVisible),
      limitToLast(1)
    );

    const documentSnapshots = await getDocs(previous);
    setdocumentSnap(documentSnapshots);

    const postArr = [];
    documentSnapshots.forEach((doc) => {
      postArr.push({ ...doc.data(), id: doc.id });
    });
    setPosts(postArr);
    setCurrentPage((prev) => prev - 1);
  }

  useEffect(() => {
    async function paginate() {
      const first = query(collection(db, "posts"), orderBy("title"), limit(1));
      const documentSnapshots = await getDocs(first);

      setdocumentSnap(documentSnapshots);
      const postArr = [];
      documentSnapshots.forEach((doc) => {
        postArr.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postArr);
    }

    paginate();
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

        <div className={styles.Pagination}>
          <button
            onClick={handlePrevious}
            className={styles.nextBtn}
            disabled={currentPage === 1}
          >
            <BsFillSkipBackwardFill />
          </button>
          <button onClick={handleNext} className={styles.forwardBtn}>
            <BsFillSkipBackwardFill />
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default IndexPage;
