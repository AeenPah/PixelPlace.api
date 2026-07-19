import { useMutation } from "@apollo/client/react";
import { Link } from "react-router-dom";
import { LOGIN } from "../../../graphql/mutations/login";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  useForm,
  validateForm,
  VR,
  type TValidationSchema,
} from "@aienpah/nanoform";

type TLoginForm = {
  username: string;
  password: string;
};

function LoginPage() {
  /* -------------------------------------------------------------------------- */
  /*                                   GraphQL                                  */
  /* -------------------------------------------------------------------------- */

  const [login, { loading, error }] = useMutation(LOGIN);

  /* -------------------------------------------------------------------------- */
  /*                                    Form                                    */
  /* -------------------------------------------------------------------------- */

  const initialForm: TLoginForm = {
    username: "",
    password: "",
  };

  const formSchema: TValidationSchema<TLoginForm> = {
    username: [VR.required()],
    password: [VR.required()],
  };

  const { formRef, errors, handleChange, handleSubmit } = useForm<TLoginForm>(
    initialForm,
    (values) => validateForm(formSchema, values),
  );

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  async function onSubmit(inputValues: TLoginForm) {
    const { data } = await login({
      variables: {
        input: {
          username: inputValues.username,
          password: inputValues.password,
        },
      },
    });

    if (data) {
      localStorage.setItem("pp-token", data.login.token);
      localStorage.setItem("pp-username", data.login.username);
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
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue placing pixels.
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
            {loading ? "Signing in..." : "Login"}
          </Button>

          {error && <p className="text-sm text-destructive">{error.message}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
