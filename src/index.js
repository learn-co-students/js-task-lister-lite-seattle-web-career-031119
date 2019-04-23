document.addEventListener("DOMContentLoaded", () => {

  const date = document.getElementById('new-due-date').valueAsDate = new Date()

  const form = document.getElementById('create-task-form')
  const sortSelect = document.getElementById("sort-select")
  const tasks = document.getElementById('tasks')


  // Our lovely form
  form.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const task = ev.target.elements['new-task-description'].value
    const priority = ev.target.elements['priority'].value
    const dueDate = ev.target.elements['new-due-date'].value

    const className = "priority-" + priority
    tasks.appendChild(buildItem(task, className, dueDate));
    sortList(sortSelect.value)

  })

  //some bullsh*t
  //Don't worry about it.
  //It's fine.
  sortSelect.addEventListener('change', (ev) => {
    let direction = ev.target.value
    sortList(direction)
  })

  function summonEditor (li, originalText) {
    const originalLi = li.cloneNode(true);
    const spanText = document.getElementById('span-text')
    li.innerHTML = `
      <form id="edit-form">
        <input id="edit-text" name= "edit-text" type="text" value="${originalText}"/>
        <input type="submit"/>
      </form>
    `;

    document.getElementById('edit-form').addEventListener('submit', submitEdit);

    function submitEdit(ev){
      ev.preventDefault();
      const newText = ev.target.elements['edit-text'].value
      let dueText = originalLi.querySelector('#span-due').textContent
      dueText = dueText.replace("due: ", "")
      spanText.innerText = spanText.innerText.replace(originalText, newText);
      li.parentNode.replaceChild(buildItem(spanText.textContent, originalLi.class, dueText), li)
    }


  }


  function buildItem(task, priorityClass, dueDate){
    const li = document.createElement('li')
    const spanTask = document.createElement('span');
    const dueSpan = document.createElement('span');
    spanTask.textContent = task;
    spanTask.id = "span-text"
    dueSpan.textContent = " due: " + dueDate;
    dueSpan.id = "span-due"
    li.classList.add(priorityClass)

    const deleteButton = document.createElement('button')
    deleteButton.textContent = "go away"
    deleteButton.addEventListener('click', () => {
      li.remove()
    })

    const editButton = document.createElement('button')
    editButton.textContent = "change away"
    editButton.addEventListener('click', () => {
      summonEditor(li, task)
    })

    li.appendChild(spanTask);
    li.appendChild(dueSpan);
    li.appendChild(deleteButton)
    li.appendChild(editButton);
    return li;
  }


  //Our lovely sort function
  function sortList(direction = "ASC"){
    const PRIORITIES = {
      'priority-one': 1,
      'priority-two': 2,
      'priority-three': 3,
      'priority-none': 4
    }
    let liArray = document.querySelectorAll('[class*="priority"]')

    liArray = Array.prototype.slice.call(liArray)

    liArray.sort((a, b) => {
      switch(direction) {
        case "ASC":
          return PRIORITIES[a.className] - PRIORITIES[b.className]
          break;
        case "DESC":
          return PRIORITIES[b.className] - PRIORITIES[a.className]
          break;
      }
    })

    for(let i = 0, len = liArray.length; i < len; i++) {
      let parent = liArray[i].parentNode
      var detatched = parent.removeChild(liArray[i])
      parent.appendChild(detatched)
    }
  }


  document.addEventListener('mousemove', (ev) => {
    let x = ev.pageX;
    let y = ev.pageY;

    div = document.createElement('div')
    div.classList.add("polka-dot");
    div.style.top = y+"px";
    div.style.left = x+"px";
    div.style.backgroundColor = "rgb("+Math.floor(Math.random()*255)+"," + Math.floor(Math.random()*255) + "," + Math.floor(Math.random()*255) + ")"
    document.body.appendChild(div);

  })

});
