import React from "react";
import KhaltiCheckout from "khalti-checkout-web";
import config from "./khaltiConfig";
import "./paymentpage.css";
import khalti from "../../assets/khalti.png";
import khaltiIcon from "../../assets/khalti.svg";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import {    useParams } from "react-router-dom";
import {  useState,useEffect } from "react"; 
import { request } from "../../util/fetchAPI";

const PaymentPage = ({data}) => {
  const { token, user } = useSelector((state) => state.auth);
  const [desc, setDesc] = useState("");
  const [phno, setPhoneno] = useState(""); 
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const [propertyDetail, setPropertyDetail] = useState(null);
  const formRef = useRef();
  let checkout = new KhaltiCheckout(config)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const property = await request(`/property/find/${id}`, "GET");
        
        setPropertyDetail(property);
        
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [id]);
 
  const handleContactOwner = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hmq6fk9",
        "template_mmcwgkv",
        formRef.current,
        "PPLnFojFfevjvYEuv"
      )
      .then(
        (result) => {
        
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2500);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="containers">
      <div className="lefting">
        <img src={khalti} alt="" />
      </div>

      <div className="right">
        <h2> Our Payment partner </h2>
        <h3>Fill your form and proceed </h3>
        <form className='form' onSubmit={handleContactOwner} ref={formRef}>
              <input
                value={user?.email}
                type="text"
                placeholder="E-mail"
                name="from_email"
              />
              <input
                value={user?.username}
                type="text"
                placeholder="Username"
                name="from_username"
              />
              <input
                type="tel"
                id="buyerPhone"
                name="buyerPhone"
                value={phno}
                onChange={(e) => setPhoneno(e.target.value)}
                placeholder="Enter buyer's phone number (e.g., 1234567890)"
              />

               <input
                value={propertyDetail?.currentOwner?.email}
                type="email"
                placeholder="Owner email"
                name="to_email"
              />
              <input
                value={desc}
                type="text"
                placeholder="Desc"
                name="message"
                onChange={(e) => setDesc(e.target.value)}
                />
             
            <button  type="submit" className='bttns'> Send Mail and Message</button>
        </form>

        <div className="images">
          
          <img src={khaltiIcon} alt="Khalti Icon" />

          <button  onClick={() => checkout.show({ amount: 10000 })}>
            Pay with Khalti
          </button>
        </div>
      </div>
      {success && (
          <div className='success'>
            You've successfully contacted the owner of the property!
          </div>
        )}
    </div>
  );
};

export default PaymentPage;
