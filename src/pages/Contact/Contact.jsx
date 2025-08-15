import { useState } from 'react';
import './Contact.scss';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (_error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: '📞',
      title: 'Phone',
      content: '+1 (555) 123-4567',
      subtitle: 'Call us 24/7 for reservations'
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'info@luxuryhotel.com',
      subtitle: 'We respond within 2 hours'
    },
    {
      icon: '📍',
      title: 'Address',
      content: '123 Luxury Avenue, Downtown',
      subtitle: 'City Center, State 12345'
    },
    {
      icon: '🕒',
      title: 'Hours',
      content: 'Open 24/7',
      subtitle: 'Front desk always available'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle">
            We're here to help you with any inquiries or bookings.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="contact-content">
        {/* Contact Form Section */}
        <section className="form-section">
          <div className="container">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us how we can help you..."
                  rows="6"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>

              {submitMessage && (
                <div className={`submit-message ${submitMessage.includes('error') ? 'error' : 'success'}`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Contact Info & Map Section */}
        <section className="info-map-section">
          <div className="container">
            <div className="info-map-grid">
              {/* Contact Information */}
              <div className="contact-info">
                <h2>Contact Information</h2>
                <p className="info-subtitle">
                  Reach out to us through any of these convenient channels.
                </p>

                <div className="info-cards">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="info-card">
                      <div className="info-icon">
                        <span>{info.icon}</span>
                      </div>
                      <div className="info-content">
                        <h3 className="info-title">{info.title}</h3>
                        <p className="info-main">{info.content}</p>
                        <p className="info-sub">{info.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="social-links">
                  <h3>Follow Us</h3>
                  <div className="social-icons">
                    <a href="#" className="social-icon" aria-label="Facebook">
                      <span>📘</span>
                    </a>
                    <a href="#" className="social-icon" aria-label="Instagram">
                      <span>📷</span>
                    </a>
                    <a href="#" className="social-icon" aria-label="Twitter">
                      <span>🐦</span>
                    </a>
                    <a href="#" className="social-icon" aria-label="LinkedIn">
                      <span>💼</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="map-container">
                <h2>Find Us</h2>
                <div className="map-wrapper">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0331633826!2d-74.30932166359024!3d40.69753995003035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1693920000000!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel Location"
                  ></iframe>
                </div>
                <div className="map-overlay-info">
                  <div className="map-info-card">
                    <h4>🏨 Luxury Hotel</h4>
                    <p>123 Luxury Avenue, Downtown</p>
                    <p>City Center, State 12345</p>
                    <a 
                      href="https://maps.google.com/?q=123+Luxury+Avenue+Downtown" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="directions-link"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="additional-info">
          <div className="container">
            <div className="info-grid">
              <div className="info-block">
                <div className="info-block-icon">🎯</div>
                <h3>Quick Response</h3>
                <p>We typically respond to all inquiries within 2 hours during business hours and within 24 hours on weekends.</p>
              </div>
              <div className="info-block">
                <div className="info-block-icon">🔒</div>
                <h3>Privacy Secure</h3>
                <p>Your personal information is protected with industry-standard encryption and will never be shared with third parties.</p>
              </div>
              <div className="info-block">
                <div className="info-block-icon">🎁</div>
                <h3>Special Offers</h3>
                <p>Subscribe to our newsletter through this form to receive exclusive deals and early access to special promotions.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
