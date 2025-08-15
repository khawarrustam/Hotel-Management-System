import React, { createContext, useContext, useReducer } from 'react';

const UIContext = createContext();

const initialState = {
  // Theme
  theme: 'light',
  
  // Loading states
  isLoading: false,
  loadingMessage: '',
  
  // Modals
  activeModal: null,
  modalProps: {},
  
  // Toast notifications
  toasts: [],
  
  // Mobile/responsive
  isMobileMenuOpen: false,
  isSidebarOpen: true,
  
  // Search
  searchTerm: '',
  searchResults: [],
  
  // Filters
  activeFilters: {},
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 10,
};

const uiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload.isLoading,
        loadingMessage: action.payload.message || '',
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        activeModal: action.payload.type,
        modalProps: action.payload.props || {},
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        activeModal: null,
        modalProps: {},
      };
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, { ...action.payload, id: Date.now() }],
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload),
      };
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
    case 'CLOSE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: false };
    case 'TOGGLE_SIDEBAR':
      return { ...state, isSidebarOpen: !state.isSidebarOpen };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload };
    case 'SET_FILTERS':
      return { ...state, activeFilters: action.payload };
    case 'SET_PAGINATION':
      return {
        ...state,
        currentPage: action.payload.page || state.currentPage,
        itemsPerPage: action.payload.itemsPerPage || state.itemsPerPage,
      };
    default:
      return state;
  }
};

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
    localStorage.setItem('theme', theme);
  };

  const setLoading = (isLoading, message = '') => {
    dispatch({ type: 'SET_LOADING', payload: { isLoading, message } });
  };

  const openModal = (type, props = {}) => {
    dispatch({ type: 'OPEN_MODAL', payload: { type, props } });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const addToast = (type, message, options = {}) => {
    const toast = {
      type, // 'success', 'error', 'warning', 'info'
      message,
      duration: options.duration || 5000,
      action: options.action,
    };
    dispatch({ type: 'ADD_TOAST', payload: toast });
  };

  const removeToast = (id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id });
  };

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' });
  };

  const closeMobileMenu = () => {
    dispatch({ type: 'CLOSE_MOBILE_MENU' });
  };

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const setSearchResults = (results) => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: results });
  };

  const setFilters = (filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setPagination = (page, itemsPerPage) => {
    dispatch({ type: 'SET_PAGINATION', payload: { page, itemsPerPage } });
  };

  const value = {
    ...state,
    setTheme,
    setLoading,
    openModal,
    closeModal,
    addToast,
    removeToast,
    toggleMobileMenu,
    closeMobileMenu,
    toggleSidebar,
    setSearchTerm,
    setSearchResults,
    setFilters,
    setPagination,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};
