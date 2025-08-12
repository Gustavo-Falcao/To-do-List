//let lixeiras = document.querySelectorAll('.lixeira')

let icones
let setaExpandirIcones

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
        infoIcon.setAttribute("class", "material-symbols-outlined icones")
        infoIcon.textContent = "info"

        //Criação do icone de editar
        let editIcon = document.createElement("span")
        editIcon.setAttribute("class", "material-symbols-outlined icones")
        editIcon.textContent = "edit"

        //Criação do icone de mover item
        let moveIcon = document.createElement("span")
        moveIcon.setAttribute("class", "material-symbols-outlined icones")
        moveIcon.textContent = "move_item"

        //Criação do icone de deletar
        let deleteIcon = document.createElement("span")
        deleteIcon.setAttribute("class", "material-symbols-outlined icones")
        deleteIcon.textContent = "delete"
        
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

        icones = document.querySelectorAll('.icones')
        console.log("QUant => ", icones.length)

        //Funcao para apagar o card
        icones.forEach(icone => {
            icone.addEventListener('click', (element) => {
                let infoIcone = element.target
                console.log("classe =>", infoIcone.className)
                console.log("Conteudo dentro => ", infoIcone.textContent)
                let cardDoIcone = infoIcone.closest('.card')
                let idCardIcone = cardDoIcone.id
                console.log("Id do pai=>", idCardIcone)
                //removeTask(idPaiIcone)
            });
        });


        /* setaExpandirIcones = document.querySelectorAll('.para-baixo')
        console.log("Quantidade Seta =>", setaExpandirIcones.length)

        //Mostrar opcoes do card
        setaExpandirIcones.forEach(seta => {
            seta.addEventListener('click', (event) => {
                let elemento = event.target
                elemento.classList.toggle('para-cima')

                let card = elemento.closest('.card')
                card.classList.toggle('expandir-card')

                let option = card.querySelector('.options')
                option.classList.toggle('mostrar-options')
            });
        }); */
        

    }
}

const caixaToDo = document.getElementById('box-todo')

caixaToDo.addEventListener('click', function (event) {
    if(event.target && event.target.classList.contains('para-baixo')) {
        event.target.classList.toggle('para-cima')

        let subCard = event.target.closest('.sub-card')
        let option = subCard.nextElementSibling //previousElementeSibling - para pegar o elemento anterior no mesmo nivel
        option.classList.toggle('mostrar-options')

        let card = option.closest('.card')
        card.classList.toggle('expandir-card')

    }
});

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

