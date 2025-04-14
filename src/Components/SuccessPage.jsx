import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Lottie from 'react-lottie-player';
import successAnimation from '../assets/payment-success.json'; // Lottie JSON

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div style={styles.container}>
      <Lottie
        loop={false}
        animationData={successAnimation}
        play
        style={styles.animation}
      />
      <h1 style={styles.title}>Payment Successful!</h1>
      <p style={styles.message}>
        Thank you for your purchase. 
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  animation: {
    width: 200,
    height: 200,
    margin: '0 auto 20px',
  },
  title: {
    fontSize: '2rem',
    color: '#007bff',
  },
  message: {
    fontSize: '1rem',
    color: '#333',
  },
};

export default SuccessPage;
