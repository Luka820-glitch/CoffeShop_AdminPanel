import { useRef, useState, useEffect } from "react";
import styles from "../styles/CoffeeForm.module.css";

const CoffeeForm = ({
  onFormSubmit,
  title = "",
  description = "",
  selectedIngredients = [],
  availableIngredients = [],
}) => {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const ingredientsRef = useRef();

  const [totalPrice, setTotalPrice] = useState(2);

  const calculatePrice = () => {
    const selectedIds = Array.from(ingredientsRef.current.selectedOptions).map(
      (opt) => opt.value,
    );

    let sum = 2;
    selectedIds.forEach((id) => {
      const ingredient = availableIngredients.find((ing) => ing.id === id);
      if (ingredient?.data?.isInStock) {
        sum += Number(ingredient.data.price || 0);
      }
    });

    setTotalPrice(sum);
  };

  useEffect(() => {
    calculatePrice();
  }, [availableIngredients, selectedIngredients]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selected = Array.from(ingredientsRef.current.selectedOptions)
      .map((opt) => opt.value)
      .filter((id) => {
        const ing = availableIngredients.find((i) => i.id === id);
        return ing?.data?.isInStock;
      });

    onFormSubmit(
      titleRef.current.value,
      descriptionRef.current.value,
      selected,
      totalPrice,
    );
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Ingredients</th>
            <th>Price (Auto)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                ref={titleRef}
                required
                defaultValue={title}
                placeholder="Coffee Name"
              />
            </td>
            <td>
              <input
                ref={descriptionRef}
                required
                defaultValue={description}
                placeholder="Description"
              />
            </td>
            <td>
              <select
                multiple
                ref={ingredientsRef}
                required
                defaultValue={selectedIngredients}
                className={styles.select}
                onChange={calculatePrice}
              >
                {availableIngredients?.map((ing) => (
                  <option
                    key={ing.id}
                    value={ing.id}
                    style={{ color: ing.data?.isInStock ? "black" : "red" }}
                  >
                    {ing.data?.name || ing.data}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                value={`${totalPrice.toFixed(2)} GEL`}
                readOnly
              />
            </td>
            <td>
              <button type="submit" className={styles.submitButton}>
                Save
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};

export default CoffeeForm;
