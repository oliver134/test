// ==UserScript==
// @name         Hamster farm
// @namespace    https://hamsterkombat.io/*
// @version      1.0
// @description  Automatic coin collector for Hamster
// @match        https://*.hamsterkombat.io/*
// @grant        none
// @icon         https://hamsterkombat.io/images/icons/hamster-coin.png
// @downloadURL  
// @updateURL    
// @author       Emin M @emin.mir
// @homepage     https://t.me/crypto_world_aze
// ==/UserScript==
(function() {
    'use strict';

    let isAutofarmRunning = JSON.parse(localStorage.getItem('isAutofarmRunning')) || false;

    function displayUpgradesTable() {
        let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];
        upgrades.forEach(upgrade => {
            upgrade.costToProfit = upgrade.cost / upgrade.profitPerHour;
        });
        upgrades.sort((a, b) => a.costToProfit - b.costToProfit);
        let table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        let headerRow = table.insertRow();
        let headers = ['Название', 'Прибыль в час', 'Общая прибыль', 'Стоимость', 'Уровень', 'Стоимость / Прибыль в час', 'Выбрать'];
        headers.forEach(headerText => {
            let headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerCell.style.border = '1px solid black';
            headerCell.style.padding = '5px';
            headerCell.style.backgroundColor = 'orange';
            headerCell.style.color = 'black';
            headerCell.style.fontWeight = 'bold';
            headerCell.style.fontSize = '10px';
            headerCell.style.fontFamily = 'Arial, sans-serif';
            headerRow.appendChild(headerCell);
        });
        upgrades.forEach((upgrade, index) => {
            let row = table.insertRow();
            row.style.backgroundColor = index % 2 === 0 ? '#1a1919' : 'black';
            Object.values(upgrade).forEach((value, cellIndex) => {
                if (cellIndex < headers.length - 2) {
                    let cell = row.insertCell();
                    cell.textContent = value;
                    cell.style.border = '1px solid black';
                    cell.style.padding = '5px';
                    cell.style.fontSize = '12px';
                    cell.style.fontFamily = 'Arial, sans-serif';
                }
            });
            let costToProfitCell = row.insertCell();
            costToProfitCell.textContent = upgrade.costToProfit.toFixed(2);
            costToProfitCell.style.border = '1px solid black';
            costToProfitCell.style.padding = '5px';
            costToProfitCell.style.fontSize = '12px';
            costToProfitCell.style.fontFamily = 'Arial, sans-serif';
            let checkboxCell = row.insertCell();
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.title = upgrade.title;
            checkboxCell.appendChild(checkbox);
            checkboxCell.style.border = '1px solid black';
            checkboxCell.style.padding = '5px';
            checkboxCell.style.fontSize = '12px';
            checkboxCell.style.fontFamily = 'Arial, sans-serif';
            checkbox.checked = JSON.parse(localStorage.getItem('autofarmCheckboxes') || '[]').includes(upgrade.title);
            checkbox.addEventListener('change', function() {
                let selectedCheckboxes = Array.from(document.querySelectorAll('#upgradesTable input[type="checkbox"]:checked'))
                                             .map(cb => cb.dataset.title);
                localStorage.setItem('autofarmCheckboxes', JSON.stringify(selectedCheckboxes));
            });
        });
        for (let i = 0; i < 4; i++) {
            let emptyRow = table.insertRow();
            let cell = emptyRow.insertCell();
            cell.style.height = '25px';
            cell.style.border = 'none';
        }
        let oldTable = document.getElementById('upgradesTable');
        if (oldTable) {
            oldTable.remove();
        }
        table.id = 'upgradesTable';
        document.body.appendChild(table);
    }

    function clearUpgradesData() {
        localStorage.removeItem('upgrades');
        displayUpgradesTable();
        console.log('Upgrades data cleared');
    }

    function addButtons() {
        let showDataButton = document.createElement('button');
        showDataButton.textContent = 'Открыть';
        showDataButton.style.cursor = 'pointer';
        showDataButton.style.position = 'fixed';
        showDataButton.style.top = '20px';
        showDataButton.style.left = '8px';
        showDataButton.style.zIndex = '10000';
        showDataButton.style.color = 'snow';
        showDataButton.style.backgroundColor = 'green';
        showDataButton.style.fontWeight = 'bold';
        showDataButton.style.fontSize = '14px';
        showDataButton.style.border = 'none';
        showDataButton.style.borderRadius = '5px';
        showDataButton.style.padding = '5px 10px';
        showDataButton.style.margin = '5px 10px';
      showDataButton.id = 'showData'; // Добавляем id кнопке
  showDataButton.addEventListener('click', function() {
        if (showDataButton.textContent === 'Открыть') {
            showDataButton.textContent = 'Обновить';
            // Add your code here to handle the "Открыть" action
        } else {

        }
    });
        showDataButton.addEventListener('click', displayUpgradesTable);
        let clearDataButton = document.createElement('button');
        clearDataButton.textContent = 'Очистить';
        clearDataButton.style.cursor = 'pointer';
        clearDataButton.style.position = 'fixed';
        clearDataButton.style.top = '20px';
        clearDataButton.style.left = '100px';
        clearDataButton.style.zIndex = '10000';
        clearDataButton.style.color = 'snow';
        clearDataButton.style.backgroundColor = 'green';
        clearDataButton.style.fontWeight = 'bold';
        clearDataButton.style.fontSize = '14px';
        clearDataButton.style.border = 'none';
        clearDataButton.style.borderRadius = '5px';
        clearDataButton.style.padding = '5px 10px';
        clearDataButton.style.margin = '5px 10px';
      clearDataButton.id = 'clearData'; // Добавляем id кнопке
        clearDataButton.addEventListener('click', clearUpgradesData);
        let autofarmButton = document.createElement('button');
        autofarmButton.textContent = isAutofarmRunning ? 'Выкл Автофарм' : 'Автофарм';
        autofarmButton.style.cursor = 'pointer';
        autofarmButton.style.position = 'fixed';
        autofarmButton.style.top = '20px';
        autofarmButton.style.left = '192px';
        autofarmButton.style.zIndex = '10000';
        autofarmButton.style.color = 'snow';
        autofarmButton.style.backgroundColor = 'green';
        autofarmButton.style.fontWeight = 'bold';
        autofarmButton.style.fontSize = '14px';
        autofarmButton.style.border = 'none';
        autofarmButton.style.borderRadius = '5px';
        autofarmButton.style.padding = '5px 10px';
        autofarmButton.style.margin = '5px 10px';
           autofarmButton.id = 'autofarm'; // Добавляем id кнопке
        autofarmButton.addEventListener('click', function() {
            isAutofarmRunning = !isAutofarmRunning;
            localStorage.setItem('isAutofarmRunning', JSON.stringify(isAutofarmRunning));
            autofarmButton.textContent = isAutofarmRunning ? 'Остановить Автофарм' : 'Автофарм';
            if (isAutofarmRunning) {
                let mineLink = document.querySelector('nav.app-bar-nav a[href="/ru/clicker/mine"]');
                if (mineLink) {
                    mineLink.click();
                }
                setTimeout(findAndClickHamsterCard, 2000);
            }
        });
        document.body.appendChild(showDataButton);
        document.body.appendChild(clearDataButton);
        document.body.appendChild(autofarmButton);
    }

    addButtons();

    function convertToNumber(value) {
        let multiplier = 1;
        if (value.endsWith('K') || value.endsWith('К') || value.endsWith('k') || value.endsWith('к')) {
            multiplier = 1000;
            value = value.slice(0, -1);
        } else if (value.endsWith('M') || value.endsWith('м')) {
            multiplier = 1000000;
            value = value.slice(0, -1);
        }
        return Math.round(parseFloat(value.replace(',', '.')) * multiplier);
    }

    document.addEventListener('click', function(event) {
        let upgradeItem = event.target.closest('.upgrade-item, .upgrade-sport, .upgrade-special');
        if (upgradeItem) {
            setTimeout(() => {
                let modal = document.querySelector('.bottom-sheet.open');
                if (modal) {
                    let titleElement = modal.querySelector('.upgrade-buy-title');
                    let profitPerHourElement = modal.querySelector('.upgrade-buy-stats-info .price-value');
                    let costElements = upgradeItem.querySelectorAll('.price-value');
                    let levelElement = upgradeItem.querySelector('.upgrade-item-level span, .upgrade-special-level');
                    if (titleElement && profitPerHourElement && costElements.length > 1) {
                        let title = titleElement.textContent.trim();
                        let profitPerHour = convertToNumber(profitPerHourElement.textContent.trim());
                        let totalProfit = convertToNumber(costElements[0].textContent.trim());
                        let cost = convertToNumber(costElements[1].textContent.trim());
                        let level = levelElement ? levelElement.textContent.trim() : 'N/A';
                        let upgradeInfo = {
                            title: title,
                            profitPerHour: profitPerHour,
                            totalProfit: totalProfit,
                            cost: cost,
                            level: level
                        };
                        let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];
                        let existingUpgradeIndex = upgrades.findIndex(upgrade => upgrade.title === upgradeInfo.title);
                        if (existingUpgradeIndex !== -1) {
                            upgrades[existingUpgradeIndex] = upgradeInfo;
                        } else {
                            upgrades.push(upgradeInfo);
                        }
                        localStorage.setItem('upgrades', JSON.stringify(upgrades));
                    }
                }
            }, 500);
        }
    });























