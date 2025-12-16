import useFetch from "../hooks/useFetch";
import useRequest from "../hooks/useRequest";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/ingredients.module.css";

const IngredientListPage = () => {
  const { response, error, loading, resendRequest } = useFetch({
    url: "http://localhost:5000/api/v1/resource/INGREDIENT",
    method: "GET",
  });
  const { sendRequest } = useRequest({ method: "DELETE" });

  const navigate = useNavigate();

  const onDelete = (id) => {
    sendRequest(
      null,
      `http://localhost:5000/api/v1/resource/INGREDIENT/${id}`,
    ).then(() => resendRequest());
  };

  const onEdit = (id) => {
    navigate(`/ingredients/edit/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2 className={styles.title}>Ingredients</h2>
      <Link to="/ingredients/create">Add Ingredient</Link>

      {response?.map((ing) => (
        <div key={ing.id} className={styles.ingredientWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price (GEL)</th>
                <th>Description</th>
                <th>In Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{ing.data?.id || ing.id}</td>
                <td>{ing.data?.name || ing.data}</td>
                <td>{ing.data?.price || ing.price}</td>
                <td>{ing.data?.description || ing.description}</td>
                <td>{ing.data?.isInStock || ing.isInStock ? "Yes" : "No"}</td>
                <td>
                  <button
                    className={styles.editBtn}
                    onClick={() => onEdit(ing.id)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(ing.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default IngredientListPage;
