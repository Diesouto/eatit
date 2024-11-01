import React, { useState, useEffect } from 'react';
import { useAppContext } from "../../utils/AppContext";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateRecipeInfo() {
  const [recipe, setRecipe] = useState({
    name: '',
    chefId: '',
    description: '',
    ingredients: [],
    deliveryDate: '',
    image: '',
    unitsAvailable: '',
    slots: '',
  });

  const { id } = useParams();
  const { backendUrl } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/recipes/${id}`)
      .then((res) => {
        setRecipe({
          name: res.data.name,
          chefId: res.data.chefId,
          description: res.data.description,
          ingredients: res.data.ingredients || [],
          deliveryDate: res.data.deliveryDate,
          image: res.data.image,
          unitsAvailable: res.data.unitsAvailable,
          slots: res.data.slots,
        });
      })
      .catch((err) => {
        console.log('Error from UpdateRecipeInfo', err);
      });
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ingredients') {
      setRecipe({ ...recipe, [name]: value.split(',').map(ingredient => ingredient.trim()) });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: recipe.name,
      chefId: recipe.chefId,
      description: recipe.description,
      ingredients: recipe.ingredients,
      deliveryDate: recipe.deliveryDate,
      image: recipe.image,
      unitsAvailable: recipe.unitsAvailable,
      slots: recipe.slots,
    };

    axios
      .put(`${backendUrl}/api/recipes/${id}`, data)
      .then((res) => {
        navigate(`/show-recipe/${id}`);
      })
      .catch((err) => {
        console.log('Error in UpdateRecipeInfo!', err);
      });
  };

  return (
    <div className='UpdateRecipeInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Recipe List
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Recipe</h1>
            <p className='lead text-center'>Update Recipe's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                placeholder='Name of the Recipe'
                name='name'
                className='form-control'
                value={recipe.name}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='chefId'>Chef ID</label>
              <input
                type='text'
                placeholder='Chef ID'
                name='chefId'
                className='form-control'
                value={recipe.chefId}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='image'>Image URL</label>
              <input
                type='text'
                placeholder='Image URL'
                name='image'
                className='form-control'
                value={recipe.image}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                placeholder='Description of the Recipe'
                name='description'
                className='form-control'
                value={recipe.description}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='ingredients'>Ingredients (comma-separated)</label>
              <input
                type='text'
                placeholder='Ingredients'
                name='ingredients'
                className='form-control'
                value={recipe.ingredients.join(', ')}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='deliveryDate'>Delivery Date</label>
              <input
                type='text'
                placeholder='Delivery Date'
                name='deliveryDate'
                className='form-control'
                value={recipe.deliveryDate}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='unitsAvailable'>Units Available</label>
              <input
                type='text'
                placeholder='Units Available'
                name='unitsAvailable'
                className='form-control'
                value={recipe.unitsAvailable}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='slots'>Slots</label>
              <input
                type='text'
                placeholder='Slots'
                name='slots'
                className='form-control'
                value={recipe.slots}
                onChange={onChange}
              />
            </div>
            <br />

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateRecipeInfo;
