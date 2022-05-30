import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import styles from "./styles/app.module.css";
import CreatePage from "./Pages/CreatePage";
import IndexPage from "./Pages/IndexPage";
import PostDetail from "./Pages/PostDetail";
import PostEdit from "./Pages/PostEdit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/:id" element={<PostDetail />} />
        <Route path="/update/:id" element={<PostEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
