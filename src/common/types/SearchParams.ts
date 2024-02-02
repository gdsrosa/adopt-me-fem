export type Animal = "dog" | "cat" | "bird" | "reptile" | "rabbit";

export type SearchParams = {
  location: string;
  animal: Animal;
  breed: string;
};
