import TodoListItem from '../pages/list/TodoListItem.js';

const HandleDataFilter = async function (className, data, value) {
  let result;

  if (value === '!done') {
    result = data.filter((v) => !v.done);
  } else if (value === 'done') {
    result = data.filter((v) => v.done);
  } else {
    result = data.filter((v) => v[value]);
  }

  const importantList = document.querySelector('.important-list');
  const elem = document.querySelector(className);
  const checkboxList = [];

  const textElement = document.createElement('li');
  textElement.setAttribute('class', 'todo-list-empty');
  textElement.innerText = '일정이 없습니다 : )';

  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }

  if (importantList) {
    while (importantList.firstChild) {
      importantList.removeChild(importantList.firstChild);
    }
  }

  if (result.length === 0) {
    elem.appendChild(textElement);
  } else {
    result.forEach((item) => {
      const resultItem = TodoListItem(item, checkboxList);
      elem.appendChild(resultItem);
    });
  }
};

export default HandleDataFilter;
