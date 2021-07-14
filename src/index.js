// import './sass/main.scss';


// const colors = [
//     '#FFFFFF',
//     '#2196F3',
//     '#4CAF50',
//     '#FF9800',
//     '#009688',
//     '#795548',
//   ];

//   const refs = {
//     start: document.querySelector('button[data-start]'),
//     stop: document.querySelector('button[data-stop]'),
//     body: document.body,
// }

// const INTERVAL_DELAY = 1050;
// let intervalId = null;


// const getRandomHexColor = () => {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
//   }

//   refs.start.addEventListener('click', changeColor);
// refs.stop.addEventListener('click', stopColor);

// function changeColor () {
    //     intervalId = setInterval(() => {
        //         refs.body.style.background = getRandomHexColor();
//     }, INTERVAL_DELAY);
//     refs.start.disabled = true;
// };

// function stopColor() {
    //     clearInterval(intervalId);
    //     refs.start.disabled = false;
    // }
    
    
    /*
    * - Пагинация
    *   - страница и кол-во на странице
    * - Загружаем статьи при сабмите формы
    * - Загружаем статьи при нажатии на кнопку «Загрузить еще»
    * - Обновляем страницу в параметрах запроса
    * - Рисуем статьи
    * - Сброс значения при поиске по новому критерию
    *
    * https://newsapi.org/
    * 4330ebfabc654a6992c2aa792f3173a3
    * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
    */
   
   /*
 * - Пагинация
 *   - страница и кол-во на странице
 * - Загружаем статьи при сабмите формы
 * - Загружаем статьи при нажатии на кнопку «Загрузить еще»
 * - Обновляем страницу в параметрах запроса
 * - Рисуем статьи
 * - Сброс значения при поиске по новому критерию
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 */

import articlesTpl from './templates/articles.hbs';
import './sass/main.scss';
import NewsApiService from './JS/news-service';
import LoadMoreBtn from './JS/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('.js-search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
}

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}