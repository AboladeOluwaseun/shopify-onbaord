const notificationBellIcon = document.querySelector(".tag");
const notificationDropdown = document.getElementById("notification-dropdown");
const cancelButton = document.getElementById("close");

// notification bell toggle logic
notificationBellIcon.addEventListener("click", () => {
  if (
    notificationDropdown.style.display === "none" ||
    notificationDropdown.style.display === ""
  ) {
    notificationDropdown.style.display = "block";
  } else {
    notificationDropdown.style.display = "none";
  }
});

// toggle setup guide card logic

function toggleSetupGuideCard() {
  const setupGuideCard = document.querySelector(".setup-guide-card");
  const setupGuideCardToggle = document.getElementById("arrow-up");
  const arrowDown = document.getElementById("arrow-down");
  setupGuideCardToggle.addEventListener("click", () => {
    if (setupGuideCard.style.maxHeight) {
      setupGuideCard.style.maxHeight = null;
    } else {
      setupGuideCard.style.maxHeight = setupGuideCard.scrollHeight + "px";
      setupGuideCardToggle.style.display = "none";
      arrowDown.style.display = "block";
    }
  });

  arrowDown.addEventListener("click", () => {
    if (setupGuideCard.style.maxHeight) {
      setupGuideCard.style.maxHeight = null;
      setupGuideCardToggle.style.display = "block";
      arrowDown.style.display = "none";
    } else {
      setupGuideCard.style.maxHeight = setupGuideCard.scrollHeight + "px";
    }
  });
}

// Dismiss select callout logic
cancelButton.addEventListener("click", () => {
  document.getElementById("select-plan-tab").style.display = "none";
});

// dropdownmenu toggle logic
function app() {
  const menuTrigger = document.querySelector("#profile-menu");
  const menu = document.querySelector("#profile-menu-content");

  const allMenuItems = menu.querySelectorAll('[role="menuitem"]');

  function closeMenu() {
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }

  function handleMenuEscapeKeypress(event) {
    // if user pressed escape key
    if (event.key === "Escape") {
      toggleMenu();
    }
  }

  function handleMenuItemArrowKeyPress(event, menuItemIndex) {
    // create some helpful variables : isLastMenuItem, isFirstMenuItem
    const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
    const isFirstMenuItem = menuItemIndex === 0;

    const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
    const previousMenuItem = allMenuItems.item(menuItemIndex - 1);

    // if the user pressed arrow right or arrow down
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      // if user is on last item, focus on first menuitem
      if (isLastMenuItem) {
        allMenuItems.item(0).focus();

        return;
      }
      // then focus on next menu item
      nextMenuItem.focus();
    }

    // if the user pressed arrow up or arrow left
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (isFirstMenuItem) {
        allMenuItems.item(allMenuItems.length - 1).focus();
        return;
      }

      previousMenuItem.focus();
    }
    // then focus on the previous menu item
    // if the user is on first menu item, focus on last menuitem
  }

  function openMenu() {
    menuTrigger.ariaExpanded = "true";
    setTimeout(() => {
      if (allMenuItems.length > 0) {
        allMenuItems.item(0).focus();
      }
    }, 200);

    menu.addEventListener("keyup", handleMenuEscapeKeypress);

    // for each menu item, register an event listener for the keyup event
    allMenuItems.forEach(function (menuItem, menuItemIndex) {
      menuItem.addEventListener("keyup", function (event) {
        handleMenuItemArrowKeyPress(event, menuItemIndex);
      });
    });
  }

  function toggleMenu() {
    const isExpanded = menuTrigger.attributes["aria-expanded"].value === "true";
    menu.classList.toggle("menu-active");

    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  menuTrigger.addEventListener("click", toggleMenu);
}

// function updateParentHeight() {
//   const parentDiv = document.getElementById("customize-store ");
//   const visibleElements = Array.from(parentDiv.children).filter(element => element.offsetHeight > 0);

//   // Calculate the total height of visible elements
//   const totalHeight = visibleElements.reduce((acc, element) => acc + element.offsetHeight, 0);

//   // Set the height of the parent div
//   parentDiv.style.height = totalHeight + "px";
// }

// // Call the function whenever the visibility of the child elements changes
// // For example, after toggling the display property of any child element
// updateParentHeight();

app();
toggleSetupGuideCard();
