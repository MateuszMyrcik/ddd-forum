import { Link } from "react-router-dom";
import { Button } from "./button";
import { useState } from "react";
import { User } from "../types";

export type RegisterFormPayload = User;

type Props = {
  onSubmit: (formPayload: RegisterFormPayload) => void;
};

export const RegisterForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-2 my-8">
        <input
          placeholder="email"
          className="py-2 px-4 rounded border-[3px] border-black border-solid text-sm"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="first name"
          className="py-2 px-4 rounded border-[3px] border-black border-solid text-sm"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="last name"
          className="py-2 px-4 rounded border-[3px] border-black border-solid text-sm"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="username"
          className="py-2 px-4 rounded border-[3px] border-black border-solid text-sm"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2">
        <div>
          <p>already have an account?</p>
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
        <div>
          <Button
            onClick={() => {
              const payload = {
                email,
                firstName,
                lastName,
                username,
              };

              onSubmit(payload);
            }}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};
