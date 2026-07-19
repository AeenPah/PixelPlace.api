import { useMutation } from "@apollo/client/react";
import { Link } from "react-router-dom";
import { REGISTER } from "../../../graphql/mutations/register";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  useForm,
  validateForm,
  VR,
  type TValidationSchema,
} from "@aienpah/nanoform";

type TRegisterForm = {
  username: string;
  password: string;
};

function RegisterPage() {
  /* -------------------------------------------------------------------------- */
  /*                                   GraphQL                                  */
  /* -------------------------------------------------------------------------- */

  const [register, { loading, error }] = useMutation(REGISTER);

  /* -------------------------------------------------------------------------- */
  /*                                    Form                                    */
  /* -------------------------------------------------------------------------- */

  const initialForm: TRegisterForm = {
    username: "",
    password: "",
  };

  const formSchema: TValidationSchema<TRegisterForm> = {
    username: [VR.required()],
    password: [VR.required()],
  };

  const { formRef, errors, handleChange, handleSubmit } =
    useForm<TRegisterForm>(initialForm, (values) =>
      validateForm(formSchema, values),
    );

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  async function onSubmit(inputValues: TRegisterForm) {
    const { data } = await register({
      variables: {
        input: {
          username: inputValues.username,
          password: inputValues.password,
        },
      },
    });

    if (data) {
      localStorage.setItem("pp-token", data.register.token);
      localStorage.setItem("pp-username", data.register.username);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4 py-12">
      <div className="w-full max-w-md rounded-[24px] border border-border bg-card/90 p-8 shadow-[0_20px_50px_rgba(31,35,40,0.08)] backdrop-blur-sm">
        <div className="mb-8 text-center">
          <Link
            to={"/"}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground"
          >
            Pixel Place
          </Link>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Create account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Join the canvas and start sharing your color stories.
          </p>
        </div>

        <form
          ref={formRef}
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="username"
            name="username"
            className="h-11 rounded-xl border-border bg-background/70"
            placeholder="Username"
            onChange={handleChange}
          />
          {errors?.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}

          <Input
            id="password"
            name="password"
            className="h-11 rounded-xl border-border bg-background/70"
            placeholder="Password"
            type="password"
            onChange={handleChange}
          />
          {errors?.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <Button
            className="mt-2 h-11 rounded-xl"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </Button>

          {error && <p className="text-sm text-destructive">{error.message}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