function checkAndClickUpgrades() {
    let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];
    let checkboxes = JSON.parse(localStorage.getItem('autofarmCheckboxes')) || [];
    checkboxes.forEach(title => {
        let upgradeItem = Array.from(document.querySelectorAll('.upgrade-list .upgrade-item, .upgrade-list .upgrade-sport, .upgrade-list .upgrade-special')).find(item => {
            let titleElement = item.querySelector('.upgrade-item-title, .upgrade-special-title');
            return titleElement && titleElement.textContent.trim() === title;
        });
        if (upgradeItem) {
            let cardElement = upgradeItem.querySelector('.upgrade-item-top, .upgrade-special-inner');
            if (cardElement && isAutofarmRunning) {
                cardElement.click();
            }
        }
    });
}

window.addEventListener('load', function() {
    if (window.location.pathname === '/ru/clicker/mine' && isAutofarmRunning) {
        checkAndClickUpgrades();
        findAndClickHamsterCard();
    }
});

const tabs = ['PR&Team', 'Markets', 'Legal', 'Web3', 'Specials'];
let currentTabIndex = 0;

function findAndClickHamsterCard() {
    if (!isAutofarmRunning) {
        console.log('Autofarm script stopped.');
        return;
    }

    const checkboxes = JSON.parse(localStorage.getItem('autofarmCheckboxes')) || [];
    const hamsterCardElements = Array.from(document.querySelectorAll('.upgrade-item-title, .upgrade-special-title')).filter(el => checkboxes.includes(el.textContent.trim()));

    if (hamsterCardElements.length > 0) {
        console.log('Отмеченные строки найдены.');
        hamsterCardElements.forEach((hamsterCardElement, index) => {
            setTimeout(() => {
                if (!isAutofarmRunning) {
                    console.log('Autofarm script stopped.');
                    return;
                }
                const cardTopElement = hamsterCardElement.closest('.upgrade-item-top, .upgrade-special-inner');
                if (cardTopElement && cardTopElement.click) {
                    cardTopElement.click();
                    console.log(`Клик по "${hamsterCardElement.textContent.trim()}" произведен (${index + 1}/${hamsterCardElements.length}).`);
                    setTimeout(() => {
                        if (!isAutofarmRunning) {
                            console.log('Autofarm script stopped.');
                            return;
                        }
                        const getButton = document.querySelector('.bottom-sheet-button.button.button-primary.button-large.is-sticky span');
                        if (getButton && getButton.textContent.includes('Получить')) {
                            getButton.parentElement.click();
                            console.log('Клик по кнопке "Получить" произведен.');
                        } else {
                            console.log('Кнопка "Получить" не найдена. Закрываем модальное окно.');
                            const closeButton = document.querySelector('.bottom-sheet-close');
                            if (closeButton) {
                                closeButton.click();
                                console.log('Модальное окно закрыто.');
                            }
                        }
                        setTimeout(moveToNextTab, 5000);  // Move to the next tab after processing this card
                    }, 2000);
                } else {
                    console.log('Не удалось кликнуть по отмеченному элементу.');
                    setTimeout(findAndClickHamsterCard, 5000);
                }
            }, index * 3000);
        });
    } else {
        console.log(`Отмеченные строки не найдены во вкладке "${tabs[currentTabIndex]}".`);
        moveToNextTab();
    }
}

