document.addEventListener("DOMContentLoaded", () => {

  let form = document.getElementById('create-task-form')
  form.addEventListener('submit', handleSubmit)

  function handleSubmit(ev) {
    ev.preventDefault()
    let tasks = document.getElementById('tasks')

    console.log('submit:', ev.target)

    let li = document.createElement('li')
    li.textContent = ev.target.elements['new-task-description'].value

    let user = document.createElement('user')
      user.textContent = ev.target.elements['user'].value

    let due = document.createElement('due')
      due.textContent = ev.target.elements['due'].value

    let priority = ev.target.elements['priority'].value
    if (priority !== 'default') {
      let className = priority + '-priority'
      li.classList.add(className)
    }

    let span = document.createElement('span')
      span.textContent = ' X'
      span.addEventListener('click', () => {
        li.remove();
    })

    let edit = document.createElement("edit")
      edit.textContent = ' Edit'
      edit.addEventListener('click', () => {
        li.update();
    })


    tasks.appendChild(li)
    li.appendChild(user)
    li.appendChild(due)
    li.appendChild(span)
    li.appendChild(edit)

  }
});
