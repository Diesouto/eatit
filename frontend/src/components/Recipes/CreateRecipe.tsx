import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../../types/Recipe";
import { useAppContext } from "../../utils/AppContext";

const CreateRecipe = () => {
  const { backendUrl, userId } = useAppContext();
  const navigate = useNavigate();

  console.log(userId)

  const [newRecipe, setNewRecipe] = useState<Recipe>({
    name: '',
    image: '',
    description: '',
    ingredients: [],
    deliveryDate: '',
    unitsAvailable: 0,
    slots: 0,
    chefId: '',
  });

  // Update chefId once userId is available
  useEffect(() => {
    if (userId) {
      setNewRecipe((prevRecipe) => ({
        ...prevRecipe,
        chefId: userId,
      }));
    }
  }, [userId]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const addIngredient = () => {
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, '']
    }));
  };

  const removeIngredient = (index: number) => {
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.filter((_, i) => i !== index)
    }));
  };

  const onIngredientChange = (index: number, value: string) => {
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: prevRecipe.ingredients.map((ingredient, i) =>
        i === index ? value : ingredient
      )
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/recipes`, newRecipe);
      navigate("/");
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="CreateRecipe">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Back to Dashboard
            </Link>
          </div>
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">Add Recipe</h1>
            <p className="lead text-center">Create a new recipe</p>
            <form onSubmit={onSubmit}>
              {/* Recipe Name */}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Recipe Name"
                  name="name"
                  className="form-control"
                  value={newRecipe.name}
                  onChange={onChange}
                />
              </div>
              <br />
              {/* Image URL */}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Image URL"
                  name="image"
                  className="form-control"
                  value={newRecipe.image}
                  onChange={onChange}
                />
              </div>
              <br />
              {/* Description */}
              <div className="form-group">
                <textarea
                  placeholder="Description"
                  name="description"
                  className="form-control"
                  value={newRecipe.description}
                  onChange={onChange}
                />
              </div>
              <br />
              {/* Delivery Date */}
              <div className="form-group">
                <label>Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  className="form-control"
                  value={newRecipe.deliveryDate}
                  onChange={onChange}
                />
              </div>
              <br />
              {/* Units Available */}
              <div className="form-group">
                <label>Units Available</label>
                <input
                  type="number"
                  placeholder="Units Available"
                  name="unitsAvailable"
                  className="form-control"
                  value={newRecipe.unitsAvailable}
                  onChange={onChange}
                />
              </div>
              <br />
              {/* Slots */}
              <div className="form-group">
                <label>Slots</label>
                <input
                  type="number"
                  placeholder="Slots"
                  name="slots"
                  className="form-control"
                  value={newRecipe.slots}
                  onChange={onChange}
                />
              </div>
              <br />
              {/* Ingredients */}
              <div className="form-group">
                <label>Ingredients</label>
                {newRecipe.ingredients.map((ingredient, index) => (
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
              <button
                type="submit"
                className="btn btn-outline-warning btn-block mt-4 mb-4 w-100"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipe;