function moveToNextTab() {
    if (!isAutofarmRunning) {
        console.log('Autofarm script stopped.');
        return;
    }
    if (currentTabIndex < tabs.length - 1) {
        currentTabIndex++;
        changeTab(tabs[currentTabIndex]);
    } else {
        console.log('Отмеченные строки не найдены во всех вкладках. Начинаем с вкладки "PR&Team".');
        currentTabIndex = 0;
        changeTab(tabs[currentTabIndex]);
    }
}

function changeTab(tabName) {
    if (!isAutofarmRunning) {
        console.log('Autofarm script stopped.');
        return;
    }
    const tabElement = Array.from(document.querySelectorAll('.tabs-item')).find(tab => tab.textContent.includes(tabName));
    if (tabElement) {
        tabElement.click();
        console.log(`Переход на вкладку "${tabName}"`);
        setTimeout(() => {
            findAndClickHamsterCard();
        }, 5000);
    } else {
        console.log(`Вкладка "${tabName}" не найдена.`);
        moveToNextTab();
    }
}

function clickOpenUpdateButton() {
    let showDataButton = document.querySelector('button:contains("Открыть/Обновить")');
    if (showDataButton) {
        showDataButton.click();
        console.log('Кнопка "Открыть/Обновить" нажата.');
    } else {
        console.log('Кнопка "Открыть/Обновить" не найдена.');
    }
}

