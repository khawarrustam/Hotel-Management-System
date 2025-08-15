import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing auth token on app load
    const token = localStorage.getItem('authToken');
    if (token) {
      // In development mode, skip token validation to avoid network errors
      // TODO: Enable token validation when backend is available
      // validateToken(token);
      dispatch({ type: 'AUTH_FAILURE', payload: null });
    } else {
      dispatch({ type: 'AUTH_FAILURE', payload: null });
    }
  }, []);

  const _validateToken = async (_token) => {
    try {
      // API call to validate token and get user data
      // const response = await authAPI.validateToken(token);
      // dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
      
      // Placeholder for now
      dispatch({ type: 'AUTH_FAILURE', payload: null });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
    }
  };

  const login = async (_credentials) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // API call to login
      // const response = await authAPI.login(credentials);
      // localStorage.setItem('authToken', response.data.token);
      // dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
      
      // Placeholder implementation
      throw new Error('Login API not implemented');
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
    }
  };

  const register = async (_userData) => {
    dispatch({ type: 'AUTH_START' });
    try {
      // API call to register
      // const response = await authAPI.register(userData);
      // localStorage.setItem('authToken', response.data.token);
      // dispatch({ type: 'AUTH_SUCCESS', payload: response.data.user });
      
      // Placeholder implementation
      throw new Error('Register API not implemented');
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
