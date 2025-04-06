// const slider = document.querySelector(".slider");

// //const leftArrow = document.querySelector(".left");
// //const rightArrow = document.querySelector(".right");
// const indicatorParents = document.querySelector('.slider-controls ul');
// let sectionIndex = 0;
// let numberOfSlide = 7;
// const leftArrow = document.getElementById("arrowLeft");
// const rightArrow = document.getElementById("arrowRight");

// document.querySelectorAll('.slider-controls li').forEach(function (indicator, ind) {
//     indicator.addEventListener('click', function () {
//         sectionIndex = ind;
//         document.querySelector('.slider-controls .selected').classList.remove('selected');
//         indicator.classList.add('selected');
//         slider.style.transform = 'translate(' + (sectionIndex) * -100/numberOfSlide +'%)';
//     });
// });

// // rightArrow.addEventListener('click', function () {
// //     sectionIndex = (sectionIndex < numberOfSlide-1) ? sectionIndex + 1 : numberOfSlide-1;
// //     document.querySelector('.slider-controls .selected').classList.remove('selected');
// //     indicatorParents.children[sectionIndex].classList.add('selected');
// //     slider.style.transform = 'translate(' + (sectionIndex) * -100/numberOfSlide +'%)';
// // });

// // leftArrow.addEventListener('click', function () {
// //     sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
// //     document.querySelector('.slider-controls .selected').classList.remove('selected');
// //     indicatorParents.children[sectionIndex].classList.add('selected');
// //     slider.style.transform = 'translate(' + (sectionIndex) * -100/numberOfSlide +'%)';
// // });

// // Add event listeners for both click and touch
// function addMultiEventListener(element, handler) {
//     element.addEventListener('click', handler);
//     element.addEventListener('touchend', function (e) {
//         e.preventDefault(); // Prevent double firing
//         handler();
//     }, { passive: false });
// }

// addMultiEventListener(rightArrow, function () {
//     if (sectionIndex < numberOfSlide - 1) {
//         sectionIndex++;
//         updateSlider();
//     }else{
//         sectionIndex =0;
//         updateSlider();
//     }
// });
// addMultiEventListener(leftArrow, function () {
//     if (sectionIndex > 0) {
//         sectionIndex--;
//         updateSlider();
//     }else{
//         sectionIndex = numberOfSlide-1;
//         updateSlider();
//     }
// });
// let touchStartX = 0;
// let touchEndX = 0;

// slider.addEventListener('touchstart', function (e) {
//     touchStartX = e.changedTouches[0].screenX;
// }, false);

// slider.addEventListener('touchend', function (e) {
//     touchEndX = e.changedTouches[0].screenX;
//     handleSwipeGesture();
// }, false);

// function handleSwipeGesture() {
//     const swipeThreshold = 50; // Minimum swipe distance in px

//     if (touchEndX < touchStartX - swipeThreshold) {
//         // Swiped Left
//         if (sectionIndex < numberOfSlide - 1) {
//             sectionIndex++;
//             updateSlider();
//         }
//     }

//     if (touchEndX > touchStartX + swipeThreshold) {
//         // Swiped Right
//         if (sectionIndex > 0) {
//             sectionIndex--;
//             updateSlider();
//         }
//     }
// }

// function updateSlider() {
//     document.querySelector('.slider-controls .selected').classList.remove('selected');
//     indicatorParents.children[sectionIndex].classList.add('selected');
//     slider.style.transform = 'translate(' + (sectionIndex * -100 / numberOfSlide) + '%)';
// }