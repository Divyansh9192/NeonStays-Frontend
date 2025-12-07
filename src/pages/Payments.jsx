import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";
import useAutoLogin from "../hooks/useAutoLogin";

const Payments = () => {
  const { bookingId } = useParams();

  // All hooks MUST be at the top
  const loadingAuth = useAutoLogin();
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [error, setError] = useState(null);

  console.log("PAYMENTS MOUNT", bookingId);

  useEffect(() => {
    // Don't run if bookingId missing
    if (!bookingId) {
      setError("No booking ID provided.");
      setLoadingPayment(false);
      return;
    }

    // Don't run payment until auto-login is COMPLETELY finished
    if (loadingAuth) return;

    const initiatePayment = async () => {
      try {
        console.log("Initiating payment for:", bookingId);

        const response = await api.post(
          `/bookings/${bookingId}/payments`,
          {},
          { withCredentials: true } // IMPORTANT
        );

        console.log("FULL PAYMENT RESPONSE:", response.data);

        const url = response?.data?.data?.sessionUrl;

        if (!url) {
          console.error("Error: sessionUrl missing!", response);
          throw new Error("sessionUrl missing!");
        }

        // Redirect to Stripe
        window.location.href = url;

      } catch (err) {
        console.error("PAYMENT ERROR:", err.response || err);
        setError("Failed to initiate payment.");
      } finally {
        setLoadingPayment(false);
      }
    };

    initiatePayment();

  }, [bookingId, loadingAuth]); // run only when both ready

  // BLOCK rendering while authentication is being validated
  if (loadingAuth) {
    return (
      <div className="text-white text-center mt-32">
        Validating session…
      </div>
    );
  }

  if (loadingPayment) {
    return (
      <div className="text-white text-center mt-32">
        Redirecting to payment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 text-center mt-32">
        {error}
      </div>
    );
  }

  return null;
};

export default Payments;
