import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../app/store/hooks";
import { useGetPetQuery } from "../api/services/petApi";
import { adopt } from "../features/adoptedPet/adoptedPetSlice";
import Modal from "../components/Modal";
import ErrorBoundary from "../components/ErrorBoundary";
import Carousel from "../components/Carousel";

const Details = () => {
  const { id } = useParams();

  if (!id) throw new Error("Opss. It seems no ID were provided :/");

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isLoading, data: pet } = useGetPetQuery(id);
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (!pet) throw new Error("No pet returned.");

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
