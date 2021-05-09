var body = document.getElementsByTagName('body')
var todo_num = 0;

document.addEventListener('DOMContentLoaded', bindButtons)
function increment_todo(){
  todo_num = todo_num + 1
}
function bindButtons(){
  document.getElementById('createTODO').addEventListener('click', function(event){
    increment_todo()
    var todo = document.createElement('fieldset')
    var legend = document.createElement('legend')

    var desc_input = document.createElement('textarea')
    var desc_label = document.createElement('label')

    var todo_id = document.createElement('div')

    var date_label = document.createElement('label')
    var date_input = document.createElement('input')
    date_label.innerHTML = 'Due Date:'
    date_input.setAttribute('type', 'text')

    var p = document.createElement('p')

    var pri_lable = document.createElement('label')
    pri_lable.innerHTML = 'Priority: '
    var sel = document.createElement('select')
    var opthigh = document.createElement('option')
    var optlow = document.createElement('option')

    var complete = document.createElement("button")

    opthigh.setAttribute('value','High')
    opthigh.text = 'High';
    optlow.setAttribute('value',"Low")
    optlow.text = 'Low';

    complete.textContent = "complete"
    complete.setAttribute('id','complete')
    complete.addEventListener('click', function(event){
      todo.style.backgroundColor = 'grey'
    })

    todo_id.innerHTML = 'TODO ID # : ' + todo_num
    desc_label.innerHTML ='Description:'
    desc_input.setAttribute('type','text')
    desc_input.setAttribute('name','description')
    desc_input.setAttribute("id", "description")
    desc_input.setAttribute("rows", "4")

    p.setAttribute('id','pbox')

    desc_label.innerHTML = "Description"
    todo.appendChild(legend)

    p.appendChild(desc_label)
    p.appendChild(desc_input)

    sel.appendChild(opthigh)
    sel.appendChild(optlow)

    todo.appendChild(todo_id)
    todo.appendChild(date_label)
    todo.appendChild(date_input)

    todo.appendChild(pri_lable)
    todo.appendChild(sel)

    todo.appendChild(p)
    todo.appendChild(complete)
    body[0].appendChild(todo)

  })
}
