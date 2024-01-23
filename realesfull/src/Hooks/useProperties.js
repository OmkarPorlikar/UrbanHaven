import React from 'react';
import { useQuery } from 'react-query';
import { getAllProperties } from '../utils/api';

const useProperties = (page) => {
  // console.log(page, " page from useProperty");

  const { isLoading, error, data , refetch} = useQuery(
    ['getAllProperties', page], // Include page in the queryKey
    () => getAllProperties(page),
  );

  return {
    data,
    isLoading,
    error,
    refetch
  };
};

export default useProperties;
