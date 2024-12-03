import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../../types/Recipe";
import { useAppContext } from "../../utils/AppContext";

type RecipeFormProps = {
  mode: "create" | "edit";
};

const RecipeForm: React.FC<RecipeFormProps> = ({ mode }) => {
  const { backendUrl, userId } = useAppContext();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Only relevant for edit mode

  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    image: "",
    description: "",
    ingredients: [],
    deliveryDate: "",
    unitsAvailable: 0,
    slots: 0,
    chefId: "",
  });

  // Fetch existing recipe data if in edit mode
  useEffect(() => {
    if (mode === "edit" && id) {
      axios
        .get(`${backendUrl}/api/recipes/${id}`)
        .then((res) => {
          setRecipe(res.data);
        })
        .catch((err) => {
          console.error("Error fetching recipe for edit:", err);
        });
    }
  }, [mode, id, backendUrl]);

  // Set chefId for create mode
  useEffect(() => {
    if (mode === "create" && userId) {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        chefId: userId,
      }));
    }
  }, [mode, userId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const addIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ""],
    }));
  };

  const removeIngredient = (index: number) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((_, i) => i !== index),
    }));
  };

  const onIngredientChange = (index: number, value: string) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.map((ingredient, i) =>
        i === index ? value : ingredient
      ),
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "create") {
        await axios.post(`${backendUrl}/api/recipes`, recipe);
      } else if (mode === "edit" && id) {
        await axios.put(`${backendUrl}/api/recipes/${id}`, recipe);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting recipe:", error);
    }
  };

  return (
    <div className="RecipeForm">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Back to Dashboard
            </Link>
          </div>
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">
              {mode === "create" ? "Add Recipe" : "Edit Recipe"}
            </h1>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Recipe Name"
                  name="name"
                  className="form-control"
                  value={recipe.name}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Image URL"
                  name="image"
                  className="form-control"
                  value={recipe.image}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <textarea
                  placeholder="Description"
                  name="description"
                  className="form-control"
                  value={recipe.description}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <label>Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  className="form-control"
                  value={recipe.deliveryDate}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <label>Units Available</label>
                <input
                  type="number"
                  placeholder="Units Available"
                  name="unitsAvailable"
                  className="form-control"
                  value={recipe.unitsAvailable}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <label>Slots</label>
                <input
                  type="number"
                  placeholder="Slots"
                  name="slots"
                  className="form-control"
                  value={recipe.slots}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <label>Ingredients</label>
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="d-flex mb-2">
                    <input
                      type="text"
                      placeholder={`Ingredient ${index + 1}`}
                      className="form-control"
                      value={ingredient}
                      onChange={(e) => onIngredientChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-danger ms-2"
                      onClick={() => removeIngredient(index)}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-success"
                  onClick={addIngredient}
                >
                  + Add Ingredient
                </button>
              </div>
              <br />
              <button type="submit" className="btn btn-outline-warning btn-block mt-4 mb-4 w-100">
                {mode === "create" ? "Submit" : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeForm;
