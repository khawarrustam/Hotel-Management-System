import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const validateEmail = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would make your actual API call
      console.log('Password reset email sent to:', email);
      
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail('');
    setError('');
  };

  if (isSubmitted) {
    return (
      <div className="auth-container">
        <div className="auth-layout">
          {/* Left Side - Image */}
          <div className="auth-image-section">
            <div className="auth-image forgot-password-image">
              <div className="auth-overlay">
                <div className="auth-content">
                  <h2>Check Your Email</h2>
                  <p>We've sent you a secure link to reset your password</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Success Message */}
          <div className="auth-form-section">
            <div className="auth-form-container">
              <div className="auth-success">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <h1>Email Sent!</h1>
                <p className="success-message">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="success-instructions">
                  Please check your email and click the link to reset your password. 
                  If you don't see the email, check your spam folder.
                </p>
                
                <div className="success-actions">
                  <button
                    onClick={handleBackToLogin}
                    className="auth-button secondary"
                  >
                    Send Another Email
                  </button>
                  <Link to="/auth/login" className="auth-button primary">
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-layout">
        {/* Left Side - Image */}
        <div className="auth-image-section">
          <div className="auth-image forgot-password-image">
            <div className="auth-overlay">
              <div className="auth-content">
                <h2>Reset Password</h2>
                <p>Enter your email to receive a password reset link</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="auth-form-section">
          <div className="auth-form-container">
            <div className="auth-header">
              <h1>Forgot Password?</h1>
              <p>No worries! Enter your email and we'll send you a reset link</p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  className={error ? 'error' : ''}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  autoFocus
                />
                {error && (
                  <span className="field-error">{error}</span>
                )}
              </div>

              <button
                type="submit"
                className="auth-button primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        strokeDasharray="32"
                        strokeDashoffset="32"
                      >
                        <animate
                          attributeName="stroke-dasharray"
                          dur="2s"
                          values="0 32;16 16;0 32;0 32"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="stroke-dashoffset"
                          dur="2s"
                          values="0;-16;-32;-32"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                    Sending Reset Link...
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              <div className="auth-footer">
                <p>
                  Remember your password?{' '}
                  <Link to="/auth/login" className="auth-link">
                    Back to Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
