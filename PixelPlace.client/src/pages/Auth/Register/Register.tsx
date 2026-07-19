import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
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
    <div>
      <div>Register</div>

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          Register
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
