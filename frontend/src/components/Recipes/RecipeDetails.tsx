import React from 'react';

const RecipeDetails = ({ recipe }) => (
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
            {recipe.image && <img src={recipe.image} alt={recipe.name} width='100' />}
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

export default RecipeDetails;
