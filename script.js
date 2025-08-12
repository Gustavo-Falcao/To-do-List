//let lixeiras = document.querySelectorAll('.lixeira')

let lixeiras

function submit() {
    console.log("Clicadoo")
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

        //Criação do Card
        let card = document.createElement("div")
        card.setAttribute("class", "card")
        card.setAttribute("id", horaString)
        
        //Criação do sub-card
        let subCard = document.createElement("div")
        subCard.setAttribute("class", "sub-card")

        //Criação do Nome da tarefa
        let text = document.createElement("p")
        text.textContent = caixaTxt.value

        //Criação da seta para baixo
        let setaParaBaixo = document.createElement("span")
        setaParaBaixo.setAttribute("class", "para-baixo")
        setaParaBaixo.innerHTML = "&#10095"
        
        //Criação da caixa com as opções
        let boxOptions = document.createElement("div")
        boxOptions.setAttribute("class", "options")

        //Criação do icone de info
        let infoIcon = document.createElement("span")
        infoIcon.setAttribute("class", "material-symbols-outlined")
        infoIcon.textContent = "info"

        //Criação do icone de editar
        let editIcon = document.createElement("span")
        editIcon.setAttribute("class", "material-symbols-outlined")
        editIcon.textContent = "edit"

        //Criação do icone de mover item
        let moveIcon = document.createElement("span")
        moveIcon.setAttribute("class", "material-symbols-outlined")
        moveIcon.textContent = "move_item"

        //Criação do icone de deletar
        let deleteIcon = document.createElement("span")
        deleteIcon.setAttribute("class", "material-symbols-outlined")
        deleteIcon.textContent = "delete"

        /* let lixeira = document.createElement('span')
        lixeira.innerText = "🗑"
        lixeira.setAttribute("class", "lixeira")
        card.appendChild(lixeira) */
        
        //Adicionando conteudos no subcard
        subCard.appendChild(text)
        subCard.appendChild(setaParaBaixo)

        //Adicionando icones nas opcoes
        boxOptions.appendChild(infoIcon)
        boxOptions.appendChild(editIcon)
        boxOptions.appendChild(moveIcon)
        boxOptions.appendChild(deleteIcon)

        //Adicionando elementos no card
        card.appendChild(subCard)
        card.appendChild(boxOptions)

        let caixa = document.querySelector('#box-todo')
        caixa.appendChild(card)
        caixaTxt.value = ""
        caixaDesc.value = ""
        messageForNoTasks()
        closeWidow()

        lixeiras = document.querySelectorAll('.lixeira')
        console.log("QUant => ", lixeiras.length)

        //Funcao para apagar o card
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

        //Mostrar opcoes do card
        document.querySelector('.para-baixo').addEventListener('click', function(event) {
        let elemento = event.target
        elemento.classList.toggle('para-cima')

        let card = elemento.closest('.card')
        card.classList.toggle('expandir-card')

        let option = card.querySelector('.options')
        option.classList.toggle('mostrar-options')
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

