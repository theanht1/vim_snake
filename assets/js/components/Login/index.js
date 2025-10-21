import React from "react";
import { connect } from "react-redux";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

import { login } from "../../actions/authActions";

const Login = ({ loginLoading, onLogin }) => {
  return (
    <div className="v-container flex justify-center items-start">
      <Card className="mt-24 w-full max-w-md">
        <CardContent className="pt-6">
          <Button onClick={onLogin} disabled={loginLoading} className="w-full">
            {loginLoading ? "Loading..." : "Login with Facebook"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ auth: { loginLoading } }) => ({
  loginLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
