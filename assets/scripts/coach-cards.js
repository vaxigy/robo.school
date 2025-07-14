(() => {
  const SCROLL_DELTA = 370;

  const coachesWrap = document.getElementById('coaches-wrap');
  const coachesContainer = document.getElementById('coach-list');

  function createCoachCard(coach) {
    const card = document.createElement('div');
    card.classList.add('coach');
    card.innerHTML = `
      <img src="${coach.image}" alt="coach">
      <h3>${coach.name}</h3>
      <p>${coach.occupation}</p>
      <button>Подробнее</button>
    `;

    card.querySelectorAll('img, button').forEach(
      element => element.addEventListener('click', () => handleCoachCardClick(coach))
    );

    return card;
  }

  function handleCoachCardClick(coach) {
    showCoachPopup(coach);
  }

  function renderCoachCards() {
    coachData.forEach(coach => {
      const card = createCoachCard(coach);
      coachesContainer.appendChild(card);
    });
  }

  function createScrollButton(className) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.addEventListener('click', handleScrollButtonClick);
    return button;
  }
  
  function handleScrollButtonClick(event) {
    const isLeftScroll = event.target.classList.contains('left-arrow');
    const scrollAmount = isLeftScroll ? -SCROLL_DELTA : SCROLL_DELTA;
  
    coachesContainer.scrollTo({
      left: coachesContainer.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  }

  function initializeScrollButtons() {
    const leftScroll = createScrollButton('left-arrow');
    const rightScroll = createScrollButton('right-arrow');
    
    coachesWrap.appendChild(leftScroll);
    coachesWrap.appendChild(rightScroll);
  }

  function initializeModule() {
    renderCoachCards();
    initializeScrollButtons();
  }

  document.addEventListener('DOMContentLoaded', initializeModule);
})();