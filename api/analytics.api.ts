import axios from "axios";
import { ANALYTICS_URL } from "../constants/Api";
import { Analytics } from "../constants/Interfaces";

export const fetchAnalytics = async (): Promise<Analytics> => {
  try {
    const { data: result } = await axios.get<Analytics>(ANALYTICS_URL);
    return result;
  } catch (error) {
    throw `${error}`;
  }
};
