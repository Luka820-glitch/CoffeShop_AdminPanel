import { useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import IngredientForm from "../components/IngredientForm";
import styles from "../styles/Ingredients.module.css";

const CreateIngredientPage = () => {
  const navigate = useNavigate();
  const { sendRequest, loading } = useRequest({
    url: "http://localhost:5000/api/v1/resource/INGREDIENT",
    method: "POST",
  });

  const onSubmit = (name, price, description, isInStock) => {
    sendRequest({ data: [{ name, price, description, isInStock }] })
      .then(() => navigate("/ingredients"))
      .catch(console.error);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h2 className={styles.title}>Add Ingredient</h2>
      <IngredientForm onFormSubmit={onSubmit} />
    </>
  );
};

export default CreateIngredientPage;
