const form = document.getElementById('form');
const search = document.getElementById('search');

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
        console.log(data)
    } catch (err) {
        console.error(err);
    }
}