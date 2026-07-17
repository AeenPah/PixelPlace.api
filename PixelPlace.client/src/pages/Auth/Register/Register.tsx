import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import { REGISTER } from "../../../graphql/mutations/register";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [register, { loading, error }] = useMutation(REGISTER);

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

    console.log("TOKEN (login)", data);
    if (data) localStorage.setItem("token", data.register.token);
  }

  return (
    <div>
      <div>Register</div>

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
          Register
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
