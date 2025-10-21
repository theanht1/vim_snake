import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

import { history } from "../store";
import { logout } from "../actions/authActions";

const Header = ({ isAuthen, currentUser, onLogout }) => {
  const onClickPlay = () => {
    history.push("/play");
  };

  const onClickLogin = () => {
    history.push("/login");
  };

  return (
    <header className="flex justify-between items-center bg-[#324157] px-6 py-2">
      <Link to="/" className="no-underline">
        <h1 className="m-0 text-white text-2xl">Vim Snake</h1>
      </Link>
      <div>
        {/*
        <nav className="flex gap-4 items-center">
          {isAuthen && <span className="text-white">Hi {currentUser.username},</span>}
          {isAuthen && <Button variant="ghost" onClick={onClickPlay}>Play</Button>}
          {!isAuthen && <Button variant="ghost" onClick={onClickLogin}>Login</Button>}
          {isAuthen && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">Logout</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Warning</DialogTitle>
                  <DialogDescription>
                    Do you want to logout?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">No</Button>
                  <Button onClick={onLogout}>Yes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </nav>
        */}
      </div>
    </header>
  );
};

const mapStateToProps = ({ auth: { currentUser } }) => ({
  currentUser,
  isAuthen: !!currentUser.id,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
