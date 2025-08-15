import { useState } from 'react';

export const usePagination = (initialPage = 1, initialItemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const paginate = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (totalItems) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToNextPage = (totalItems) => {
    const totalPages = getTotalPages(totalItems);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const getPageNumbers = (totalItems) => {
    const totalPages = getTotalPages(totalItems);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const getPaginationInfo = (totalItems) => {
    const totalPages = getTotalPages(totalItems);
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    return {
      currentPage,
      totalPages,
      itemsPerPage,
      totalItems,
      startIndex,
      endIndex,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  };

  return {
    currentPage,
    itemsPerPage,
    paginate,
    getTotalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    changeItemsPerPage,
    getPageNumbers,
    getPaginationInfo,
  };
};