setInterval(() => {
    if (isAutofarmRunning) {
        clickOpenUpdateButton();
        setTimeout(findAndClickHamsterCard, 7000);
    }
}, 60000);

setInterval(() => {
    if (isAutofarmRunning && window.location.pathname !== '/ru/clicker/mine') {
        window.location.href = '/ru/clicker/mine';
    }
}, 30000);


})();


























(function () {
    // Конфигурация стилей для логов
    const styles = {
        success: 'background: #28a745; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        starting: 'background: #8640ff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        error: 'background: #dc3545; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
        info: 'background: #007bff; color: #ffffff; font-weight: bold; padding: 4px 8px; border-radius: 4px;'
    };

    // Префикс для логов
    const logPrefix = '%c[HamsterKombatBot] ';

    // Переменные для управления состоянием скрипта
    let isRunning = false; // Флаг, указывающий, работает ли автокликер
    let timeoutId; // Идентификатор таймаута для остановки автокликера
    let retryCount = 0; // Счетчик попыток

    // Настройки скрипта
    const settings = {
        minEnergy: 25, // Минимальная энергия, необходимая для нажатия на монету
        minInterval: 1000, // Минимальный интервал между кликами в миллисекундах
        maxInterval: 3000, // Максимальный интервал между кликами в миллисекундах
        minEnergyRefillDelay: 60000, // Минимальная задержка в миллисекундах для пополнения энергии (60 секунд)
        maxEnergyRefillDelay: 180000, // Максимальная задержка в миллисекундах для пополнения энергии (180 секунд)
        maxRetries: 5 // Максимальное количество попыток перед перезагрузкой страницы
    };

    // Функция для получения местоположения элемента
    function getElementPosition(element) {
        let current_element = element;
        let top = 0, left = 0;
        do {
            top += current_element.offsetTop || 0;
            left += current_element.offsetLeft || 0;
            current_element = current_element.offsetParent;
        } while (current_element);
        return { top, left };
    }

    // Функция для генерации случайного числа в диапазоне
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Функция для выполнения кликов с имитацией 5 пальцев
    function performRandomClick() {
        const energyElement = document.getElementsByClassName("user-tap-energy")[0]; // Элемент с энергией пользователя
        const buttonElement = document.getElementsByClassName('user-tap-button')[0]; // Кнопка для клика

        if (!energyElement || !buttonElement) {
            console.log(`${logPrefix}Element not found, retrying...`, styles.error);

            retryCount++;
            if (retryCount >= settings.maxRetries) {
                console.log(`${logPrefix}Max retries reached, reloading page...`, styles.error);
                location.reload(); // Перезагрузка страницы при достижении максимального количества попыток
            } else {
                setTimeout(() => {
                    performRandomClick();
                }, 2000);
            }
            return;
        }

        retryCount = 0; // Сбросить счетчик попыток при успешном обнаружении элементов

        const energyText = energyElement.querySelector('p').textContent.trim();
        const energyCurrent = parseInt(energyText.split(" / ")[0]);

        if (energyCurrent <= 0) {
            console.log(`${logPrefix}Energy depleted, stopping auto click.`, styles.error);
            isRunning = false; // Обновление состояния флага
            controlButton.innerText = 'Клик'; // Обновление текста на кнопке
            return;
        }

        for (let i = 0; i < 5; i++) {
            let { top, left } = getElementPosition(buttonElement);
            const randomX = Math.floor(left + Math.random() * buttonElement.offsetWidth);
            const randomY = Math.floor(top + Math.random() * buttonElement.offsetHeight);
            const pointerDownEvent = new PointerEvent('pointerdown', { clientX: randomX, clientY: randomY });
            const pointerUpEvent = new PointerEvent('pointerup', { clientX: randomX, clientY: randomY });
            buttonElement.dispatchEvent(pointerDownEvent);
            buttonElement.dispatchEvent(pointerUpEvent);

            console.log(`${logPrefix}Button clicked at (${randomX}, ${randomY})`, styles.success);
        }

        if (isRunning) {
            const randomInterval = getRandomNumber(settings.minInterval, settings.maxInterval);
            timeoutId = setTimeout(performRandomClick, randomInterval);
        }
    }

    // Функция для старта и остановки кликов
    function toggleClicks() {
        if (isRunning) {
            clearTimeout(timeoutId); // Остановка таймаута
            isRunning = false; // Обновление состояния флага
            controlButton.innerText = 'Клик'; // Обновление текста на кнопке
            console.log(`${logPrefix}Auto click stopped`, styles.info);
       localStorage.setItem('isRunning', 'false'); // Сохранение состояния в локальном хранилище
        } else {
            isRunning = true; // Обновление состояния флага
            controlButton.innerText = 'Стоп'; // Обновление текста на кнопке
            console.log('Auto click started');
            performRandomClick(); // Начало выполнения кликов
            localStorage.setItem('isRunning', 'true'); // Сохранение состояния в локальном хранилище
        }
    }







    // Создание и вставка кнопки управления
    const controlButton = document.createElement('button');
    controlButton.innerText = 'Клик'; // Начальный текст на кнопке

    controlButton.style.zIndex = 1000;
    controlButton.style.cursor = 'pointer';
    controlButton.style.position = 'fixed';
    controlButton.style.top = '20px';
    controlButton.style.right = '8px';
    controlButton.style.color = 'snow';
    controlButton.style.backgroundColor = 'green';
    controlButton.style.fontWeight = 'bold';
    controlButton.style.fontSize = '14px';
    controlButton.style.border = 'none';
    controlButton.style.borderRadius = '5px';
    controlButton.style.padding = '5px 10px';
    controlButton.style.margin = '5px 10px';

    controlButton.id = 'autoClick'; // Добавляем id кнопке
    controlButton.addEventListener('click', toggleClicks); // Добавляем обработчик событий на кнопку

  // Проверка сохраненного состояния при загрузке страницы
    if (localStorage.getItem('isRunning') === 'true') {
        isRunning = true;
        controlButton.innerText = 'Стоп';
        performRandomClick();
    } else {
        controlButton.innerText = 'Клик';
    }
    document.body.appendChild(controlButton); // Добавляем кнопку на страницу

    console.log(`${logPrefix}Script loaded. To start auto click, click on 'Клик'.`, styles.starting);
})();



















