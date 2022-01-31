import "./App.css";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./components/Pages/HomePage/HomePage";
import WorkShopsPage from "./components/Pages/WorkShopsPage/WorkShopsPage";
import AboutUsPage from "./components/Pages/AboutUsPage/AboutUsPage";
import FeedBacksPage from "./components/Pages/FeedBacksPage/FeedBacksPage";
import ContactUsPage from "./components/Pages/ContactUsPage/ContactUsPage";
import RecipesPage from "./components/Pages/RecipesPage/RecipesPage";
import PageNotFound from "./utilities/PageNotFound/PageNotFound";
import Signup from "./components/Auth-login/Signup";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Auth-login/Login";

function App() {
  return (
    <AuthProvider>
      <div className="website-container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/food-workshops" exact component={WorkShopsPage} />
              <Route path="/about-us" exact component={AboutUsPage} />
              <Route path="/feedbacks" exact component={FeedBacksPage} />
              <Route path="/contact-us" exact component={ContactUsPage} />
              <Route path="/recipes" exact component={RecipesPage} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/login" exact component={Login} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
