import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import { LOGIN } from "../../../graphql/mutations/login";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error }] = useMutation(LOGIN);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { data } = await login({
      variables: {
        input: {
          username,
          password,
        },
      },
    });

    if (data) localStorage.setItem("token", data.login.token);
  }

  return (
    <div>
      <div>Login</div>

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
          Login
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
