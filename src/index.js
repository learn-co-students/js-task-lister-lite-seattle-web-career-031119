document.addEventListener("DOMContentLoaded", () => {
  // your code here

  let form = document.getElementById('create-task-form');
  // console.log('form:', form);

  form.addEventListener('submit', handleSubmit)

  function handleSubmit(ev) {
    ev.preventDefault();
    let li = document.createElement('li');
    li.textContent = ev.target.elements['new-task-description'].value;
    // console.log('task:', li);

    let button = document.createElement('button');
    button.textContent = 'X'
    button.addEventListener('click', () => {
      li.remove()
    })

    let edit_button = document.createElement('edit_button');
    edit_button.textContent = 'edit'
    edit_button.addEventListener('click', () => {
      document.getElementById("new-task-description").innerText
    })

    let priority = ev.target.elements['priority'].value
    if (priority !== 'default') {
      let className = priority + "-priority"
      li.classList.add(className)
    }

    let date = document.createElement('span');
    date.textContent = ', Due: ' + ev.target.elements['new-task-due-date'].value + ' ';

    let idName = priority + '-tasks';
    let ul = document.getElementById(idName);

    console.log('ul:', idName);
    li.appendChild(date);
    li.appendChild(button);
    ul.appendChild(li);
  };
});
