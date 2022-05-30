import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db } from "./config";
import { storage } from "./config";

export async function deletePost(id) {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);

  const imageName = postSnap.data().imageName;

  await deleteDoc(postRef);
  const imageRef = ref(storage, `images/${imageName}`);

  deleteObject(imageRef)
    .then(() => {
      console.log("deleted sucesfully !");
    })
    .catch((error) => console.log(error));
}
