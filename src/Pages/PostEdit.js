import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateForm from "../components/CreateForm";
import { doc, getDoc } from "firebase/firestore";
import { FormContext } from "../contexts/FormContext";
import { db } from "../utils/config";

const PostEdit = () => {
  const [, dispatch] = useContext(FormContext);
  const { id } = useParams();

  useEffect(() => {
    async function getPost() {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data());
      dispatch({ type: "ADD", payload: { ...docSnap.data(), id: docSnap.id } });
    }
    getPost();

    return () => {
      dispatch({ type: "FORM_RESET" });
    };
  }, [id, dispatch]);

  return (
    <div>
      <CreateForm isEdit={true} />
    </div>
  );
};

export default PostEdit;
