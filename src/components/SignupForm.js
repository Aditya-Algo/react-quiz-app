import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false); // Set this to boolean

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate(); // Change history to navigate

  async function handleSubmit(e) {
    e.preventDefault();

    // Do validation
    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    if (!agree) {
      return setError("You must agree to the terms & conditions.");
    }

    try {
      setError(""); // Reset any previous errors
      setLoading(true); // Start loading state

      await signup(email, password, username); // Attempt to sign up
      navigate("/"); // Redirect to home page on success

    } catch (err) {
      console.log(err);
      setLoading(false); // Stop loading state
      setError("Failed to create an account!"); // Display error message
    }
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        placeholder="Enter name"
        icon="person"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextInput
        type="text"
        required
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <TextInput
        type="password"
        required
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextInput
        type="password"
        required
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <Checkbox
        required
        text="I agree to the Terms &amp; Conditions"
        checked={agree} // Use checked instead of value
        onChange={(e) => setAgree(e.target.checked)} // Set checked state
      />

      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </Form>
  );
}