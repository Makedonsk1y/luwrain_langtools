const swearWords = ["вариант1", "вариант2", "вариант3", "вариант4", "вариант5", "вариант6"];
    let currentWord = null;

    function updateText() {
        const editableDiv = document.getElementById('editable');
        const text = editableDiv.innerText;
        const words = text.split(/(\s+)/); // Разделяем текст на слова и пробелы

        // Очищаем содержимое div
        editableDiv.innerHTML = '';

        // Создаем span для каждого слова
        words.forEach(word => {
            if (word.trim()) { // Проверяем, что слово не пустое
                const span = document.createElement('span');
                span.innerText = word;
                span.classList.add('word-' + word.length);
                span.onclick = showPopupMenu; // Добавляем обработчик клика

                editableDiv.appendChild(span);
            } else {
                // Если это пробел, добавляем его как текстовый узел
                editableDiv.appendChild(document.createTextNode(word));
            }
        });

        // Устанавливаем курсор в конец
        placeCaretAtEnd(editableDiv);
    }

    function placeCaretAtEnd(el) {
        el.focus();
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    function showPopupMenu(event) {
        event.stopPropagation(); // Останавливаем всплытие события
        currentWord = event.target; // Сохраняем текущее слово

        const popupMenu = document.getElementById('popupMenu');
        const swearWordsList = document.getElementById('swearWordsList');
        swearWordsList.innerHTML = ''; // Очищаем список перед добавлением новых элементов

        // Добавляем слова-паразиты в список
        swearWords.forEach(swearWord => {
            const li = document.createElement('li');
            li.classList.add('list-group-item')
            li.innerText = swearWord;
            li.onclick = () => replaceWord(swearWord); // Добавляем обработчик клика для замены слова
            swearWordsList.appendChild(li);
        });

        popupMenu.style.display = 'block';
        popupMenu.style.left = event.clientX - 150 + 'px';
        popupMenu.style.top = event.clientY - 200 + 'px';
    }

    function replaceWord(swearWord) {
        if (currentWord) {
            currentWord.className = ''; // Убираем стилизацию
            currentWord.innerText = swearWord; // Заменяем текущее слово на выбранное слово-паразит
            currentWord = null; // Сбрасываем текущее слово
        }
        document.getElementById('popupMenu').style.display = 'none'; // Скрываем меню
    }

    document.addEventListener('click', function() {
        const popupMenu = document.getElementById('popupMenu');
        popupMenu.style.display = 'none'; // Скрываем меню при клике вне его
    });

    document.getElementById('deleteButton').onclick = function() {
        if (currentWord) {
            currentWord.remove(); // Удаляем текущее слово
            currentWord = null; // Сбрасываем текущее слово
        }
        document.getElementById('popupMenu').style.display = 'none'; // Скрываем меню
    };


    function countCharacters() {
        const inputFieldNode = document.getElementById('editable'); // Ваш div с contenteditable
        const charCountNode = document.getElementById('charCount'); // Элемент для отображения количества символов
        const counterLabelNode = document.getElementById('counterLabel'); // Элемент для изменения стиля
    
        inputFieldNode.addEventListener('input', () => {
            // Получаем все span элементы внутри div
            const spans = inputFieldNode.getElementsByTagName('span');
            let charCount = 0;
    
            // Считаем длину каждого span и добавляем пробелы
            for (let i = 0; i < spans.length; i++) {
                charCount += spans[i].innerText.length; // Длина текста в текущем span
                if (i < spans.length - 1) {
                    charCount += 1; // Добавляем пробел между span, если это не последний элемент
                }
            }
    
            // Обновляем отображение количества символов
            charCountNode.innerText = charCount;
    
            // Меняем стиль в зависимости от количества символов
            if (charCount >= 100) {
                counterLabelNode.classList.add('red');
            } else {
                counterLabelNode.classList.remove('red');
            }
        });
    
        // Обработчик для обновления счетчика при нажатии пробела
        inputFieldNode.addEventListener('keydown', (event) => {
            if (event.key === ' ') {
                // Принудительно вызываем обновление счетчика
                inputFieldNode.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // Предполагается, что у вас есть элементы с id 'charCount' и 'counterLabel'
    countCharacters();