import React, { useContext, useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";
import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CartModal from "../CartModal/CartModal";

import { GiHamburgerMenu } from "react-icons/gi";
export default function Navbar() {
  const { getUserData, user, setQuery } = useContext(CartContext);
  const { userId, getUserId, LogoutUser, setAuth, isAuth } =
    useContext(AuthContext);
  const [show, setShow] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const toast = useToast();
  const nav = useNavigate();
  React.useEffect(() => {
    getUserId();
  }, []);

  React.useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId]);
  React.useEffect(() => {
    if (width < 551) {
      setShow(false);
    }
  }, []);
  return (
    <>
      {" "}
      <div className={styles.hamburger}>
        <GiHamburgerMenu onClick={() => setShow(!show)} />
      </div>
      {show && (
        <div className={styles.mainBox}>
          <div className={styles.leftBox}>
            <div onClick={() => nav("/")} className={styles.logo} >
              <img
                src="https://img.freepik.com/premium-vector/ecommerce-logo-design_624194-152.jpg?w=2000"
                alt="Brand Logo"
                style={{ width: "70px", height: "68px" }}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search items"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.rightBox}>
            <div>
              {!isAuth ? (
                <p onClick={() => nav("/auth")}>Login</p>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <img
                      src="https://static-00.iconduck.com/assets.00/user-login-icon-1948x2048-nocsasoq.png"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "100%",
                      }}
                      alt="profile"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Hello,{user?.name}</PopoverHeader>
                    <PopoverBody>
                      <Box display={"grid"}>
                        <Button
                          color={"red.300"}
                          onClick={() => {
                            LogoutUser();
                            getUserData(user?.id);
                            setAuth(false);
                            toast({
                              title: "Logged out Successfully",

                              status: "success",
                              duration: 4000,
                              isClosable: true,
                            });
                          }}
                        >
                          LogOut
                        </Button>
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <div style={{ display: "flex" }}>
              <CartModal />
              {isAuth ? `(${user?.cart})` : ""}
            </div>
           
          </div>
        </div>
      )}
    </>
  );
}
