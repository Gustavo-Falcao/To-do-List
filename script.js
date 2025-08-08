//let lixeiras = document.querySelectorAll('.lixeira')

let lixeiras

function submit() {
    let caixaTxt = document.querySelector('#text-box')
    let caixaDesc = document.querySelector('#text-desc')
    if(caixaTxt.value.length == 0 && caixaDesc.value.length == 0) {
        alert('ERROR=>[Nenhum conteúdo inserido!!]')
    } else if(caixaTxt.value.length == 0) {
        alert('ERROR=>[Nenhuma tarefa informada!!]')
    } else if(caixaDesc.value.length == 0) {
        alert('ERROR=>[Nenhum identificador informado!!]')
    } else {
        let hora = new Date
        let horaString = hora.getHours().toString() + hora.getMinutes().toString() + hora.getSeconds().toString()
        let card = document.createElement("div")
        card.setAttribute("class", "card")
        card.setAttribute("id", horaString)
        
        let text = document.createElement("p")
        text.textContent = caixaTxt.value
        card.appendChild(text)
        
        let lixeira = document.createElement('span')
        lixeira.innerText = "🗑"
        lixeira.setAttribute("class", "lixeira")
        card.appendChild(lixeira)
        
        let caixa = document.querySelector('#box-todo')
        caixa.appendChild(card)
        caixaTxt.value = ""
        caixaDesc.value = ""
        messageForNoTasks()
        closeWidow()

        lixeiras = document.querySelectorAll('.lixeira')
        console.log("QUant => ", lixeiras.length)

        lixeiras.forEach(lixeira => {
            lixeira.addEventListener('click', (element) => {
                let infoLixeira = element.target
                console.log("classe =>", infoLixeira.className)
                let paiLixeira = infoLixeira.parentElement
                let idPaiLixeira = paiLixeira.id
                console.log("Id do pai=>", idPaiLixeira)
                removeTask(idPaiLixeira)
            });
        });
    }
}

function messageForNoTasks() {
    let tasksBoxes = document.querySelectorAll('.box')
    console.log('Quantidade das caixas => ' + tasksBoxes.length)

    tasksBoxes.forEach(box => {
        let cards = box.querySelectorAll('.card')
        console.log('Quantidade cards => ', cards.length)
        if(cards.length === 0 && !box.querySelector('.msg')) {
            let msg = document.createElement("p")
            msg.textContent = "No cards yet"
            msg.classList.add("msg")
            box.appendChild(msg)
            console.log('Criou paragrafo')
        } else if(cards.length > 0 && box.querySelector('.msg')){
            let msgToRemove = box.querySelector('.msg')
            box.removeChild(msgToRemove)
            console.log('Removeu paragrafo')
        }
    });
}

function removeTask(idElement) {
   let elemento = document.getElementById(idElement)
   if(elemento) {
    elemento.parentNode.removeChild(elemento)
   }
    messageForNoTasks()
}

function closeWidow() {
    let janelaMaior = document.querySelector('#janela-pai')           
    janelaMaior.classList.remove('show-input')
}

function inputTask () {
    let janela = document.querySelector('#janela-pai')
    janela.classList.toggle('show-input')
}   

