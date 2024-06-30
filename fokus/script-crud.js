
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdcionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea')

const tarefas = [] 

btnAdicionarTarefa.addEventListener('click', () => {
    formAdcionarTarefa.classList.toggle('hidden');
})

formAdcionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault(); // evita da pagina recarregar quando clica em submit
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas)) //aqui conseguimos armazenar os dados consumneod a API JSON
})
