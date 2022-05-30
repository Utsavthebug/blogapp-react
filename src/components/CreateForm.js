import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../contexts/FormContext";
import styles from "../styles/components/createform.module.css";
import { upload } from "../utils/upload";
import { Checkvalid } from "../utils/validate";

const CreateForm = ({ isEdit }) => {
  const [data, dispatch] = useContext(FormContext);
  const [error, setError] = useState({
    hasError: false,
    title: "",
    author: "",
    description: "",
    file: "",
  });
  const navigate = useNavigate();

  function handleSubmit() {
    const { title, author, description, file } = data;
    const status = isEdit
      ? Checkvalid({ title, author, description })
      : Checkvalid({ title, author, description, file });

    if (status.hasError) {
      setError(status);
      return;
    } else {
      upload(data, dispatch, navigate);
    }
  }
  // console.log(error);

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
      {error.hasError && <span className={styles.error}>{error.title}</span>}

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
      {error.hasError && <span className={styles.error}>{error.author}</span>}

      <div className={styles.formcontrol}>
        <label className={styles.label}>Description</label>
        <textarea
          value={data.description}
          name="description"
          onChange={handleChange}
          className={styles.textArea}
        ></textarea>
      </div>
      {error.hasError && (
        <span className={styles.error}>{error.description}</span>
      )}

      <div className={styles.formcontrol}>
        <input type="file" onChange={fileuploadChange} />
      </div>
      {error.hasError && <span className={styles.error}>{error.file}</span>}

      <button onClick={handleSubmit} className={styles.submitBtn}>
        {!isEdit ? "Create" : "Update"}
      </button>
    </div>
  );
};

export default CreateForm;
