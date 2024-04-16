// Import React, the useState and useEffect hooks
import React, { useState, useEffect } from "react";
// Import the Route and Navigate components
import { Navigate } from "react-router";
// Import the Util function we created to handle the reading from the local storage
// import getAuth from "../../../util/auth";

const getAuth = async () => {
  const employee = await JSON.parse(localStorage.getItem("employee"));
  // console.log(employee.data.employee_token);
  if (employee && employee.data.employee_token) {
    // console.log(employee.data.employee_token);
    const decodedToken = await decodeTokenPayload(employee.data.employee_token);
    employee.employee_role = decodedToken.employee_role;
    employee.employee_id = decodedToken.employee_id;
    employee.employee_first_name = decodedToken.employee_first_name;
    // console.log(employee);
    return employee;
  } else {
    return {};
  }
};

// Function to decode the payload from the token
// The purpose of this code is to take a JWT token, extract its payload, decode it from Base64Url encoding, and then convert the decoded payload into a JavaScript object for further use and manipulation
const decodeTokenPayload = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
  // console.log("Decodedddd token payload:", JSON.parse(jsonPayload));
  return JSON.parse(jsonPayload);
};

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // useEffect(() => {
  //   // Retrieve the logged in user from local storage
  //   const loggedInEmployee = getAuth();
  //   // console.log(loggedInEmployee);
  //   loggedInEmployee.then((response) => {
  //     // console.log(response.data.employee_token);
  //     // console.log(response.employee_role);
  //     if (response.data.employee_token) {
  //       // If in here, that means the user is logged in
  //       // console.log(response);
  //       // console.log("Set logged in to true");
  //       setIsLogged(true);
  //       if (
  //         roles &&
  //         roles.length > 0 &&
  //         roles.includes(response.employee_role)
  //       ) {
  //         // If in here, that means the user is logged and has  authorization to access the route
  //         // console.log("Set authorized to true");
  //         setIsAuthorized(true);
  //       }
  //     }
  //     setIsChecked(true);
  //   });
  // }, [roles]);

  useEffect(() => {
    const fetchLoggedInEmployee = async () => {
      try {
        // Retrieve the logged in user from local storage
        const loggedInEmployee = await getAuth();
        // console.log(loggedInEmployee);
        if (loggedInEmployee.data.employee_token) {
          // If in here, that means the user is logged in
          // console.log(response);
          // console.log("Set logged in to true");
          setIsLogged(true);
          if (
            roles &&
            roles.length > 0 &&
            roles.includes(loggedInEmployee.employee_role)
          ) {
            // If in here, that means the user is logged and has authorization to access the route
            // console.log("Set authorized to true");
            setIsAuthorized(true);
          }
        }
        setIsChecked(true);
      } catch (error) {
        console.error("Error fetching logged-in employee:", error);
        setIsChecked(true);
      }
    };

    fetchLoggedInEmployee();
  }, [roles]);

  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
};

export default PrivateAuthRoute;
