import { Animal } from "../common/types/SearchParams";
import { useGetBreedsQuery } from "../api/services/petApi";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

export default function useBreedList(animal: Animal): [string[], QueryStatus] {
  const { data: breeds, status } = useGetBreedsQuery(animal, {
    skip: !animal,
  });

  if (!animal) return [[], status];

  return [breeds ?? [], status];
}
