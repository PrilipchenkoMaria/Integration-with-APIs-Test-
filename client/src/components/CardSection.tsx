import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
import "../CardSectionStyle.scss";

function CardSection() {
  return (<label>
    <p className="modal-title">Card details</p>
    <CardElement/>
  </label>);
};

export default CardSection;
