// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setPassword, setUserId } from '../redux/result_reducer'
// import { useRef } from 'react'
// import { Link } from 'react-router-dom'

// const Register = () => {

//     const inputNameRef = useRef(null)
//     const inputPassRef = useRef(null)
//     const dispatch = useDispatch()

//     const auth = useSelector(state => state.result.userId)
//     const authPass = useSelector(state => state.result.password)
//     function register() {
//         if (inputNameRef.current?.value && inputPassRef.current?.value) {
//             dispatch(setUserId(inputNameRef.current?.value))
//             dispatch(setPassword(inputPassRef.current?.value))
//         }
//         console.log(auth)
//         console.log(authPass)
//     }

//   return (
//     <div className='login'>
//         <div>
//                 <form id="form">
//                 <span>Student Name: </span>
//                 <input ref={inputNameRef} className="userid" type="text" placeholder='UserName*' />
//                 </form>
//         </div>
//         <div>
//             <span>
//                 <form id="form">
//                 <span>Student Password: </span>
//                 <input ref={inputPassRef} className="userid" type="text" placeholder='Password*' />
//                 </form>
//             </span>
//         </div>
//         <div className='start'>
//                 <Link className='btn' to={'/'} onClick={register}>Student Register</Link>
//         </div>
//     </div>
//   )
// }

// export default Register

import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, Button, CardContent, TextField, Typography, Select, SelectChangeEvent, FormControl, InputLabel, MenuItem} from "@mui/material";

// import Alert from "@mui/material";

function Register() {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [role, setRole] = useState("student")

    const navigate = useNavigate();

    const handleInput = (e) => {
        const type = e.target.name;
        const value = e.target.value;
        switch (type) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirm":
                setConfirm(value);
                break;
            default:
                break;
        }
    };

    const handleChange = (e) => {
        setRole(e.target.value);
    }

    const createAccount = async () => {
        // const role = "student";
        // const payment = {
        //     name: name,
        //     number: "",
        //     expiry: "",
        //     cvc: "",
        // };
        const address = "";
        const education = "";
        const bookmark = [];
        const history = [];

        if (password !== confirm) {
            setErrorMessage("Passwords do not match");
            setError(true);
            return;
        }

        const nameRegex = /^[a-zA-Z0-9 ]{2,50}$/;
        const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*]).{8,20}$/;

        if (!nameRegex.test(name)) {
            setErrorMessage("Account names must be 2-50 alphanumeric characters");
            setError(true);
            return;
        }

        if (!passwordRegex.test(password)) {
            setErrorMessage(
                "Password must be 8-20 characters, one upper case and lower case, and one of ~!@#$%^&*"
            );
            setError(true);
            return;
        }

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const userID = response.user.uid;
            await setDoc(doc(db, "users", response.user.uid), {
                userID,
                name,
                email,
                role,
                address,
                education,
                bookmark,
                history,
            });

            await updateProfile(response.user, {
                displayName: name,
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                });

            navigate("/user/dashboard");
            // return (<alert>Sucessfully Registered!</alert>)
        } catch (error) {
            setErrorMessage("Email already in use or an error occurred");
            setError(true);
        }
    };

    const registerCard = () => (
        <Card
            variant="outlined"
            sx={{ positon: "absolute", maxWidth: 500, ml: "auto", mr: "auto", mt: "10vh" }}
        >
            <CardContent>
                <Box sx={{ m: 5 }}>
                    <Typography variant="h5" textAlign="center">
                        Register your Quiz Game Account
                    </Typography>
                    {/* <Typography variant="h6" textAlign="center">
                        Create your Quiz Game Account
                    </Typography> */}
                </Box>
                <Box sx={{ m: 5, gap: 3, display: "flex", flexDirection: "column" }}>
                    <TextField
                        type="text"
                        fullWidth
                        label="Account name"
                        name="name"
                        onChange={handleInput}
                    ></TextField>
                    <TextField
                        type="email"
                        fullWidth
                        label="Email"
                        name="email"
                        onChange={handleInput}
                    ></TextField>
        <FormControl fullWidth>
        <InputLabel id="role-select">Role</InputLabel>
        <Select
          labelId="role-select"
          id="role-select"
          value={role}
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={"student"}>Student</MenuItem>
          <MenuItem value={"teacher"}>Teacher</MenuItem>
        </Select>
      </FormControl>
                    <TextField
                        type="password"
                        fullWidth
                        label="Password"
                        name="password"
                        onChange={handleInput}
                    ></TextField>
                    <TextField
                        type="password"
                        fullWidth
                        label="Confirm"
                        name="confirm"
                        onChange={handleInput}
                    ></TextField>
                    {error && (
                        <Typography color="error" variant="body1">
                            {errorMessage}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", ml: 5, mr: 5 }}>
                    <Button variant="text" onClick={() => navigate("/login")}>
                        Sign in instead
                    </Button>
                    <Button
                        variant="contained"
                        disabled={!(email.length > 5 && password.length > 6)}
                        onClick={createAccount}
                    >
                        Register
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );

    return <div className="register-container" style={{paddingBottom: "40px"}}>{registerCard()}</div>;
}

export default Register;
