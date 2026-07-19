import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { REGISTER } from "../../../graphql/mutations/register";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

function RegisterPage() {
  /* -------------------------------------------------------------------------- */
  /*                                 React Hook                                 */
  /* -------------------------------------------------------------------------- */

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                                   GraphQL                                  */
  /* -------------------------------------------------------------------------- */

  const [register, { loading, error }] = useMutation(REGISTER);

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { data } = await register({
      variables: {
        input: {
          username,
          password,
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

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            className="h-11 rounded-xl border-border bg-background/70"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            className="h-11 rounded-xl border-border bg-background/70"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
