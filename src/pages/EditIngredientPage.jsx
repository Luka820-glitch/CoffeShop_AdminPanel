import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useRequest from "../hooks/useRequest";
import IngredientForm from "../components/IngredientForm";
import styles from "../styles/Ingredients.module.css";

const EditIngredientPage = () => {
  const { ingredientId } = useParams();
  const navigate = useNavigate();

  const { response, loading, error } = useFetch({
    url: `http://localhost:5000/api/v1/resource/INGREDIENT/${ingredientId}`,
    method: "GET",
  });

  const { sendRequest } = useRequest({ method: "PUT" });

  const onFormSubmit = (name, price, description, isInStock) => {
    const stockValue = isInStock === "true";

    sendRequest(
      {
        data: {
          id: ingredientId,
          name,
          price: Number(price),
          description,
          isInStock: stockValue,
        },
      },
      `http://localhost:5000/api/v1/resource/INGREDIENT/${ingredientId}`,
    ).then(() => navigate("/ingredients"));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2 className={styles.title}>Edit Ingredient</h2>
      <IngredientForm
        onFormSubmit={onFormSubmit}
        name={response?.data?.name}
        price={response?.data?.price}
        description={response?.data?.description}
        isInStock={response?.data?.isInStock}
      />
    </div>
  );
};

export default EditIngredientPage;
