(() => {
  const popupWrap = document.getElementById('coach-popup-wrap');
  const popupParts = {
    profile: document.getElementById('coach-profile'),
    tabs: document.getElementById('coach-tabs'),
    content: document.getElementById('coach-content')
  }

  let currentCoach = null;

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
    `
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

  function renderTabButtons() {
    popupParts.tabs.innerHTML = '';

    popupParts.tabs.innerHTML = `
      <button id="education">Образование</button>
      <button id="experience">Опыт работы</button>
      <button id="rewards">Награды</button>
    `;

    for (const tab of popupParts.tabs.children) {
      tab.addEventListener('click', handleTabClick);
    }
  }

  function handleTabClick(event) {
    if (currentCoach) {
      const selectedTab = event.target;

      for (const tab of popupParts.tabs.children) {
        tab.classList.remove('active');
      }
      selectedTab.classList.add('active');

      loadCoachPopupContent(selectedTab.id, currentCoach);
    }
  }

  function loadCoachPopupContent(callTab, coach) {
    popupParts.content.innerHTML = '';

    popupParts.content.innerHTML = coach.details[callTab];
  }

  function showCoachPopup(coach) {
    currentCoach = coach;

    renderProfileSection(currentCoach);
    renderTabButtons();

    loadCoachPopupContent('education', coach);
    popupParts.tabs.querySelector('#education').classList.add('active');

    popupWrap.style.visibility = 'visible';
  }

  function closeCoachPopup() {
    for (const key in popupParts) {
      popupParts[key].innerHTML = '';
    }

    currentCoach = null;

    popupWrap.style.visibility = 'hidden';
  }

  function initializeModule() {
    popupWrap.style.visibility = 'hidden';
    popupWrap.addEventListener('click', handleOuterClick);

    window.showCoachPopup = showCoachPopup;
  }

  document.addEventListener('DOMContentLoaded', initializeModule);
})();