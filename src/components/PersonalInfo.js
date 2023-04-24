import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import UserFieldsContext from "../context/UserFieldsContext";
import headshot from "../assets/images.png"


const PersonalInfo = () => {
    const { currentUser } = useContext(AuthContext);
    const { userFields } = useContext(UserFieldsContext);

  return (
    <div>
      <div><img src={headshot} style={{
            borderRadius: "150px",
            width: "100%",
            margin: "auto",
      }}/></div>
      <div>
      <div style={{textAlign: "center", 
                   fontSize: "30px", 
                   fontFamily: "sans-serif", 
                   marginTop: "0px", 
                   backgroundColor: "orange", 
                   borderRadius: "50px", marginLeft: "15px",marginRight: "15px"}}>{userFields? `${userFields?.name}` : ""}</div>
      <div style={{textAlign: "center", fontSize: "15px", fontFamily: "sans-serif", marginTop: "5px", fontStyle: "italic"}}>{userFields? `Education: ${userFields?.education}` : ""}</div>
      <div style={{textAlign: "center", fontSize: "20px", fontFamily: "sans-serif", marginTop: "3px"}}>{userFields? `${userFields?.role}` : ""}</div>
      </div>
    </div>
  )
}

export default PersonalInfo
