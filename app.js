$(watchForm);



function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        $('.search-results').html('');
        let searchTerm = $('#user-name-input').val();

        if (searchTerm !== '') {
            getRepoList(searchTerm);
        } else {
            alert('please enter a user name');
        }

    })
}

function getRepoList(name) {
    const params = {
        type: 'owner',
        sort: 'created',
        direction: 'desc'
    };
    let userName = $('#user-name-input').val();
    let searchUrl = `https://api.github.com/users/${userName}/repos`;
    
    let queryString = $.param(params);
    let url = searchUrl + '?' + queryString;

    fetch(url).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    })
        .then(resJson => displayResults(resJson))
        .catch(err => {
            $('#error-message').text(`You broke something: ${err.message}`)
        })

}

function displayResults(resJson) {
    for (let i = 0; i < resJson.length; i++) {
        $('.search-results').append(
            `<li>
                <h3>${resJson[i].name}</h3>
                <p>${resJson[i].url}</p>
            </li>
            `
        )
    }
    $('.search-results').removeClass('hidden');
}