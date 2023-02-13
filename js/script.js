document.querySelector('.top__icon').addEventListener('click', ()=>{
   changeTheme();
});

if (localStorage.getItem('isDark') == 'true') {
   document.body.classList.toggle("dark-theme");
}

const form = document.querySelector('.form');
const formBtn = document.querySelector('.form__checkicon');
const input = document.querySelector('.form__input');
const todoBox = document.querySelector('.todo-box__list');
const footer = document.querySelector('.footer');
const counterBox = document.querySelector('.footer__left');
const allBtn = document.querySelector('.center__btn--all');

let arr = [];

if (localStorage.getItem('arr')) {
   arr = JSON.parse(localStorage.getItem('arr'));
   renderElements(arr);
   displayElement(footer, arr);
   setCounter(counterBox, arr);
   allBtn.classList.add('active__footer');
}
form.addEventListener('submit', (e)=> {
   e.preventDefault;
   if (input.value != '') {
      const task = {
         value: input.value,
         completed: false
      }
      arr.push(task);
   }
   renderElements(arr);
   form.reset();
   displayElement(footer, arr);
   setCounter(counterBox, arr);
   deleteActiveFooter();
   allBtn.classList.add('active__footer');
   arrToLocalStorage();
});

todoBox.addEventListener('click', (e) => {
   if (e.target.classList.contains('item__x')) {
      arr.splice(e.target.parentElement.id, 1);
      renderElements(arr);
      displayElement(footer, arr);
      setCounter(counterBox, arr);
      arrToLocalStorage();
   }
   if (e.target.classList.contains('item__checkicon')) {
      e.target.nextElementSibling.classList.toggle('completed');
      e.target.classList.toggle('active');
      if (document.querySelector('.center__btn--active').classList.contains('active__footer') || document.querySelector('.center__btn--completed').classList.contains('active__footer')) {
         e.target.parentElement.style.display = 'none';
      }
      if (e.target.classList.contains('active')) {
         arr[e.target.parentElement.id].completed = true;
      } else {
         arr[e.target.parentElement.id].completed = false;
      }
   }
   arrToLocalStorage();
});

function renderElements (arr) {
   todoBox.innerHTML = "";
   arr.forEach((item, count) => {
      if (item.completed) {
         todoBox.innerHTML += `
            <li class="todo-box__item item" id="${count}">
               <div class="item__checkicon checkicon active"></div>
               <div class="item__text completed">${item.value}</div>
               <img class="item__x" src="img/icon-cross.svg" alt="">
            </li>
            `
      } else {
         todoBox.innerHTML += `
            <li class="todo-box__item item" id="${count}">
               <div class="item__checkicon checkicon"></div>
               <div class="item__text">${item.value}</div>
               <img class="item__x" src="img/icon-cross.svg" alt="">
            </li>
            `
      }
   });
}
function displayElement (element, arr) {
   if (arr.length !== 0) {
      element.style.display = 'flex';
   } else if (arr.length === 0) {
      element.style.display = 'none';
   }
}
function setCounter (box, arr) {
   if (arr.length == 1) {
      box.textContent = `${arr.length} item left`;
   } else {
      box.textContent = `${arr.length} items left`;
   }
}

footer.addEventListener('click', (e) =>{
   if(e.target.classList.contains('center__btn--all')) {
      deleteActiveFooter();
      e.target.classList.add('active__footer');
      arr.forEach((el, i) => {
         todoBox.children[i].style.display = "flex";
      });
   } else if(e.target.classList.contains('center__btn--active')) {
      deleteActiveFooter();
      e.target.classList.add('active__footer');
      arr.forEach((el, i) => {
         if(el.completed) {
          todoBox.children[i].style.display = "none";
         } else {
            todoBox.children[i].style.display = "flex";
         }
      });
   } else if(e.target.classList.contains('center__btn--completed')) {
      deleteActiveFooter();
      e.target.classList.add('active__footer');
      arr.forEach((el, i) => {
         if(!el.completed) {
          todoBox.children[i].style.display = "none";
         } else {
            todoBox.children[i].style.display = "flex";
         }
      });
   } else if(e.target.classList.contains('footer__right')) {
      deleteActiveFooter();
      allBtn.classList.add('active__footer');

      arr = arr.filter(el => !el.completed);
      renderElements(arr);
      displayElement(footer, arr);
      setCounter(counterBox, arr);
      arrToLocalStorage();
   }
});
function deleteActiveFooter () {
   for (let i = 0; i < footer.children.length; i++) {
      if (footer.children[1].children[i].classList.contains('active__footer')) {
         footer.children[1].children[i].classList.remove('active__footer');
      }
   }
}
function changeTheme() {
   if (document.body.classList.contains("dark-theme")) {
       localStorage.setItem("isDark", "false");
       document.body.classList.toggle("dark-theme");
   } else {
       localStorage.setItem("isDark", "true");
       document.body.classList.toggle("dark-theme");
   }
}
function arrToLocalStorage () {
   localStorage.setItem('arr', JSON.stringify(arr));
}