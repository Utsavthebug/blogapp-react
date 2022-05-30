import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../contexts/PostContext';

const Listdata = () => {
    const [search,setSearch] = useState()
    const [posts,setPosts] = useContext(PostContext)


    useEffect(()=>{
        const first = query(collection(db, "posts"));
  
        const documentSnapshots = await getDocs(first);
  
        const postArr = [];
        documentSnapshots.forEach((doc) => {
          postArr.push({ ...doc.data(), id: doc.id });
        });
        const filtered = postArr.filter((p) =>
          p.title.toLowerCase().includes(search)
        );
    
    console.log(filtered)

    setPosts(filtered);        
    },[search])


    // async function filter() {
    //     const first = query(collection(db, "posts"));
  
    //     const documentSnapshots = await getDocs(first);
  
    //     const postArr = [];
    //     documentSnapshots.forEach((doc) => {
    //       postArr.push({ ...doc.data(), id: doc.id });
    //     });
    //     const filtered = postArr.filter((p) =>
    //       p.title.toLowerCase().includes(search)
    //     );
    //     setPosts(filtered);
    //   }
  
    //   if (!documentSnap?.docs?.length) {
    //     if (search) {
    //       filter();
    //     } else {
    //       paginate();
    //     }
    //   }
  
    //   return () => {
    //     unsubscribe();
    //   };
    // },[search];
  
    


  return (
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
        posts.map((post) => (
          <PostCard key={post.id} post={post} setShow={setShow} />
        ))}
    </div>

    {/* {!search && (
      <div className={styles.Pagination}>
        {!(currentPage === 1) && (
          <button
            onClick={() => PageinateData("previous")}
            className={styles.nextBtn}
          >
            <BsFillSkipBackwardFill />
          </button>
        )}
        {!(currentPage === totalPage && !search) && (
          <button
            onClick={() => PageinateData("next")}
            className={styles.forwardBtn}
            disabled={currentPage === totalPage}
          >
            <BsFillSkipBackwardFill />
          </button>
        )}
      </div>
    )} */}

    {
        !search && <h1>Pagination</h1>
    }

  </div>
  )
}

export default Listdata