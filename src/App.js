import logo from "./logo.svg";
import "./App.css";
import Navigation from "./Navigation/Navigation";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Signup/Register";
import { Route, Routes } from "react-router-dom";
import Blogs from "./Pages/Blog/Blogs";
import MyBlogs from "./Pages/MyBlogs/MyBlogs";
import CreateBlog from "./Pages/Create Blog/CreateBlog";
import EditBlog from "./Pages/EditBlog/EditBlog";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Login />} />
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-blog"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <Blogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myblogs"
          element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
