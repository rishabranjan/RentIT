import React, { Component } from "react";
import { getMovies, deleteMovies } from "../services/movieServices";
import { getGenres } from "../services/genreServices";
import MoviesTable from "./MoviesTable";
import Pagination from "../common/Pagination";
import { paginate } from "./paginate";
import ListGroup from "../common/ListGroup";
import _ from "lodash";
import Input from "../common/Input";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    sortColumn: { path: "title", order: "asc" },
    pageSize: 4,
    currentPage: 1,
    currentGenre: "",
    search: ""
  };

  async componentDidMount() {
    const genres = await getGenres();
    const genre = [{ name: "All Genre", _id: "" }, ...genres];
    const movies = await getMovies();
    this.setState({
      movies,
      genre
    });
    // console.log(movies);
  }

  handleLike = movie => {
    // console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = async id => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(movie => {
      return movie._id !== id;
    });
    this.setState({ movies });
    try {
      await deleteMovies(id);
    } catch (ex) {
      // console.log(ex);
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
    // console.log(movies);
  };

  handlePageClick = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ currentGenre: genre, search: "", currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = ({ currentTarget: input }) => {
    let search = { ...this.state.search };
    search = input.value;
    this.setState({ search, currentGenre: "", currentPage: 1 });
  };

  render() {
    // console.log(this.state.search);
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genre,
      movies: allMovies,
      sortColumn
    } = this.state;
    if (count === 0) return <h3>There are no movies in the database</h3>;

    let filtered = allMovies;

    if (this.state.currentGenre && this.state.currentGenre._id)
      filtered = allMovies.filter(
        movie => movie.genre.name === this.state.currentGenre.name
      );
    else if (this.state.search)
      filtered = allMovies.filter(movie =>
        movie.title.toLowerCase().startsWith(this.state.search.toLowerCase())
      );
    // console.log(searched);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-2 mt-4">
          <ListGroup
            items={genre}
            onItemSelect={this.handleGenreSelect}
            selectedItem={this.state.currentGenre}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <Link to="movies/new">
              <button className="btn btn-primary mt-4">New Movie</button>
            </Link>
          )}
          <p className="mt-2 h5">
            Showing {filtered.length} movies in database
          </p>
          <Input
            autofocus={true}
            name={"Movie Name"}
            onChange={this.handleSearch}
            value={this.state.search}
          />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />

          <Pagination
            pageSize={pageSize}
            onPageClick={this.handlePageClick}
            itemsCount={filtered.length}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
