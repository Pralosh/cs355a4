const $ = document.querySelector.bind(document);

$('#add-btn').addEventListener('click', e => {
    var text = $('#inputBox').value;
    var box = document.createElement('div');
    
    box.className = 'todoItem';
    box.classList.add = 'active';
    box.innerHTML = "+ " + text;
    box.style.cursor = 'pointer';
    
    $('.todoList').appendChild(box);

    box.addEventListener('click', e => {
        e.target.className = 'completed';
    });
})

fetch('/hits').
then(r=>r.text()).
then(txt=>$('#hits').innerHTML = txt);
