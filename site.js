const search = document.querySelector('#project-search');
const status = document.querySelector('#search-status');
const groups = [...document.querySelectorAll('.project-group')].map(section => ({
  section,
  projects: [...section.querySelectorAll('li')].map(item => ({
    item,
    text: item.innerText.toLowerCase(),
  })),
}));

document.querySelector('.search').hidden = false;

search.addEventListener('input', () => {
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let matches = 0;
  for (const { section, projects } of groups) {
    let groupMatches = 0;
    for (const { item, text } of projects) {
      item.hidden = !terms.every(term => text.includes(term));
      if (!item.hidden) groupMatches++;
    }
    section.hidden = groupMatches === 0;
    matches += groupMatches;
  }
  status.textContent = terms.length ? `${matches} ${matches === 1 ? 'project' : 'projects'} found` : '';
});
