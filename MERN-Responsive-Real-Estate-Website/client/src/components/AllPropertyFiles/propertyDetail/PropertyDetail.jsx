import React from "react";
import classes from "./propertyDetail.module.css";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react"; // Imported `useState`
import { request } from "../../../util/fetchAPI";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";

import Comment from "../../comment/Comment";
import Map from "./Map";
import { motion, AnimatePresence } from 'framer-motion';


const PropertyDetail = () => {

  const { token, user } = useSelector((state) => state.auth);
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  // todo display message
  const [shortComment, setShortComment] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const [isVerify, setIsVerify] = useState(false);
  

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const property = await request(`/property/find/${id}`, "GET");
        setIsBookmarked(property?.bookmarkedUsers?.includes(user?._id));
        
        setPropertyDetail(property);
        
        setIsVerify(property.isVerified);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [id]);
 

 

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${id}`, "GET");

        setComments(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [id]);

  const handleCloseForm = () => {
    setShowForm(false);
  };

 

  const [allProperties, setAllProperties] = useState([]);
 
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const properties = await request('/property/getAll', 'GET');
        console.log(properties)
        setAllProperties(properties);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);

  const handleDelete = async () => {
    try {
      await request(`/property/${id}`, 'DELETE', { 'Authorization': `Bearer ${token}` })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleBookmark = async () => {
    try {
      await request(`/property/bookmark/${id}`, "PUT", {
        Authorization: `Bearer ${token}`,
      });
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    if (commentText?.length < 2) {
      setShortComment(true);
      setTimeout(() => {
        setShortComment(false);
      }, 2500);
      return;
    }

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const newComment = await request(`/comment`, "POST", options, {
        text: commentText,
        listing: id,
      });
      setComments((prev) => {
        return [newComment, ...prev];
      });

      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  return isVerify ? (
    <div className={classes.container}>
      <h3
        style={{
          marginBottom: "1rem",
          marginTop: "1.5rem",
          gap: "8rem",
        }}
        className={classes.firstTitles}
      >
        Property Details
      </h3>
      <div className={classes.holder}>
        <div className={classes.wrapper}>
          <div className={classes.ImageContainer}>
            <img
              src={`http://localhost:5000/images/${propertyDetail?.img}`}
              alt=""
          
            />
          </div>
          <div className={classes.leftRight}>
          <div className={classes.left}>
            
              <h3 className={classes.title}>
                <span> Title : </span>
                <span> {`${propertyDetail?.title.charAt(0).toUpperCase() }${propertyDetail?.title.slice(1)}`}</span>
              </h3>
          
                <div className={classes.boxes}>
                  
                  Type: <span>{`${propertyDetail?.type.charAt(0).toUpperCase()}${propertyDetail?.type.slice(1)}`}</span>
                </div>
                <div  className={classes.boxes}>
                  Province: <span>{`${propertyDetail?.district}`}</span>
                </div>
              
              <div  className={classes.boxes}>
               
              Price:<span> NPR  {`${propertyDetail?.price}`}</span>
                 
               
              </div>
             
                <div  className={classes.boxes}>
                BHK:  <span> {propertyDetail?.BHK} </span> 
                </div>
                <div  className={classes.boxes}>
                Square meters: <span>{propertyDetail?.sqmeters}.sq.meter</span>
                
                </div>
              
              <h4 className={classes.desc} style={{width:"70%"}}>
              Desc: <span style={{fontSize:"1rem",overflow:"hidden", whiteSpace: 'nowrap' ,color:"grey"}}>{`${propertyDetail?.desc.charAt(0).toUpperCase() + propertyDetail?.desc.slice(1)}`}</span>
              </h4>
             
            {user?._id === propertyDetail?.currentOwner?._id && (
              <div className={classes.controls}>
                <Link to={`/editProperty/${id}`} className={classes.bttnsOne}>Edit</Link>
                <button className={classes.bttns} onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
          <div className={classes.right}>
          <div className={classes.map} style={{fontSize:"1.2rem",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                Location :{propertyDetail?.location}
                <Map
                 address={propertyDetail?.location} district={`,${propertyDetail?.district},` } country={"Nepal"}
                
                 style={{borderRadius:"12px"}}/>
              </div>
          </div>

          
           </div>
          <div className={classes.bookContact}>
            {user?._id != null &&
              user?._id !== propertyDetail?.currentOwner?._id.toString() && (
               
                 <div className={classes.contactBookmarkControls}>
                  <button
                  onClick={() => setShowForm(true)}
                    className={classes.contactOwner}
                  >
                    Contact owner
                  </button>
                  <span onClick={handleBookmark}>
                    {isBookmarked ? (
                      <BsFillBookmarkFill size={36} color={"red"} />
                    ) : (
                      <BsBookmark size={36} color={"black"} />
                    )}
                  </span>
                </div>
                
              )}
            {user?._id == null && (
              <Link to={`/signin`}>
                <h4 className={classes.noFuncMessage}>
                  Sign in to get access to the functionality.
                </h4>
              </Link>
            )}
          </div>
        </div>
      </div>
      {showForm && (
        <div className={classes.contactForm} onClick={handleCloseForm}>
          <AnimatePresence>
        <motion.div 
         initial={{ height: 0, opacity: 0 }}
         animate={{ height: 'auto', opacity: 1 }}
         exit={{ height: 0, opacity: 0 }}
         transition={{ duration: 0.3 }}
         
        className={classes.contactFormWrapper}
        onClick={(e) => e.stopPropagation()}
        >
          <h2>Before proceeding further you have to pay the service charge of 1000rs 
            for making our service more better.
             </h2>
             <div className={classes.buttons}>
            <Link to={`/paymentPage/${id}`}> <button>Yes</button></Link>
          <button onClick={handleCloseForm} >No</button>
             </div>
          </motion.div>
          </AnimatePresence>
        </div>
        
      )}

      {shortComment && (
        <div>
          <div className={classes.error}>
            Comment must be at least 2 characters long!
          </div>
        </div>
      )}
      <div className={classes.commentSection}>
        {/* comment input */}
        {user?._id == null && (
          <h3 style={{ margin: "0.75rem", fontSize: "24px" }}>
            Sign in to be able to comment!
          </h3>
        )}
        {user?._id != null && (
          <div className={classes.commentInput}>
            <img
              src={`http://localhost:5000/images/${user?.profileImg}`}
              alt=""
            />
            <input
              value={commentText}
              type="text"
              placeholder="Type message..."
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleComment}>Post</button>
          </div>
        )}
        {/* displaying comments */}
        <div className={classes.comments}>
          {comments?.length > 0 ? (
            comments?.map((comment) => (
              <Comment
                setComments={setComments}
                key={comment._id}
                comment={comment}
              />
            ))
          ) : (
            <h2 className={classes.noCommentsMessage}>No comments yet.</h2>
          )}
        </div>
        
      </div>
    </div>
  ) : (
    <p className={classes.paragraphs}>Admin will verify .....</p>
  );
};

export default PropertyDetail;
