// variables
var elem = document.querySelector('.site-wrap');
const nytapi = 'uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0';
const limit = 6;
const categories = navItemsObject.map(item => item.label);
const nav = document.querySelector('nav');
let topOfNav = nav.offsetTop;

function renderNav() {
  const markup = `
  <ul>
    ${navItemsObject
      .map(
        item => `<li><a data-scroll href="${item.link}">${item.label}</a></li>`,
      )
      .join('')}
  </ul>
  `;
  nav.innerHTML = markup;

  const logo = document.createElement('li');
  const navList = nav.querySelector('nav ul');
  logo.classList.add('logo');
  logo.innerHTML = '<a href="#"><img src="img/logo.svg" /></a>';
  navList.prepend(logo);
}

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

function getArticlesByCategory(cat) {
  cat.forEach(function(category, index) {
    fetchArticles(category, index);
  });
}

function fetchArticles(section) {
  fetch(
    `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${nytapi}`,
  )
    .then(response => response.json())
    .then(myJson => renderStories(myJson));
}

function renderStories(data) {
  var sectionHead = document.createElement('div');
  sectionHead.id = data.section;
  sectionHead.innerHTML = `<h3 class="section-head">${data.section}</h3>`;
  elem.prepend(sectionHead);

  stories = data.results.slice(0, limit);

  stories.forEach(story => {
    storyEl = document.createElement('div');
    storyEl.className = 'entry';
    storyEl.innerHTML = `
    <img src="${story.multimedia.length > 0
      ? story.multimedia[0].url
      : 'img/no-image.png'}" />
    <div>
      <h3><a target="_blank" href="${story.short_url}">${story.title}</a></h3>
      <p>${story.abstract}</p>
    </div>
    `;
    sectionHead.append(storyEl);
  });
}

renderNav();
window.addEventListener('scroll', fixNav);
getArticlesByCategory(categories);
