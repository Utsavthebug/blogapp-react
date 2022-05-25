import { storage } from "./config";
import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { db } from "./config";

export function upload(datas, dispatch, navigate) {
  const { file, imageName, id, isEdit, ...data } = datas;

  if ((isEdit && file) || !isEdit) {
    const name = `${file.name}-${Date.now()}`;
    const imageRef = ref(storage, `images/${name}`);

    const uploadTask = uploadBytesResumable(imageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const uploadData = {
            ...data,
            imageURL: downloadURL,
            imageName: name,
          };

          if (!isEdit) {
            addDoc(collection(db, "posts"), uploadData).then(() => {
              console.log("succesfully uploaded !");
              dispatch({ type: "FORM_RESET" });
              navigate("/");
            });
          } else {
            console.log("update without image");
            setDoc(doc(db, "posts", id), uploadData).then(() => {
              //delete Image
              const imageRef = ref(storage, `images/${imageName}`);
              deleteObject(imageRef)
                .then(() => {
                  dispatch({ type: "FORM_RESET" });
                  navigate("/");
                })
                .catch((error) => console.log(error));
            });
          }
        });
      }
    );
  } else {
    console.log(data);
    setDoc(doc(db, "posts", id), data)
      .then(() => {
        dispatch({ type: "FORM_RESET" });
        navigate("/");
      })
      .catch((error) => console.log(error));
  }
}
