import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import UserFieldsContext from "../context/UserFieldsContext";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Button, FormControl, MenuItem, Select, TextField, Toolbar } from "@mui/material";
// import { ShoppingCart } from "@mui/icons-material";
import logo from "../assets/resultIcon.png";

function Navbar({ search, setSearch }) {
    const { currentUser } = useContext(AuthContext);
    const { userFields } = useContext(UserFieldsContext);

    const [userTitle, setUserTitle] = useState("Your Account");
    // const [itemCount, setItemCount] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    const logout = async () => {
        if (currentUser) {
            signOut(auth).then(() => {
                // window.location.reload();
                navigate("/")
            });
        }
    };


    const goToPage = (e) => {
        const val = e.target.value;

        if (currentUser) {
            switch (val) {
                case "home":
                    navigate("/user/dashboard");
                    break;
                case "signout":
                    logout();
                    break;
                default:
                    break;
            }
        } else if (!currentUser && val === "home") {
            navigate("/");
        } else navigate("/");
    };

    useEffect(() => {
        if (userFields) {
            setUserTitle(userFields.name);
            // setItemCount(userFields.cartItems.length);
        }
    }, [userFields]);

    const handleSearch = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        backgroundColor: "white",
                        color: "black",
                    }}
                >
                    <Button
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="home"
                        aria-haspopup="true"
                        sx={{ mr: 2 }}
                        variant="text"
                        onClick={() => navigate("/user/dashboard")}
                    >
                        <img src={logo} style={{width: "60px", height: "60px"}}/>
                        
                    </Button>
                    <TextField
                        label="Search"
                        variant="outlined"
                        size="small"
                        sx={{
                            flexGrow: 10,
                        }}
                        onChange={handleSearch}
                        disabled={location.pathname !== "/user/dashboard"}
                    ></TextField>
                    
                    {location.pathname !== "/random" &&
                    <Button
                        size="medium"
                        color="inherit"
                        onClick={goToPage}
                        value="home"
                        variant="contained"
                        sx={{ml: 2}}
                    >
                        Home
                    </Button>
                    }
                    
                    <FormControl
                        sx={{
                            ml: 2,
                            mr: 2,
                        }}
                    >
                        <Select value="userTitle" size="small" onChange={goToPage}>
                            <MenuItem value="userTitle" disabled>
                                {userTitle}
                            </MenuItem>
                            {currentUser && <MenuItem value="signout">Sign out</MenuItem>}
                            {!currentUser && <MenuItem value="signin">Sign in</MenuItem>}
                        </Select>
                    </FormControl>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
