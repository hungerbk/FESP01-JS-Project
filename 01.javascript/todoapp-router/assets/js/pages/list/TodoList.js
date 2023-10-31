// 할일 목록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import Button from '../../layout/Button.js';
import TodoListItem from './TodoListItem.js';

const TodoList = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  const contents = document.createElement('div');
  contents.setAttribute('id', 'contents');
  contents.setAttribute('class', 'todo-container');

  const checkList = document.createElement('div');
  checkList.setAttribute('class', 'todo-container__check-list');

  // 전체완료 버튼텍스트
  const completedAll = document.createElement('button');
  completedAll.setAttribute('class', 'completeAll');
  completedAll.innerHTML = '전체완료';
  completedAll.setAttribute('data-done', 0);

  // 전체삭제 버튼텍스트
  const deleteAll = document.createElement('button');
  deleteAll.setAttribute('class', 'deleteAll');
  deleteAll.setAttribute('name', 'deleteAll');
  deleteAll.innerHTML = '전체삭제';

  /* 등록 버튼 */
  const registButton = Button('registButton', 'button', '등록');

  /* 필터버튼 */
  const filterList = document.createElement('div');
  filterList.setAttribute('class', 'filter-list');
  const filterAll = Button('filter-list__item', 'button', '전체보기');
  const filterImportant = Button('filter-list__item', 'button', '중요');
  const filterIncomplete = Button('filter-list__item', 'button', '미완료');
  const filterComplete = Button('filter-list__item', 'button', '완료');

  /* UI 렌더링 */
  filterList.append(
    filterAll,
    filterImportant,
    filterIncomplete,
    filterComplete
  );
  checkList.appendChild(completedAll);
  checkList.appendChild(deleteAll);

  let response;
  try {
    response = await axios('http://localhost:33088/api/todolist');

    /* 중요 아이템 리스트 컨테이너 */
    const importantList = document.createElement('ul');
    importantList.setAttribute('class', 'important-list');

    // TODO: item.deadline 봐서 만들어진 컨테이너가 없으면 생성하고, 있으면 있는 거에 li 만 만들어서 붙이기

    const ul = document.createElement('ul');
    ul.setAttribute('class', 'todolist');
    // ul.setAttribute = ("data-deadline", `${item.createdAt}`);
    const checkboxList = [];
    response.data?.items.forEach((item) => {
      /* todoItem 초기렌더링 */

      const li = TodoListItem(item, checkboxList);
      if (item.important) {
        importantList.appendChild(li);
      } else {
        ul.appendChild(li);
      }
    });

    contents.appendChild(registButton);
    contents.appendChild(filterList);
    contents.appendChild(checkList);
    contents.appendChild(importantList);
    contents.appendChild(ul);

    /* 전체완료 체크박스 토글링 */
    let toggleCompletAll = Number(completedAll.dataset.done);
    completedAll.addEventListener('click', () => {
      toggleCompletAll = !toggleCompletAll;
      checkboxList.forEach((checkbox) => (checkbox.checked = toggleCompletAll));
      // checkboxes
    });

    registButton.addEventListener('click', () => {
      linkTo('regist');
    });
  } catch (err) {
    const error = document.createTextNode('일시적인 오류 발생');
    console.log(err);
  }

  page.appendChild(Header('TODO App 목록 조회'));
  page.appendChild(contents);
  page.appendChild(Footer());

  return page;
};

export default TodoList;
