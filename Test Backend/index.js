require("dotenv").config()

const express = require("express")
const app = express()
const axios = require("axios")
const {getGithub, getGithubRepos, getParticularRepoDetails, postIssues} = require("./controllers/github.controllers.js")

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello")
})

app.get("/github", getGithub)
app.get("/github/repos", getGithubRepos)
app.get("/github/repos/:reponame", getParticularRepoDetails)
app.post("/github/:reponame/issues", postIssues)


app.listen(process.env.PORT || 3000, () => {
    console.log("Server started")
})