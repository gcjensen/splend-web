import React from "react";
import { User } from "../api/user";

const UserContext = React.createContext<User>({} as User);

export default UserContext;
