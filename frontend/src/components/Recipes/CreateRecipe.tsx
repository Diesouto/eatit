import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Recipe } from "../../types/Recipe";
import { useAppContext } from "../../utils/AppContext";
import { ObjectId } from 'mongoose';

const CreateRecipe = () => {
  const { backendUrl, userId } = useAppContext();
  const navigate = useNavigate();

  const [newRecipe, setNewRecipe] = useState<Recipe>({
    name: '',
    image: '',
    description: '',
    ingredients: [],
    deliveryDate: '',
    unitsAvailable: 0,
    slots: 0,
    chefId: userId!,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const onIngredientsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ingredients = e.target.value.split(","); // Assuming ingredients are comma-separated
    setNewRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: ingredients
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
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Ingredients (comma separated)"
                  name="ingredients"
                  className="form-control"
                  value={newRecipe.ingredients.join(", ")}
                  onChange={onIngredientsChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="date"
                  name="deliveryDate"
                  className="form-control"
                  value={newRecipe.deliveryDate}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
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
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Slots"
                  name="slots"
                  className="form-control"
                  value={newRecipe.slots}
                  onChange={onChange}
                />
              </div>
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
