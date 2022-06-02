let toDoId;
let user = localStorage.getItem('userToDo');
const inputToDoCard = document.querySelector("#toDoCardInput");
const output = document.querySelector('.span2');
const addToDo = document.querySelector('#add');
const saveToDo = document.querySelector('#saveToDoCard');
const saveEditToDo = document.querySelector('#saveEditToDoCard');
const UserText = document.querySelector('.h1');
const typeToDo = document.querySelector('#tDType');
const contentToDo = document.querySelector('#contentText');
const endDateToDo = document.querySelector('#endDate'); 
const addToDoH3 = document.querySelector('.h3ToDoCard');

UserText.textContent = user;

document.querySelector("#add").addEventListener("click", () => {
  inputToDoCard.style.display = "block";
  saveToDo.style.display = "block";
  saveEditToDo.style.display = "none";
  typeToDo.value = "";
  contentToDo.value = "";
  endDateToDo.value = "";
});
document.querySelector("#closeToDoCard").addEventListener("click", () => {
  document.querySelector("#toDoCardInput").style.display = "none";
  typeToDo.value = "";
  contentToDo.value = "";
  endDateToDo.value = "";
});
document.querySelector("#logoff").addEventListener("click", () => {
  localStorage.clear();

});

async function saveToAPI(){
  await fetch('https://localhost:44312/ToDoCards/AddNewToDoCard', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nameLastName: user,
      toDoType: typeToDo.value,
      toDoContext: contentToDo.value,
      endDateToDo: endDateToDo.value,
      toDoDone: 'false'
    })
  })
  .then((response) => {
    if (response.ok) {
      console.log('ok');
      return response.json();
    } else {
      console.log('not okay');
    }
  })
  .catch((err) => {
    console.log(err);
  })
  window.location.reload();
}
async function saveEditAPI(){
  await fetch(`https://localhost:44312/ToDoCards/UpdateToDoCard/${toDoId}`, {
    method: 'PUT',
    headers: {
     'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nameLastName: user,
      toDoType: typeToDo.value,
      toDoContext: contentToDo.value,
      endDateToDo: endDateToDo.value,
      toDoDone: 'false'
    })
  })
  .then((response) => {
    if (response.ok) {
      console.log('ok');
      return response.json();
    } else {
      console.log('not okay');
    }
  })
  .catch((err) => {
    console.log(err);
  })
  saveToDo.style.display = "none";
  inputToDoCard.style.display = "none"; 
  window.location.reload();
}
function checkFields(){
  let convertedDate = new Date(endDateToDo.value.replace(/-/g, ", "))
  let curentDate = new Date(Date.now());
  if (typeToDo.value === ""){
    alert('Please enter To Do Type field'); 
    return false
  }else if (contentToDo.value === ""){
    alert('Please enter To Do content field');
    return false
  }else if (endDateToDo.value === ""){
    alert('Please select To Do end date');
    return false
  }else if ((convertedDate.getMonth() < curentDate.getMonth()) || (convertedDate.getDate() < curentDate.getDate())){  
    alert('The To Do End date is in past! select todays date or later');
    return false
  }else return true
}
saveToDo.addEventListener('click', () => {
  if (checkFields()){
    saveToAPI()
  }
})
saveEditToDo.addEventListener('click', () => {
  if (checkFields()){
    saveEditAPI()
  }
})

saveEditToDo.addEventListener('click', () => {
  
})
function getToDo() {
  fetch('https://localhost:44312/ToDoCards/GetAllToDoCards')
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((result) => {
    let filteredData = result.filter((element) => {
        return element.nameLastName === user;
    })
    let sortedData = filteredData.sort((a, b) => 
        Date.parse(a.endDateToDo.replace(/-/g, ", ")) - 
        Date.parse(b.endDateToDo.replace(/-/g, ", ")))
    render(sortedData)
  }); 
}
function render(ToDos) {
  ToDos.forEach(ToDo => {
  const div = document.createElement('div');
  div.className = 'toDoCardDiv';

  const toDoTypeName = document.createElement('h2');
  toDoTypeName.textContent = ToDo.toDoType;
  toDoTypeName.className = 'toDoCardH1';

  const toDoContext = document.createElement('p');
  toDoContext.textContent = ToDo.toDoContext;
  toDoContext.className = 'toDoContextP';

  const toDoEndDate = document.createElement('p');
  toDoEndDate.textContent = ToDo.endDateToDo;
  toDoEndDate.className = 'toDoEndDateP';
  if (ToDo.toDoDone === 'false') {
    let dateStrig = `${ToDo.endDateToDo.replace(/-/g, ", ")}`;
    let add1DayToDate = new Date(dateStrig);
    if (new Date (add1DayToDate.setDate(add1DayToDate.getDate() -1)) < Date.now()){
      div.style.backgroundColor = 'rgba(221, 199, 125, 0.5)'
      if (new Date(dateStrig) < Date.now()){
        div.style.backgroundColor = 'rgba(219, 143, 143, 0.5)'
      }
    }
  }else if (ToDo.toDoDone === 'true'){
    div.style.backgroundColor = 'rgba(105, 221, 90, 0.5)'
  };

  const delButton = document.createElement('button');
  delButton.textContent = 'DELETE';
  delButton.className = 'toDoDelateB';
  delButton.addEventListener('click', (event) => {
    const elementId = event.target.parentElement.id;
    deleteToDo(elementId);
  })

  const editButton = document.createElement('button');
  editButton.textContent = 'EDIT';
  editButton.className = 'toDoEditB';
  editButton.addEventListener('click', (event) => {
    isOnEdit = true;
    const elementId = event.target.parentElement.id;
    toDoId = elementId;
    inputToDoCard.style.display = "block";
    saveToDo.style.display = 'none';
    saveEditToDo.style.display = 'block';
    typeToDo.value = ToDo.toDoType;
    contentToDo.value = ToDo.toDoContext;
    endDateToDo.value = ToDo.endDateToDo;
    addToDoH3.textContent = 'Editing To Do Form';
  })

  const doneButton = document.createElement('button');
  doneButton.textContent = 'DONE';
  doneButton.className = 'toDoDoneB';
  doneButton.addEventListener('click', (event) => {
    const elementId = event.target.parentElement.id;
    seveDoneToDO(elementId, ToDo);
  })

  div.append(toDoTypeName, toDoContext, toDoEndDate, editButton, delButton, doneButton);
  div.setAttribute('id', ToDo.id);
  output.append(div);
  })
}
window.addEventListener('load', () => {
  getToDo()
})
async function deleteToDo(toDoId) {
  const response = await fetch(`https://localhost:44312/ToDoCards/DelateToDoCard/${toDoId}`, {
    method: 'DELETE'
  })
  output.innerHTML = '';
  if (response) {
    getToDo();
  }
}

async function seveDoneToDO(toDoId){
  let toDoElement = document.getElementById(toDoId);
  await fetch(`https://localhost:44312/ToDoCards/UpdateToDoCard/${toDoId}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nameLastName: user,
      toDoType: toDoElement.querySelector('.toDoCardH1').textContent,
      toDoContext: toDoElement.querySelector('.toDoContextP').textContent,
      endDateToDo: toDoElement.querySelector('.toDoEndDateP').textContent,
      toDoDone: 'true'
    })
  })
  .then((response) => {
    if (response.ok) {
      console.log('ok');
      return response.json();
    } else {
      console.log('not okay');
  }
  })
  .catch((err) => {
    console.log(err);
  })
  window.location.reload();
}