/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');

describe('Teste da lista de tarefas', () => {
  let addTaskBtn;
  let taskInput;
  let taskList;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    require('../public/app.js');
    addTaskBtn = document.getElementById('add-task-btn');
    taskInput = document.getElementById('task-input');
    taskList = document.getElementById('task-list');
  });

  test('Deve adicionar uma tarefa à lista', () => {
    taskInput.value = 'Estudar Jest';
    addTaskBtn.click();
    expect(taskList.children.length).toBe(1);
    expect(taskList.children[0].textContent).toContain('Estudar Jest');
  });

  test('Deve remover uma tarefa da lista', () => {
    taskInput.value = 'Estudar Jest';
    addTaskBtn.click();
    expect(taskList.children.length).toBe(1);
    const deleteBtn = taskList.querySelector('.delete-btn');
    deleteBtn.click();
    expect(taskList.children.length).toBe(0);
  });

  test('Não deve adicionar tarefa vazia', () => {
    taskInput.value = '';
    addTaskBtn.click();
    expect(taskList.children.length).toBe(0);
  });
});
