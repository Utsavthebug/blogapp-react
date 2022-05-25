import styles from "../styles/modal.module.css";
import { IoMdCloseCircle } from "react-icons/io";
import { deletePost } from "./deletePost";

export const Modal = ({ show, setShow }) => {
  function closeModal() {
    setShow({ status: false, id: "" });
  }

  function handleDelete() {
    deletePost(show.id)
      .then(() => console.log("sucesfully deleted"))
      .catch((error) => console.log(error));
    closeModal();
  }

  if (show.status) {
    return (
      <div className={styles.modalWrapper} onClick={closeModal}>
        <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
          <span className={styles.closeBtn} onClick={closeModal}>
            <IoMdCloseCircle />
          </span>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <p>Are you sure want to delete?</p>
          </div>
          <button className={styles.succesBtn} onClick={handleDelete}>
            Ok
          </button>
        </div>
      </div>
    );
  }
};
