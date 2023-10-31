import TodoListItem from '../pages/list/TodoListItem.js';

const HandleDataAll = async function (className, data) {
  const elem = document.querySelector(className);
  const checkboxList = [];

  const importantList = document.querySelector('.important-list');

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

  if (data.length === 0) {
    elem.appendChild(textElement);
  } else {
    data.forEach((item) => {
      const resultItem = TodoListItem(item, checkboxList);
      if (item.important) {
        importantList.appendChild(resultItem);
      } else {
        elem.appendChild(resultItem);
      }
    });
  }
};

export default HandleDataAll;
