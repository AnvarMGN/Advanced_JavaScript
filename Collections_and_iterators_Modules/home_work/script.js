// Задание 1
// • Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

// • Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

// {
// title: "Название альбома",
// artist: "Исполнитель",
// year: "Год выпуска"
// }

// • Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
// • Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)


const musicCollection = {
    albums: [
        {
            title: "Thriller",
            artist: "Michael Joseph Jackson",
            year: 1982
        },
        {
            title: "Генератор зла",
            artist: "Ария",
            year: 1998
        },
        {
            title: "Hybrid Theory",
            artist: "Linkin Park",
            year: 2000
        }
    ]
}


musicCollection[Symbol.iterator] = function () {
    let index = 0;
    const albums = this.albums;
    return {
        next() {
            // if (index < albums.length) {
            //     return { value: albums[this.index++], done: false };
            // } else {
            //     return { value: undefined, done: true };
            // }
            return index < albums.length ? { done: false, value: albums[index++] } : { done: true, value: undefined }
        }
    }
};

for (const album of musicCollection) {
    console.log(`${album.title} - ${album.artist}(${album.year})`);
};