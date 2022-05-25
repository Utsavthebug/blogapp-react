import React from "react";
import CreateForm from "../components/CreateForm";
import PageLayout from "./PageLayout";
import styles from "../styles/components/createform.module.css";
const CreatePage = () => {
  return (
    <PageLayout>
      <div className={styles.createContainer}>
      <CreateForm/>
      </div>
    </PageLayout>
  );
};

export default CreatePage;
