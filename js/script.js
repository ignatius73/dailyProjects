const btn = document.querySelector('#btn');
const input = document.querySelector('#todo');
const form = document.querySelector('#form')
const faltantes = document.querySelector('#leftItems')
const todosfiltered = document.querySelector('#filter-by-status')
const completes = document.querySelector('#completes')
const anchors = ['All','Active','Completed','Clear Completed']

/* const all = document.createElement('a')
const active = document.createElement('a') */

appendAnchors()

const todos = []

//Agrego Items al filtered



document.addEventListener('click', (e)=>{
    
    if(e.target.className == 'divItem') {
        let label = e.target.children[2]
        let i =  e.target.children[1]
        let radio = e.target.children[0]
        label.classList.add('completed')
        i.classList.add('fa-regular', 'fa-circle-check')
        completeTodo(label.textContent)

    }
       
})





const section = document.createElement('section')
section.id = 'todosList'

form.insertAdjacentElement('afterend', section)
faltantes.innerHTML = `<p>${todos.length} items left</p>`




btn.addEventListener('click', ()=>{
    
    const nuevoTodo = {
        completed : false,
        name: input.value
    };
    todos.push(nuevoTodo);
    createTodo(nuevoTodo, todos.length)
    input.value = ''


    

    
    console.log(todos);



})

function createTodo(todo, position){
    
    const radio = document.createElement('input')
    const label = document.createElement('label')
    const i = document.createElement('i')

    
    const div = document.createElement('div')
    div.classList.add('divItem')

    radio.type = 'radio'
    radio.classList.add('todoItem')
    
    radio.id = `todo__${position}`
    radio.value = todo.name
    radio.checked = false
    label.for = `todo__${position}`
    label.textContent = todo.name
    i.classList.add('fa-regular','fa-circle')
    i.classList.add('checkable')
    div.appendChild(radio)
    div.appendChild(i)
    div.appendChild(label)
    section.appendChild(div)
    itemsLeft()






}

function appendAnchors(){
    anchors.forEach( anchor =>{
        console.log(anchor);
        const el = document.createElement('a')
        el.href= '#'
        el.textContent = anchor
        el.id = anchor.trim();
        anchor === 'Clear Completed' ? completes.appendChild(el) : todosfiltered.appendChild(el)
    })
}

function completeTodo(value){
    todos.map( todo =>{
        if(todo.name == value) todo.completed = true;
    })
    itemsLeft()
}

function itemsLeft(){
    const leftItems = todos.filter( item => item.completed == false)
    faltantes.innerHTML = `<p>${leftItems.length} items left</p>`
}



