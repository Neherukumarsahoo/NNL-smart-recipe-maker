import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavBar";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Diet from "./pages/diet/Diet";
import RecipeDetails from "./pages/recipe/Newpages/RecipeDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MealInput from "./pages/diet/MealInput";
import CalendarView from "./pages/diet/CalenderView";
import DietProgressTracker from "./pages/diet/DietProgressTracker";
import MealDetails from "./pages/diet/MealDetails";
import MealType from "./pages/diet/MealType";
import MealCategory from "./pages/diet/MealCategory";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProfilePage from "./components/ProfilePage";
import ResetPassword from "./components/ResetPassword";
import 'animate.css';



const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/category/:mealType" element={<MealCategory />} />
        <Route path="/recipe-details/:id" element={<RecipeDetails />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/meal-type/:type" element={<MealType />} />
        <Route path="/diet-progress-tracker" element={<DietProgressTracker />} />
        <Route path="/meal-input" element={<MealInput />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
      
    </Router>
  );
};

export default App;
