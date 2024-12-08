import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './utils/AppContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Styles
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Component imports
import App from './pages/App';
import StarterPage from './pages/StarterPage';
import Signin from './pages/Signin';
import Login from './pages/Login';
import RecipeForm from './components/Recipes/RecipeForm';
import CookRecipeDetails from './pages/Cook/CookRecipeDetails';
import FoodieRecipeDetails from './pages/Foodie/FoodieRecipeDetails';

// Routes
const router = createBrowserRouter([
  { path: '/start', element: <StarterPage /> },
  { path: '/login', element: <Login /> },
  { path: '/signin', element: <Signin /> },
  { path: '/', element: <App /> },
  
  // Recipes
  { path: '/recipes/cook/:id', element: <CookRecipeDetails /> }, 
  { path: '/recipes/foodie/:id', element: <FoodieRecipeDetails /> }, 
  { path: '/create-recipe', element: <RecipeForm mode="create" /> }, 
  { path: '/edit-recipe/:id', element: <RecipeForm mode="edit" />}, 
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
