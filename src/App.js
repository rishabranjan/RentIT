import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./utils/Movies";
import NavbarItem from "./utils/NavbarItem";
import Rentals from "./utils/Rentals";
import MovieForm from "./utils/MovieForm";
import Customers from "./utils/Customers";
import NotFound from "./utils/NotFound";
import LoginForm from "./common/LoginForm";
import Logout from "./common/logout";
import RegisterForm from "./common/RegisterForm";
import { getCurrentUser } from "./services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
    // console.log(user);
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <NavbarItem user={user} />
        <main className="container">
          <Switch>
            <Route
              path="/movies/:id"
              render={props => {
                if (!user) return <Redirect to="/login" />;
                return <MovieForm {...props} />;
              }}
            />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            />
            <Redirect from="/" exact to="/movies" />
            <Route path="/customers" component={Customers} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Redirect to="notfound" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
