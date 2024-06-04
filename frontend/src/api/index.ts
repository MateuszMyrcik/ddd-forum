import { RegisterFormPayload } from "../components/registerForm";
import axios from "axios";

export const api = {
  posts: {
    getPosts: () => {
      return axios.get("<http://localhost:3000/posts?sort=recent>");
    },
  },
  register: (input: RegisterFormPayload) => {
    // return axios.post("<http://localhost:3000/users/new>", {
    //   ...input,
    // });
    // TODO: remove when BE ready
    return { data: input };
  },
};
