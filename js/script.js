const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const API_URL = 'https://api.github.com/users/';


form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);
        search.value = '';
    }
});

async function getUser(username) {
    try {
        const { data } = await axios.get(API_URL + username);
        createUserCard(data);
        await getRepos(username);
    } catch (err) {
        console.error(err);

        if (err.response.status === 404) {
            createErrorCard('No profile with Username');
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios.get(API_URL + `${username}/repos?sort=created`);
        addReposToCard(data);
    } catch (err) {
        console.error(err);
        createErrorCard('Problem fetching repos');
    }
}

function createUserCard(user) {
    main.innerHTML = `
        <div class="card">
        <div>
          <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
          <h2>${user.name}</h2>
          <p>${user.bio}</p>
          <ul>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
          </ul>
          
          <div id="repos"></div>
      </div>
    `;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos
        .slice(0, 30)
        .forEach(repo => {
            const repoEl = document.createElement('a');
            repoEl.classList.add('repo');
            repoEl.href = repo.html_url;
            repoEl.target = '_blank';
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

function createErrorCard(msg) {
    main.innerHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;
}