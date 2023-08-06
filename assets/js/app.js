let cl = console.log;


const formLogin = document.getElementById('formLogin')
const toAddItemValue = document.getElementById('toAddItem')
const toItemSearch = document.getElementById('toItemSearch')
const todoList = document.getElementById('todoList')
const addBtn = document.getElementById('addBtn')
const updateBtn = document.getElementById('updateBtn')
const deleteBtn = document.getElementById('delete')
const clearAll = document.getElementById('clearAll')
const para = document.getElementById('para')
const uptdIcon = document.getElementById('uptdIcon')


let itemArr = JSON.parse(localStorage.getItem('todoListItem')) || [];

// let itemArr = [];
// if(localStorage.getItem('todoListItem')){
//     itemArr = JSON.parse(localStorage.getItem('todoListItem'))
// }


const templating = (arr) => {
  let res = ''
  arr.forEach(obj => {
    res += `     
                    <div class="col-6 cross" id="${obj.itemId}">
                        <p class="p-2 font-weight-bold" onclick="onItemEdit(this)" data-editid="${obj.itemId}">${obj.item}</p>
                        <i class="fa-solid fa-xmark" onclick="onItemDel(this)" data-deleteid="${obj.itemId}"></i>
                    </div>  
                 `
  })
  todoList.innerHTML = res;
}

templating(itemArr)


function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}


const onFormLogin = (eve) => {
  eve.preventDefault();

  let itemList = toAddItemValue.value;
  cl(itemList)
  let itemObj = {
    item: itemList,
    itemId: create_UUID()
  }
  cl(itemObj)
  eve.target.reset()
  itemArr.unshift(itemObj)
  // clearAll.classList.remove('d-none')
  // para.classList.add('d-none')
  localStorage.setItem('todoListItem', JSON.stringify(itemArr))
  templating(itemArr)

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${itemList.toUpperCase()} has been saved.`,
    showConfirmButton: false,
    timer: 1500
  })


}

const onItemEdit = (eve) => {
  cl(eve)
  let editId = eve.getAttribute('data-editid')
  cl(editId)
  // localStorage.setItem('editId', editId)

  let editObj = itemArr.find(obj => {
    return obj.itemId === editId
  })
  cl(editObj)
  localStorage.setItem('editObj', JSON.stringify(editObj))
  addBtn.classList.add('d-none')
  uptdIcon.classList.remove('d-none')
  eve.style.opacity = '.3';
  toAddItemValue.value = editObj.item
}

const onUpdateItem = (eve) => {
  cl(eve)

  let updateVal = toAddItemValue.value;
  cl(updateVal)

  let updateId = JSON.parse(localStorage.getItem('editObj')).itemId
  // let updateId = localStorage.getItem('editId')
  cl(updateId)

  for(let i = 0; i<itemArr.length; i++){
    if(itemArr[i].itemId === updateId){
      itemArr[i].item = updateVal
      break;
    }
  }
  localStorage.setItem('todoListItem', JSON.stringify(itemArr))
  templating(itemArr)
  addBtn.classList.remove('d-none')
  uptdIcon.classList.add('d-none')
  formLogin.reset()

  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `Your item has been updated successfully!!.`,
    showConfirmButton: false,
    timer: 1500
  })


}

const onItemDel = (eve) => {
  // let deleteId = eve.getAttribute('data-deleteid')
  let deleteId = eve.dataset.deleteid;
  cl(deleteId)

  let deletedVal = document.getElementById(deleteId).firstElementChild.innerHTML;
  cl(deletedVal)

  let confirmItem = confirm(`Do you really wanna delete ${deletedVal}`)

  if (confirmItem) {
    itemArr = itemArr.filter(del => {
      return del.itemId != deleteId
    })
    localStorage.setItem('todoListItem', JSON.stringify(itemArr))
    document.getElementById(deleteId).remove()
    templating(itemArr)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Your item deleted successfully!!`,
      showConfirmButton: false,
      timer: 1500
    })
  }
    
}

toItemSearch.addEventListener('keyup', (eve) => {
  let filterArr = itemArr.filter((obj) => obj.item.toLowerCase().includes(eve.target.value.toLowerCase()))
  templating(filterArr)
})


const onclearAll = (eve) => {

  let confirmAll = confirm('Do you really wanna clear all Item List?')
  // alert(confirmAll)
  if (confirmAll) {
    // itemArr.length = 0;
    itemArr.splice(0)
    localStorage.setItem('todoListItem', JSON.stringify(itemArr))
    // clearAll.classList.add('d-none')
    templating(itemArr)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `All item deleted successfully!!`,
      showConfirmButton: false,
      timer: 1500
    })
  }
}



updateBtn.addEventListener('click', onUpdateItem)
formLogin.addEventListener('submit', onFormLogin)
clearAll.addEventListener('click', onclearAll)
