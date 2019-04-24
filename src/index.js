var edit_status = 0
document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById('create-task-form')
  form.addEventListener('submit', handleSubmit)

  function editSpan(edit_or_save) {
    let edit_span = document.createElement('span')
    edit_span.textContent = " Edit"
    edit_span.addEventListener('click', edit_or_save)
    console.log("edit_span: ", edit_span)
    return edit_span
  }

  function deleteSpan() {
    let delete_span = document.createElement('span')
    delete_span.textContent = " X"
    delete_span.addEventListener('click', () => {
      li.remove()
    })
    return delete_span
  }

  function handleSubmit(ev) {
    // stops page from loading to post
    ev.preventDefault()

    // find the list we want to attach our new task to
    let list = document.getElementById('tasks')

    // create the new task and assign its text value
    let li = document.createElement('li')
    li.textContent = ev.target.elements['new-task-description'].value

    let edit_span = editSpan(editLi)
    let delete_span = deleteSpan()

    // create new delete button and give it an event listener to remove
    // if it's clicked
    // let deleteButton = document.createElement('button')
    // deleteButton.textContent = 'X'
    // deleteButton.addEventListener('click', () => {
    //   li.remove()
    // })

    let priority = ev.target.elements['new-task-priority'].value
    li.classList.add(priority)

    // attach the task to the list
    list.appendChild(li)
    li.appendChild(edit_span)
    li.appendChild(delete_span)
  }

  function editLi() {
    if (edit_status === 0) {
      set_status(1)

      li = this.parentNode

      let input = document.createElement('input')
      input.type = 'text'
      input.className = "textInput"

      let edit_span = editSpan(saveLi)
      let delete_span = deleteSpan()

      li.textContent = ''

      li.appendChild(input)
      li.appendChild(edit_span)
      li.appendChild(delete_span)
    } else {
      return
    }
  }

  function saveLi() {
    set_status(0)

    li = this.parentNode

    let edit_span = editSpan(editLi)
    let delete_span = deleteSpan()

    li.textContent = document.getElementsByClassName('textInput')[0].value

    li.appendChild(edit_span)
    li.appendChild(delete_span)
  }


  function set_status(s) {
    if (s === 1) {
      edit_status = 1;
    } else{
      edit_status = 0
    }
  }
});
