class Github {
    getUsers (username) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/search/users?q=${username}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err);
            })
        })
    };

    createElement(items,result) {
        document.querySelector('.number').textContent = result;
        let ul = document.getElementById('list'),
            index = 0;
        ul.innerHTML = "";
        items.forEach(element => {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.innerHTML = `<div class="user-image" style="background-image: url(${element.avatar_url});"></div>
            <div class="user-info">
                <span class="user-name">${element.login}</span>
            </div>
            <a href="${element.html_url}" target="_blank" class="view-repo">
                View
            </a>`;
        });
    }
}

const findUser = new Github();

findUser.getUsers("john doe")
	.then(res => {
	if(res.total_count > 0) findUser.createElement(res.items,res.total_count);
})

document.querySelector('.search-input').addEventListener('keyup',e => {
    if(e.target.value !== "" && e.keyCode == 13){
        findUser.getUsers(e.target.value)
        .then(res => {
            if(res.total_count > 0) findUser.createElement(res.items,res.total_count);
        })
    }else{
        document.querySelector('.number').textContent = 0;
    }
});

        
