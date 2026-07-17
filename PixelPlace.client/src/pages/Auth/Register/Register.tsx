import { useMutation } from "@apollo/client/react";
import { useState, type FormEvent } from "react";
import { REGISTER } from "../../../graphql/mutations/register";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

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
