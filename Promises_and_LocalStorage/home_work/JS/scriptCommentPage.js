
function addCommentList() {
    const commentBoxEl = document.querySelector('.comment-box');
    const commentSize = window.localStorage.length;

    //Создаём список отзывов по товарам

    for (let i = 0; i < commentSize; i++) {
        let prodName = localStorage.key(i);// получаем название товара

        // Заполним перечень товаров
        commentBoxEl.insertAdjacentHTML('beforeend', `
            <details id="${i}" class="comment__details">
                <summary class="comment__summary">
                    <h3 class="comment__product-title">${prodName}</h3>
                </summary>
            </details>
        `);
    };

    const commentDetailsEl = document.querySelectorAll('.comment__details');

    // найдём Id списков товаров в HTML и в хранилище, сравним их.

    commentDetailsEl.forEach(commentBlock => { // бежим по списку товаров
        for (let i = 0; i < commentSize; i++) { // бежим по хранилищу

            if (parseInt(commentBlock.getAttribute('id')) === i) {
                let prodName = localStorage.key(i);
                let prodComment = JSON.parse(localStorage.getItem(prodName));// получаем массив отзывов

                const detailsBlock = document.getElementById(`${i}`);
                prodComment.forEach(arrElement => {// бежим по массивам и заполняем отзывы в HTML
                    detailsBlock.insertAdjacentHTML('beforeend', `
                        <div class="comment__form">
                            <p class="comment__product-text">${arrElement}</p>
                            <button class="comment__button">Удалить отзыв</button>
                        </div>  
                    `)
                });
            }
        }
    });
};

function deleteComment() {

    const commentBoxEl = document.querySelector('.comment-box');

    commentBoxEl.addEventListener('click', function (e) {
        const target = e.target; // Элемент на котором был выполнен клик

        // Метод Element.closest() ищет и возвращает ближайший (начиная с самого элемента) 
        // родительский элемент, соответствующий указанному CSS-селектору
        if (target.closest('.comment__button')) {

            const productTitle = target.closest('.comment__button').parentElement.parentElement.firstElementChild.firstElementChild.textContent;
            // console.log(`Название товара: ${productTitle}`);
          
            const commentValue = target.closest('.comment__button').previousElementSibling.textContent;
            // console.log(`Текст отзыва: ${commentValue}`);

            const formBlock = target.closest('.comment__button').parentElement;
            // console.log(formBlock);

            const detailsBlock = target.closest('.comment__button').parentElement.parentElement;
            // console.log(detailsBlock);

            const commentSize = window.localStorage.length;
            // console.log(`Длина хранилища: ${commentSize}`);

            for (let i = 0; i < commentSize; i++) {
                let prodName = localStorage.key(i);// получаем название товара
                
                if (productTitle === prodName) {
                    // console.log(`Название товара: ${prodName}`);
        
                    let prodComment = JSON.parse(localStorage.getItem(productTitle));// получаем массив отзывов по заданному ключу
                    console.log(prodComment);
                    if (prodComment.length > 1) {
                        formBlock.remove();// удаляем отзыв с кнопкой

                        prodComment.splice(prodComment.findIndex((i) => i === commentValue), 1);
                        // удаляем выбранный товар из prodComment
                        // prodComment.findIndex((i) => i === commentValue) - определяем индекс удаляемого товара, вторым параметром указываем количество удаляемых позиции в массиве после найденного индекса

                        localStorage.setItem(prodName, JSON.stringify(prodComment));
                        // Сохраним обновленную корзину в localStorage

                        // console.log(`${i}-${prodName} - длинна массива(${prodComment.length})`);
                    } else {
                        detailsBlock.remove();// удаяем блок с названием товара
                        localStorage.removeItem(prodName);// удаляем товар из LocalStorage

                        // console.log(`Удаление блока ${i}-${prodName} - длинна массива(${prodComment.length})`);
                    };
                };
            };

        } else {
            e.stopPropagation(); // завершение event.target
        }
    });
}

addCommentList();
deleteComment();

