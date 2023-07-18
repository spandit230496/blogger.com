import React from "react";
import nav from "./nav.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu } from "@mui/icons-material";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const isLogin = useSelector((state) => state.isLogin);
  const logOut = () => {
    const response = window.confirm("Do you want to logout");
    if (response) {
      dispatch(authAction.logout());
      localStorage.removeItem("userId");
      navigate("/login");
    }
  };

  console.log(isLogin);
  return (
    <div>
      <div className="navigation">
        <div className="logo">
          <h1>
            BLOGGER<span className="mid">DOT</span>
            <span className="end">COM</span>
          </h1>
          <Menu onClick={() => setShow(!show)} className="menu" />
        </div>

        <div className="links" style={{ display: show ? "none" : "block" }}>
          {isLogin && (
            <>
              <NavLink
                to="/blogs"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "700",
                  cursor: "poiner",
                  marginRight: "2rem",
                }}
              >
                Blogs
              </NavLink>
              <NavLink
                to="/myblogs"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "700",
                  cursor: "poiner",
                  marginRight: "2rem",
                }}
              >
                My Blogs
              </NavLink>
              <NavLink
                to="/create-blog"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "700",
                  cursor: "poiner",
                  marginRight: "2rem",
                }}
              >
                Create Blog
              </NavLink>
            </>
          )}

          <NavLink
            to="/register"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "700",
              cursor: "poiner",
              marginRight: "2rem",
            }}
            onClick={() => setClick(true)}
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "700",
              cursor: "poiner",
              marginRight: "2rem",
            }}
          >
            Login
          </NavLink>
          {isLogin && <button onClick={logOut}> Logout</button>}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
