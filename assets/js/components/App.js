import React from "react";
import { connect } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Loading } from "./ui/loading";

import Home from "./Home";
import Play from "./Play";
import Login from "./Login";
import Header from "./Header";

const App = ({ loading, isLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Guard login state
  React.useEffect(() => {
    if (loading) {
      return;
    }

    if (location.pathname === "/play") {
      if (!isLogin) {
        return navigate("/");
      }
    }
  }, [loading, isLogin, location.pathname]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="play" element={<Play />} />
        {/*<Route path="login" element={<Login />} />*/}
      </Routes>
      {loading && <Loading fullscreen={true} />}
    </div>
  );
};

const mapStateToProps = ({ app: { loading }, auth: { currentUser } }) => ({
  loading,
  isLogin: !!currentUser.id,
});

export default connect(mapStateToProps)(App);
