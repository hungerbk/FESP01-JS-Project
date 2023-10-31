import Button from '../../layout/Button.js';
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import { linkTo } from '../../Router.js';
import BASE_URL from '../../../api/BaseUrl.js';

// 할일 수정
const TodoUpdate = async function () {
  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  // 전체 등록 최상위 박스
  const contents = document.createElement('div');
  contents.setAttribute('id', 'contents');

  // params 받아오기
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');

  // axios 가져오기
  const res = await axios(`${BASE_URL}/${_id}`);
  const { deadline, important, title, content } = res.data.item;

  // 양식 폼 박스
  const form = document.createElement('form');
  form.setAttribute('id', 'todo-form');

  const handleEdit = async (e) => {
    e.preventDefault();

    const body = {
      title: inputTitle.value,
      content: textareaContent.value,
      deadline: inputDeadline.value,
      important: inputImportant.checked,
    };

    const res = await axios.patch(`${BASE_URL}/${_id}`, body);

    if (res.status === 200) {
      alert('수정되었습니다');
      window.location.href = `/info?_id=${_id}`;
    } else if (res.status === 500) {
      alert('서버에 오류가 발생했습니다. 나중에 다시 시도하세요');
    }
  };

  form.addEventListener('submit', handleEdit);

  // Label
  const labelTitle = document.createElement('label');
  labelTitle.setAttribute('for', 'input-title');
  labelTitle.classList = 'label-title';
  labelTitle.classList.add('register-label');
  labelTitle.innerText = '제목';

  const labelContent = document.createElement('label');
  labelContent.setAttribute('for', 'textarea-content');
  labelContent.classList = 'label-content';
  labelContent.classList.add('register-label');
  labelContent.innerText = '내용';

  const labelDeadline = document.createElement('label');
  labelDeadline.setAttribute('for', 'input-deadline');
  labelDeadline.classList = 'label-deadline';
  labelDeadline.classList.add('register-label');
  labelDeadline.innerText = '완료날짜';

  const labelImportant = document.createElement('label');
  labelImportant.setAttribute('for', 'input-important');
  labelImportant.classList = 'label-important';
  labelImportant.classList.add('register-label');
  labelImportant.innerText = '중요';

  // Input
  const inputTitle = document.createElement('input');
  inputTitle.setAttribute('id', 'input-title');
  inputTitle.setAttribute('required', true);
  inputTitle.classList.add('register-input');
  inputTitle.type = 'text';
  inputTitle.value = title;

  const textareaContent = document.createElement('textarea');
  textareaContent.setAttribute('id', 'textarea-content');
  textareaContent.setAttribute('required', true);
  textareaContent.value = content;

  const inputDeadline = document.createElement('input');
  inputDeadline.setAttribute('id', 'input-deadline');
  inputDeadline.classList.add('register-input');
  inputDeadline.type = 'date';
  inputDeadline.value = deadline;

  const inputImportant = document.createElement('input');
  inputImportant.setAttribute('id', 'input-important');
  inputImportant.classList.add('register-input');
  inputImportant.type = 'checkbox';
  inputImportant.name = 'input-important';
  inputImportant.checked = important;

  // span -> 별표 아이콘
  const spanImportant = document.createElement('span');
  spanImportant.setAttribute('class', 'check-true');

  // Dom 추가
  // title div박스
  const titleEl = document.createElement('div');
  titleEl.setAttribute('class', 'title-box');
  titleEl.appendChild(labelTitle);
  titleEl.appendChild(inputTitle);
  form.appendChild(titleEl);

  // content div박스
  const contentEl = document.createElement('div');
  contentEl.setAttribute('class', 'content-box');
  contentEl.appendChild(labelContent);
  contentEl.appendChild(textareaContent);
  form.appendChild(contentEl);

  // deadline div박스
  const deadlineEl = document.createElement('div');
  deadlineEl.setAttribute('class', 'deadline-box');
  deadlineEl.appendChild(labelDeadline);
  deadlineEl.appendChild(inputDeadline);
  form.appendChild(deadlineEl);

  // important div박스
  const importantEl = document.createElement('div');
  importantEl.setAttribute('class', 'important-box');
  // label안에 input과 span추가
  labelImportant.appendChild(inputImportant);
  labelImportant.appendChild(spanImportant);
  importantEl.appendChild(labelImportant);
  form.appendChild(importantEl);

  // 등록/취소 버튼 박스
  const activeEl = document.createElement('div');
  activeEl.setAttribute('class', 'active-box');
  activeEl.appendChild(Button('submit-button', 'submit', '수정완료'));
  activeEl.appendChild(
    Button('cancel-button', 'button', '취소', () => {
      linkTo(`/info?_id=${_id}`);
    })
  );
  form.appendChild(activeEl);

  contents.appendChild(form);

  page.appendChild(Header('수정하기'));
  page.appendChild(contents);
  page.appendChild(Footer());

  return page;
};

export default TodoUpdate;
