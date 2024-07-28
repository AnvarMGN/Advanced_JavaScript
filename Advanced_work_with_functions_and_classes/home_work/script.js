// Задание 1
// Представьте, что у вас есть класс для управления библиотекой. В этом классе будет приватное свойство для хранения списка книг, а также методы для добавления книги, удаления книги и получения информации о наличии книги.

// Класс должен содержать приватное свойство #books, которое инициализируется пустым массивом и представляет собой список книг в библиотеке.

// Реализуйте геттер allBooks, который возвращает текущий список книг.

// Реализуйте метод addBook(title), который позволяет добавлять книгу в список. Если книга с таким названием уже существует в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод removeBook(title), который позволит удалять книгу из списка по названию. Если книги с таким названием нет в списке, выбросьте ошибку с соответствующим сообщением.

// Реализуйте метод hasBook(title), который будет проверять наличие книги в библиотеке и возвращать true или false в зависимости от того, есть ли такая книга в списке или нет.

// Реализуйте конструктор, который принимает начальный список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив не содержит дубликатов; в противном случае выбрасывайте ошибку.


class Library {
    #books = [];

    constructor(initialBooks = []) {
        try {
            // Проверка на дубликаты.
            const uniqueBooks = new Set(initialBooks);// Добавим коллекцию Set где будут храниться уникальные элементы переданного массива.
            // Затем сравним размер полученной коллекции с длинной переданного массива.
            // Если длина коллекции не равна длинне массива, значит в списке есть дубликаты.
            if (uniqueBooks.size !== initialBooks.length) {
                throw new Error(`В списке книг библиотеки есть дубликаты.`);
            }
            this.#books = [...uniqueBooks];//Запишем в массив уникальную коллекцию использую spread оператора
        } catch (error) {
            console.log(error.message);
        }
    }

    get allBooks() {
        console.log('Список книг:');
        for (let i = 0; i < this.#books.length; i++) {
            console.log(`${i + 1}. ${this.#books[i]}`);
        }
        // return [...this.#books];
    }

    addBook(title) {
        try {
            if (this.#books.includes(title)) {
                throw new Error(`Книга с названием '${title}' уже существует. `);
            }
            this.#books.push(title);
        } catch (error) {
            console.log(error.message);
        }
    }

    removeBook(title) {
        try {
            const index = this.#books.indexOf(title);// получаем индекс передаваемого названия
            if (index === -1) {// если индексОф возвращает -1, значит искомой книги нет.
                throw new Error(`Книга с названием '${title}' не найдена.`)
            }
            this.#books.splice(index, 1);// в противном случае, удаляем найденный элемент
        } catch (error) {
            console.log(error.message);
        }
    }

    hasBook(title) {
        return this.#books.includes(title);// возвращает тру или фолс
    }
}


const mylibrary = new Library(['Война и мир.', 'Эдоэкология здоровья.', 'Мастер и Маргарита.']);

mylibrary.allBooks;
console.log(' ');

mylibrary.addBook('20000 лье под водой.');
mylibrary.allBooks;
console.log(' ');

mylibrary.removeBook('Война и мир.');
mylibrary.allBooks;
console.log(' ');

console.log(mylibrary.hasBook('Мастер и Маргарита.'));
console.log(mylibrary.hasBook('12 стульев.'));
console.log(' ');

mylibrary.addBook('Эдоэкология здоровья.');
