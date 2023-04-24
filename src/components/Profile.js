import React, { useContext, useEffect, useState } from "react";
// import { updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import UserFieldsContext from "../context/UserFieldsContext";
import Navbar from "./Navbar";
import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
    Button,
    ImageList,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
} from "@mui/material";
import { Email } from "@mui/icons-material";
import photo1 from "../assets/girl_back.avif";
import photo2 from "../assets/multi_back.avif";
import photo3 from "../assets/people_back.avif"




function Profile() {
    const { currentUser } = useContext(AuthContext);
    const { userFields } = useContext(UserFieldsContext);

    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(false);

    const [education, setEducation] = useState("");
    const [educationValid, setEducationValid] = useState(false);
    

    const [payment, setPayment] = useState({
        name: "",
        number: "",
        expiry: "",
        cvc: "",
    });
    const [paymentValid, setPaymentValid] = useState(false);
    const [paymentNameValid, setPaymentNameValid] = useState(false);
    const [paymentNumberValid, setPaymentNumberValid] = useState(false);
    const [paymentExpiryValid, setPaymentExpiryValid] = useState(false);
    const [paymentCVCValid, setPaymentCVCValid] = useState(false);

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        address: "",
    });
    const [addressNameValid, setAddressNameValid] = useState(false);
    const [addressPhoneValid, setAddressPhoneValid] = useState(false);
    const [addressStreetValid, setAddressStreetValid] = useState(false);
    const [addressValid, setAddressValid] = useState(false);

    const [openName, setOpenName] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [openShipping, setOpenShipping] = useState(false);
    const [openEducation, setOpenEducation] = useState(false);

    const updateName = async () => {
        if (currentUser.uid) {
            await updateDoc(doc(db, "users", currentUser.uid), {
                name: name,
            });
            setName("");
        }
    };

    const updateEducation = async () => {
        if (currentUser.uid) {
            await updateDoc(doc(db, "users", currentUser.uid), {
                education: education,
            });
            setEducation("");
        }
    };

    const updatePayment = async () => {
        if (currentUser.uid) {
            await updateDoc(doc(db, "users", currentUser.uid), {
                payment: payment,
            }).then(() => {
                setPayment({
                    name: "",
                    number: "",
                    expiry: "",
                    cvc: "",
                });
            });
        }
    };

    const updateAddress = async () => {
        if (currentUser.uid) {
            await updateDoc(doc(db, "users", currentUser.uid), {
                address: address,
            });
            setAddress({
                name: "",
                phone: "",
                address: "",
            });
        }
    };

    const openDialog = (e) => {
        switch (e.target.name) {
            case "name-dialog":
                setOpenName(true);
                break;
            case "education-dialog":
                setOpenEducation(true);
                break;
            case "payment-dialog":
                setOpenPayment(true);
                break;
            case "shipping-dialog":
                setOpenShipping(true);
                break;
        }
    };

    const closeDialog = (e) => {
        switch (e.target.name) {
            case "name-dialog":
                setOpenName(false);
                break;
            case "education-dialog":
                setOpenEducation(false);
                break;
            case "payment-dialog":
                setOpenPayment(false);
                break;
            case "shipping-dialog":
                setOpenShipping(false);
                break;
            case "name-confirm": {
                updateName();
                setOpenName(false);
                break;
            }
            case "education-confirm": {
                updateEducation();
                setOpenEducation(false);
                break;
            }
            case "payment-confirm":
                {
                    updatePayment();
                    setOpenPayment(false);
                }
                break;
            case "shipping-confirm":
                {
                    updateAddress();
                    setOpenShipping(false);
                }
                break;
        }
    };

    // name dialog
    useEffect(() => {
        const nameRegex = new RegExp("^[a-zA-Z ]{5,50}$");
        setNameValid(!nameRegex.test(name));
    }, [name]);

    useEffect(() => {
        const educationRegex = new RegExp("^[a-zA-Z0-9 ]{3,50}$");
        setEducationValid(!educationRegex.test(education));
    }, [education]);

    // payment dialog
    useEffect(() => {
        const paymentNameRegex = new RegExp("^[a-zA-Z ]{5,50}$");
        setPaymentNameValid(paymentNameRegex.test(payment.name));
        setPaymentNumberValid(payment.number.length === 16);
        setPaymentExpiryValid(new Date().toISOString().split("T")[0] <= payment.expiry);
        setPaymentCVCValid(payment.cvc.length === 3);
    }, [payment]);

    useEffect(() => {
        setPaymentValid(
            paymentNameValid && paymentNumberValid && paymentExpiryValid && paymentCVCValid
        );
    }, [paymentNameValid, paymentNumberValid, paymentExpiryValid, paymentCVCValid]);

    // address dialog
    useEffect(() => {
        const nameRegex = new RegExp("^[a-zA-Z ]{5,50}$");
        const streetRegex = new RegExp("^[a-zA-Z0-9 ]{10,100}$");
        setAddressNameValid(nameRegex.test(address.name));
        setAddressPhoneValid(address.phone.length === 10);
        setAddressStreetValid(streetRegex.test(address.address));
    }, [address]);

    useEffect(() => {
        setAddressValid(addressNameValid && addressPhoneValid && addressStreetValid);
    }, [addressNameValid, addressPhoneValid, addressStreetValid]);

    const cards = () => (
        <>
            <Card
                elevation={3}
                sx={{ width: "fit-content", minHeight: 100, margin: 6, backgroundColor: "#ebebeb" }}
            >
                <Typography variant="h5" component="div" sx={{ margin: 3 }}>
                    <p>Hi, {userFields?.name}</p>
                </Typography>
                <Typography variant="h6" component="div" sx={{ margin: 3 }}>
                    <Email />
                    &nbsp;{userFields?.email}
                </Typography>
            </Card>
            <ImageList cols={3} sx={{ margin: 3 }}>
                <Card sx={{ margin: 3 }} variant="outlined">
                    <CardMedia
                        component="img"
                        alt="name"
                        image={photo1}
                        height={180}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Name
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Change your account name
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" name="name-dialog" onClick={openDialog}>
                            edit
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ margin: 3 }} variant="outlined">
                    <CardMedia
                        component="img"
                        alt="education"
                        image={photo2}
                        height={180}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Education
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Change your Education Level
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" name="education-dialog" onClick={openDialog}>
                            edit
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ margin: 3 }} variant="outlined">
                    <CardMedia
                        component="img"
                        alt="name"
                        image={photo3}
                        height={180}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Address
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Change your Home address
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" name="shipping-dialog" onClick={openDialog}>
                            edit
                        </Button>
                    </CardActions>
                </Card>
            </ImageList>
        </>
    );

    const dialogs = () => (
        <>
            <Dialog
                open={openName}
                onClose={() => {
                    setOpenName(false);
                }}
            >
                <DialogTitle>Change account name</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter your new account name</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nameField"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) => setName(e.target.value)}
                        error={nameValid}
                        helperText="At least 5 characters"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} name="name-dialog">
                        cancel
                    </Button>
                    <Button onClick={closeDialog} name="name-confirm" disabled={nameValid}>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEducation}
                onClose={() => {
                    setOpenEducation(false);
                }}
            >
                <DialogTitle>Change Education Level</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter your new Education Level</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="educationField"
                        label="Education"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) => setEducation(e.target.value)}
                        error={educationValid}
                        helperText="At least 3 characters"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} name="education-dialog">
                        cancel
                    </Button>
                    <Button onClick={closeDialog} name="education-confirm" disabled={educationValid}>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openPayment}
                onClose={() => {
                    setOpenPayment(false);
                }}
            >
                <DialogTitle>Change payment details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter your new payment details</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="cardholderField"
                        label="Cardholder name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) =>
                            setPayment({
                                name: e.target.value,
                                number: payment.number,
                                expiry: payment.expiry,
                                cvc: payment.cvc,
                            })
                        }
                        error={!paymentNameValid}
                        helperText="At least 5 characters"
                    />
                    <TextField
                        margin="dense"
                        id="numberField"
                        label="Card number"
                        type="number"
                        fullWidth
                        variant="standard"
                        required
                        inputProps={{ maxLength: 16, minLength: 16 }}
                        onChange={(e) =>
                            setPayment({
                                name: payment.name,
                                number: e.target.value,
                                expiry: payment.expiry,
                                cvc: payment.cvc,
                            })
                        }
                        error={!paymentNumberValid}
                        helperText="16 digits only"
                    />
                    <TextField
                        margin="dense"
                        id="expiryField"
                        label="Card expiry"
                        type="date"
                        variant="standard"
                        required
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) =>
                            setPayment({
                                name: payment.name,
                                number: payment.number,
                                expiry: e.target.value,
                                cvc: payment.cvc,
                            })
                        }
                        error={!paymentExpiryValid}
                        helperText="Expiry must be valid"
                    />
                    &emsp;
                    <TextField
                        margin="dense"
                        id="cvcField"
                        label="CVC"
                        type="number"
                        variant="standard"
                        required
                        inputProps={{ maxLength: 3, minLength: 3 }}
                        onChange={(e) =>
                            setPayment({
                                name: payment.name,
                                number: payment.number,
                                expiry: payment.expiry,
                                cvc: e.target.value,
                            })
                        }
                        error={!paymentCVCValid}
                        helperText="3 digits only"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} name="payment-dialog">
                        cancel
                    </Button>
                    <Button onClick={closeDialog} name="payment-confirm" disabled={!paymentValid}>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openShipping}
                onClose={() => {
                    setOpenShipping(false);
                }}
            >
                <DialogTitle>Change Address details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter your new Home address</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="NameField"
                        label="Full name"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) =>
                            setAddress({
                                name: e.target.value,
                                phone: address.phone,
                                address: address.address,
                            })
                        }
                        error={!addressNameValid}
                        helperText="At least 5 characters"
                    />
                    <TextField
                        margin="dense"
                        id="PhoneField"
                        label="Phone number"
                        type="number"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) =>
                            setAddress({
                                name: address.name,
                                phone: e.target.value,
                                address: address.address,
                            })
                        }
                        error={!addressPhoneValid}
                        helperText="Must be 10 numbers"
                    />
                    <TextField
                        margin="dense"
                        id="addressField"
                        label="Address"
                        type="text"
                        fullWidth
                        variant="standard"
                        required
                        onChange={(e) =>
                            setAddress({
                                name: address.name,
                                phone: address.phone,
                                address: e.target.value,
                            })
                        }
                        error={!addressStreetValid}
                        helperText="At least 10 characters"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} name="shipping-dialog">
                        cancel
                    </Button>
                    <Button onClick={closeDialog} name="shipping-confirm" disabled={!addressValid}>
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );

    return (
        <div>
            <Navbar />
            {cards()}
            {dialogs()}
        </div>
    );
}

export default Profile;


