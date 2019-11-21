import logger from "./httpServices";
import config from "../config.json";

export async function getGenres() {
  const { data } = await logger.get(config.apiEndPoint + "/genres");
  return data;
}
