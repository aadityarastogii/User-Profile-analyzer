import axios from "axios";
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
/**
 * Get headers dynamically based on token availability.
 * @returns Authorization headers for Axios requests
 */
const getHeaders = () => {
  return GITHUB_TOKEN
    ? { Authorization: `Bearer ${GITHUB_TOKEN}` }
    : {}; // Return empty headers if token is unavailable
};

/**
 * Fetch public repositories for any GitHub username.
 * @param username - GitHub username
 * @returns An array of repositories
 */
export const fetchRepositories = async (username: string): Promise<any[]> => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching repositories:", error.message);
    throw new Error(error.message || "Failed to fetch repositories.");
  }
};

/**
 * Fetch user events to extract commit data for daily activity.
 * @param username - GitHub username
 * @returns User event data from GitHub
 */
export const fetchUserEvents = async (username: string): Promise<any[]> => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}/events`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user events:", error.message);
    throw new Error(error.message || "Failed to fetch user events.");
  }
};
