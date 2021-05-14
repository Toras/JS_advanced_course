'use strict'

// 1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
// 2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
let str = `
 Tom Sawyer lived with his aunt because his mother and father were dead. Tom didn't like going to school, and he didn't like working. He liked playing and having adventures. One Friday, he didn't go to school  —  he went to the river. 
 Aunt Polly was angry.  'You're a bad boy!'  she said.  'Tomorrow you can't play with your friends because you didn't go to school today. Tomorrow you're going to work for me. You can paint the fence.' 
 Saturday morning, Tom was not happy, but he started to paint the fence. His friend Jim was in the street. 
 Tom asked him, 'Do you want to paint?' 
 Jim said, 'No, I can't. I'm going to get water.' 
 Then Ben came to Tom's house. He watched Tom and said, 'I'm going to swim today. You can't swim because you're working.' 
 Tom said, 'This isn't work. I like painting.' 
 'Can I paint, too?'  Ben asked. 
 'No, you can't,' Tom answered.  'Aunt Polly asked me because I'm a very good painter.' 
 Ben said, 'I'm a good painter, too. Please, can I paint? I have some fruit. Do you want it?' 
 OK,' Tom said.  'Give me the fruit. Then you can paint.' 
 Ben started to paint the fence. Later, many boys came to Tom's house. They watched Ben, and they wanted to paint, too. 
 Tom said, 'Give me some food and you can paint.' 
 Tom stayed in the yard, and the boys painted. They painted the fence three times. It was beautiful and white. 
 Tom went into the house.  'Aunt Polly, can I play now?'  he asked. 
 Aunt Polly was surprised.  'Did you paint the fence?'  she asked. 
 'Yes, I did,' Tom answered. 
 Aunt Polly went to the yard and looked at the fence. She was very surprised and very happy.  'It's beautiful!'  she said.  'Yes, you can play now.' 
 Tom walked to his friend Joe Harper's house and played with his friends there. Then he walked home again. There was a new girl in one yard. She had yellow hair and blue eyes. She was beautiful. Tom wanted to talk to her, but she didn't see him. She went into her house. Tom waited, but she didn't come out again. 
`;
console.log(str.replace(/'(?=\s)|(?<=\s+)'/gi, '"'));
// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

window.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.querySelector('#sendEmail');
    sendButton.addEventListener('click', () => {
        const namePlaceholder = document.querySelector('#name');
        const phonePlaceholder = document.querySelector('#phone');
        const emailPlaceholder = document.querySelector('#email');
        let errorText = '';
        // a. Имя содержит только буквы.
        if (!namePlaceholder.value.match(/^([a-zа-я]+)$/gi)) {
            namePlaceholder.classList.add('hot-red-outline');
            errorText += 'В имени должны быть только буквы!\n';
        } else {
            namePlaceholder.classList.remove('hot-red-outline');
        }
        // b. Телефон имеет вид +7(000)000-0000.
        if (!phonePlaceholder.value.match(/\+7\(\d{3}\)\d{3}-\d{4}/)) {
            phonePlaceholder.classList.add('hot-red-outline');
            errorText += 'Телефон должен иметь вид +7(000)000-0000\n';
        } else {
            phonePlaceholder.classList.remove('hot-red-outline');
        }
        // c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
        if (!emailPlaceholder.value.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)) {
            emailPlaceholder.classList.add('hot-red-outline');
            errorText += 'email должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru\n';
        } else {
            emailPlaceholder.classList.remove('hot-red-outline');
        }
        // e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.
        errorText != '' ? alert(errorText) : '';
    });
})