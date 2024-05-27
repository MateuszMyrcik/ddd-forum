import { Link } from "react-router-dom";
import { Layout } from "../components/layout";
import { Button } from "../components/button";

export const RegisterPage = () => {
  return (
    <Layout>
      <div className="max-w-[500px] mx-auto">
        <h3 className="font-bold">Create account</h3>
        <div className="flex flex-col gap-2 my-8">
          <input
            placeholder="email"
            className="py-2 px-4 rounded border-[3px] border-black border-solid text-sm"
          />
          <input
            placeholder="username"
            className="py-2 px-4 rounded border-[3px] border-black border-solid text-sm"
          />
          <input
            placeholder="password"
            className="py-2 px-4 rounded border-[3px] border-black border-solid text-sm"
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
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
