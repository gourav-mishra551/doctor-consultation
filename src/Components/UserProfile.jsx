import axios from "axios";
import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";
import "./UserProfile.css";
const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetechUserProfileData = async () => {
      try {
        const response = await axios.get("https://api.assetorix.com/ah/user", {
          headers: {
            authorzation: localStorage.getItem("x_auth_token"),
            id: localStorage.getItem("x_userid"),
          },
        });
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetechUserProfileData();
  }, []);

  if (loading)
    return (
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  if (error) return <div>{error.message}</div>;
  if (!userData) return null;

  const headerStyle = {
    minHeight: "600px",
    backgroundImage:
      "url(https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980721.jpg?w=826&t=st=1714628622~exp=1714629222~hmac=799a2c386c8f32ea40eb55d32930ee70fd106d99b79632255205ca9a6b116108",
    backgroundSize: "cover",
    backgroundPosition: "center top",
  };

  return (
    <div className="main-content">
      <nav
        className="navbar navbar-top navbar-expand-md navbar-dark"
        id="navbar-main"
      >
        <div className="container-fluid">
          <a
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            href="https://www.creative-tim.com/product/argon-dashboard"
            target="_blank"
          >
            User profile
          </a>

          <form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div className="form-group mb-0">
              <div className="input-group input-group-alternative">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
                <input
                  className="form-control"
                  placeholder="Search"
                  type="text"
                />
              </div>
            </div>
          </form>

          <ul className="navbar-nav align-items-center d-none d-md-flex">
            <li className="nav-item dropdown">
              <a
                className="nav-link pr-0"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="media align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="Image placeholder"
                      src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
                    />
                  </span>
                  <div className="media-body ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm  font-weight-bold">
                      Jessica Jones
                    </span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                <div className=" dropdown-header noti-title">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </div>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-single-02"></i>
                  <span>My profile</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-settings-gear-65"></i>
                  <span>Settings</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-calendar-grid-58"></i>
                  <span>Activity</span>
                </a>
                <a href="../examples/profile.html" className="dropdown-item">
                  <i className="ni ni-support-16"></i>
                  <span>Support</span>
                </a>
                <div className="dropdown-divider"></div>
                <a href="#!" className="dropdown-item">
                  <i className="ni ni-user-run"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={headerStyle}
      >
        <span className="mask bg-gradient-default opacity-30"></span>

        <div className="container-fluid d-flex align-items-center">
          <div className="row">
            <div className="col-lg-7 col-md-10">
              <h1 className="display-2 text-white">Hello Jesse</h1>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks
              </p>
              <a href="#!" className="btn btn-info bg-[#1c8e81] border-none">
                Edit profile
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-7">
        <div className="row">
          <div className="col-xl-4 order-xl-0 mb-5 mb-xl-0 h-auto">
            <Sidebar>
              <Menu>
                <SubMenu className="font-bold" label="Profile">
                  <MenuItem component={<NavLink to="/home"></NavLink>}>
                    {" "}
                    Profile{" "}
                  </MenuItem>
                  <MenuItem component={<NavLink to="/home"></NavLink>}>
                    {" "}
                    Home{" "}
                  </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
              </Menu>
            </Sidebar>

            {/* <div className='mt-16 h-[450px]' style={{border:"1px solid red"}}>

                        </div> */}
          </div>

          <div className="col-xl-8 order-xl-1">
            <div className="card bg-secondary shadow">
              <div className="card card-profile shadow">
                <div className="row justify-content-center">
                  <div className="col-lg-3 order-lg-2">
                    <div className="card-profile-image">
                      <a href="#">
                        <img
                          src="https://demos.creative-tim.com/argon-dashboard/assets-old/img/theme/team-4.jpg"
                          className="rounded-circle"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <button
                      href="#"
                      className="btn btn-sm btn-info mr-4 bg-[#1c8e81]"
                    >
                      My account
                    </button>
                    <a href="#" className="btn btn-sm btn-default float-right">
                      Setting
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <h6 className="heading-small text-muted mb-4">
                  User information
                </h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label
                          className="form-control-label"
                          for="input-username"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          id="input-username"
                          className="form-control form-control-alternative"
                          placeholder="Username"
                          value="lucky.jesse"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-email">
                          Email address
                        </label>
                        <input
                          type="email"
                          id="input-email"
                          className="form-control form-control-alternative"
                          placeholder="jesse@example.com"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label
                          className="form-control-label"
                          for="input-first-name"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          id="input-first-name"
                          className="form-control form-control-alternative"
                          placeholder="First name"
                          value="Lucky"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label
                          className="form-control-label"
                          for="input-last-name"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          id="input-last-name"
                          className="form-control form-control-alternative"
                          placeholder="Last name"
                          value="Jesse"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />

                <h6 className="heading-small text-muted mb-4">
                  Contact information
                </h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group focused">
                        <label
                          className="form-control-label"
                          for="input-address"
                        >
                          Address
                        </label>
                        <input
                          id="input-address"
                          className="form-control form-control-alternative"
                          placeholder="Home Address"
                          value="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-city">
                          City
                        </label>
                        <input
                          type="text"
                          id="input-city"
                          className="form-control form-control-alternative"
                          placeholder="City"
                          value="New York"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group focused">
                        <label
                          className="form-control-label"
                          for="input-country"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="input-country"
                          className="form-control form-control-alternative"
                          placeholder="Country"
                          value="United States"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-control-label"
                          for="input-country"
                        >
                          Postal code
                        </label>
                        <input
                          type="number"
                          id="input-postal-code"
                          className="form-control form-control-alternative"
                          placeholder="Postal code"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4" />

                <h6 className="heading-small text-muted mb-4">About me</h6>
                <div className="pl-lg-4">
                  <div className="form-group focused">
                    <label>About Me</label>
                    <textarea
                      rows="4"
                      className="form-control form-control-alternative"
                      placeholder="A few words about you ..."
                    >
                      A beautiful Dashboard for Bootstrap 4. It is Free and Open
                      Source.
                    </textarea>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  className="btn btn-sm btn-info mr-4 bg-[#1c8e81] p-2 w-[200px] text-center"
                  style={{ alignItems: "center" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
