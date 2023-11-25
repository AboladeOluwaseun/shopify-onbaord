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
  const guides = document.querySelectorAll(".guide");
  const guideCard = document.querySelector("#setup-guide-card");
  const allGuides = guideCard.querySelectorAll('[role="menuitem"]');
  guides[0].querySelector(".guide-detail").style.display = "flex";
  guides[0].classList.add("guide-active");

  setupGuideCardToggle.addEventListener("click", () => {
    setupGuideCard.classList.toggle("setup-guide-active");
    setupGuideCardToggle.style.display = "none";
    arrowDown.style.display = "block";
    allGuides[0].focus();
  });

  arrowDown.addEventListener("click", () => {
    setupGuideCard.classList.toggle("setup-guide-active");
    arrowDown.style.display = "none";
    setupGuideCardToggle.style.display = "block";
  });

  allGuides.forEach((guide, guideIndex) => {
    guide.setAttribute("tabindex", guideIndex); // Ensure the guide is focusable
    guide.addEventListener("keyup", function (event) {
      handleMenuItemArrowKeyPress(event, guideIndex);
    });
  });

  function handleMenuItemArrowKeyPress(event, menuItemIndex) {
    const isLastGuide = menuItemIndex === allGuides.length - 1;
    const isFirstGuide = menuItemIndex === 0;
    const nextGuideIndex = (menuItemIndex + 1) % allGuides.length;
    const previousGuideIndex =
      (menuItemIndex - 1 + allGuides.length) % allGuides.length;
    const currentGuide = guides[menuItemIndex];
    const currentGuideDetail = currentGuide.querySelector(".guide-detail");
    const isGuideActive = currentGuide.classList.contains("guide-active");
    const nextUncheckedIndex = getNextUncheckedGuideIndex(menuItemIndex);

    // Close details for all guides
    allGuides.forEach((guide) => {
      const guideDetail = guide.querySelector(".guide-detail");
      guideDetail.style.display = "none";
      guide.classList.remove("guide-active");
    });

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      if (isLastGuide) {
        allGuides[0].focus();
        openGuideDetail(allGuides[0]);
        return;
      }
      allGuides[nextGuideIndex].focus();
      openGuideDetail(allGuides[nextGuideIndex]);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (isFirstGuide) {
        allGuides[allGuides.length - 1].focus();
        openGuideDetail(allGuides[allGuides.length - 1]);
        return;
      }
      allGuides[previousGuideIndex].focus();
      openGuideDetail(allGuides[previousGuideIndex]);
    } else if (event.key === "Enter") {
      if (isGuideActive) {
        // Mark the current guide as completed or perform any other action
        markGuideAsCompleted(currentGuide);

        if (nextUncheckedIndex !== menuItemIndex) {
          // Focus on the next unchecked guide and open its detail
          allGuides[nextUncheckedIndex].focus();
          openGuideDetail(allGuides[nextUncheckedIndex]);
        }
      } else {
        // Open the guide detail of the currently focused guide
        currentGuideDetail.style.display = "flex";
        currentGuide.classList.add("guide-active");
      }
    }
  }

  function getNextUncheckedGuideIndex(startIndex) {
    let index = (startIndex + 1) % allGuides.length;
    while (index !== startIndex) {
      if (!allGuides[index].classList.contains("guide-active")) {
        return index;
      }
      index = (index + 1) % allGuides.length;
    }
    return startIndex;
  }

  function openGuideDetail(guide) {
    const guideDetail = guide.querySelector(".guide-detail");
    guideDetail.style.display = "flex";
    guide.classList.add("guide-active");
  }

  function markGuideAsCompleted(guide) {
    // Perform the action to mark the guide as completed (e.g., toggle checkbox)
    console.log(`Guide marked as completed: ${guide.textContent}`);
  }
}

