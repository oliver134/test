// ==UserScript==
// @name         Hamster farm
// @namespace    https://hamsterkombat.io/*
// @version      1.1
// @description  Ну что тут написать, запускает хомяка в WEB
// @author       VladimirSauko
// @match        https://*.hamsterkombat.io/*
// @icon         https://hamsterkombat.io/images/icons/hamster-coin.png
// @downloadURL
// @updateURL
// @homepage     
// ==/UserScript==


(function() {
    'use strict';

    // Function to display upgrades data in a table
    function displayUpgradesTable() {
        // Retrieve upgrades data from local storage
        let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];

        // Calculate Cost/Profit Per Hour for each upgrade
        upgrades.forEach(upgrade => {
            upgrade.costToProfit = upgrade.cost / upgrade.profitPerHour;
        });

        // Sort upgrades by Cost/Profit Per Hour in ascending order
        upgrades.sort((a, b) => a.costToProfit - b.costToProfit);

        // Create a table element
        let table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.marginTop = '50px'; // Add some margin to separate from buttons

        // Create table header row
        let headerRow = table.insertRow();
        let headers = ['Название', 'Прибыль в час', 'Общая прибыль', 'Стоимость', 'Уровень', 'Стоимость / Прибыль в час'];
        headers.forEach(headerText => {
            let headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerCell.style.border = '1px solid black';
            headerCell.style.padding = '8px';
            headerCell.style.backgroundColor = '#f2f2f2'; // Add background color for header
            headerCell.style.color = 'black'; // Set text color to black
            headerRow.appendChild(headerCell);
        });

        // Create table rows for each upgrade
        upgrades.forEach(upgrade => {
            let row = table.insertRow();
            Object.values(upgrade).forEach((value, index) => {
                // Skip the costToProfit value for now
                if (index < headers.length - 1) {
                    let cell = row.insertCell();
                    cell.textContent = value;
                    cell.style.border = '1px solid black';
                    cell.style.padding = '8px';
                }
            });

            // Add cell for Cost/Profit Per Hour
            let costToProfitCell = row.insertCell();
            costToProfitCell.textContent = upgrade.costToProfit.toFixed(2); // Round to 2 decimal places
            costToProfitCell.style.border = '1px solid black';
            costToProfitCell.style.padding = '8px';
        });

        // Remove old table if exists
        let oldTable = document.getElementById('upgradesTable');
        if (oldTable) {
            oldTable.remove();
        }

        // Append the table to the body
        table.id = 'upgradesTable';
        document.body.appendChild(table);
    }

    // Function to clear upgrades data
    function clearUpgradesData() {
        localStorage.removeItem('upgrades');
        displayUpgradesTable(); // Refresh the displayed table
        console.log('Upgrades data cleared');
    }

    // Add buttons to the page
    function addButtons() {
        // Create and style the "Show Data" button
        let showDataButton = document.createElement('button');
        showDataButton.textContent = 'Показать данные';
        showDataButton.style.padding = '10px';
        showDataButton.style.margin = '10px';
        showDataButton.style.cursor = 'pointer';
        showDataButton.style.position = 'fixed';
        showDataButton.style.top = '10px';
        showDataButton.style.left = '10px';
        showDataButton.style.zIndex = '10000';
        showDataButton.addEventListener('click', displayUpgradesTable);

        // Create and style the "Clear Data" button
        let clearDataButton = document.createElement('button');
        clearDataButton.textContent = 'Очистить данные';
        clearDataButton.style.padding = '10px';
        clearDataButton.style.margin = '10px';
        clearDataButton.style.cursor = 'pointer';
        clearDataButton.style.position = 'fixed';
        clearDataButton.style.top = '10px';
        clearDataButton.style.left = '130px';
        clearDataButton.style.zIndex = '10000';
        clearDataButton.addEventListener('click', clearUpgradesData);

        // Append buttons to the body or any desired location
        document.body.appendChild(showDataButton);
        document.body.appendChild(clearDataButton);
    }

    // Call function to add the buttons
    addButtons();

    // Function to convert string values to numbers and round them
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

    // Event listener to extract upgrade information
    document.addEventListener('click', function(event) {
        let upgradeItem = event.target.closest('.upgrade-item');
        if (upgradeItem) {
            // wait for the modal to open
            setTimeout(() => {
                let modal = document.querySelector('.bottom-sheet.open');
                if (modal) {
                    let titleElement = modal.querySelector('.upgrade-buy-title');
                    let profitPerHourElement = modal.querySelector('.upgrade-buy-stats-info .price-value');
                    let costElements = upgradeItem.querySelectorAll('.price-value');
                    let levelElement = upgradeItem.querySelector('.upgrade-item-level span');

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

                        // Retrieve existing data from local storage
                        let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];

                        // Check if the upgrade already exists in storage
                        let existingUpgradeIndex = upgrades.findIndex(item => item.title === upgradeInfo.title);

                        if (existingUpgradeIndex !== -1) {
                            // If exists, replace the entry
                            upgrades[existingUpgradeIndex] = upgradeInfo;
                        } else {
                            // If not exists, add new entry
                            upgrades.push(upgradeInfo);
                        }

                        // Save updated data back to local storage
                        localStorage.setItem('upgrades', JSON.stringify(upgrades));

                        console.log(`Saved: ${JSON.stringify(upgradeInfo)}`);
                    }
                }
            }, 500); // Adjust the timeout if necessary
        }
    });
})();


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

    // Функция для добавления поля ввода на страницу
    function addInputField() {
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'morseInputField';
        inputField.placeholder = 'Вводи шифр';
        inputField.style.position = 'fixed';
        inputField.style.top = '10px';
        inputField.style.right = '10px';
        inputField.style.width = '110px'
        inputField.style.zIndex = '9999';
        inputField.style.padding = '5px';
        inputField.style.backgroundColor = 'WHITE';
        inputField.style.border = 'black';
        inputField.style.borderRadius = '10px';
        inputField.style.fontSize = '16px';

        const button = document.createElement('button');
        button.textContent = 'vsauko'; // Текст кнопки
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '9999';
        button.style.padding = '4px 8px';
        button.style.backgroundColor = '#5d5abd'; // Цвет фона кнопки
        button.style.color = 'white'; // Цвет текста кнопки
        button.style.border = 'none'; // Убираем рамку у кнопки
        button.style.borderRadius = '10px'; // Скругление углов кнопки
        button.style.cursor = 'pointer'; // Указательная стрелка при наведении на кнопку
        document.body.appendChild(button); // Добавляем кнопку на страницу

        document.body.appendChild(inputField); // Добавляем поле ввода на страницу

        // Обработчик события нажатия клавиши Enter в поле ввода
        inputField.addEventListener('keydown', async function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const text = inputField.value;
                const morseString = textToMorse(text); // Конвертируем введённый текст в код Морзе
                console.log('Введён шифр ', morseString);
                await textToTap(morseString); // Выполняем последовательность тапов по коду Морзе
                inputField.value = ''; // Очищаем поле ввода после выполнения
            }
        });
    }

    // Функция для запуска функционала на странице HamsterKombat
    function hamsterkombatFunctionality() {
        window.addEventListener('load', () => {
            addInputField(); // Добавляем поле ввода при загрузке страницы
        });
    }

    // Проверяем текущий URL и запускаем функционал, если он соответствует HamsterKombat
    if (currentUrl.includes('hamsterkombat.io')) {
        hamsterkombatFunctionality();
    }
})();
