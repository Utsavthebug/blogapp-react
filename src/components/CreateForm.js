import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../contexts/FormContext";
import styles from "../styles/components/createform.module.css";
import { upload } from "../utils/upload";

const CreateForm = ({ isEdit }) => {
  const [data, dispatch] = useContext(FormContext);
  const navigate = useNavigate();

  console.log(data);
  function handleSubmit() {
    //upload(file);
    upload(data, dispatch, navigate);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_CHANGE", payload: { name, value } });
  }

  function fileuploadChange(e) {
    dispatch({ type: "FILE_UPLOAD", payload: e.target.files[0] });
  }

  return (
    <div className={styles.formWrapper}>
      <h4 style={{ textAlign: "center" }}>Create Blog</h4>
      <div className={styles.formcontrol}>
        <label className={styles.label}>Title</label>
        <input
          value={data.title}
          type="text"
          name="title"
          onChange={handleChange}
          className={styles.Input}
        />
      </div>

      <div className={styles.formcontrol}>
        <label className={styles.label}>Author</label>
        <input
          value={data.author}
          type="text"
          name="author"
          onChange={handleChange}
          className={styles.Input}
        />
      </div>

      <div className={styles.formcontrol}>
        <label className={styles.label}>Description</label>
        <textarea
          value={data.description}
          name="description"
          onChange={handleChange}
          className={styles.textArea}
        ></textarea>
      </div>

      <div className={styles.formcontrol}>
        <input type="file" onChange={fileuploadChange} />
      </div>

      <button onClick={handleSubmit} className={styles.submitBtn}>
        {!isEdit ? "Create" : "Update"}
      </button>
    </div>
  );
};

export default CreateForm;
