(() => {
  const menuContainer = document.getElementById('menu');

  const menuOpenButton = document.getElementById('menu-open');
  const menuCloseButton = document.getElementById('menu-close');
  
  function hideMenu() {
    menuContainer.classList.add('hidden-mobile');
  }

  function showMenu() {
    menuContainer.classList.remove('hidden-mobile');
  }

  function initializeModule() {
    hideMenu();

    menuOpenButton.addEventListener('click', showMenu);

    menuCloseButton.addEventListener('click', hideMenu);
  }

  document.addEventListener('DOMContentLoaded', initializeModule);
})();