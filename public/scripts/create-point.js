function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then( (res) => {return res.json() } ) // posso tirar () do "res" e o return por so ter 1 elemento.
    .then( states => { 

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}"> ${state.nome} </option>`   
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = false

    fetch(url)
    .then( res => res.json() ) // tirei o return 
    .then( cities => { 

        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}"> ${city.nome} </option>`   
        }

        citySelect.disabled = false

    } )

}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

// items de coleta
// pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com Js
    itemLi.classList.toggle('selected')

    const itemId = itemLi.dataset.id

    // console.log('ITEM ID:', itemId)
    
    // verificar se existem items selecionados, se sim
    // pegar os itens selecionados

    const alreadySelected  = selectedItems.findIndex( item => {
        const itemFound = item == itemId // sera true ou false, pode resumir > return item == itemId
        return itemFound
    })

    // se ja tiver selecionado, tirar da seleção

    if (  alreadySelected  >= 0) {
        // tirar da seleção
        const filteredItem = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItem
    } else {
        // se não estivar selecionado, adicionar a seleção
        // adicionar à seleção
        selectedItems.push(itemId)
    }
    // verificando se esta tudo certo, teste
    // console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}