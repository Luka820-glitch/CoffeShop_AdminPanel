import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import CreateIngredientPage from "./pages/CreateIngredientPage";
import IngredientListPage from "./pages/IngredientListPage";
import EditIngredientPage from "./pages/EditIngredientPage";
import CoffeeListPage from "./pages/CoffeeListPage";
import CreateCoffeePage from "./pages/CreateCoffeePage";
import UpdateCoffeePage from "./pages/UpdateCoffeePage";

const App = () => {
  return (
    <BrowserRouter>
      <nav className="navigation">
        <Link to="/coffees">Coffees</Link>
        <Link to="/ingredients">Ingredients</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="/ingredients/create" element={<CreateIngredientPage />} />
        <Route path="/ingredients" element={<IngredientListPage />} />
        <Route
          path="/ingredients/edit/:ingredientId"
          element={<EditIngredientPage />}
        />
        <Route path="/coffees" element={<CoffeeListPage />} />
        <Route path="/coffees/create" element={<CreateCoffeePage />} />
        <Route
          path="/coffees/update/:coffeeId"
          element={<UpdateCoffeePage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

