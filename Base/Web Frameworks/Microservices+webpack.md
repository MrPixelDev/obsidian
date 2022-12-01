#webpack #microfrontend
# (Микро)фронтенды и микросервисы с помощью Webpack

[Блог компании TINKOFF](https://habr.com/ru/company/tinkoff/blog/)[Angular*](https://habr.com/ru/hub/angular/)[Микросервисы*](https://habr.com/ru/hub/microservices/)

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/d66/1fa/b3f/d661fab3f313aad761837875834ba12a.png)

Привет! Меня зовут Максим, я фронтенд-разработчик компании Тинькофф, лид команды фронтендов, которые пилят международные проекты. Я работал как фронтом, так и бэкером — это дало мне релевантный опыт и в микрофронтендах в том числе.

Статья будет о фронтендах, но сначала предлагаю немного обсудить монолиты. Они бывают разные.

## Зачем пилить монолит

Когда есть команда, поддерживающая один большой продукт, и этот продукт — монолит, можно сказать, что ей повезло. Не нужно париться с микрофронтендами, хорошая разработка закрывает все вопросы. Бизнес — доволен, заказчики — довольны.

Проблемы с монолитами появляются, когда в разработке одного продукта участвуют две и больше команд. Начинаются конфликты, портятся отношения в команде.

Разберем пример. Возьмем условное приложение — любой городской портал. Там есть новости, продажа или аренда жилья и статистика по автомобилям.

