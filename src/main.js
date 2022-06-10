// const fname = document.querySelector('#first-name')
//     , lname = document.querySelector('#last-name')
//     , email = document.querySelector('#email')
//     , phone = document.querySelector('#phone')
//     , company = document.querySelector('#company')
//     , address = document.querySelector('#address')

let inputs = document.querySelectorAll('input[type="text"]');
let submitBtn = document.getElementById('submit-button');
let getHistory = localStorage.getItem('cardHistory');
let cards = [];


inputs.forEach(input => {
    input.value = localStorage.getItem(input.id);
    input.addEventListener("input", (value) => {
        localStorage.setItem(input.id, value.target.value);
    });
});

if (submitBtn) {
    submitBtn.addEventListener("click", (event) => {
        localStorage.clear();
        inputs.forEach(input => {
            let key = 'card-' + input.id;
            let value = input.value;
            cards.push({key, value});
        });
        if (getHistory) {
            localStorage.setItem('cardHistory', JSON.stringify(cards.concat(JSON.parse(getHistory))));
        } else {

            localStorage.setItem('cardHistory', JSON.stringify(cards));
        }

    });
}

function initDel() {
    let delBtn = document.querySelectorAll('.delete-button');
    let newArr = JSON.parse(getHistory);
    if (delBtn) {

        delBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                newArr.splice(btn.dataset.id, btn.dataset.id + 6);
                localStorage.setItem('cardHistory', JSON.stringify(newArr));
                btn.parentNode.remove();
            });
        });
    }
}

function syncTabs() {
    inputs.forEach(input => {
        input.value = localStorage.getItem(input.id);
    });
}

setInterval(syncTabs, 100);


if (getHistory && !submitBtn) {
    let historyCard = `<div class="submit-history-card">
                            <h3>First Name</h3>
                            <p class="card-first-name"></p>
                            <h3>Last Name</h3>
                            <p class="card-last-name"></p>
                            <h3>Email</h3>
                            <p class="card-email"></p>
                            <h3>Phone</h3>
                            <p class="card-phone"></p>
                            <h3>Company</h3>
                            <p class="card-company"></p>
                            <h3>Address</h3>
                            <p class="card-address"></p>
                            <button data-id="0" class="delete-button">Delete</button>
                        </div>`;

    Object.entries(JSON.parse(getHistory)).forEach(([index, entries]) => {

        if (index == 0) {
            document.querySelectorAll('section')[0].innerHTML = historyCard.replace('data-id="0', 'data-id="' + index);
        }
        if (index == 6) {
            document.querySelectorAll('section')[1].innerHTML = historyCard.replace('data-id="0', 'data-id="' + index);
        }
        if (index < 6) {
            document.querySelectorAll('.' + entries.key)[0].innerHTML = entries.value;
        } else {
            document.querySelectorAll('.' + entries.key)[1].innerHTML = entries.value;
        }


    });
    initDel();
}
