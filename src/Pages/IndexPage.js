import React, { useContext, useEffect, useState } from "react";
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
  orderBy,
  onSnapshot,
  limitToLast,
  startAt,
} from "firebase/firestore";

import { db } from "../utils/config";
import { Modal } from "../utils/Modal";
import { FcSearch } from "react-icons/fc";
import { BsFillSkipBackwardFill } from "react-icons/bs";
import { SnapContext } from "../contexts/SnapContext";
import Error from "../components/Error";
import ReactLoading from "react-loading";

//import { useLocation } from "react-router-dom";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState({ status: false, id: "" });
  const [search, setSearch] = useState("");
  const [size, setSize] = useState(0);
  const pageSize = 2;
  const [totalPage, setTotalPage] = useState(0);

  const { documentSnap, setdocumentSnap, currentPage, setCurrentPage } =
    useContext(SnapContext);

  const PageinateData = async (type) => {
    let lastVisible;
    let next;

    if (type === "next") {
      lastVisible = documentSnap.docs[documentSnap.docs.length - 1];
      next = query(
        collection(db, "posts"),
        orderBy("title"),
        startAfter(lastVisible),
        limit(pageSize)
      );
      setCurrentPage((prev) => prev + 1);
    } else if (type === "previous") {
      lastVisible = documentSnap.docs[0];
      next = query(
        collection(db, "posts"),
        orderBy("title"),
        endBefore(lastVisible),
        limitToLast(pageSize)
      );
      setCurrentPage((prev) => prev - 1);
    } else if (type === "deleted") {
      lastVisible = documentSnap.docs[0];

      next = query(
        collection(db, "posts"),
        orderBy("title"),
        startAfter(lastVisible),
        limitToLast(pageSize)
      );
    }

    const documentSnapshots = await getDocs(next);
    setdocumentSnap(documentSnapshots);

    const postArr = [];
    documentSnapshots.forEach((doc) => {
      postArr.push({ ...doc.data(), id: doc.id });
    });
    console.log(postArr);
    setPosts(postArr);
  };

  useEffect(() => {
    async function paginate() {
      const first = query(
        collection(db, "posts"),
        orderBy("title"),
        limit(pageSize)
      );
      const documentSnapshots = await getDocs(first);

      setdocumentSnap(documentSnapshots);
      const postArr = [];
      documentSnapshots.forEach((doc) => {
        postArr.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postArr);
    }

    //get the size of all document and calculate the total Pages
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSize(snapshot.size);
      setTotalPage(Math.ceil(snapshot.size / pageSize));
    });

    async function filter() {
      const first = query(collection(db, "posts"));

      const documentSnapshots = await getDocs(first);

      const postArr = [];
      documentSnapshots.forEach((doc) => {
        postArr.push({ ...doc.data(), id: doc.id });
      });
      const filtered = postArr.filter((p) =>
        p.title.toLowerCase().includes(search)
      );
      setPosts(filtered);
    }

    if (!documentSnap?.docs?.length) {
      if (search) {
        filter();
      } else {
        paginate();
      }
    }

    return () => {
      unsubscribe();
    };
  }, [search, setdocumentSnap]);

  console.log(currentPage);

  useEffect(() => {
    console.log("yo1");
    async function getInitalData() {
      //console.log(location);
      const lastVisible = documentSnap?.docs[0];

      const next = query(
        collection(db, "posts"),
        orderBy("title"),
        startAt(lastVisible),
        limit(pageSize)
      );

      const documentSnapshots = await getDocs(next);
      setdocumentSnap(documentSnapshots);

      const postArr = [];
      documentSnapshots.forEach((doc) => {
        postArr.push({ ...doc.data(), id: doc.id });
      });
      console.log(postArr.length);

      if (postArr.length) {
        setPosts(postArr);
      } else if (currentPage >= 1) {
        PageinateData("previous");
      }
    }

    getInitalData();
  }, [size]);

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
          {posts.length ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} setShow={setShow} />
            ))
          ) : (
            <Error />
          )}
        </div>

        {!search && (
          <div className={styles.Pagination}>
            {!(currentPage <= 1) && (
              <button
                onClick={() => PageinateData("previous")}
                className={styles.nextBtn}
              >
                <BsFillSkipBackwardFill />
              </button>
            )}
            {!(currentPage >= totalPage && !search) && (
              <button
                onClick={() => PageinateData("next")}
                className={styles.forwardBtn}
                disabled={currentPage === totalPage}
              >
                <BsFillSkipBackwardFill />
              </button>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default IndexPage;
