import React, { useState } from "react";
// Import the Link component from react-router-dom
import { Link } from "react-router-dom";
// Import the logo image
import logo from "../../../assets/images/logo_1.png";
// Import the login service to access the logout function
import loginService from "../../../services/login.service";
// import Header.css file
import "./Header.css";
// Import the custom context hook
import { useAuth } from "../../../Contexts/AuthContext";

function Header(props) {
  // Use the custom hook to access the data in the context
  const { isLogged, setIsLogged, employee } = useAuth();
  // console.log("I am from header", useAuth());
  console.log(isLogged);

  // Log out event handler function
  const logOut = () => {
    // Call the logout function from the login service
    loginService.logOut();
    // Set the isLogged state to false
    setIsLogged(false);
  };

  // State to manage the navbar collapse
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Function to toggle the navbar collapse
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <div>
      <header className="main-header header-style-one">
        <div className="header-top ">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">
                  Relax knowing we're here to expertly restore your car to its
                  best.
                </div>
                <div className="office-hour">
                  Monday - Saturday 7:00AM - 6:00PM
                </div>
              </div>
              <div className="right-column">
                {isLogged ? (
                  <div className="link-btn">
                    <div className="phone-number">
                      <strong>Welcome {employee?.employee_first_name}</strong>
                    </div>
                  </div>
                ) : (
                  <div className="phone-number">
                    Schedule Appointment: <strong>+2519-26-62-84-62 </strong>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="inner-container">
          <nav className="navbar navbar-expand-lg navbar-light navbar-light">
            <div className="container-fluid">
              <div className="logo-box">
                <div className="logo">
                  <Link to="/">
                    <img src={logo} alt="" />
                  </Link>
                </div>
              </div>
              {/* Button for toggling navbar collapse */}
              <button
                className="navbar-toggler"
                type="button"
                onClick={handleNavCollapse}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              {/* Navbar content */}
              <div
                className={`${
                  isNavCollapsed ? "collapse" : ""
                } navbar-collapse justify-content-end`}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 head_nav">
                  <li className="dropdown mr-3 ">
                    <Link to="/" style={{ color: "black" }}>
                      Home
                    </Link>
                  </li>
                  <li className="dropdown mr-3">
                    <Link to="/about" style={{ color: "black" }}>
                      About Us
                    </Link>
                  </li>
                  <li className="dropdown mr-3">
                    <Link
                      className="text-black"
                      to="/services"
                      style={{ color: "black" }}
                    >
                      Services
                    </Link>
                  </li>
                  <li className="mr-3">
                    <Link to="/contact" style={{ color: "black" }}>
                      Contact Us
                    </Link>
                  </li>
                  {isLogged && (
                    <li className="mr-3">
                      <Link to="/admin" style={{ color: "black" }}>
                        Admin
                      </Link>
                    </li>
                  )}
                  <li className=" mt-auto mb-auto">
                    {isLogged ? (
                      <div className="link-btn ">
                        <Link
                          to="/"
                          className="theme-btn btn-style-one blue "
                          onClick={logOut}
                          style={{ padding: "5px 10px", borderRadius: "5px" }}
                        >
                          Log out
                        </Link>
                      </div>
                    ) : (
                      <div className="link-btn">
                        <Link
                          to="/login"
                          className="theme-btn btn-style-one"
                          style={{ padding: "5px 10px", borderRadius: "5px" }}
                        >
                          Login
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="sticky-header">
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                <div className="logo-box">
                  <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="right-column">
                  <div className="nav-outer">
                    <div className="mobile-nav-toggler">
                      <img src="assets/images/icons/icon-bar.png" alt="" />
                    </div>

                    <nav className="main-menu navbar-expand-md navbar-light"></nav>
                  </div>
                  <div className="search-btn"></div>
                  <div className="link-btn">
                    <Link to="/login" className="theme-btn btn-style-one">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <span className="icon flaticon-remove"></span>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="index.html">
                <img src="assets/images/logo-two.png" alt="" title="" />
              </Link>
            </div>
            <div className="menu-outer"></div>
          </nav>
        </div>

        <div className="nav-overlay">
          <div className="cursor"></div>
          <div className="cursor-follower"></div>
        </div>
      </header>
    </div>
  );
}

export default Header;
