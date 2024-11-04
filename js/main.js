const counterLabelNode = document.querySelector('.counter-label')
const charCountNode = document.querySelector('#charCount')
const textAreaNode = document.getElementById('floatingTextarea')
const errorBtnNode = document.getElementById('error')
const successBtnNode = document.getElementById('success')
const TOAST_OPTIONS = {
    "closeButton": true,
    "debug": true,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-top-left",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "50000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

function countCharacters(){
    textAreaNode.addEventListener('input',()=>{
        
        let charCount = textAreaNode.value.length;
        charCountNode.innerText = charCount;

        if (charCount == 100) {
            counterLabelNode.classList.add('red')
        }
        else {
            counterLabelNode.classList.remove('red');
        }
    })
}

countCharacters()


errorBtnNode.addEventListener('click',()=>{
    $(document).ready(function() {
        toastr.warning('Не удается установить подключение');
        toastr.options = TOAST_OPTIONS 
      });
})

successBtnNode.addEventListener('click',()=>{
    $(document).ready(function() {
        toastr.options.timeOut = 3000; // 1.5s
        toastr.success('Подключение восстановлено');
        toastr.options = TOAST_OPTIONS
      });
})

function handleInput(event) {
    const text = event.target.value; // Получаем текст из textarea
    const words = text.trim().split(/\s+/); // Разбиваем текст на слова по пробелам
    console.log(words); // Выводим массив слов в консоль

    // Проверяем только последнее слово
    const lastWord = checkLastWord(words);
    checkSpelling(lastWord); // Проверяем правописание только последнего слова
}

// Пример функции для проверки правописания слова
function checkSpelling(word) {
    // Здесь вы можете реализовать AJAX-запрос для проверки слова на сервере
    console.log(`Проверка слова: ${word}`);
    // Пример AJAX-запроса (используя fetch)
    // fetch('/check-spelling', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ word }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data); // Обработка ответа от сервера
    // });
}

// Добавляем обработчик события после загрузки страницы
window.onload = function() {
    const textarea = document.getElementById('floatingTextarea');
    textarea.addEventListener('input', handleInput);
};

function checkLastWord(words) {
    // Проверяем, что массив не пустой
    if (words.length === 0) {
        return ""; // Возвращаем пустую строку, если массив пустой
    }

    // Получаем последнее слово
    const lastWord = words[words.length - 1];

    // Проверяем, является ли последнее слово пустым
    if (lastWord.trim() === "") {
        return ""; // Возвращаем пустую строку, если последнее слово пустое
    }

    // Возвращаем последнее слово
    return lastWord;
}