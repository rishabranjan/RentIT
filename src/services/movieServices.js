import logger from "./httpServices";
import config from "../config.json";

export async function getMovies() {
  const { data } = await logger.get(config.apiEndPoint + "/movies");
  return data;
}

export function deleteMovies(id) {
  console.log(id);
  return logger.delete(config.apiEndPoint + "/movies/" + id);
}

export function getMovie(id) {
  return logger.get(config.apiEndPoint + "/movies/" + id);
}

export function saveMovie(movie) {
  if (movie._id) {
    var serverMovie = { ...movie };
    delete serverMovie["_id"];
    return logger.put(config.apiEndPoint + "/movies/" + movie._id, serverMovie);
  }

  return logger.post(config.apiEndPoint + "/movies/", movie);
}
