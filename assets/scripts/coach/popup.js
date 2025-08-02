(() => {
  const DOM_IDS = {
    popupWrap: 'coach-popup-wrap',
    profileContainer: 'coach-profile',
    tabsContainer: 'coach-tabs',
    contentContainer: 'coach-content',
  }

  const DOMElements = {
    body: document.querySelector('body'),

    popupWrap: document.getElementById(DOM_IDS.popupWrap),

    profileContainer: document.getElementById(DOM_IDS.profileContainer),
    tabsContainer: document.getElementById(DOM_IDS.tabsContainer),
    contentContainer: document.getElementById(DOM_IDS.contentContainer),
  };

  const contentKeys = {
    EDUCATION: 'education',
    EXPERIENCE: 'experience',
    REWARDS: 'rewards'
  };

  const contentKeysLabels = {
    [contentKeys.EDUCATION]: 'Образование',
    [contentKeys.EXPERIENCE]: 'Опыт работы',
    [contentKeys.REWARDS]: 'Награды'
  };

  const utils = {
    clearNode: function (node) {
      node.innerHTML = '';
    }
  }

  const elementFactory = {
    createAvatar: function (coach) {
      const avatar = document.createElement('img');
      avatar.setAttribute('src', coach.image);
      avatar.setAttribute('alt', 'coach');
      return avatar;
    },

    createSocial: function (coach) {
      const socialData = coach.social;

      const socialContainer = document.createElement('div');
      socialContainer.classList.add('coach-social');

      for (const socialType in socialData) {
        const socialLink = document.createElement('a');
        socialLink.setAttribute('href', socialData[socialType]);
        socialLink.setAttribute('target', '_blank');
        socialLink.setAttribute('rel', 'noopener noreferrer');
        socialLink.setAttribute('social-type', socialType);

        socialContainer.appendChild(socialLink);
      }

      return socialContainer;
    },

    createInfo: function (coach) {
      const infoContainer = document.createElement('div');
      infoContainer.classList.add('coach-info');

      infoContainer.innerHTML = `
        <h3>${coach.name}</h3>
        <p>${coach.occupation}</p>
      `;
      infoContainer.appendChild(elementFactory.createSocial(coach));

      return infoContainer;
    },

    createCloseButton: function () {
      const button = document.createElement('button');
      button.innerText = 'Закрыть';
      button.addEventListener('click', closeCoachPopup);
      return button;
    },

    createTabButton: function (contentKey, innerText) {
      const tab = document.createElement('button');
      tab.setAttribute('content-key', contentKey);
      tab.innerText = innerText;
      return tab;
    }
  }

  function renderProfile(coach) {
    utils.clearNode(DOMElements.profileContainer);

    const avatar = elementFactory.createAvatar(coach);
    const info = elementFactory.createInfo(coach);
    const closeButton = elementFactory.createCloseButton();

    DOMElements.profileContainer.appendChild(avatar);
    DOMElements.profileContainer.appendChild(info);
    DOMElements.profileContainer.appendChild(closeButton);
  }

  function renderTabs(coach) {
    utils.clearNode(DOMElements.tabsContainer);

    Object.values(contentKeys).forEach((contentKey) => {
      const tab = elementFactory.createTabButton(
        contentKey,
        contentKeysLabels[contentKey]
      );

      DOMElements.tabsContainer.appendChild(tab);
    });

    DOMElements.tabsContainer.addEventListener(
      'click',
      (event) => handleTabClick(event, coach)
    );
  }

  function handleOuterClick(event) {
    if (event.target === DOMElements.popupWrap) {
      closeCoachPopup();
    }
  }

  function handleTabClick(event, coach) {
    const target = event.target;

    if (target.parentNode === DOMElements.tabsContainer) {
      const selectedTab = target;

      for (const tab of DOMElements.tabsContainer.children) {
        tab.classList.remove('active');
      }
      selectedTab.classList.add('active');

      loadCoachContent(coach, selectedTab.getAttribute('content-key'));
    }
  }

  function loadCoachContent(coach, contentKey) {
    utils.clearNode(DOMElements.contentContainer);

    DOMElements.contentContainer.innerText = coach.details[contentKey];
  }

  function showCoachPopup(coach) {
    renderProfile(coach);
    renderTabs(coach);

    loadCoachContent(coach, contentKeys.EDUCATION);
    DOMElements.tabsContainer
      .querySelector(`[content-key=${contentKeys.EDUCATION}]`)
      .classList.add('active');

    DOMElements.popupWrap.classList.add('active');

    DOMElements.body.classList.add('popup-open');
  }

  function closeCoachPopup() {
    [
      DOMElements.profileContainer,
      DOMElements.tabsContainer,
      DOMElements.contentContainer
    ].forEach(utils.clearNode);

    DOMElements.popupWrap.classList.remove('active');

    DOMElements.body.classList.remove('popup-open');
  }

  function initializeModule() {
    DOMElements.popupWrap.classList.remove('active');

    DOMElements.popupWrap.addEventListener('click', handleOuterClick);

    window.showCoachPopup = showCoachPopup;
  }

  document.addEventListener('DOMContentLoaded', initializeModule);
})();