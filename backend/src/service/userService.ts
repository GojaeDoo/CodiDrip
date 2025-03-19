// src/service/userService.ts
import { getUsersFromDB } from "../storage/userStorage";

export const getAllUsers = async () => {
  try {
    const user = await getUsersFromDB();
    return user;
  } catch (error) {
    console.error("Error in service layer:");
  }
};
