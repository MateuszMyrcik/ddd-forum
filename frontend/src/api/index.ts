import { RegisterFormPayload } from "../components/registerForm";
import axios from "axios";

export const api = {
  posts: {
    getPosts: () => {
      return axios.get("http://localhost:3000/posts?sort=recent");
    },
  },
  register: async (input: RegisterFormPayload) => {
    await axios.post("http://localhost:3000/users/new", {
      ...input,
    });

    return { data: input };
  },
};
