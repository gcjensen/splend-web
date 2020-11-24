import { API_URL } from "../constants/api";

export interface User {
  colour: string;
  email: string;
  firstName: string;
  iconLink: string;
  id: number;
  lastName: string;
  partner: User;
  token?: string;
}

export interface Summary {
  balance: number;
}

export async function getSummary(
  userID: number,
  token: string
): Promise<Summary> {
  const response = await fetch(`${API_URL}/user/${userID}/summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
  });

  return await response.json();
}

export async function logIn(email: string, token: string): Promise<User> {
  const response = await fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Token: token,
    },
    body: JSON.stringify({ email }),
  });

  const user = await response.json();
  user.token = token;

  return user;
}
