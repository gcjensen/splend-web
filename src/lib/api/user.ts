import { API_URL } from "../constants/api";

export interface User {
  colour: string;
  email: string;
  firstName: string;
  iconLink: string;
  id: number;
  lastName: string;
  partner: User;
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

  return await response.json();
}
