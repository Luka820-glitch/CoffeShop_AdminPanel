import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import useFetch from "../hooks/useFetch";
import CoffeeForm from "../components/CoffeeForm";
import styles from "../styles/Coffees.module.css";

const CreateCoffeePage = () => {
  const navigate = useNavigate();
  const { sendRequest, loading } = useRequest({
    url: "http://localhost:5000/api/v1/resource/COFFEE",
    method: "POST",
  });
  const { response: ingredients } = useFetch({
    url: "http://localhost:5000/api/v1/resource/INGREDIENT",
    method: "GET",
  });

  const onSubmit = (title, description, ingredientIds, totalPrice) => {
    sendRequest({
      data: [{ title, description, ingredients: ingredientIds, totalPrice }],
    })
      .then(() => navigate("/coffees"))
      .catch(console.error);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className={styles.title}>Add Coffee</h2>
      <CoffeeForm
        onFormSubmit={onSubmit}
        availableIngredients={ingredients || []}
      />
    </>
  );
};

export default CreateCoffeePage;
