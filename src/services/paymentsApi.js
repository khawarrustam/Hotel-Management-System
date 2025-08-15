import apiClient from './apiClient';

export const paymentsApi = {
  // Process payment
  processPayment: (paymentData) => {
    return apiClient.post('/payments/process', paymentData);
  },

  // Create payment intent (for Stripe)
  createPaymentIntent: (amount, currency = 'usd', metadata = {}) => {
    return apiClient.post('/payments/create-intent', {
      amount,
      currency,
      metadata
    });
  },

  // Confirm payment
  confirmPayment: (paymentIntentId, paymentMethodId) => {
    return apiClient.post('/payments/confirm', {
      paymentIntentId,
      paymentMethodId
    });
  },

  // Get payment methods for user
  getPaymentMethods: () => {
    return apiClient.get('/payments/methods');
  },

  // Add payment method
  addPaymentMethod: (paymentMethodData) => {
    return apiClient.post('/payments/methods', paymentMethodData);
  },

  // Remove payment method
  removePaymentMethod: (id) => {
    return apiClient.delete(`/payments/methods/${id}`);
  },

  // Get payment history
  getHistory: (params = {}) => {
    return apiClient.get('/payments/history', { params });
  },

  // Get payment by ID
  getById: (id) => {
    return apiClient.get(`/payments/${id}`);
  },

  // Process refund
  processRefund: (paymentId, amount, reason = '') => {
    return apiClient.post(`/payments/${paymentId}/refund`, {
      amount,
      reason
    });
  },

  // Get refund status
  getRefundStatus: (refundId) => {
    return apiClient.get(`/payments/refunds/${refundId}`);
  },

  // Admin endpoints

  // Get all payments
  getAllPayments: (params = {}) => {
    return apiClient.get('/payments/admin/all', { params });
  },

  // Get payment statistics
  getPaymentStats: (startDate, endDate) => {
    return apiClient.get('/payments/admin/stats', {
      params: { startDate, endDate }
    });
  },

  // Update payment status
  updatePaymentStatus: (id, status) => {
    return apiClient.patch(`/payments/admin/${id}/status`, { status });
  },

  // Export payment data
  exportPayments: (startDate, endDate, format = 'csv') => {
    return apiClient.get('/payments/admin/export', {
      params: { startDate, endDate, format },
      responseType: 'blob'
    });
  },

  // Webhooks
  handleWebhook: (event, signature) => {
    return apiClient.post('/payments/webhook', event, {
      headers: {
        'stripe-signature': signature
      }
    });
  },
};
