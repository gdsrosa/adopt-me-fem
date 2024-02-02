import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BreedListAPIResponse,
  PetAPIResponse,
} from "../../common/types/ApiResponses";
import { Animal, SearchParams } from "../../common/types/SearchParams";

export const petApi = createApi({
  reducerPath: "petApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://pets-v2.dev-apis.com/" }),
  endpoints: (builder) => ({
    getPet: builder.query({
      query: (id: string) => ({ url: "pets", params: { id } }),
      transformResponse: (response: PetAPIResponse) => response.pets[0],
    }),
    getBreeds: builder.query({
      query: (animal: Animal) => ({ url: "breeds", params: { animal } }),
      transformResponse: (response: BreedListAPIResponse) => response.breeds,
    }),
    searchParams: builder.query({
      query: ({ animal, location, breed }: SearchParams) => ({
        url: "pets",
        params: { animal, location, breed },
      }),
      transformResponse: (response: PetAPIResponse) => response.pets,
    }),
  }),
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchParamsQuery } =
  petApi;