![Городской портал — классический монолит, SPA, который состоит из трех страниц. Каждую страницу поддерживает своя команда, каждую из этих страничек — три команды. Соответственно, тайлы у них одни](https://habrastorage.org/r/w1560/getpro/habr/upload_files/12c/e0a/6bd/12ce0a6bd5616ebc45aa1526fc8efc24.png "Городской портал — классический монолит, SPA, который состоит из трех страниц. Каждую страницу поддерживает своя команда, каждую из этих страничек — три команды. Соответственно, тайлы у них одни")

Городской портал — классический монолит, SPA, который состоит из трех страниц. Каждую страницу поддерживает своя команда, каждую из этих страничек — три команды. Соответственно, тайлы у них одни

В приложении появилось несколько десятков конфликтов, образовалась очередь на релизы. Это больно и трудно.

В один прекрасный момент руководитель команды принял решение распилиться. Но помимо монолитного фронта обычно есть еще и монолитный бэк. А это значит, что будем распиливать и фронт, и бэк. Чтобы все прошло успешно, нужен план:

1.  Собраться всеми командами, которые участвуют в разработке продукта.
    
2.  Определить, что, как и зачем будем пилить.
    
3.  Придумать схему нового решения.
    
4.  Внести правки в новое решение.
    
5.  Начать распил.
    
6.  Забыть про отказоустойчивость решения.
    

На выходе получится примерно такая схема: 

![Новое решение 95 означает, что до этого было 94 варианта возможного решения, которые не подошли.
Слева — то, что было, справа — то, что получилось. Но в новой схеме есть проблема — мы не распилили UI](https://habrastorage.org/r/w1560/getpro/habr/upload_files/b30/d44/5dc/b30d445dc49cc984f877177e5a046c83.png "Новое решение 95 означает, что до этого было 94 варианта возможного решения, которые не подошли.
Слева — то, что было, справа — то, что получилось. Но в новой схеме есть проблема — мы не распилили UI")

Новое решение 95 означает, что до этого было 94 варианта возможного решения, которые не подошли. Слева — то, что было, справа — то, что получилось. Но в новой схеме есть проблема — мы не распилили UI

Основная проблема монолита — это бэк, когда много всего намешано в одной базе и бизнес-логика написана разными методами. Проблемой фронта это стало относительно недавно. Поэтому часто при распиле на микросервисы забывают фронт. Но фронт нам все равно нужно тоже распиливать, и решений, как распилить фронт, много.

Можно оставить все как есть, если текущий UI всех устраивает. Главное — соблюдать основной постулат разработки: «Работает — не трогай». Но есть минус такого решения: неудобно тащить новую функциональность, разработчики будут страдать и начнется война за место в релизе. Чтобы все разрулить, появилась новая должность — Senior Conflict Manager. Человек, который будет собирать релизы.

Если текущий UI не подходит, будем распиливать его на микрофронты.

## Что такое микрофронтенд

Название микрофронтенд появилось в 2016—2017 годах. Это некий постулат идей о том, как должно выглядеть приложение. Идей около 17, [и на сайте Micro-Frontends.org](https://micro-frontends.org/) они все расписаны.

Я выделил три важных аспекта микрофронта.

**Изолированный код каждой команды.** Не должно быть переплетений. Как этого добиться — вопрос двоякий. Можно уехать в другие репозитории, можно в разные NPM-скопы и прочее.

**Уникальный префикс для каждой команды.** Не должно быть пересечений, тогда не будет пересечений в коде.

**Выбор нативного API, который предоставляет фреймворк.** Это могут быть нативные фишки браузера, нативные фишки фреймворка, и не нужно писать свои костыли. Если что-то не нравится, можно заявить в issue на GitHub в этот фреймворк либо попробовать закатить пул-реквест.

Я убедился опытным путем, что не стоит придумывать свои решения. Когда я придумывал свои решения, мне казалось, что они классные и отлично работают. Но мои фронтендеры потом в конце рабочего дня плакали.

## Какие есть варианты распила

**Распил в NPM-библиотеке.** У каждой команды будет своя страничка, все с отдельными тегами и хранятся в разных местах — определен свой NPM-скоуп, и код можно разнести. Понадобится приложение-синхронизатор, которое возьмет код всех команд и подключит к себе.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/87e/1b8/38d/87e1b838dff73690421e7c9091412b4b.png)

Микросервис все же не об этом. Он о том, что два приложения могут вместе работать и взаимодействовать между собой. А что, если сделать три приложения?

![Источник: https://martinfowler.com/articles/micro-frontends.html 
Три приложения с базовыми пайплайнами. Каждое приложение собирается отдельно, гоняем на каждом тесты и деплоим. Процесс компоновки всего воедино уже не такой подробный: у одних это будет компоновка через Iframe, у других свои фреймворки и велосипеды или же гитовые сабмодули и сборка в единый бандл. Целостного решения нет](https://habrastorage.org/r/w1560/getpro/habr/upload_files/06d/840/5c4/06d8405c4663eaf64a68df4ac1fa4a47.png "Источник: https://martinfowler.com/articles/micro-frontends.html 
Три приложения с базовыми пайплайнами. Каждое приложение собирается отдельно, гоняем на каждом тесты и деплоим. Процесс компоновки всего воедино уже не такой подробный: у одних это будет компоновка через Iframe, у других свои фреймворки и велосипеды или же гитовые сабмодули и сборка в единый бандл. Целостного решения нет")

Источник: https://martinfowler.com/articles/micro-frontends.html Три приложения с базовыми пайплайнами. Каждое приложение собирается отдельно, гоняем на каждом тесты и деплоим. Процесс компоновки всего воедино уже не такой подробный: у одних это будет компоновка через Iframe, у других свои фреймворки и велосипеды или же гитовые сабмодули и сборка в единый бандл. Целостного решения нет

**Использование монорепозиториев.** Когда есть один репозиторий и создается несколько приложений, все они хранятся в своих отдельных папках и получаются локальные библиотеки. Как NPN-библиотека, только не в NPN, а локально в коде, и при сборке попадет в зависимость от каждого из приложений.

Нужно сделать библиотеку с хедером и завести три приложения. Каждая команда реализует свой блок логики, у них есть общий хедер, через который осуществляется навигация.

![](https://habrastorage.org/r/w1560/getpro/habr/upload_files/bae/3b4/167/bae3b4167f4b2b49cabc03f92cb5fa6f.png)

На выходе получается вроде бы монорепозиторий. Но нужен SPA. Решение нашлось в 2018 году, когда появился пятый Webpack. Помимо всяких ускорений работы он принес с собой Modul Federation.

Модуль имеет простую концепцию — притягивать через динамический импорт целое приложение. Будет условное приложение-хост, в котором описан загрузчик и указаны дочерние приложения для загрузки в основное.

```
plugins: [
     new ModuleFederationPlugin({
       remotes: {
         main: 'main@http://localhost:4201/remoteEntry.js',
         rent: 'rent@http://localhost:4202/remoteEntry.js',
         cars: 'cars@http://localhost:4203/remoteEntry.js',
       },
       shared: share({
         '@angular/core': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
         '@angular/common': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
         '@angular/common/http': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
         '@angular/router': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
         '@angular/forms': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
         ...sharedMappings.getDescriptors(),
       }),
     }),
     sharedMappings.getPlugin(),
   ],
```

Есть два приложения, в рамках MFE это называется Host и Remote. У host-приложения есть webpack-конфиг с плагином MFE, он принимает в себя список зависимых приложений и библиотеки, которые должны быть едиными для всех приложений.

## Подробнее про Remotes

Блок Remotes — это webpack-конфиг хост-приложения, приложения-синхронизатора. В этом блоке определяются названия проектов, они уникальны и должны иметь свой префикс.

Указывается URL-адрес, откуда забирать. Shared-секция описывает, какие зависимости в package.json должны иметь строгую версию и должна ли эта зависимость являться single-тоном.

![1 — название приложения, в которое надо загрузить; 2 — URL-адрес, откуда нужно загрузить; 3 — файл, который надо загрузить](https://habrastorage.org/r/w1560/getpro/habr/upload_files/d43/4c8/5b9/d434c85b9ad2643052681a6250381705.png "1 — название приложения, в которое надо загрузить; 2 — URL-адрес, откуда нужно загрузить; 3 — файл, который надо загрузить")

1 — название приложения, в которое надо загрузить; 2 — URL-адрес, откуда нужно загрузить; 3 — файл, который надо загрузить

Блок Remotes позволяет разнести свои приложения по разным доменам. В плане при распиле монолита был пункт «забыть про отказоустойчивость». Про нее забывают всегда.

Такое нововведение, которое позволяет с хоста загружать свой файл, дает развернуть приложение на отдельном железе или отдельном деплойменте в кубе. Чтобы все приложения стали независимыми и имели разное количество памяти, ЦПУ.

Если кому-то надо больше — накидываем больше. Например, пять разных приложений — пять разных деплойментов, но будет выглядеть как SPA.

В Angular есть файлик app.module.ts, там описаны компоненты, модули, зависимости приложения, декларируется роутинг и многое другое. В рамках remote-приложения на MFE сохраняется app.module.ts remote, но появляется новый файлик — remote-entry.module.ts. В нем описываются зависимости приложения, которые нужны в remote-режиме.

Получается две схемы деплоя: можно загрузиться как независимое приложение, стоящее на отдельном хосте, и зависимое приложение через RemoteEntryComponent.

Но есть нюанс. Если в app-модуле нужно объявить root-зависимости, то во втором случае нужно определить child-зависимость. Они должны быть дочерними, потому что root-зависимости будут описаны в app-модуле нашего хост-приложения.

```

   plugins: [
       new ModuleFederationPlugin({
           name: "main",
           fileName: "remoteEntry.js",
           exposes : {
               './Module': 'apps/main/src/app/remote-entry/entry.module.ts'
           },
           shared: share({
               '@angular/core': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
               '@angular/common': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
               '@angular/common/http': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
               '@angular/router': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
               '@angular/forms': {singleton: true, strictVersion: true, requiredVersion: 'auto'},
               ...sharedMappings.getDescriptors(),
           }),
       }),
       sharedMappings.getPlugin(),
     ],
```

Внутри webpack.config.js добавляем плагин MFE, в котором описаны базовые импорты, правила и многое другое.

Появилась секция name, где нужно указать название дочернего приложения, которое мы разрабатываем. А в секции exposes указываем ссылку на тот модуль, который будет упаковываться в файл remoteEntry.js.

Аналогично описывается shared-секция тех зависимостей, что должны быть синхронизированы. Мы синхронизируем Angular, можем синхронизировать любую библиотеку из NPM-скоупа и любую локальную библиотеку, если используем там монорепозиторий.

## Подробнее про Host

Все описывается в app-модуле. Я декларирую, определяю рутовый роутинг, который будет базовым для всего и главным, определяю несколько путей, импортирую к себе лейзи-модуль. Этот модуль должен быть загружен не сразу, при старте приложения, а когда мы перейдем на условный путь. Для этого делаем ссылку на динамический модуль дочернего приложения.

```
 @NgModule({
       declarations: [AppComponent],
       imports: [
           BrowserModule,
           RouterModule.forRoot([
               {
                   path: 'main',
                   loadChildren: () => import('main/Module').then(m => m.RemoteEntryModule)
               },
               {
                   path: 'rent',
                   loadChildren: () => import('rent/Module').then(m => m.RemoteEntryModule)
               },
               {
                   path: 'cars',
                   loadChildren: () => import('cars/Module').then(m => m.RemoteEntryModule)
               }
           ])
       ],
       bootstrap: [AppComponent]
   })
   export class AppModule {}
```

Все, можно считаться микрофронтендером!

Дальше я напишу примерно такой UI, в котором будет хедер, а внутри хедера — ссылки, ведущие нас по приложению.

```
 <div>
       <h3>My city portal</h3>
       <header>
           <a [routerLink]="'/main'">Main</a>
           <a [routerLink]="'/rent'">Rent</a>
           <a [routerLink]="'/cars'">Cars</a>
       </header>
       <div>
           <router-outlet></router-outlet>
       </div>
   </div>
```

Ангулярщики уже понимают, роутер-аутлет — секция, куда будет вставляться контент зависимого приложения. Есть роутинг — мы определили его верхнюю часть, и роутер-аутлет — блок, в котором будет находиться дочерний роутинг.

Дальше начинается магия — происходит анимация. Я хожу по нашему приложению, при нажатии на LoginPage у меня загружается файлик, который загружает в приложение LoginPage, при нажатии на Origination загружается приложение Origination. В приложении Origination есть кнопка Go To Lazy — это дочерний роутинг зависимого приложения. Ничего не перезагружается, все работает как классическое SPA, то есть фактически монолит, но им не является.

![Так выглядит код в консоли](https://habrastorage.org/r/w1560/getpro/habr/upload_files/e01/11e/16f/e0111e16fd607258ca89844282f35c97.png "Так выглядит код в консоли")

Так выглядит код в консоли

MainJS попадает к нам с загрузкой приложения. Появляется динамический импорт, который берет из конфига указанный URL и идет на хост за нужным файликом. Потом начинается процесс загрузки того приложения внутри нашего.

![В браузере получаем remoteEntry.js, который начинает тащить те зависимости, что нужны ему для приложения. И если зайти на localhost.42, должно открыться приложение с уже описанным там роутингом](https://habrastorage.org/r/w1560/getpro/habr/upload_files/28f/489/0c0/28f4890c018f9c9042e693b8607bf610.png "В браузере получаем remoteEntry.js, который начинает тащить те зависимости, что нужны ему для приложения. И если зайти на localhost.42, должно открыться приложение с уже описанным там роутингом")

В браузере получаем remoteEntry.js, который начинает тащить те зависимости, что нужны ему для приложения. И если зайти на localhost.42, должно открыться приложение с уже описанным там роутингом

Пятый выход Webpack дал нам очень много фишек, направленных на ускорение сборок, улучшение минификации и улучшенную работу с плагинами. И как дополнение — гибкая система управления микрофронтами, которая работает, и дополнительно ничего больше не нужно.

Работа из коробки с нативом и голым Webpack — там уже есть pluginFederation и можно делать микрофронты. Все популярные фреймворки имеют в комплекте MFE.

## Выводы

Микрофронты позволяют решить проблему конфликтов приложений. В нашем примере с точки зрения пользователя мы создали монолит — один раз зашел и все сделал, а на деле все на микрофронтах.

Webpack выпуском MFE понизил планку входа в микрофронты. Если раньше нужно было писать загрузчик, понимать, как все работает на деле, то теперь все стало проще — плагин, документация к нему. Идешь по документации и делаешь, как там написано.

Получается довольно гибкая работа с надежностью. Если в одном из условных пяти приложений команда что-то сломала, то есть health-чеки, проверяющие доступность приложений, и если приложение недоступно — вешают плашку. Можно с каждым приложением работать отдельно.

А в следующей статье расскажу, как мы съезжали на Modul Federation. Если есть вопросы — жду в комментариях.