// Создаем кнопку
var toggleButton = document.createElement('button');
toggleButton.textContent = 'Скрыть';
           toggleButton.style.zIndex = 1000;


          toggleButton.style.cursor = 'pointer';
        toggleButton.style.position = 'fixed';
        toggleButton.style.bottom = '60px';
        toggleButton.style.left = '8px';

        toggleButton.style.color = 'snow';
        toggleButton.style.backgroundColor = 'green';
        toggleButton.style.fontWeight = 'bold';
        toggleButton.style.fontSize = '14px';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '5px';
        toggleButton.style.padding = '5px 10px';
        toggleButton.style.margin = '5px 10px';


// Добавляем кнопку на страницу
document.body.appendChild(toggleButton);

// Функция для скрытия/восстановления кнопок Violentmonkey
function toggleViolentmonkey() {
    var buttonIds = ['autoClick', 'autofarm', 'clearData', 'showData', 'morseButton']; // Список id кнопок Violentmonkey, замените на ваши id

    buttonIds.forEach(function(id) {
        var button = document.getElementById(id);
        if (button) {
            button.style.display = button.style.display === 'none' ? '' : 'none'; // Изменение отображения кнопки

        }
    });
}

// Добавляем обработчик события на клик по кнопке toggleButton
toggleButton.addEventListener('click', toggleViolentmonkey);









