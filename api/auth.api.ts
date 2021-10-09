import axios, { AxiosResponse } from "axios";
import { LOGIN_URL, REGISTER_URL } from "../constants/Api";
import { User, UserForCreate, UserForLogin } from "../constants/Interfaces";

export const createUser = async (user: UserForCreate): Promise<void> => {
  try {
    axios.post(REGISTER_URL, user);
  } catch (error) {
    throw `${error}`;
  }
};

export const loginUser = async (
  user: UserForLogin
): Promise<{
  token: string;
  userDetails: User;
}> => {
  try {
    const {
      data: result,
    }: AxiosResponse<{
      token: string;
      userDetails: User;
    }> = await axios.post(LOGIN_URL, user);
    return result;
  } catch (error) {
    throw `${error}`;
  }
};
