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
    setupGuideCard.classList.toggle("setup-guide-active");
    console.log(setupGuideCard.clientHeight);
  });

  arrowDown.addEventListener("click", () => {
    setupGuideCard.style.display = "block";
    arrowDown.style.display = "none";
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

function toggleGuideDetail() {
  const guideTitles = document.getElementsByClassName("guide-title");
  const guides = document.getElementsByClassName("guide");

  for (let i = 0; i < guideTitles.length; i++) {
    guideTitles[i].querySelector(".title").addEventListener("click", () => {
      const guideDetail = guideTitles[i].nextElementSibling;

      // Check if the clicked guide title is the currently expanded one
      const isGuideActive = guides[i].classList.contains("guide-active");

      // Hide all guide details
      hideAllGuideDetails();

      // Toggle guide detail visibility
      if (!isGuideActive) {
        guideDetail.style.display = "flex";
        guides[i].classList.add("guide-active");
      }
    });
  }
}

// Helper function to hide all guide details
function hideAllGuideDetails() {
  const guideDetails = document.querySelectorAll(".guide-detail");
  guideDetails.forEach((guideDetail) => {
    guideDetail.style.display = "none";
  });

  const guides = document.querySelectorAll(".guide");
  guides.forEach((guide) => {
    guide.classList.remove("guide-active");
  });
}

function handleCompleteSetupGuide() {
  const checkEllipse = document.querySelectorAll(".checkmark-circle");
  const checkmark = document.querySelectorAll(".check-mark");
  const guides = document.querySelectorAll(".guide");

  for (let i = 0; i < checkEllipse.length; i++) {
    checkEllipse[i].addEventListener("click", () => {
      if (!checkEllipse[i].classList.contains("visible-1")) {
        // Mark current guide as completed with animation
        checkEllipse[i].classList.toggle("visible-1");
        checkEllipse[i].style.transform = "scale(0)"; // Hide checkmark with animation
        checkmark[i].classList.toggle("visible-2");
        checkmark[i].style.opacity = 1; // Show check icon with animation

        // Close the setup-detail of the selected guide
        guides[i].querySelector('.guide-detail').style.display = "none";
        guides[i].classList.remove("guide-active");

        // Check if all guides are now checked
        const allGuidesChecked = Array.from(checkEllipse).every((el) => el.classList.contains("visible-1"));

        // If all guides are checked, close the setup-details for all guides
        if (allGuidesChecked) {
          for (let k = 0; k < guides.length; k++) {
            guides[k].querySelector('.guide-detail').style.display = "none";
            guides[k].classList.remove("guide-active");
          }
        } else {
          // Find the next unchecked checkmark-circle
          let nextUncheckedIndex = (i + 1) % checkEllipse.length;
          while (nextUncheckedIndex !== i && checkEllipse[nextUncheckedIndex].classList.contains("visible-1")) {
            nextUncheckedIndex = (nextUncheckedIndex + 1) % checkEllipse.length;
          }

          // Find the corresponding guide for the next unchecked checkmark-circle
          let nextGuideIndex = parseInt(checkEllipse[nextUncheckedIndex].getAttribute("data-guide-index"));

          // Toggle the guide details visibility for the next unchecked guide
          const nextGuideDetail = guides[nextGuideIndex].querySelector('.guide-detail');
          nextGuideDetail.style.display = "flex";
          guides[nextGuideIndex].classList.add("guide-active");

          // Hide all other guide details
          for (let k = 0; k < guides.length; k++) {
            if (k !== nextGuideIndex && window.getComputedStyle(guides[k].querySelector('.guide-detail')).display === "flex") {
              guides[k].querySelector('.guide-detail').style.display = "none";
              guides[k].classList.remove("guide-active");
            }
          }
        }
      }
    });

    checkmark[i].addEventListener("click", () => {
      checkEllipse[i].classList.toggle("visible-1");
      checkEllipse[i].style.transform = "scale(1)"; // Show checkmark with animation
      checkmark[i].classList.toggle("visible-2");
      checkmark[i].style.opacity = 0; // Hide check icon with animation
      // guides[i].querySelector('.guide-detail').style.display = "flex";
    });
  }
}






app();
toggleSetupGuideCard();
toggleGuideDetail();
handleCompleteSetupGuide();
