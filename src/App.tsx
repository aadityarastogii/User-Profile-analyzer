import React, { useState } from "react";
import Navbar from "./components/Navbar";
import RepoList from "./components/RepoList";
import DailyCommitsChart from "./components/DailyCommitsChart";

function App() {
  const [username, setUsername] = useState("");
  const [submittedUsername, setSubmittedUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setSubmittedUsername(username.trim());
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">Analyze</button>
        </form>
        {submittedUsername && (
          <>
            <RepoList username={submittedUsername} />
            <DailyCommitsChart username={submittedUsername} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
