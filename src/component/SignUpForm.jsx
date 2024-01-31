import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
        const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
            const result = await response.json();
            setToken(result.token);  
            console.log(result);
            //Clear fields after submission
            setUsername("");
            setPassword("");
        } else {
          // Show sign-up error
          const result = await response.json();
          setError(result.error || "Sign-up failed");
        }
      } catch (error) {
        setError(error.message);
      }
    }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
      <label>
          Username:{" "}
          <input
            label="Username"
            type="text"
            id="name"
            placeholder="username 4-20 characters"
            minLength={4}
            maxLength={20}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            label="Password"
            type="password"
            id="password"
            placeholder="password 4-20 characters"
            minLength={4}
            maxLength={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}