// toggle setup guide card logic ends

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

  window.addEventListener("click", function (event) {
    if (event.target !== menuTrigger && event.target !== menu) {
      menu.classList.remove("menu-active");
    }
  });

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
  const HIDDEN_CLASS = "hidden";
  const MARK_AS_DONE = "checkbox-done";
  const checkBoxButton = document.querySelectorAll(".checkbox");
  const notCompletedIcon = document.querySelectorAll(".checkmark-circle");
  const completedIcon = document.querySelectorAll(".check-mark");
  const loadingSpinnerIcon = document.querySelectorAll(".loading-spinner");
  const checkBoxButtonStatus = document.querySelector("#checkbox-status");
  const guides = document.querySelectorAll(".guide");
  const allGuides = document.querySelectorAll('[role="menuitem"]');
  console.log(checkBoxButton);
  for (let i = 0; i < checkBoxButton.length; i++) {
    checkBoxButton[i].addEventListener("click", () => {
      handleMarkDoneOrNot(i);
      console.log(`${i} clicked`);
    });
  }
  function handleMarkDoneOrNot(i) {
    const markedAsDone = checkBoxButton[i].classList.contains(MARK_AS_DONE);
    if (markedAsDone) {
      handleMarkAsNotDone(i);
    } else {
      handleMarkAsDone(i);
    }
  }
  function handleMarkAsDone(i) {
    notCompletedIcon[i].classList.add(HIDDEN_CLASS);
    loadingSpinnerIcon[i].classList.remove(HIDDEN_CLASS);
    checkBoxButtonStatus.ariaLabel = "loading. please wait...";
    setTimeout(() => {
      loadingSpinnerIcon[i].classList.add(HIDDEN_CLASS);
      completedIcon[i].classList.remove(HIDDEN_CLASS);
      checkBoxButton[i].classList.add(MARK_AS_DONE);
      checkBoxButton[i].blur();
      checkBoxButton[i].ariaLabel = checkBoxButton[i].ariaLabel.replace(
        "as done",
        "as not done"
      );
      checkBoxButtonStatus.ariaLabel = "successfully marked as done";
      // Close the setup-detail of the selected guide
      guides[i].querySelector(".guide-detail").style.display = "none";
      guides[i].classList.remove("guide-active");

      // Check if all guides are now checked
      const allGuidesChecked = Array.from(notCompletedIcon).every((el) =>
        el.classList.contains(HIDDEN_CLASS)
      );
      if (allGuidesChecked) {
        for (let k = 0; k < guides.length; k++) {
          guides[k].querySelector(".guide-detail").style.display = "none";
          guides[k].classList.remove("guide-active");
        }
      } else {
        // Find the next unchecked checkmark-circle
        let nextUncheckedIndex = (i + 1) % notCompletedIcon.length;
        while (
          nextUncheckedIndex !== i &&
          notCompletedIcon[nextUncheckedIndex].classList.contains(HIDDEN_CLASS)
        ) {
          nextUncheckedIndex =
            (nextUncheckedIndex + 1) % notCompletedIcon.length;
          allGuides[nextUncheckedIndex].focus();
        }

        // Find the corresponding guide for the next unchecked checkmark-circle
        let nextGuideIndex = parseInt(
          notCompletedIcon[nextUncheckedIndex].getAttribute("data-guide-index")
        );

        // Toggle the guide details visibility for the next unchecked guide
        const nextGuideDetail =
          guides[nextGuideIndex].querySelector(".guide-detail");
        nextGuideDetail.style.display = "flex";
        guides[nextGuideIndex].classList.add("guide-active");

        // Hide all other guide details
        for (let k = 0; k < guides.length; k++) {
          if (
            k !== nextGuideIndex &&
            window.getComputedStyle(guides[k].querySelector(".guide-detail"))
              .display === "flex"
          ) {
            guides[k].querySelector(".guide-detail").style.display = "none";
            guides[k].classList.remove("guide-active");
          }
        }
      }
      // Update the progress bar
      updateProgressBar();
    }, 2000);
  }
  function handleMarkAsNotDone(i) {
    completedIcon[i].classList.add(HIDDEN_CLASS);
    loadingSpinnerIcon[i].classList.remove(HIDDEN_CLASS);
    checkBoxButtonStatus.ariaLabel = "loading. please wait...";
    setTimeout(
      () => {
        loadingSpinnerIcon[i].classList.add(HIDDEN_CLASS);
        notCompletedIcon[i].classList.remove(HIDDEN_CLASS);
        checkBoxButton[i].classList.remove(MARK_AS_DONE);
        checkBoxButton[i].ariaLabel = checkBoxButton[i].ariaLabel.replace(
          "as not done",
          "as done"
        );
        checkBoxButtonStatus.ariaLabel = "successfully marked as not done";
        // Update the progress bar
        updateProgressBar();
      },

      2000
    );
  }
}

function updateProgressBar() {
  const notCompletedIcon = document.querySelectorAll(".checkmark-circle");
  const progressBar = document.querySelector(".bar-loading");
  const progressText = document.querySelector(".setup-level-completed-text");

  const checkedCount = Array.from(notCompletedIcon).filter((el) =>
    el.classList.contains("hidden")
  ).length;

  const totalGuides = notCompletedIcon.length;
  const progressFraction = `${checkedCount}/${totalGuides}`;

  const progressPercentage = (checkedCount / totalGuides) * 100;

  progressBar.style.width = `${progressPercentage}%`;
  progressBar.classList.add("loading");
  progressBar.style.width = `${progressPercentage}%`;
  progressText.innerHTML = `${progressFraction} completed`;
}

app();
toggleSetupGuideCard();
handleCompleteSetupGuide();
