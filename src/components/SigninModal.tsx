import React, { useState } from 'react';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.email && formData.password.length >= 6;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setErrorMessage('');

    try {
      // Send a request to the API (you can use Supabase or any backend here)
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Successfully signed in, you can handle success here
        onClose();
      } else {
        setErrorMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="popup_app sign_in_modal"
      style={{
        opacity: 1,
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={(e) => {
        // Close modal when clicking overlay
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="popup-notification-block"
        style={{
          maxWidth: '480px',
          width: '90%',
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          animation: 'fadeIn 0.3s ease'
        }}
      >
        <div className="horizontal_block layout_justify_stretch">
          <h3 style={{ margin: 0 }}>Sign In</h3>
        </div>

        <div className="vertical_block gap-8 left-align stretch" style={{ marginTop: '16px' }}>
          <div className="paragraph_s medium">Email</div>
          <input
            className="input_default"
            placeholder="Email address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #D9DBE9',
              fontSize: '16px',
              width: '100%',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>

        <div className="vertical_block gap-8 left-align stretch" style={{ marginTop: '16px' }}>
          <div className="paragraph_s medium">Password</div>
          <input
            className="input_default"
            placeholder="Enter password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #D9DBE9',
              fontSize: '16px',
              width: '100%',
              transition: 'border-color 0.2s ease'
            }}
          />
        </div>

        <div
          className={`primary_button l ${!isFormValid ? 'disabled' : ''}`}
          tabIndex={isFormValid ? 0 : -1}
          role="button"
          aria-disabled={!isFormValid}
          onClick={handleSubmit}
          style={{
            backgroundColor: isFormValid ? '#0070F3' : '#B3B3B3',
            color: 'white',
            padding: '14px',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: isFormValid ? 'pointer' : 'not-allowed',
            fontWeight: 500,
            marginTop: '24px',
            transition: 'background-color 0.2s ease',
            boxShadow: isFormValid ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <div>Sign In</div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div style={{ color: 'red', textAlign: 'center', marginTop: '16px' }}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
