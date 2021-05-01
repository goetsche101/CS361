let qstring = window.location.search
let url = new URLSearchParams(qstring)
console.log(url.get('search'))

document.addEventListener('DOMContentLoaded', returnWikidata)

function returnWikidata(){
  let search = url.get('search')
  let req = new XMLHttpRequest();
  req.open('GET','https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&srsearch='+search+'&format=json', false)
  req.send(null)
  document.getElementById('wikiresp').textContent = req.responseText
  /*event.preventDefault();*/

}
