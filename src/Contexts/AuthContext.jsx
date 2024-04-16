// // Import React and the Hooks we need here
// import React, { useState, useEffect, useContext } from "react";
// // Import the Util function we created to handle the reading from the local storage
// import getAuth from "../util/auth";
// // Create a context object
// const AuthContext = React.createContext();
// // Create a custom hook to use the context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   const [isLogged, setIsLogged] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [employee, setEmployee] = useState(null);

//   const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee };
//   console.log("Gettt autttt from context", getAuth());
//   useEffect(() => {
//     console.log("Get Auth method from effect", getAuth());
//     // Retrieve the logged in user from local storage
//     const loggedInEmployee = getAuth();
//     // console.log(loggedInEmployee);
//     loggedInEmployee.then((response) => {
//       // console.log(response);
//       if (response.employee_token) {
//         setIsLogged(true);
//         // 3 is the employee_role for admin
//         if (response.employee_role === 3) {
//           setIsAdmin(true);
//         }
//         setEmployee(response);
//       }
//     });
//   }, []);
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// Import React and the Hooks we need here
import React, { useState, useEffect, useContext } from "react";
// Import the Util function we created to handle the reading from the local storage
// import getAuth from "../util/auth";
// Create a context object

// Function to read the data from the user's local storage
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

export const AuthContext = React.createContext();
// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};
// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const value = { isLogged, isAdmin, setIsAdmin, setIsLogged, employee };

  // useEffect(() => {
  //   // Retrieve the logged in user from local storage
  //   const loggedInEmployee = getAuth();
  //   // console.log(loggedInEmployee);
  //   loggedInEmployee.then((response) => {
  //     // console.log(response);
  //     if (response.employee_token) {
  //       setIsLogged(true);
  //       // 3 is the employee_role for admin
  //       if (response.employee_role === 3) {
  //         setIsAdmin(true);
  //       }
  //       setEmployee(response);
  //     }
  //   });
  // }, []);
  useEffect(() => {
    const fetchLoggedInEmployee = async () => {
      // Retrieve the logged in user from local storage
      const loggedInEmployee = await getAuth();
      console.log("Logged Employeee", loggedInEmployee);
      // console.log(loggedInEmployee.data.employee_token);

      // ########### Error--code ################
      // if (loggedInEmployee) {
      //   setIsLogged(true);
      //   // 3 is the employee_role for admin
      //   if (loggedInEmployee.employee_role === 3) {
      //     setIsAdmin(true);
      //   }
      //   setEmployee(loggedInEmployee);
      // }
      // #########################

      if (Object.keys(loggedInEmployee).length > 0) {
        setIsLogged(true);
        if (loggedInEmployee.employee_role === 3) {
          setIsAdmin(true);
        }
        setEmployee(loggedInEmployee);
      }
    };

    fetchLoggedInEmployee();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
