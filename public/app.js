const socket = io();

socket.on('message', msg => {
    const el = document.createElement('li');
    el.innerHTML = `<span class="name highlight">${msg.name}:</span>
                <span class="msg">${msg.msg}</span>`;

    document.querySelector('ul').appendChild(el);
});

socket.on('alert', alert => {
    const el = document.createElement('li');
    el.classList.add('highlight');
    el.innerHTML = alert;

    document.querySelector('ul').appendChild(el);
});

document.querySelector('button').onclick = function (e) {
    e.preventDefault();

    const name = document.querySelector('input#name').value;
    const msg = document.querySelector('input#msg').value;

    socket.emit('message', { name, msg });
};
