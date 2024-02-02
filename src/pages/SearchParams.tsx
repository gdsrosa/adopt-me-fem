import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/store/hooks";
import Results from "../components/Results";
import useBreedList from "../hooks/useBreedList";
import { Pet } from "../common/types/ApiResponses";
import { setAllParams } from "../features/searchParams/searchParamsSlice";
import { Animal } from "../common/types/SearchParams";
import { useSearchParamsQuery } from "../api/services/petApi";

const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const searchParams = useAppSelector((state) => state.searchParams.data);
  const adoptedPet: Pet | null = useAppSelector(
    (state) => state.adoptedPet.data
  );
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const dispatch = useAppDispatch();

  let { data: pets } = useSearchParamsQuery(searchParams);
  pets = pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const data = {
            animal:
              (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          dispatch(setAllParams(data));
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="Location" />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select disabled={!breeds.length} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
