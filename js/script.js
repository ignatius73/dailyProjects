

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

let todos = []
input.focus()

//Agrego Items al filtered



document.addEventListener('click', (e)=>{
    e.preventDefault()
    console.log(e.target)
    if(e.target.className == 'divItem') {
        let label = e.target.children[2]
        let i =  e.target.children[1]
        let radio = e.target.children[0]
        label.classList.add('completed')
        i.classList.add('fa-regular', 'fa-circle-check')
        completeTodo(label.textContent)

    }

    
    
    
    if(e.target.parentElement.id == 'filter-by-status'){
        document.querySelector('.active').classList.remove('active')
        //let anchor__clicked = document.querySelector(`#${e.target.id}`)
        e.target.classList.add('active')

    }

    if(e.target.id == 'clear'){
        e.target.classList.add('active')
        removeCompleted()
        
    }

    if(e.target.id == 'active'){
        e.target.classList.add('active')
        getActive()
    }

    if(e.target.id == 'all'){
        e.target.classList.add('active')
        section.innerHTML=''
        todos.forEach( todo => createTodo(todo, todos.length))
    }

    if(e.target.id == 'completed'){
        e.target.classList.add('active')
        section.innerHTML=''
        getCompleted()
    }
    
   
       
})





const section = document.createElement('section')
section.id = 'todosList'

form.insertAdjacentElement('afterend', section)
faltantes.innerHTML = `<p class='text'>${todos.length} items left</p>`





btn.addEventListener('click', ()=>{
   agregoTodo()
  
})

input.addEventListener('keypress', (e)=>{
    if(e.charCode == '13') agregoTodo()
})

function agregoTodo(){
    const nuevoTodo = {
        completed : false,
        name: input.value
    };
    todos.push(nuevoTodo);
    createTodo(nuevoTodo, todos.length)
    input.value = ''
}

function createTodo(todo, position){
    
    const radio = document.createElement('input')
    const label = document.createElement('label')
    const i = document.createElement('i')

    
    const div = document.createElement('div')
    div.classList.add('divItem')

    radio.type = 'radio'
    radio.classList.add('todoItem', 'text')
    
    radio.id = `todo__${position}`
    radio.value = todo.name
    radio.checked = false
    label.for = `todo__${position}`
    label.textContent = todo.name
    label.classList.add('text')
    if(todo.completed == true){
        label.classList.add('completed')
        i.classList.add('fa-regular', 'fa-circle-check', 'text')
    }else{
        i.classList.add('fa-regular','fa-circle', 'text')
        i.classList.add('checkable')
    }
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
        el.id = anchor.split(' ',1)
        el.id = el.id.toLowerCase()
        el.classList.add('text')
        if(el.id == 'all'){
            el.classList.add('active');
        }
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
    faltantes.innerHTML = `<p class='text'>${leftItems.length} items left</p>`
}

function removeCompleted(){
    todos = todos.filter(todo => todo.completed == false)
    section.innerHTML = ''
    todos.forEach( todo => createTodo(todo, todos.length) )

}

function getActive(){
    section.innerHTML = ''

    todoActive = todos.filter( todo => todo.completed == false)

    if(todoActive) createTodo(todoActive[0], 1)

}

function getCompleted(){
    section.innerHTML = ''

    todosCompleted = todos.filter( todo => todo.completed == true)

    todosCompleted.forEach( todo => createTodo(todo, todos.length) )

}





