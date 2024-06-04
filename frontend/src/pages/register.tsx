import { toast } from "react-toast";
import { Layout } from "../components/layout";

import { RegisterForm, RegisterFormPayload } from "../components/registerForm";
import { api } from "../api";
import { useUser } from "../contexts/user";
import { useSpinner } from "../contexts/spinner";
import { useNavigate } from "react-router-dom";

type ValidationResult = {
  success: boolean;
  errorMessage?: string;
};

// TODO: move to zod
const validateForm = (input: RegisterFormPayload): ValidationResult => {
  if (input.email.indexOf("@") === -1)
    return { success: false, errorMessage: "Email invalid" };
  if (input.username.length < 2)
    return { success: false, errorMessage: "Username invalid" };
  if (input.firstName.length < 2)
    return { success: false, errorMessage: "First name invalid" };
  if (input.lastName.length < 2)
    return { success: false, errorMessage: "Last name invalid" };
  if (input.password.length < 2)
    return { success: false, errorMessage: "Password invalid" };
  return { success: true };
};

export const RegisterPage = () => {
  const { setUser } = useUser();
  const spinner = useSpinner();
  const navigate = useNavigate();

  const handleSubmitRegisterForm = async (payload: RegisterFormPayload) => {
    const validation = validateForm(payload);
    if (!validation.success) {
      toast.error(validation.errorMessage ?? "");
      return;
    }

    spinner.activate();

    try {
      // const response = await api.register(payload);
      const response = await api.register(payload);

      setUser(response.data);

      spinner.deactivate();
      toast.success("Successful register! Redirect to home in 3 sec.");

      window.setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      spinner.deactivate();
      toast.error(`Something went wrong: Backend failed`);
    }
  };
  return (
    <Layout>
      <div className="max-w-[500px] mx-auto">
        <h3 className="font-bold">Create account</h3>
        <RegisterForm onSubmit={handleSubmitRegisterForm} />
      </div>
    </Layout>
  );
};
