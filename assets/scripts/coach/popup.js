(() => {
  const DOM_IDS = {
    popupWrap: 'coach-popup-wrap',
    profileContainer: 'coach-profile',
    tabsContainer: 'coach-tabs',
    contentContainer: 'coach-content',
    tabsTriggerMobile: 'coach-tabs-trigger-mobile'
  };

  const MOBILE_BREAKPOINT = '(max-width: 648px)';

  const DOMElements = {
    body: document.querySelector('body'),

    popupWrap: document.getElementById(DOM_IDS.popupWrap),

    profileContainer: document.getElementById(DOM_IDS.profileContainer),
    tabsContainer: document.getElementById(DOM_IDS.tabsContainer),
    contentContainer: document.getElementById(DOM_IDS.contentContainer),

    tabsTriggerMobile: document.getElementById(DOM_IDS.tabsTriggerMobile)
  };

  const isMobile = window.matchMedia(MOBILE_BREAKPOINT).matches;

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
  };

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
  };

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

    if (isMobile) {
      DOMElements.tabsTriggerMobile
        .addEventListener('click', toggleTabsMobile);
    }
  }

  function handleOuterClick(event) {
    if (event.target === DOMElements.popupWrap) {
      closeCoachPopup();
    }
  }

  function handleTabClick(event, coach) {
    const target = event.target;

    if (target.parentNode === DOMElements.tabsContainer) {
      showTab(target, coach);
    }
  }

  function showTab(targetTab, coach) {
    for (const tab of DOMElements.tabsContainer.children) {
      tab.classList.remove('active');
    }
    targetTab.classList.add('active');

    if (isMobile) {
      DOMElements.tabsTriggerMobile
        .querySelector(':first-child').innerText = targetTab.innerText;

      toggleTabsMobile(true);
    }

    loadCoachContent(coach, targetTab.getAttribute('content-key'));
  }

  function loadCoachContent(coach, contentKey) {
    utils.clearNode(DOMElements.contentContainer);

    DOMElements.contentContainer.innerText = coach.details[contentKey];
  }
  
  function toggleTabsMobile(force) {
    force = typeof force === 'boolean' ? force : undefined;
    DOMElements.tabsContainer.classList.toggle('hidden-mobile', force);
  }

  function showCoachPopup(coach) {
    renderProfile(coach);
    renderTabs(coach);

    const initialTab = DOMElements.tabsContainer
      .querySelector(`[content-key="${contentKeys.EDUCATION}"]`);
    showTab(initialTab, coach);

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