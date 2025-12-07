import { useRef } from "react";
import styles from "../styles/IngredientForm.module.css";

const IngredientForm = ({
  onFormSubmit,
  name,
  price,
  description,
  isInStock,
}) => {
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const IsInStockRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(
      nameRef.current.value,
      priceRef.current.value,
      descriptionRef.current.value,
      IsInStockRef.current.value,
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit} className={styles.form}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price (GEL)</th>
              <th>Description</th>
              <th>In Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  ref={nameRef}
                  required
                  defaultValue={name}
                  placeholder="Name"
                />
              </td>
              <td>
                <input
                  type="number"
                  ref={priceRef}
                  required
                  defaultValue={price}
                  placeholder="Price"
                />
              </td>
              <td>
                <input
                  type="text"
                  ref={descriptionRef}
                  required
                  defaultValue={description}
                  placeholder="Description"
                />
              </td>
              <td>
                <select
                  ref={IsInStockRef}
                  defaultValue={isInStock ? "true" : "false"}
                  required
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
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
    </div>
  );
};

export default IngredientForm;
