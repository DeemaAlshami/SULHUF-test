import "./App.css";
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://dev-api.trysedalia.com/auth/local", {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json",
        },
        body: JSON.stringify({
          identifier: username,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("User logged in successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="message">{message ? <p>{message}</p> : null}</div>
       
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;