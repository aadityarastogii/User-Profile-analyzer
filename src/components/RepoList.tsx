import React, { useEffect, useState } from "react";
import { fetchRepositories } from "../utils/githubApi";

interface Repo {
  name: string;
  html_url: string;
  description: string; // Optional description for each repository
}

const RepoList: React.FC<{ username: string }> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRepos = async () => {
      setLoading(true);
      setError(null); // Reset error state before making a new request

      try {
        const repositoryData = await fetchRepositories(username);
        if (repositoryData.length === 0) {
          throw new Error("No repositories found for this user.");
        }
        setRepos(repositoryData);
      } catch (err: any) {
        console.error("Error fetching repositories:", err.message);
        setError(err.message || "Failed to load repositories. Please try again.");
      } finally {
        setLoading(false); // Ensure loading state is always updated
      }
    };

    getRepos();
  }, [username]);

  if (loading) {
    return <p>Loading repositories...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div>
      <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.name}>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link"
            >
              <strong>{repo.name}</strong>
            </a>
            {repo.description && <p>{repo.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
