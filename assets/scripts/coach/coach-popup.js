(() => {
  const body = document.querySelector('body');

  const popupWrap = document.getElementById('coach-popup-wrap');
  const popupParts = {
    profile: document.getElementById('coach-profile'),
    tabs: document.getElementById('coach-tabs'),
    content: document.getElementById('coach-content')
  };

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

  function createCoachSocial(coach) {
    const socialData = coach.social;

    const socialContainer = document.createElement('div');
    socialContainer.classList.add('coach-social');

    for (const key in socialData) {
      const socialElement = document.createElement('a');
      socialElement.setAttribute('href', socialData[key]);
      socialElement.setAttribute('target', '_blank');
      socialElement.setAttribute('load-icon', key);

      socialContainer.appendChild(socialElement);
    }

    return socialContainer;
  }

  function createCoachInfo(coach) {
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('coach-info');

    infoContainer.innerHTML = `
      <h3>${coach.name}</h3>
      <p>${coach.occupation}</p>
    `;
    infoContainer.appendChild(createCoachSocial(coach));

    return infoContainer;
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
    
    body.classList.add('popup-open');
  }

  function closeCoachPopup() {
    for (const key in popupParts) {
      popupParts[key].innerHTML = '';
    }

    popupWrap.style.visibility = 'hidden';

    body.classList.remove('popup-open');
  }

  function initializeModule() {
    popupWrap.style.visibility = 'hidden';
    popupWrap.addEventListener('click', handleOuterClick);

    window.showCoachPopup = showCoachPopup;
  }

  document.addEventListener('DOMContentLoaded', initializeModule);
})();