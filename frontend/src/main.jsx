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
import Cart from './pages/Cart';
import Account from './pages/Account';
import Address from './pages/Address';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import RecipeForm from './components/Recipes/RecipeForm';
import CookDetails from './pages/Cook/CookDetails';
import CookRecipeDetails from './pages/Cook/CookRecipeDetails';
import FoodieRecipeDetails from './pages/Foodie/FoodieRecipeDetails';

// Routes
const router = createBrowserRouter([
  { path: '/start', element: <StarterPage /> },
  { path: '/login', element: <Login /> },
  { path: '/signin', element: <Signin /> },
  { path: '/', element: <App /> },

  // User
  { path: '/account', element: <Account /> },
  { path: '/addresses', element: <Address /> },
  { path: '/orders', element: <Orders /> },
  { path: '/order/:id', element: <OrderDetails /> },
  { path: '/cook/:id', element: <CookDetails /> },
  
  // Recipes
  { path: '/recipes/cook/:id', element: <CookRecipeDetails /> }, 
  { path: '/recipes/foodie/:id', element: <FoodieRecipeDetails /> }, 
  { path: '/create-recipe', element: <RecipeForm mode="create" /> }, 
  { path: '/edit-recipe/:id', element: <RecipeForm mode="edit" />}, 

  { path: '/cart', element: <Cart /> },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>
);
