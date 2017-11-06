const username = document.getElementById("username").value;

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function showRepositories(event, data) {
  // console.log(this.responseText);
  var repos = JSON.parse(this.responseText);
  // console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r => `
        <li> <a href="
        ${r.html_url}" target="_blank">
        ${r.name}</a> - <a href="#" class="commit" id="
        ${r.name}">Get Commits</a></li> `
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
  addEventListeners();
}

const addEventListeners = function() {
  [...document.getElementsByClassName("commit")].forEach(link => {
    link.addEventListener("click", getCommits.bind(link));
  });
};

function getCommits() {
  // console.log("here, this is", this);
  // debugger;
  const repo = this.id.trim();
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`);
  req.send();
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  // console.log(commits);
  const commitList = `<ul>${commits
    .map(c => `<li>${c["author"]["login"]}: ${c["commit"]["message"]}</li>`)
    .join("")}</ul>`;
  document.getElementById("details").innerHTML = commitList;
}
