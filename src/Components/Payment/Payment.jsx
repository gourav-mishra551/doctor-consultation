import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loadRazorpay } from './razorpay'; // Ensure this utility is correctly implemented
import { SiRazorpay } from "react-icons/si";


const Payment = ({ orderId, amount, currency, bookingId }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Load Razorpay script
      const res = await loadRazorpay();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Please check your internet connection.');
        setIsLoading(false);
        return;
      }

      // Configure Razorpay payment options
      const options = {
        key: 'rzp_live_tugtx0zIFZrtsB', // Use environment variable
        amount: amount, // Amount in paise as a string
        currency: currency,
        name: 'Ametheus Health',
        description: 'Transaction for Medicine Purchase',
        order_id: orderId,
        image: 'https://ametheushealth.com/ametheus.webp', // Use absolute URL
        handler: async (response) => {
          try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

            // Call the payment verification API
            const paymentResponse = await axios.post(
              'https://api.assetorix.com/ah/api/v1/dc/user/razorpay/payment-callback',
              {
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
                signature: razorpay_signature,
                booking_id: bookingId, // If needed for server-side verification
              }
            );

            if (paymentResponse.status === 200 && paymentResponse.data.success) {
              toast.success('Payment successful!');
              navigate('/profile?section=user-bookings'); // Redirect to the desired page
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment Verification Error:', error);
            toast.error('An error occurred during payment verification. Please try again.');
          }
        },
        notes: {
          booking_id: bookingId,
        },
        theme: {
          color: '#47A9B3', // Your branding color
        },
        modal: {
          ondismiss: () => {
            toast.info('Payment process was cancelled.');
            setIsLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', (response) => {
        console.error('Payment Failed:', response);
        toast.error('Payment failed. Please try again.');
        setIsLoading(false);
      });

      paymentObject.open();
    } catch (error) {
      console.error('Payment Initialization Error:', error);
      toast.error('Failed to initiate payment. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container bg-white  rounded-lg p-8 mx-auto max-w-lg">
      <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
        Complete Your Payment
      </h2>
      <button
        onClick={handlePayment}
        className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        disabled={isLoading}
      >
        <SiRazorpay size={24} />
        {isLoading ? 'Processing...' : 'Pay with Razorpay'}
      </button>
    </div>
  );
};

Payment.propTypes = {
  orderId: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  bookingId: PropTypes.string.isRequired,
  // Removed keyId as it's not used. If needed, add it back with PropTypes.string
};

export default Payment;
