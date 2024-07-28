const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [{
            id: "1",
            text: "Отличный телефон! Батарея держится долго."
        },
        {
            id: "2",
            text: "Камера супер, фото выглядят просто потрясающе.",
        },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];


let countId = 0;//cчётчик отзывов

function startFeedback(){
    const listElem = document.querySelector('.feedback__list');//Находим список

    // Загружаем массив отзывов в список.
    initialData.forEach(obj => {
        obj.reviews.forEach(review => {
            countId = parseInt(review.id);
            listElem.insertAdjacentHTML('beforeend', `
            <li class="feedback__element">
                    <h3 class="feedback__productName">${obj.product}</h3>
                    <p id="${review.id}}" class="feedback__item">${review.text}</p>
            </li>
        `)
        });
    });
}

function addFeedback() {
    const listElem = document.querySelector('.feedback__list');//Находим список
    const inputProductElem = document.querySelector('.product__select');// Находим select товаров
    const inputElem = document.querySelector('.feedback__input');// Находим ввод отзыва
    const buttonElem = document.querySelector('.feedback__addButton');// Находим кнопку

    // Ловим событие клика на кнопку - Добавить отзыв
    buttonElem.addEventListener('click', function (e) {
        try {
            if ((inputElem.value).length < 50 || (inputElem.value).length > 500) {
                throw new Error('Постарайтесь уместить отзыв в диапазоне от 50 до 500 символов.')
            }

            const newProduct = inputProductElem.value;
            const newFeedbackText = inputElem.value;
            countId += 1;

            // Создаём объект с новым отзывом
            // Не стал использовать проверки на дубли и запись отзыва в массив к конкретному товару
            const newFeedback = {
                product: newProduct,
                reviews: [
                    {
                        id: countId,
                        text: newFeedbackText,
                    }
                ],
            };

            //записываем на страницу
            newFeedback.reviews.forEach(review => {
                listElem.insertAdjacentHTML('beforeend', `
                <li class="feedback__element">
                        <h3 class="feedback__productName">${newFeedback.product}</h3>
                        <p id="${review.id}}" class="feedback__item">${review.text}</p>
                </li>
            `)
            });

            // initialData.push(newFeedback);
            // console.log(initialData);

        } catch (error) {
            alert(error.message);
        }
    });
}


startFeedback();
addFeedback();