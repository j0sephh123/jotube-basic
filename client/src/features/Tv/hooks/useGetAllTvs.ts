import { useQuery, gql } from "@apollo/client";
import { Tv } from "../types";

const GET_ALL_TVS = gql`
  query GetAllTvs {
    getAllTvs {
      id
      identifier
      title
      duration
      createdAt
      updatedAt
    }
  }
`;

export const useGetAllTvs = () => {
  const { data, loading, error } = useQuery<{ getAllTvs: Tv[] }>(GET_ALL_TVS);

  return {
    data: data?.getAllTvs,
    loading,
    error,
  };
};
