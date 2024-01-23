import React from 'react'
import { useQuery } from 'react-query'
import { getProperty } from '../utils/api'

function useGetProperty(id) {
 
const {data , isLoading , isError} = useQuery(
    {
        queryKey:['SingleProperty'],
        queryFn: (id)=>getProperty(id)
    }
)

  return (
{data , isLoading , isError}
    )
}

export default useGetProperty