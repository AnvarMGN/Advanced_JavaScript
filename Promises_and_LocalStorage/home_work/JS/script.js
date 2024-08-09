
function addComment() {
    const inputProductEl = document.querySelector('.add-comment__product-input');
    // console.log(inputProductEl);
    const inputTextEl = document.querySelector('.add-comment__comment-iput');
    // console.log(inputTextEl);
    const addButton = document.querySelector('.add-comment__button');
    // console.log(addButton);

    addButton.addEventListener('click', function () {
        try {
            const prodName = inputProductEl.value;
            const prodComment = inputTextEl.value;

            if (prodName !== '' && prodComment !== '') {// проверяем на пустой вввод
                let addProdComment = JSON.parse(localStorage.getItem(prodName));// запрашиваем из хранилища значение(отзыв) по введённому ключу(товару)
                if (addProdComment === null) {// проверем на пустое значение 
                    addProdComment = [];
                }
                addProdComment.push(prodComment);
                localStorage.setItem(prodName, JSON.stringify(addProdComment));
            } else {
                throw new Error('Все поля должны быть заполнены.');
            }

            inputProductEl.value = '';
            inputTextEl.value = '';

        } catch (Error) {
            alert(Error.message);
        }
    });
};

addComment();
