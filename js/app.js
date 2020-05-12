/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
// let activeSection = 0; //TODO: update to the active content box
// let navBarNames = []; //TODO: udpate to the dynamic nav navBarList
// let navBarRefs = []; //for section ID's to link the nav bar to
// let scrollUpText = 0; //TODO: text to be displayed to scroll back up, display if header is not visible
// let isHeaderVisible = true; //TODO: if header not visible show top of page button
// let navLinkWasClicked = true; //TODO: is this boolean or the button that was clicked
// let contentSectionIdArray = []; //done
// let navBarNames = []; //TODO: udpate to the dynamic nav navBarList
// let innerStringforNav = '';
let navBarRefs = getAttributeIntoArray('section', 'id');
let navBarNames = getTextOfTag(navBarRefs, '#', 'h2');
let innerStringforNav = buildNavString(navBarNames, navBarRefs, '#');
let text = testFunction();

testFunction = () => console.log("hello");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
  // helper functions for creating nav
function getAttributeIntoArray(element, attribute) {
  let array = [];
  const nodeList = document.querySelectorAll(element);
  for (let i = 0; i < nodeList.length; i++) {
    array.push(nodeList[i].getAttribute(attribute));
  }
  return array;
}

function getTextOfTag(elementsArray, prefix, tag) {
  let array = [];
  for (let i = 0; i < elementsArray.length; i++) {
    array.push(document.querySelector(`${prefix}${elementsArray[i]} ${tag}`).textContent);
  }
  return array;
}

  // helper function for checking if element is closet to the top of the screen
function closestToTop(el) {
  const windowHeight = window.innerHeight;
  const distanceToTop = el.getBoundingClientRect().top;
  const distanceToBottom = el.getBoundingClientRect().bottom;
  let aboveCheck = true;
  let belowCheck = true;
  if (Math.sign(distanceToTop) === -1) {
    aboveCheck = (distanceToBottom > windowHeight/2); // if the scetion top is above the view then see if the rest of the section is at least 50% of the sreen
  }
  else {
    belowCheck = (distanceToTop <= windowHeight/2); // if the section top is below the view then make sure it is within 50% of the page
  }
  const isClosest = (aboveCheck && belowCheck);
  return isClosest;
}

function getAttributeIntoArray2(element, attribute) {
  let string = '';
  const nodeList = document.querySelectorAll(element);
  for (let i = 0; i < nodeList.length; i++) {
    array.push(nodeList[i].getAttribute(attribute));
  }
  return array;
}

// helper function for back to top navbar__button
  // show button if scroll page down
function scrollTopButtonSet(elementName) {
  const element = document.querySelector(elementName);
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    element.style.display = "block";
  } else {
    element.style.display = "none";
  }
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
//TODO: build nav on document load?
function buildNavString(nameArray, refArrayNames, prefix) {
  let htmlString = '';
  for (let i = 0; i < nameArray.length; i++) {
    if (i > 0) {htmlString += '\n'};
    htmlString += `<li> <a class="menu__link" href="${prefix}${refArrayNames[i]}">${nameArray[i]}</a></li>`
  }
  return htmlString;
}

  // inserts the html in a location
function buildNav(string, location) {
  document.querySelector(location).innerHTML = string;
}

// Add class 'active' to section when near top of viewport

function setActiveClass(section) {
  let nodeList = document.querySelectorAll(section);
  for (let i = 0; i < nodeList.length; i++ ) {
    if (closestToTop(nodeList[i])) {
      nodeList[i].classList.add('your-active-class');
    } else {
      nodeList[i].classList.remove('your-active-class');
    }
  }
}

// Scroll to anchor ID using scrollTO event

function addClickListener(element, ref, ev) {
  const anchorRef = element.querySelector('a').getAttribute(ref);
  console.log(anchorRef);
  element.addEventListener(ev, function () {
    scrollToAction(anchorRef);
  });
}

function scrollToAction(anchorRef) {
  const element = document.querySelector(anchorRef);
  event.preventDefault();
  element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function placeClickListenerOnSection(section) {
  let nodeList = document.querySelectorAll(section);
  console.log(nodeList);
  for (let i = 0; i < nodeList.length; i++ ) {
    console.log(nodeList[i]);
    addClickListener(nodeList[i], 'href', 'click');
  }
}

// scroll to top
function topFunction() {
  event.preventDefault();
  document.documentElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  // document.body.scrollTop = 0; // For Safari
  // document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

document.addEventListener('DOMContentLoaded', function () {
  buildNav(innerStringforNav, '#navbar__list')
});

// Scroll to section on link click

document.addEventListener('DOMContentLoaded', function () {
  placeClickListenerOnSection('#navbar__list li');
});

// document.querySelector('#navbar__list').addEventListener('click', function () {
//   document.querySelector('#section3').scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
// });

// Set sections as active

document.addEventListener('scroll', function () {
  setActiveClass('section')
});

// on scroll show/hide back to top navbar__button
document.addEventListener('scroll', function () {
  scrollTopButtonSet('#navbar__top')
});
