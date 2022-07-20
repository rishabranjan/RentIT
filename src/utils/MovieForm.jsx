import React from "react";
import Form from "../common/Form";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/movieServices";
import { getGenres } from "../services/genreServices";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      numberInStock: "",
      genreId: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(5).label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().label("Stock").integer().min(0),
    dailyRentalRate: Joi.number().label("Rate").required().min(0).max(10),
  };

  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    try {
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.viewToModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
    // console.log(movie);
    // console.log(this.props.match.params.id);
  }

  viewToModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  doSubmit = async () => {
    // call the server
    await saveMovie(this.state.data);
    this.props.history.replace("/movies");
    console.log("SAVE");
  };

  render() {
    return (
      <form className="m-4" onSubmit={this.handleSubmit}>
        <h1>MOVIE FORM </h1>
        {this.renderInput("title", "Title")}
        {this.renderInput("numberInStock", "Stock")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("dailyRentalRate", "Rate")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default MovieForm;
