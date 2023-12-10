// apiService.js
import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
console.log('api',apiEndpoint)

export const sendOTP = async (phoneNumber) => {
  try {
    const response = await axios.post(`${apiEndpoint}/auth/login`, {
      phoneNumber,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

export const verifyOTP = async (phoneNumber, requestId, otp) => {
  try {
    const response = await axios.post(`${apiEndpoint}/auth/verify_otp`, {
      phoneNumber,
      requestId,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};
