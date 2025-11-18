import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [ans, setAns] = useState(null);
  const [repos, setRepos] = useState([]);

  const userdata = async () => {

    const res = await fetch(`https://api.github.com/users/${user}`);
    const data = await res.json();
    setAns(data);
    const repoRes = await fetch(`https://api.github.com/users/${user}/repos`);
    const repoData = await repoRes.json();
    setRepos(repoData);
  };

  return (
    <header>
    <div className="main">
      <div className="card">
        <h2 className="title">GitHub Profile Finder</h2>

        <div className="input-box">
          <input
            type="text"
            value={user}
            placeholder="Enter GitHub username"
            onChange={(e) => setUser(e.target.value)}
          />
          <button onClick={userdata}>Search</button>
        </div>

        {ans && (
          <div className="profile">
            <img src={ans.avatar_url} alt="user" className="avatar" />
            <h3>{ans.name}</h3>
            <p>ID: {ans.id}</p>

            <p className="bio">{ans.bio ? ans.bio : "No bio available"}</p>

            <div className="stats">
              <div>
                <h4>{ans.followers}</h4>
                <span>Followers</span>
              </div>
              <div>
                <h4>{ans.following}</h4>
                <span>Following</span>
              </div>
              <div>
                <h4>{ans.public_repos}</h4>
                <span>Repos</span>
              </div>
            </div>

            <a
              className="btn-profile"
              href={ans.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub Profile
            </a>
          </div>
        )}

        {repos.length > 0 && (
          <div className="repo-section">
            <h3 className="repo-title">Repositories</h3>

            <div className="repo-list">
              {repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-card"
                >
                  <h4>{repo.name}</h4>
                  <p>{repo.description ? repo.description : "No description"}</p>

                  <div className="repo-info">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    <span>{repo.language ? repo.language : "N/A"}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </header>
  );
}

export default App;
