import axios from "axios";
import { User } from "./User.types";

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get("http://localhost:3002/api/users");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
