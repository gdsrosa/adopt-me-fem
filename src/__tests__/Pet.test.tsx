import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { StaticRouter } from "react-router-dom/server";
import Pet from "../components/Pet";
import { Animal } from "../common/types/SearchParams";

test("displays a default thumbnail", async () => {
  const props = {
    id: 1,
    name: "Bruce",
    animal: "dog" as Animal,
    breed: "german shapperd",
    images: [],
    location: "St. Louis, FL",
  };

  const pet = render(
    <StaticRouter location={""}>
      <Pet {...props} />
    </StaticRouter>
  );
  const petThumbnail = (await pet.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;

  expect(petThumbnail.src).toContain("none.jpg");

  pet.unmount();
});

test("display a non-default thumbnail", async () => {
  const props = {
    id: 1,
    name: "Bruce",
    animal: "cat" as Animal,
    breed: "german shapperd",
    images: ["1.jpg", "2.jpg", "3.jpg"],
    location: "St. Louis, FL",
  };
  const pet = render(
    <StaticRouter location={""}>
      <Pet {...props} />
    </StaticRouter>
  );

  const petThumbnail = (await pet.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;

  expect(petThumbnail.src).toContain("1.jpg");

  pet.unmount();
});
