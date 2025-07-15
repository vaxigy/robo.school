(() => {
  const popupWrap = document.getElementById('coach-popup-wrap');
  const popupParts = {
    profile: document.getElementById('coach-profile'),
    tabs: document.getElementById('coach-tabs'),
    content: document.getElementById('coach-content')
  }

  function handleOuterClick(event) {
    if (event.target === popupWrap) {
      closeCoachPopup();
    }
  }

  function createCoachAvatar(coach) {
    const avatar = document.createElement('img');
    avatar.setAttribute('src', coach.image);
    avatar.setAttribute('alt', 'coach');
    return avatar;
  }

  function createCoachInfo(coach) {
    const info = document.createElement('div');
    info.classList.add('coach-info');
    info.innerHTML = `
      <div class="coach-info">
        <h3>${coach.name}</h3>
        <p>${coach.occupation}</p>
        <div class="coach-social">
          <img src="./assets/images/icon-facebook.png" alt="facebook">
          <img src="./assets/images/icon-instagram.png" alt="instagram">
        </div>
      </div>
    `;
    return info;
  }

  function createCloseButton() {
    const button = document.createElement('button');
    button.innerText = 'Закрыть';
    button.addEventListener('click', closeCoachPopup);
    return button;
  }

  function renderProfileSection(coach) {
    popupParts.profile.innerHTML = '';

    const avatar = createCoachAvatar(coach);
    const info = createCoachInfo(coach);
    const closeButton = createCloseButton();

    popupParts.profile.appendChild(avatar);
    popupParts.profile.appendChild(info);
    popupParts.profile.appendChild(closeButton);
  }

  function renderTabButtons(coach) {
    popupParts.tabs.innerHTML = '';

    popupParts.tabs.innerHTML = `
      <button content-key="education">Образование</button>
      <button content-key="experience">Опыт работы</button>
      <button content-key="rewards">Награды</button>
    `;

    popupParts.tabs.addEventListener('click', event => handleTabClick(event, coach));
  }

  function handleTabClick(event, coach) {
    if (event.target.tagName === 'BUTTON') {
      const selectedTab = event.target;

      for (const tab of popupParts.tabs.children) {
        tab.classList.remove('active');
      }
      selectedTab.classList.add('active');

      loadCoachPopupContent(coach, selectedTab.getAttribute('content-key'));
    }
  }

  function loadCoachPopupContent(coach, contentKey) {
    popupParts.content.innerHTML = '';

    popupParts.content.innerHTML = coach.details[contentKey];
  }

  function showCoachPopup(coach) {
    renderProfileSection(coach);
    renderTabButtons(coach);

    loadCoachPopupContent(coach, 'education');
    popupParts.tabs.querySelector('[content-key="education"]').classList.add('active');

    popupWrap.style.visibility = 'visible';
  }

  function closeCoachPopup() {
    for (const key in popupParts) {
      popupParts[key].innerHTML = '';
    }

    popupWrap.style.visibility = 'hidden';
  }

  function initializeModule() {
    popupWrap.style.visibility = 'hidden';
    popupWrap.addEventListener('click', handleOuterClick);

    window.showCoachPopup = showCoachPopup;
  }

  document.addEventListener('DOMContentLoaded', initializeModule);
})();