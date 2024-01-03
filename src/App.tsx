import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, lazy, Suspense } from "react";
import AdoptedPetContext from "./context/AdoptedPetContext";
import { Pet } from "./common/types/ApiResponses";

const Details = lazy(() => import("./components/Details"));
const SearchParams = lazy(() => import("./components/SearchParams"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState<Pet | null>(null);
  return (
    <div
      className="m-0 p-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
      }}
    >
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div
                  className="flex h-full items-center justify-center p-4"
                  style={{
                    background:
                      "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)",
                  }}
                >
                  <h2 className="animation-spin">🐶</h2>
                </div>
              }
            >
              <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");

if (!container) throw new Error("no container to render to");

const root = createRoot(container);
root.render(<App />);