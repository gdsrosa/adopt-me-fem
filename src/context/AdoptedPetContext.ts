import { createContext } from "react";
import { Pet } from "../common/types/ApiResponses";

const AdoptedPetContext = createContext<
  [Pet | null, (adoptedPet: Pet) => void]
>([
  {
    id: 1337,
    name: "Loro",
    animal: "bird",
    description: "Lorem ipsum",
    breed: "Coockatoo",
    images: [],
    city: "St. Louis",
    state: "FL",
  },
  () => {},
]);

export default AdoptedPetContext;
