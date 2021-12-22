'use strict'

//global variables
const articlesDescription = document.querySelectorAll('.articles__item-description');
const menuButton = document.querySelector('.menu-button');
const body =  document.querySelector('body');
const backToTop = document.querySelector('.back-to-top__button');


//mobile menu
menuButton.addEventListener('click', () => {
    body.classList.toggle('mobile-open');
})

window.addEventListener('resize', () => {
    body.classList.remove('mobile-open');
})

//cut article
articlesDescription.forEach(description => {
    let maxLength = 131;
    description.innerHTML = description.innerHTML.length > maxLength ? description.innerHTML.substring(0, maxLength) + ' …' : description.innerHTML;
});

//back to top
window.addEventListener('scroll', () => {
    (window.pageYOffset > document.documentElement.clientHeight / 2) ? backToTop.classList.add('active') : backToTop.classList.remove('active');
});

backToTop.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo ({ 
        top: 0, 
        behavior: 'smooth' 
    })
});