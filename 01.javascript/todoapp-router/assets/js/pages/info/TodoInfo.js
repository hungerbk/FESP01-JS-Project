// 할일 등록
import Header from '../../layout/Header.js';
import Footer from '../../layout/Footer.js';
import Button from '../../layout/Button.js';
import BASE_URL from '../../../api/BaseUrl.js';
import { linkTo } from '../../Router.js';

const TodoInfo = async function () {
  // 상세 할일 페이지 id
  const params = new URLSearchParams(location.search);
  const _id = params.get('_id');

  const page = document.createElement('div');
  page.setAttribute('id', 'page');

  // 전체 등록 최상위 박스
  const contents = document.createElement('div');
  contents.setAttribute('id', 'contents');
  // 디테일 컨테이너
  const detailContainer = document.createElement('div');
  detailContainer.setAttribute('id', 'detail-container');

  // Label
  const labelDeadline = document.createElement('label');
  labelDeadline.setAttribute('for', 'input-deadline');
  labelDeadline.classList = 'label-deadline';
  labelDeadline.classList.add('register-label');
  labelDeadline.innerText = '완료날짜';

  const labelImportant = document.createElement('label');
  labelImportant.setAttribute('for', 'input-important');
  labelImportant.classList.add('register-label');
  labelImportant.innerText = '중요';

  // textbody
  const detailTitle = document.createElement('h3');
  detailTitle.setAttribute('id', 'detail-title');

  const detailContent = document.createElement('p');
  detailContent.setAttribute('id', 'detail-content');

  const detailDeadline = document.createElement('p');
  detailDeadline.setAttribute('id', 'detail-deadline');

  // 중요 체크박스
  const detailImportant = document.createElement('span');
  detailImportant.setAttribute('id', 'detail-important');
  const starIcon = document.createElement('i');
  starIcon.setAttribute('class', 'fa-solid fa-star');
  starIcon.style.color = 'var(--gray-color)';
  starIcon.style.marginLeft = '10px';
  starIcon.style.fontFamily = 'Font Awesome 5 Free';
  detailImportant.appendChild(starIcon);

  // Dom 추가
  // title div박스
  const titleEl = document.createElement('div');
  titleEl.setAttribute('class', 'title-box');
  // titleEl.appendChild(labelTitle);
  titleEl.appendChild(detailTitle);
  detailContainer.appendChild(titleEl);

  // content div박스
  const contentEl = document.createElement('div');
  contentEl.setAttribute('class', 'detail-content-box');
  // contentEl.appendChild(labelContent);
  contentEl.appendChild(detailContent);
  detailContainer.appendChild(contentEl);

  // deadline div박스
  const deadlineEl = document.createElement('div');
  deadlineEl.setAttribute('class', 'deadline-box');
  deadlineEl.appendChild(labelDeadline);
  deadlineEl.appendChild(detailDeadline);
  detailContainer.appendChild(deadlineEl);

  // important div박스
  const importantEl = document.createElement('div');
  importantEl.setAttribute('class', 'important-box');
  labelImportant.appendChild(detailImportant);
  importantEl.appendChild(labelImportant);

  detailContainer.appendChild(importantEl);

  // 수정/삭제 버튼 박스
  const activeEl = document.createElement('div');
  activeEl.setAttribute('class', 'active-box');
  activeEl.appendChild(
    Button('edit-button', 'click', '수정', () => {
      linkTo(`/edit?_id=${_id}`);
    })
  );
  activeEl.appendChild(
    Button('delete-button', 'click', '삭제', () => {
      deleteDetailTodo();
    })
  );
  detailContainer.appendChild(activeEl);

  contents.appendChild(detailContainer);

  // 뒤로가기버튼
  const backButton = Button('cancel-button', 'button', '뒤로가기', () => {
    linkTo('/');
  });

  // http => 상세todo조회
  const getDetailTodo = async () => {
    const response = await axios(`${BASE_URL}/${_id}`);
    const detailData = response.data.item;
    // 응답처리
    detailTitle.innerHTML = detailData.title;
    detailContent.innerHTML = detailData.content;
    detailDeadline.innerHTML = detailData.deadline;
    if (detailData.important) {
      starIcon.style.color = 'var(--star-color)';
    }

    // 중요 체크박스 업데이트
  };

  const deleteDetailTodo = async () => {
    if (confirm('삭제하시겠습니까?')) {
      const response = await axios.delete(`${BASE_URL}/${_id}`);
      if (response.data.ok === 1) {
        alert('삭제되었습니다!');
        linkTo('/');
      }
    }
  };

  getDetailTodo();

  page.appendChild(Header(`${_id}번째 할 일`));
  page.appendChild(backButton);
  page.appendChild(contents);
  page.appendChild(Footer());

  return page;
};

export default TodoInfo;
