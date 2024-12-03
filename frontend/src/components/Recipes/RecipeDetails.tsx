import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../utils/AppContext";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ShowRecipeDetails() {
  const [recipe, setRecipe] = useState<any>({});
  const { backendUrl } = useAppContext();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/recipes/${id}`)
      .then((res) => {
        setRecipe(res.data);
        console.log(res)
      })
      .catch((err) => {
        console.error('Error from ShowRecipeDetails', err);
      });
  }, [id]);

  const onDeleteClick = (id: string) => {
    axios
      .delete(`${backendUrl}/api/recipes/${id}`)
      .then((res) => {
        navigate('/'); // Navigate back to the recipe list or main page
      })
      .catch((err) => {
        console.error('Error from ShowRecipeDetails_deleteClick', err);
      });
  };

  const RecipeItem = (
    <div>
      <table className='table table-hover table-dark'>
        <tbody>
          <tr>
            <th scope='row'>1</th>
            <td>Name</td>
            <td>{recipe.name}</td>
          </tr>
          <tr>
            <th scope='row'>2</th>
            <td>Chef</td>
            <td>{recipe.chefId}</td>
          </tr>
          <tr>
            <th scope='row'>3</th>
            <td>Image</td>
            <td>
              {recipe.image && <img src={recipe.image} alt={recipe.name} width="100" />}
            </td>
          </tr>
          <tr>
            <th scope='row'>4</th>
            <td>Description</td>
            <td>{recipe.description}</td>
          </tr>
          <tr>
            <th scope='row'>5</th>
            <td>Ingredients</td>
            <td>{recipe.ingredients?.join(', ')}</td>
          </tr>
          <tr>
            <th scope='row'>6</th>
            <td>Delivery Date</td>
            <td>{recipe.deliveryDate}</td>
          </tr>
          <tr>
            <th scope='row'>7</th>
            <td>Units Available</td>
            <td>{recipe.unitsAvailable}</td>
          </tr>
          <tr>
            <th scope='row'>8</th>
            <td>Slots</td>
            <td>{recipe.slots}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className='ShowRecipeDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Recipe List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Recipe's Record</h1>
            <p className='lead text-center'>View Recipe's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{RecipeItem}</div>
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(recipe._id);
              }}
            >
              Delete Recipe
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-recipe/${recipe._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Recipe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowRecipeDetails;
