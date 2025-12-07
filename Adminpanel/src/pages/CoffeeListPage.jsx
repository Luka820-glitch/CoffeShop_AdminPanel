import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useRequest from "../hooks/useRequest";
import styles from "../styles/coffees.module.css";

const CoffeeListPage = () => {
  const {
    response: coffees,
    error,
    loading,
    resendRequest,
    totalPrice,
  } = useFetch({
    url: "http://localhost:5000/api/v1/resource/COFFEE",
    method: "GET",
  });

  const { response: ingredients } = useFetch({
    url: "http://localhost:5000/api/v1/resource/INGREDIENT",
    method: "GET",
  });

  const { sendRequest } = useRequest({ method: "DELETE" });
  const navigate = useNavigate();

  const onDelete = (id) => {
    sendRequest(
      null,
      `http://localhost:5000/api/v1/resource/COFFEE/${id}`,
    ).then(() => resendRequest());
  };

  const onEdit = (id) => {
    navigate(`/coffees/update/${id}`);
  };

  const getIngredientNames = (ids) => {
    if (!ids || !ingredients) return "No ingredients";
    return ids
      .map((id) => {
        const ing = ingredients.find((i) => i.id === id);
        return ing ? ing.data?.name || ing.data : "Unknown";
      })
      .join(", ");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <h2 className={styles.title}>Coffees</h2>
      <Link to="/coffees/create">Add Coffee</Link>

      {coffees?.map((coffee) => (
        <div key={coffee.id}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Ingredients</th>
                <th>Coffee Price (GEL)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{coffee.data?.id || coffee.id}</td>
                <td>{coffee.data?.title || coffee.title}</td>
                <td>{coffee.data?.description || coffee.description}</td>
                <td>{getIngredientNames(coffee.data?.ingredients)}</td>
                <td>{coffee.data?.totalPrice}</td>
                <td>
                  <button onClick={() => onEdit(coffee.id)}>Edit</button>
                  <button onClick={() => onDelete(coffee.id)}>Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CoffeeListPage;
