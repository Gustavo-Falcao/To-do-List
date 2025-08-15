//let lixeiras = document.querySelectorAll('.lixeira')

class Card {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
        this.conteudo = [];
    }
}

let templates = []

//Adicionar card
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault()

    const dados = new FormData(this)

    criarCard(dados.get('nome-tarefa'))
    limparCaixaText()
    closeWidow()
});

function limparCaixaText() {
    document.getElementById('text-box').value = ""
}
 
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
        criarCard(caixaTxt, caixaDesc)
        closeWidow()
    }
}

function gerarId() {
    let hora = new Date
    return hora.getHours().toString() + hora.getMinutes().toString() + hora.getSeconds().toString()
}

function criarCard(caixaNome) {
// caixaTxt e caixaDesc
    //Gerar id para o card
    let horaString = gerarId()

    //Criar onbjeto do card
    criarObjetoCard(horaString, caixaNome)
    
    //Criar Card
    let card = document.createElement("div")
    card.setAttribute("class", "card")
    card.setAttribute("id", horaString)
    
    //Criar subcard
    let subCard = criarSubCard(caixaNome)

    //Criar opcoes
    let boxOptions = criarCaixaOpcoes()

    //Adicionando elementos no card
    card.appendChild(subCard)
    card.appendChild(boxOptions)

    let caixa = document.querySelector('#box-todo')
    caixa.appendChild(card)
    caixaNome.value = ""
    //caixaDesc.value = ""
    messageForNoTasks()

}

function criarCaixaOpcoes() {
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

    //Criação do icone de adicionar
    let addIcon = document.createElement("span")
    addIcon.setAttribute("class", "material-symbols-outlined icones")
    addIcon.textContent = "add"

    //Criação do icone de deletar
    let deleteIcon = document.createElement("span")
    deleteIcon.setAttribute("class", "material-symbols-outlined icones")
    deleteIcon.textContent = "delete"

    //Adicionando icones na caixa opcoes
    boxOptions.appendChild(infoIcon)
    boxOptions.appendChild(editIcon)
    boxOptions.appendChild(addIcon)
    boxOptions.appendChild(deleteIcon)

    return boxOptions
}

function criarObjetoCard(id, caixaNome) {
    //Criação do objeto Card
    templates.push(new Card(id, caixaNome))
}

function criarSubCard(caixaNome) {
    //Criação do sub-card
    let subCard = document.createElement("div")
    subCard.setAttribute("class", "sub-card")

    //Criação do Nome da tarefa
    let text = document.createElement("p")
    text.textContent = caixaNome

    //Criação da seta para baixo
    let setaParaBaixo = document.createElement("span")
    setaParaBaixo.setAttribute("class", "para-baixo")
    setaParaBaixo.innerHTML = "&#10095"

    //Adicionando conteudos no subcard
    subCard.appendChild(text)
    subCard.appendChild(setaParaBaixo)

    return subCard
}

const caixaToDo = document.getElementById('box-todo')

caixaToDo.addEventListener('click', function (event) {
    let eventoClicado = event.target
    if(eventoClicado) {
       
       let classeEvento = eventoClicado.className
       console.log(`Nome classe => ${classeEvento}`)

       if(eventoClicado.classList.contains('para-baixo')) {
        //Expandir card e mostrar icones
            mostrarIconesCard(eventoClicado)
       }
       else if(eventoClicado.classList.contains('icones')) {
        //Realizar acoes de acordo com o icone clicado
        let nomeElemento = eventoClicado.textContent
        console.log(`Nome icone => ${nomeElemento}`)
        switch(nomeElemento) {
            case "delete":
                removerElemento(eventoClicado)   
            break
            case "info":
                mostrarInfoCard(eventoClicado)
            break
            case "add":
                addTarefas(eventoClicado)
            default: return
        }
        }  
    }
});

//Adicionar tarefas
function addTarefas(elemento) {
    mostrarPopUp(elemento)
    mostrarJanelaModal()

    let card = elemento.closest('.card')

    let janelaAdd = document.getElementById('janela_add')

    janelaAdd.addEventListener('click', function (e) {
        let elementoClicado = e.target
        let boxTarefas = janelaAdd.querySelector('#box_tarefas')
        let paragrafo = boxTarefas.querySelector('#tarf')
        if(elementoClicado.id === "bot_add_tarefa") {
            let boxTextTarefa = janelaAdd.querySelector('#add_tarefa')
            templates.forEach(t => {
                if(t.id === card.id) {
                    //t.conteudo.push(boxTextTarefa.value)
                }
            });
            paragrafo.innerHTML += boxTextTarefa.value + "<br>"
            boxTextTarefa.value = ""
        }
    })
}

