import { expect, test } from "vitest";
import { render, waitFor } from "@testing-library/react";

import Carousel from "../components/Carousel";

test("lets users click on thumbnails to make them the hero", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = (await carousel.findByTestId("hero")) as HTMLImageElement;
  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const thumb = await carousel.findByTestId(`thumbnail${i}`);

    await waitFor(() => thumb.click());

    expect(hero.src).toContain(image);
    expect(Array.from(thumb.classList)).toContain("active");
  }
  carousel.unmount();
});
