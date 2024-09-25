const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

describe('Teste da lista de tarefas', () => {
  let addTaskBtn;
  let taskInput;
  let taskList;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    const appJs = require('../public/app.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));

    addTaskBtn = document.getElementById('add-task-btn');
    taskInput = document.getElementById('task-input');
    taskList = document.getElementById('task-list');
  });

  test('Deve adicionar uma tarefa à lista', () => {
    taskInput.value = 'Estudar Jest';
    addTaskBtn.dispatchEvent(new Event('click'));
    expect(taskList.children.length).toBe(1);
    expect(taskList.children[0].textContent).toContain('Estudar Jest');
  });

  test('Deve remover uma tarefa da lista', () => {
    taskInput.value = 'Estudar Jest';
    addTaskBtn.dispatchEvent(new Event('click'));
    expect(taskList.children.length).toBe(1);

    const deleteBtn = taskList.querySelector('.delete-btn');
    expect(deleteBtn).not.toBeNull();
    deleteBtn.dispatchEvent(new Event('click'));
    expect(taskList.children.length).toBe(0);
  });

  test('Não deve adicionar tarefa vazia', () => {
    taskInput.value = '';
    addTaskBtn.dispatchEvent(new Event('click'));
    expect(taskList.children.length).toBe(0);
  });

  test('Deve adicionar e remover 3 tarefas', () => {
    const tasks = ['Estudar Matemática', 'Fazer Exercícios', 'Revisar Conteúdo'];

    tasks.forEach(task => {
      taskInput.value = task;
      addTaskBtn.dispatchEvent(new Event('click'));
    });

    expect(taskList.children.length).toBe(3);
    tasks.forEach((task, index) => {
      expect(taskList.children[index].textContent).toContain(task);
    });

    taskList.querySelectorAll('.delete-btn').forEach((btn, index) => {
      btn.dispatchEvent(new Event('click'));
      expect(taskList.children.length).toBe(2 - index);
    });
    
    expect(taskList.children.length).toBe(0);
  });
});

