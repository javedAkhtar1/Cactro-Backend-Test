require("dotenv").config();
const axios = require("axios");

async function getRepoList() {
  try {
    const response = await axios.get(
      "https://api.github.com/users/javedAkhtar1/repos"
    );
    const repoList = [];
    if (response) {
      for (let i = 0; i < response.data.length; i++) {
        repoList.push(response.data[i].name);
      }
    }
    return repoList;
  } catch (e) {
    console.log(e);
    return res.json("Repo not found");
  }
}

async function getRepoData(repo) {
  try {
    const response = await axios.get(
      "https://api.github.com/users/javedAkhtar1/repos"
    );
    const repoData = response.data.find(
      (item) => item.name.toLowerCase() === repo.toLowerCase().trim()
    );
    return repoData;
  } catch (e) {
    console.log(e);
  }
}

async function getGithub(req, res) {
  try {
    const response = await axios.get(
      "https://api.github.com/users/javedAkhtar1"
    );
    const { name, public_repos, followers, following } = response.data;
    const repos = await getRepoList();
    if (response) res.json({ name, public_repos, followers, following, repos });
  } catch (err) {
    req.status(500);
    console.log(err);
  }
}

async function getGithubRepos(req, res) {
  try {
    const response = await axios.get(
      "https://api.github.com/users/javedAkhtar1/repos"
    );
    if (response) res.json(response.data);
  } catch (err) {
    req.status(500);
    console.log(err);
  }
}

async function getParticularRepoDetails(req, res) {
  try {
    const { reponame } = req.params;
    const targetRepoData = await getRepoData(reponame);
    if (targetRepoData.error) {
      return res.status(404).json(targetRepoData);
    }
    res.json(targetRepoData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error fetching repository data" });
  }
}

async function postIssues(req, res) {
  const { reponame } = req.params;
  const { title, body } = req.body;
  try {
    const response = await axios.post(
      `https://api.github.com/repos/javedAkhtar1/${reponame}/issues`,
      { title, body },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    console.log(response.data.html_url);
    res.json({issue_url: response.data.html_url});
  } catch (e) {
    res.status(500);    
    console.log(e);
  }
}

module.exports = {
  getRepoList,
  getRepoData,
  getGithub,
  getGithubRepos,
  getParticularRepoDetails,
  postIssues,
};
