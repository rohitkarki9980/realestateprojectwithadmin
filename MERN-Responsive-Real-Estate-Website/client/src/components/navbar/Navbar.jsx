import React, { useState } from "react";
import classes from "./navbar.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  AiOutlinePlusCircle,
  AiOutlineClose,
 
} from "react-icons/ai";

import {BsPersonLock,  BsPersonCircle } from "react-icons/bs";

import { GoListUnordered } from "react-icons/go";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "../../redux/authSlice";
import { request } from "../../util/fetchAPI";
import { useEffect } from "react";
import person from "../../assets/person.jpg";

const Navbar = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isAdmin =user?.isAdmin
  // Update the window width state when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    setState((prev) => {
      return { ...prev, district: "Bagmati Province", type: "apartments" };
    });
  }, []);

  // mobile
  const [showMobileNav, setShowMobileNav] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setPhoto(null);
    setState({});
  };

  const handleListProperty = async (e) => {
    e.preventDefault();
    let filename = null;
    if (photo) {
      const formData = new FormData();
      filename = crypto.randomUUID() + photo.name;
      formData.append("filename", filename);
      formData.append("image", photo);

      const options = {
        Authorization: `Bearer ${token}`,
      };

      await request("/upload/image", "POST", options, formData, true);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
      return;
    }

    try {
      if (
        Object.values(state).some((v) => !v) &&
        Object.values(state).length < 7
      ) {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2500);
        return;
      }

      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const newProperty = await request("/property", "POST", options, {
        ...state,
        img: filename,
      });

      setShowModal(false);
      setShowForm(false);
      navigate(`/propertyDetail/${newProperty._id}`);
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };

  return (
    <div className={`${classes.container} ${isScrolled && classes.scrolled}`}>
      <div className={classes.wrapper}>
        <Link to="/" onClick={scrollToTop} className={classes.left}>
          <h1 className={classes.logo}>NEPAL<span>HOMES</span></h1>
        </Link>
        <ul style={{ paddingLeft: "0" }} className={classes.centerImp}>
          <li onClick={scrollToTop} className={classes.listItem}>
            <Link to="/" className={classes.linker}>
              Home
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/aboutPanel" className={classes.linker}>
              About
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/allProperties" className={classes.linker}>
              Properties
            </Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/contact" className={classes.linker}>
              Contacts
            </Link>
          </li>
        </ul>
        <div className={classes.right}>
          {!user ? (
            <>
              <div className={classes.notLogin}>
                <Link to="/signin" className={classes.rightLinker}>
                  Already have an account?
                </Link>
                <Link to="/signup" className={classes.signUpLinker}>
                  Sign up
                </Link>
              </div>
            </>
          ) : (
            <>
              <span
                className={classes.userName}
                onClick={() => setShowModal((prev) => !prev)}
              >
                <span className={classes.name}>Hello {user.username}!</span>
                <div className={classes.userProfileImg}>
                  <img
                    alt=""
                    src={
                      user?.profileImg
                        ? `http://localhost:5000/images/${user?.profileImg}`
                        : person
                    }
                  />
                </div>
              </span>

              {showModal && (
                <div className={classes.userModal}>
                  <AiOutlineClose
                    onClick={() => setShowModal((prev) => !prev)}
                    className={classes.userModalClose}
                  />
                  <Link to={`/signin`} className={classes.anchor}>
                    <div className={classes.iconOne}>
                      <IoMdLogOut size={"24px"} color={"red"} />
                    </div>
                    <div onClick={handleLogout} className={classes.logoutBttn}>
                      Logout
                    </div>
                  </Link>
                  {isAdmin ? <Link
                    to={`/admin`}
                    onClick={() => setShowModal((prev) => !prev)}
                    className={classes.anchorFive}
                  >
                    <div className={classes.iconFive}>
                 
                      <BsPersonLock size={"24px"}  color={"red"} />
                    </div>
                    <div className={classes.listProp}> Admin</div>
                  </Link> :(<span style={{display:"none"}}></span>)}
                  <Link
                    to={`/my-profile`}
                    onClick={() => setShowModal((prev) => !prev)}
                    className={classes.anchorTwo}
                  >
                    <div className={classes.iconTwo}>
                      <BsPersonCircle size={"20px"} />
                    </div>

                    <div className={classes.myProfile}>My Profile</div>
                  </Link>

                  <Link
                    className={classes.anchorThree}
                    onClick={() => setShowForm(true)}
                  >
                    <div className={classes.iconThree}>
                      <MdOutlineAddHomeWork size={"24px"} />
                    </div>
                    <div className={classes.listProps}>List your property</div>
                  </Link>

                  <Link
                    onClick={() => setShowModal((prev) => !prev)}
                    to={`/yachts`}
                    className={classes.anchorFour}
                  >
                    <div className={classes.iconFour}>
                      <AiOutlinePlusCircle size={"24px"} />
                    </div>
                    <div className={classes.yachtBtn}>See flats!</div>
                  </Link>

                  <Link
                    to={`/create-yacht`}
                    onClick={() => setShowModal((prev) => !prev)}
                    className={classes.anchorSix}
                  >
                    <div className={classes.iconSix}>
                      {" "}
                      <GoListUnordered size={"24px"} />
                    </div>
                    <div className={classes.listFlat}>List your flat</div>
                  </Link>
                
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {
        // desktop screen
        !showMobileNav && showForm && (
          <div  
          className={windowWidth >= 600 ? `${classes.listPropertyForm}` : `${classes.hiddenForm}`}
          onClick={handleCloseForm}>
            <div
              className={classes.listPropertyWrapperDesktop }
              
              onClick={(e) => e.stopPropagation()}
            >
               <div className={classes.removeIconOfProperty}>
               <AiOutlineClose
                  onClick={handleCloseForm}
                  color={"red"}
                />
                </div>
              <h2>List Property</h2>
              <form
                onSubmit={handleListProperty}
                className={classes.desktopForm }
              >
                <input
                  value={state?.title}
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleState}
                />
                <select
                  value={state?.type}
                  required
                  name="type"
                  onChange={handleState}
                >
                  <option disabled>Select Type</option>
                  <option value="apartments">Apartments</option>
                  <option value="townhouse">Town House</option>
                  <option value="colony">Colony</option>
                </select>
                <input
                  value={state?.desc}
                  type="text"
                  placeholder="Desc"
                  name="desc"
                  onChange={handleState}
                />
                <select
                  value={state?.district}
                  required
                  name="district"
                  onChange={handleState}
                >
                  <option disabled>Select Province</option>
                  <option value="Province One">Province One</option>
                  <option value="Province Two">Province Two</option>
                  <option value="Bagmati Province">Bagmati Province</option>
                  <option value="Lumbini Province">Lumbini Province</option>
                  <option value="Karnali Province">Karnali Province</option>
                  <option value="Sudarpaschim Province">Sudarpaschim Province</option>
                </select>
                <input
                  value={state?.price}
                  type="number"
                  placeholder="Price"
                  name="price"
                  onChange={handleState}
                />
                <input
                  value={state?.sqmeters}
                  type="number"
                  placeholder="Sq. meters"
                  name="sqmeters"
                  onChange={handleState}
                />
                <input
                  value={state?.location}
                  type="text"
                  placeholder="Location"
                  name="location"
                  onChange={handleState}
                />
                <input
                  value={state?.BHK}
                  type="number"
                  placeholder="BHK"
                  name="BHK"
                  step={1}
                  min={1}
                  onChange={handleState}
                />

                <div className={classes.labels}>
                  <label htmlFor="photo">Upload Property Picture +</label>
                  <input
                    type="file"
                    id="photo"
                    style={{ display: "none" }}
                    onChange={(e) => setPhoto(e.target.files[0])}
                  />
                  {photo && <div style={{color:"red", fontSize:"0.8rem"}}>{photo.name.slice(0,10)}</div>}
                </div>

                <div className={classes.buttonProp}>
                  <button>List property</button>
                </div>
               
              </form>
            </div>
          </div>
        )
      }
      {
        // mobile screen
        <div className={classes.mobileNav}>
          {showMobileNav && (
            <div className={classes.navigation}>
              <div className={classes.clipped}>
                <AiOutlineClose
                  className={classes.mobileCloseIcon}
                  onClick={() => setShowMobileNav(false)}
                />
                <Link to="/" onClick={scrollToTop}>
                  <div className={classes.mobileLeft}>
                    <img src="./Logo.png" style={{ width: "100px" }} alt="" />
                  </div>
                </Link>

                <ul className={classes.mobileCenter}>
                  <li onClick={scrollToTop} className={classes.mobileListItem}>
                    Home
                  </li>
                  <li className={classes.mobileListItem}>About</li>
                  <li className={classes.mobileListItem}>Featured</li>
                  <li className={classes.mobileListItem}>Contacts</li>
                  <li className={classes.mobileListItem}>{isAdmin ?<li>Admin</li>:(<span style={{display:"none"}}></span>)}</li>
                  
                </ul>
                <div className={classes.mobileRight}>
                  {!user ? (
                    <div className={classes.signButtons}>
                      <Link to="/signup" className={classes.mobileSignUp}>
                        Sign up
                      </Link>
                      <Link to="/signin" className={classes.mobileSignIn}>
                        {" "}
                        Already have an Account?
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className={classes.navUserModal}>
                        <span>Hello {user.username}!</span>
                      
                          <img
                            className={classes.userProfileImg}
                            src={
                              user?.profileImg
                                ? `http://localhost:5000/images/${user?.profileImg}`
                                : person
                            }
                            alt=""
                          />
                        

                        <span
                          className={classes.mobileLogoutBtn}
                          onClick={handleLogout}
                        >
                          Logout
                        </span>
                      </div>
                      
                    </>
                  )}
                </div>
               
              </div>
            </div>
          )}
          {!showMobileNav && (
            <GiHamburgerMenu
              onClick={() => setShowMobileNav((prev) => !prev)}

              className={classes.hamburgerIcon}
            />
          )}
        </div>
      }

      {/* error */}
      {error && (
        <div className={classes.error}>
          <span>All fields must be filled!</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;