import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { subscribeUser } from "../../state/redux/actions/users/pay";
import { getUser } from "../../state/redux/actions/users/getUser";
import { updateUser } from "../../state/redux/actions/users/updateUserAction";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress from Material-UI

function PaymentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const user = useSelector((state) => state.login.user);
  const subscribedUser = useSelector((state) => state.user.user);
  // const subscribedUser = useSelector((state) => state.user.user);
  

  // Use useEffect to monitor changes in the user state
  useEffect(() => {
    // If the user object changes (after dispatching getUser), set localStorage user item
    if (subscribedUser) {
      localStorage.setItem("user", JSON.stringify(subscribedUser));
      dispatch(updateUser(subscribeUser));
    }
  }, [subscribedUser, dispatch]);

  const formatDateString = (date) => {
    // Format the date as "Month Day, Year"
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // useEffect(()=>{
  //   localStorage.clear()
  //   localStorage.setItem('user', subscribedUser)
  // }, [subscribedUser])

  const handlePaymentConfirmation = async () => {
    if (!stripe || !elements || loading) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      setLoading(true); // Set loading state to true

      // Create the Payment Method
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false); // Reset loading state
        return;
      }

      // Send the payment method ID to your server to create a Payment Intent
      const paymentMethodId = paymentMethod.id;

      const reqBody = {
        amount: "2000",
        currency: "usd",
        paymentMethodId: paymentMethodId,
      };

      // Make an API call to your server to create or retrieve a Payment Intent
      const response = await fetch("https://stripe-eight-flax.vercel.app/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        setError("Failed to create a Payment Intent on the server.");
        setLoading(false); // Reset loading state
        return; 
      }

      // Parse the server's response to get the Payment Intent client secret
      const data = await response.json();
      const clientSecret = data.clientSecret;

      // Calculate the start date, end date, and days left
      const currentDate = new Date();
      const subStartDate = formatDateString(currentDate); // Format the start date
      const subEndDate = new Date(currentDate);
      subEndDate.setMonth(subEndDate.getMonth() + 1); // Adding 1 month to current date
      const subEndDateFormatted = formatDateString(subEndDate); // Format the end date
      const daysLeft = 30;

      // Logic for Paid Subscriber
      const paidUser = {
        userId: user.userId,
        subStart: subStartDate,
        subEnd: subEndDateFormatted,
        daysLeft: daysLeft,
      };
      console.log(paidUser)
      dispatch(subscribeUser(paidUser)).then(()=>{
        dispatch(getUser(user.userId))
      .then(() => {
        
        dispatch(updateUser(subscribedUser));
      })
      .catch((error) => {
        // Handle any errors here, and also set isLoading back to false
        console.error("Error fetching expenses:", error);
        
      });
      }).catch((error) => {
        // Handle any errors here, and also set isLoading back to false
        console.error("Error fetching expenses:", error);
        
      });
      
      

      // Continue with payment confirmation logic
      // ...

      // Set payment succeeded state
      setPaymentSucceeded(true);
      setLoading(false); // Reset loading state

      // Redirect to the dashboard page
      navigate("/dashboard");
      // window.location.href="/dashboard"
    } catch (error) {
      setError("An error occurred while confirming the payment.");
      console.error(error);
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Your form elements */}
      <CardElement />
      <button type="button" onClick={handlePaymentConfirmation}>
        {loading ? (
          <CircularProgress size={24} /> // Show loading spinner
        ) : (
          "Pay"
        )}
      </button>
      {error && <div>{error}</div>}
      {paymentSucceeded && <div>Payment succeeded!</div>}
    </form>
  );
}

export default PaymentForm;