(function() {
    'use strict';

    // Function to click the heart icon
    function clickHeartIcon() {
        let heartIcon = document.querySelector('.icon.icon-heart');
        if (heartIcon) {
            heartIcon.click();
        }
    }

    // Run the function when the page loads
    window.addEventListener('load', clickHeartIcon);

    // Optional: Run the function periodically in case new heart icons are added dynamically
    setInterval(clickHeartIcon, 2000); // Adjust the interval as needed
})();













 // Функция для перезагрузки страницы
    function refreshPage() {
        location.reload();
    }

    // Функция для установки случайного интервала
    function setRandomInterval() {
        // Время в миллисекундах
        const minTime = 57 * 60 * 1000; // 57 минут
        const maxTime = 94 * 60 * 1000; // 1 час 34 минуты

        // Случайное время в заданном интервале
        const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

        // Установка таймера для перезагрузки страницы
        setTimeout(() => {
            refreshPage();
            setRandomInterval(); // Устанавливаем новый интервал после перезагрузки
        }, randomTime);
    }

    // Устанавливаем первый случайный интервал
    setRandomInterval();











(function() {
    'use strict';

    // Создаём пустой объект для переопределения консоли
    const customConsole = {log: function() {}};

    // Получаем текущий URL страницы
    const currentUrl = window.location.href;

    // Константы для временных задержек и других параметров
    const pauseDelay = 2000; // Задержка между буквами (ms)
    const dotDelay = 1; // Длительность точки (ms)
    const dashDelay = 750; // Длительность тире (ms)
    const extraDelay = 200; // Дополнительная пауза между нажатиями (ms)
    const multiplyTap = 16; // Сколько энергии тратится за 1 тап

    // Переопределяем глобальную консоль и консоль внутри `unsafeWindow`
    unsafeWindow.console = customConsole;
    window.console = customConsole;

    // Если объект `unsafeWindow` существует и содержит `Telegram.WebApp`, переопределяем его
    if (unsafeWindow && unsafeWindow.Telegram && unsafeWindow.Telegram.WebApp)
        unsafeWindow.Telegram.WebApp = new Proxy(unsafeWindow.Telegram.WebApp, {
            get(target, prop) {
                if (prop === 'platform')
                    return 'android'; // Переопределяем значение `platform` на 'android'
                if (typeof target[prop] === 'function')
                    return function(...args) {
                        if (prop === 'exampleMethod') args[0] = 'modified argument'; // Модифицируем аргументы метода 'exampleMethod'
                        return target[prop].apply(this, args);
                    };
                return target[prop];
            }
        });

    // Функция для нахождения кнопки тапа на странице
    function findTapButton() {
        return document.querySelector('.user-tap-button');
    }

    // Функция для получения уровня энергии
    function energyLevel() {
        const energyElement = document.querySelector(".user-tap-energy p");
        if (energyElement) {
            return parseInt(energyElement.textContent.split(" / ")[0], 10);
        }
        return 0;
    }

    // Асинхронная функция для симуляции тапа по кнопке
    async function simulateTap(button, delay) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + (rect.width / 2);
        const centerY = rect.top + (rect.height / 2);

        const downEvent = new PointerEvent('pointerdown', {
            bubbles: true,
            clientX: centerX,
            clientY: centerY
        });

        const upEvent = new PointerEvent('pointerup', {
            bubbles: true,
            clientX: centerX,
            clientY: centerY
        });

        button.dispatchEvent(downEvent);
        await new Promise(resolve => setTimeout(resolve, delay));
        button.dispatchEvent(upEvent);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    // Асинхронные функции для тапа точки и тире
    async function dotTap(button) {
        if (energyLevel() > 100) {
            await simulateTap(button, dotDelay);
        }
    }

    async function dashTap(button) {
        if (energyLevel() > 100) {
            await simulateTap(button, dashDelay);
        }
    }

    // Функция для паузы между буквами
    function pauseBetweenLetters() {
        return new Promise(resolve => setTimeout(resolve, pauseDelay));
    }

    // Функция для конвертации текста в код Морзе
    function textToMorse(text) {
        const morseCodeMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
            'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
            'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
            '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
            '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--', '/': '-..-.',
            '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-',
            '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
        };

        return text.toUpperCase().split('').map(char => {
            if (char in morseCodeMap) {
                return morseCodeMap[char];
            } else if (char === ' ') {
                return ' ';
            }
            return '';
        }).join(' ');
    }

    // Асинхронная функция для конвертации текста в последовательность тапов
    async function textToTap(morseString) {
        const button = findTapButton();
        if (!button) {
            console.log('Button not found');
            return;
        }

        let clickWord = 0;
        let clickTime = 0;

        for (const char of morseString) {
            switch (char) {
                case '.':
                    await dotTap(button);
                    clickWord++;
                    clickTime += dotDelay;
                    break;
                case '-':
                    await dashTap(button);
                    clickWord++;
                    clickTime += dashDelay;
                    break;
                case ' ':
                    await pauseBetweenLetters();
                    break;
            }

            const energyNow = energyLevel();
            const waitTime = actionCanProceed(energyNow, clickWord, clickTime, multiplyTap);
            if (waitTime > 0) {
                console.log(`Not enough energy, waiting for ${waitTime} seconds...`);
                await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
            }
        }

        await pauseBetweenLetters();
    }

    // Функция для определения времени ожидания до возможности действия
    function actionCanProceed(energyNow, clickWord, clickTime, multiplyTap) {
        let energyCost = Math.ceil((clickWord * multiplyTap) - ((clickTime / 1000) * 3));
        let waitUntilEnergy = 0;

        if (energyCost > energyNow)
            waitUntilEnergy = Math.ceil((energyCost - energyNow) / 3 + 3);

        return waitUntilEnergy;
    }

    // Функция для создания и отображения модального окна
    function showModal() {
        // Создаём контейнер модального окна
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modalContainer';
        modalContainer.style.position = 'fixed';
        modalContainer.style.top = '0';
        modalContainer.style.left = '0';
        modalContainer.style.width = '100%';
        modalContainer.style.height = '100%';
        modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modalContainer.style.zIndex = '10000';
        modalContainer.style.display = 'flex';
        modalContainer.style.justifyContent = 'center';
        modalContainer.style.alignItems = 'center';

        // Создаём модальное окно
        const modal = document.createElement('div');
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '10px';
        modal.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
        modal.style.textAlign = 'center';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
modal.style.borderRadius = '10px';
modal.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
modal.style.fontFamily = 'Arial, sans-serif';
modal.style.border = '1px solid black';


        // Создаём поле ввода
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'morseInputField';
        inputField.placeholder = 'Вводи шифр';
        inputField.style.marginBottom = '10px';
        inputField.style.width = '80%';
        inputField.style.padding = '10px';
        inputField.style.fontSize = '16px';

        // Создаём кнопку подтверждения
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Подтвердить';
        confirmButton.style.marginRight = '10px';
        confirmButton.style.padding = '10px 20px';
        confirmButton.style.cursor = 'pointer';
        confirmButton.style.color = 'snow';
        confirmButton.style.backgroundColor = 'green';
        confirmButton.style.fontWeight = 'bold';
        confirmButton.style.fontSize = '14px';
        confirmButton.style.border = 'none';
        confirmButton.style.borderRadius = '5px';

        // Создаём кнопку закрытия
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Закрыть';
        closeButton.style.padding = '10px 20px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = 'snow';
        closeButton.style.backgroundColor = 'red';
        closeButton.style.fontWeight = 'bold';
        closeButton.style.fontSize = '14px';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';

        // Добавляем элементы в модальное окно
        modal.appendChild(inputField);
        modal.appendChild(confirmButton);
        modal.appendChild(closeButton);
        modalContainer.appendChild(modal);
        document.body.appendChild(modalContainer);

        // Обработчик события для кнопки подтверждения
        confirmButton.addEventListener('click', async () => {
            const text = inputField.value;
            const morseString = textToMorse(text);
            console.log('Шифр введен ', morseString);
            await textToTap(morseString);
            inputField.value = '';
            document.body.removeChild(modalContainer);
        });

        // Обработчик события для кнопки закрытия
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modalContainer);
        });
    }

    // Функция для добавления кнопки, открывающей модальное окно
    function addModalButton() {
        const button = document.createElement('button');
        button.textContent = 'Открыть шифр';
        button.style.position = 'fixed';
        button.style.bottom = '70px';
        button.style.right = '20px';
        button.style.zIndex = '10000';
        button.style.padding = '10px 20px';
        button.style.border = 'none';
        button.style.cursor = 'pointer';
        button.style.color = 'snow';
        button.style.backgroundColor = 'green';
        button.style.fontWeight = 'bold';
        button.style.fontSize = '14px';
        button.style.borderRadius = '5px';
           button.id = 'morseButton'; // Добавляем id кнопке
        button.addEventListener('click', showModal);
        document.body.appendChild(button);
    }

    // Функция для запуска функционала на странице HamsterKombat
    function hamsterkombatFunctionality() {
        window.addEventListener('load', () => {
            addModalButton(); // Добавляем кнопку для открытия модального окна при загрузке страницы
        });
    }

    // Проверяем текущий URL и запускаем функционал, если он соответствует HamsterKombat
    if (currentUrl.includes('hamsterkombat.io')) {
        hamsterkombatFunctionality();
    }
})();


