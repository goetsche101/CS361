var body = document.getElementsByTagName('body')

document.addEventListener('DOMContentLoaded', bindButtons)

function bindButtons(){
  document.getElementById('createTODO').addEventListener('click', function(event){
    var todo = document.createElement('fieldset')
    var legend = document.createElement('legend')
    var input = document.createElement('input')
    var label = document.createElement('label')

    label.innerHTML ='Description'
    input.setAttribute('type','text')
    input.setAttribute('name','description')

    legend.innerHTML = "TODO # 1"
    todo.appendChild(legend)
    todo.appendChild(label)
    todo.appendChild(input)
    body[0].appendChild(todo)

  })
}
