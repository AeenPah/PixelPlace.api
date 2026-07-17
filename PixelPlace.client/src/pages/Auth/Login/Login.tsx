import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import { LOGIN } from "../../../graphql/mutations/login";

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

    console.log("TOKEN (login)", data);
    if (data) localStorage.setItem("token", data.login.token);
  }

  return (
    <div>
      <div>Login</div>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          Login
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default LoginPage;
