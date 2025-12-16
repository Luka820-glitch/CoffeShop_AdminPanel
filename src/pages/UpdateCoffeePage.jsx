import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import useFetch from "../hooks/useFetch";
import CoffeeForm from "../components/CoffeeForm";
import styles from "../styles/Coffees.module.css";

const UpdateCoffeePage = () => {
  const { coffeeId } = useParams();
  const navigate = useNavigate();

  const {
    response: coffee,
    loading: coffeeLoading,
    error,
  } = useFetch({
    url: `http://localhost:5000/api/v1/resource/COFFEE/${coffeeId}`,
    method: "GET",
  });
  const { response: ingredients } = useFetch({
    url: "http://localhost:5000/api/v1/resource/INGREDIENT",
    method: "GET",
  });
  const { sendRequest, loading: updating } = useRequest({
    url: `http://localhost:5000/api/v1/resource/COFFEE/${coffeeId}`,
    method: "PUT",
  });

  const onSubmit = (title, description, ingredientIds, totalPrice) => {
    sendRequest({
      data: { title, description, ingredients: ingredientIds, totalPrice },
    })
      .then(() => navigate("/coffees"))
      .catch(console.error);
  };

  if ((coffeeLoading || updating) && !coffee) return <p>Loading...</p>;
  if (error || !coffee) return <p>Something went wrong</p>;

  return (
    <div>
      <h2 className={styles.title}>Edit Coffee</h2>
      <CoffeeForm
        onFormSubmit={onSubmit}
        title={coffee.data.title}
        description={coffee.data.description}
        selectedIngredients={coffee.data.ingredients}
        availableIngredients={ingredients || []}
      />
    </div>
  );
};

export default UpdateCoffeePage;