//Mostrar janela e esconder o restante
function mostrarPopUp(elemento) {
    let nomeIcone = elemento.textContent
    let janelas = document.querySelectorAll('.janela-pop')
    console.log("Nome icone => ", nomeIcone)
    switch(nomeIcone) {
        case "info":
            janelas.forEach(janela => {
                console.log("Janela id => ", janela.id)
                if(janela.id !== "janela_info") {
                    console.log("Entrou na condicao")
                    if(templateEstaSendoMostrado(janela)) {
                        console.log(`A janela com o id [${janela.id}] está sendo mostrada`)
                        esconderTemplate(janela)
                    }
                } else {
                    mostrarTemplate(janela)
                }
            });
        break;
        case "add":
            janelas.forEach(janela => {
                if(janela.id !== "janela_add") {
                    if(templateEstaSendoMostrado(janela)) {
                        esconderTemplate(janela)
                    }
                } else {
                    mostrarTemplate(janela)
                }
            })
        break;
    }
}

//Mostra info e procura objeto card pelo id
function mostrarInfoCard(elemento) {
    let titulo = document.getElementById('titulo')
    let conteudo = document.getElementById('conteudo')
    let card = elemento.closest('.card')
    let idCard = card.id
    console.log(`Tamano templates => ${templates}`)

    templates.forEach(t => {
        if(t.id === idCard) {
            titulo.textContent = t.nome
            //conteudo.textContent = t.conteudo
            console.log(`Nome tarefa => ${t.nome}`)
            console.log(`Conteudo tarefa => ${t.conteudo}`)
        }
    })
    mostrarPopUp(elemento)
    mostrarJanelaModal()
}

//Mostrar icones do card
function mostrarIconesCard(elemento) {
    elemento.classList.toggle('para-cima')
    
    let subCard = elemento.closest('.sub-card')
    let option = subCard.nextElementSibling //previousElementeSibling - para pegar o elemento anterior no mesmo nivel
    option.classList.toggle('mostrar-options')

    let card = option.closest('.card')
    card.classList.toggle('expandir-card')
}

//Pega a informacao do card em qual o clic ocorreu e remove o card
function removerElemento(elemento) {
    console.log(`Nome do elemento => ${elemento.textContent}`)
    let infoCard = elemento.closest('.card')
    console.log(`Id do card => ${infoCard.id}`)
    removeTask(infoCard.id)
}

//Mostrar menssagem no campo se não tiver card
function messageForNoTasks() {
    
    let box = document.getElementById('box-todo')

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
}

//Remove um elemento pelo seu id
function removeTask(idElement) {
   let elemento = document.getElementById(idElement)
   if(elemento) {
    elemento.parentNode.removeChild(elemento)
   }
    messageForNoTasks()
}

function closeWidow() {
    let janelaMaior = document.querySelector('#janela-pai')           
    janelaMaior.classList.remove('show-modal')
}

function mostrarJanelaModal () {
    let janela = document.querySelector('#janela-pai')
    janela.classList.toggle('show-modal')
}   

function mostrarTemplate (elemento) {
    elemento.classList.add('show-janela')
    console.log("Adicionando classe ao elemento =>", elemento.id)
}

function esconderTemplate(elemento) {
    elemento.classList.remove('show-janela')
    console.log("Removendo classe do elemento =>", elemento.id)
}

function templateEstaSendoMostrado(elemento) {
    return elemento.classList.contains('show-janela') ? true : false;
}

//Adicionar card
document.getElementById('bot_addCard').addEventListener('click', function(e) {
    let button = e.target
    if(button) {
        let janelaInput = document.getElementById('janela_input')
        let janelaInfo = janelaInput.nextElementSibling
        if(templateEstaSendoMostrado(janelaInfo)) {
            esconderTemplate(janelaInfo)
        }
        mostrarTemplate(janelaInput)
        mostrarJanelaModal()
    }
});
