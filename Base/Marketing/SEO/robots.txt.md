С помощью файла robots.txt вы можете указывать, [какие файлы на вашем сайте будут видны поисковым роботам](https://developers.google.com/search/docs/crawling-indexing/robots/intro?hl=ru). Файл robots.txt находится в корневом каталоге вашего сайта. Например, на сайте `www.example.com` он находится по адресу `www.example.com/robots.txt`. Это обычный текстовый файл, который соответствует [стандарту исключений для роботов](https://en.wikipedia.org/wiki/Robots_exclusion_standard#About_the_standard) и содержит одно или несколько правил. Каждое из них запрещает или разрешает тому или иному поисковому роботу доступ к определенному пути в домене или субдомене, в котором размещается файл robots.txt. Все файлы считаются доступными для сканирования, если вы не указали иное в файле robots.txt.

Ниже приведен пример простого файла robots.txt с двумя правилами.

User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: http://www.example.com/sitemap.xml

**Пояснения:**

1.  Агенту пользователя с названием Googlebot запрещено сканировать любые URL, начинающиеся с `http://example.com/nogooglebot/`.
2.  Любым другим агентам пользователя разрешено сканировать весь сайт. Это правило можно опустить, и результат будет тем же. По умолчанию агенты пользователя могут сканировать сайт целиком.
3.  [Файл Sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=ru) этого сайта находится по адресу `http://www.example.com/sitemap.xml`.

Более подробные сведения вы найдете в разделе [Синтаксис](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=ru&visit_id=638053023438580329-1022950735&rd=1#create_rules).

## Основные рекомендации по созданию файла robots.txt

Работа с файлом robots.txt включает четыре этапа.

1.  [Создайте файл robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=ru&visit_id=638053023438580329-1022950735&rd=1#format_location)
2.  [Добавьте в него правила](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=ru&visit_id=638053023438580329-1022950735&rd=1#create_rules)
3.  [Опубликуйте готовый файл на своем сайте](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=ru&visit_id=638053023438580329-1022950735&rd=1#upload)
4.  [Протестируйте свой файл robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt?hl=ru&visit_id=638053023438580329-1022950735&rd=1#testing)

## Как создать файл robots.txt

Создать файл robots.txt можно в любом текстовом редакторе, таком как Блокнот, TextEdit, vi или Emacs. Не используйте офисные приложения, поскольку зачастую они сохраняют файлы в проприетарном формате и добавляют в них лишние символы, например фигурные кавычки, которые не распознаются поисковыми роботами. Обязательно сохраните файл в кодировке UTF-8, если вам будет предложено выбрать кодировку.

**Правила в отношении формата и расположения файла**

-   Файл должен называться robots.txt.
-   На сайте должен быть только один такой файл.
-   Файл robots.txt нужно разместить в корневом каталоге сайта. Например, на сайте `https://www.example.com/` он должен располагаться по адресу `https://www.example.com/robots.txt`. Он _не должен_ находиться в подкаталоге (например, по адресу `https://example.com/pages/robots.txt`). Если вы не знаете, как получить доступ к корневому каталогу, или у вас нет соответствующих прав, обратитесь к хостинг-провайдеру. Если у вас нет доступа к корневому каталогу сайта, используйте альтернативный метод блокировки, например [метатеги](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=ru).
-   Файл robots.txt можно разместить по адресу с субдоменом (например, `https://**website**.example.com/robots.txt`) или нестандартным портом (например, `http://example.com:**8181**/robots.txt`).
-   Действие robots.txt распространяется только на пути в пределах протокола, хоста и порта, где он размещен. Иными словами, правило по адресу `https://example.com/robots.txt` действует только для файлов, относящихся к домену `https://example.com/`, но не к субдомену, такому как `https://m.example.com/`, или другим протоколам, например `http://example.com/`.
-   Файл robots.txt должен представлять собой текстовый файл в кодировке UTF-8 (которая включает коды символов ASCII). Google может проигнорировать символы, не относящиеся к UTF-8, в результате чего будут обработаны не все правила из файла robots.txt.

## Как добавить правила в файл robots.txt

Правила – это инструкции для поисковых роботов, указывающие, какие разделы сайта можно сканировать. Добавляя правила в файл robots.txt, учитывайте следующее:

-   Файл robots.txt состоит из одной или более групп.
-   Каждая группа может включать несколько правил, по одному на строку. Эти правила также называются директивами. Каждая группа начинается со строки `User-agent`, определяющей, какому роботу адресованы правила в ней.
-   Группа содержит следующую информацию:
    -   К какому агенту пользователя относятся директивы группы.
    -   К каким каталогам или файлам у этого агента _есть доступ_.
    -   К каким каталогам или файлам у этого агента _нет доступа_.
-   Поисковые роботы обрабатывают группы по порядку сверху вниз. Агент пользователя может следовать только одному, наиболее подходящему для него набору правил, который будет обработан первым.
-   По умолчанию агенту пользователя разрешено сканировать любые страницы и каталоги, доступ к которым не заблокирован правилом `disallow`.
-   Правила должны указываться с учетом регистра. К примеру, правило `disallow: /file.asp` распространяется на URL `https://www.example.com/file.asp`, но не на `https://www.example.com/FILE.asp`.
-   Символ `#` означает начало комментария.

**Правила в файлах robots.txt, поддерживаемые роботами Google**

-   `user-agent:` (обязательное правило, может повторяться в пределах группы). Определяет, к какому именно автоматическому клиенту (поисковому роботу) относятся правила в группе. С такой строки начинается каждая группа правил. Названия агентов пользователя Google перечислены в [этом списке](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers?hl=ru). Используйте знак `*`, чтобы заблокировать доступ всем поисковым роботам (кроме роботов AdsBot, которых нужно указывать отдельно). Примеры:
    
    # Example 1: Block only Googlebot
    User-agent: Googlebot
    Disallow: /
    
    # Example 2: Block Googlebot and Adsbot
    User-agent: Googlebot
    User-agent: AdsBot-Google
    Disallow: /
    
    # Example 3: Block all crawlers except AdsBot (AdsBot crawlers must be named explicitly)
    User-agent: *
    Disallow: /
    
-   `disallow:` (каждое правило должно содержать не менее одной директивы `disallow` или `allow`). Указывает на каталог или страницу относительно корневого домена, которые нельзя сканировать агенту пользователя. Если правило касается страницы, должен быть указан полный путь к ней, как в адресной строке браузера. В начале строки должен быть символ `/`. Если правило касается каталога, строка должна заканчиваться символом `/`.
-   `allow:` (каждое правило должно содержать не менее одной директивы `disallow` или `allow`). Указывает на каталог или страницу относительно корневого домена, которые разрешено сканировать агенту пользователя. Используется для того, чтобы переопределить правило `disallow` и разрешить сканирование подкаталога или страницы в закрытом для обработки каталоге. Если правило касается страницы, должен быть указан полный путь к ней, как в адресной строке браузера. Если правило касается каталога, строка должна заканчиваться символом `/`.
-   `sitemap:` (необязательная директива, которая может повторяться несколько раз или не использоваться совсем). Указывает на расположение файла Sitemap, используемого на сайте. URL файла Sitemap должен быть полным. Google не перебирает варианты URL с префиксами http и https или с элементом www и без него. Из файлов Sitemap роботы Google получают информацию о том, какой контент нужно сканировать и как отличить его от материалов, которые _можно_ или _нельзя_ обрабатывать. [Подробнее…](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview?hl=ru) **Примеры:**
    
    Sitemap: https://example.com/sitemap.xml
    Sitemap: http://www.example.com/sitemap.xml
    

Все правила, кроме `sitemap`, поддерживают подстановочный знак `*` для обозначения префикса или суффикса пути, а также всего пути.

Строки, не соответствующие ни одному из этих правил, игнорируются.

Ознакомьтесь со [спецификацией Google для файлов robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt?hl=ru), где подробно описаны все правила.

## Как загрузить файл robots.txt

Сохраненный на компьютере файл robots.txt необходимо загрузить на сайт и сделать доступным для поисковых роботов. Специального инструмента для этого не существует, поскольку способ загрузки зависит от вашего сайта и серверной архитектуры. Обратитесь к своему хостинг-провайдеру или попробуйте самостоятельно найти его документацию (пример запроса: "загрузка файлов infomaniak").

После загрузки файла robots.txt проверьте, доступен ли он для роботов и может ли Google обработать его.

## Как протестировать разметку файла robots.txt 

Чтобы убедиться, что загруженный файл robots.txt общедоступен, откройте в браузере [окно в режиме инкогнито](https://support.google.com/chrome/answer/95464?hl=ru) (или аналогичном) и перейдите по адресу файла. Пример: `https://example.com/robots.txt`. Если вы видите содержимое файла robots.txt, то можно переходить к тестированию разметки.

Для этой цели Google предлагает два средства:

1.  [Инструмент проверки файла robots.txt](https://support.google.com/webmasters/answer/6062598?hl=ru) в Search Console. Этот инструмент можно использовать только для файлов robots.txt, которые уже доступны на вашем сайте.
2.  Если вы разработчик, мы рекомендуем воспользоваться [библиотекой с открытым исходным кодом](https://github.com/google/robotstxt), которая также применяется в Google Поиске. С помощью этого инструмента файлы robots.txt можно локально тестировать прямо на компьютере.

## Как отправить файл robots.txt в Google

Когда вы загрузите и протестируете файл robots.txt, поисковые роботы Google автоматически найдут его и начнут применять. С вашей стороны никаких действий не требуется. Если вы внесли в файл robots.txt изменения и хотите как можно скорее обновить кешированную копию, следуйте инструкциям в [этой статье](https://developers.google.com/search/docs/crawling-indexing/robots/submit-updated-robots-txt?hl=ru).

## Полезные правила

Ниже перечислено несколько правил, часто используемых в файлах robots.txt.

Полезные правила

Это правило запрещает сканировать весь сайт.

Следует учесть, что в некоторых случаях URL сайта могут индексироваться, даже если они не были просканированы.

Обратите внимание, что это правило **не относится** к [роботам AdsBot](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers?hl=ru), которых нужно указывать явно.

User-agent: *
Disallow: /

Это правило запрещает сканировать каталог со всем его содержимым.

Чтобы запретить сканирование целого каталога, поставьте косую черту после его названия.

**Внимание:** не используйте файл robots.txt, чтобы ограничить доступ к определенному контенту. Вместо этого используйте аутентификацию посетителей. URL, сканирование которых запрещено в файле robots.txt, все же могут быть проиндексированы. Кроме того, злоумышленники могут посмотреть содержимое файла robots.txt и узнать, где находится контент, который вы хотите скрыть.

User-agent: *
Disallow: /calendar/
Disallow: /junk/
Disallow: /books/fiction/contemporary/

Это правило позволяет сканировать сайт только одному поисковому роботу.

Сканировать весь сайт может только робот `googlebot-news`.

User-agent: Googlebot-news
Allow: /

User-agent: *
Disallow: /

Это правило разрешает сканирование всем поисковым роботам за исключением одного.

Робот `Unnecessarybot` не может сканировать сайт, а все остальные могут.

User-agent: Unnecessarybot
Disallow: /

User-agent: *
Allow: /

Это правило запрещает сканирование отдельной страницы.

Например, можно запретить сканирование страниц `useless_file.html` и `other_useless_file.html`, размещенных в каталоге `https://example.com/useless_file.html` и `junk` соответственно.

User-agent: *
Disallow: /useless_file.html
Disallow: /junk/other_useless_file.html

Это правило запрещает сканировать весь сайт за исключением определенного подкаталога.

Поисковым роботам предоставлен доступ только к подкаталогу `public`.

User-agent: *
Disallow: /
Allow: /public/

Это правило скрывает определенное изображение от робота Google Картинок.

Например, вы можете запретить сканировать изображение `dogs.jpg`.

User-agent: Googlebot-Image
Disallow: /images/dogs.jpg

Это правило скрывает все изображения на сайте от робота Google Картинок.

Google не сможет индексировать изображения и видео, которые недоступны для сканирования.

User-agent: Googlebot-Image
Disallow: /

Это правило запрещает сканировать все файлы определенного типа.

Например, вы можете запретить роботам доступ ко всем файлам `.gif`.

User-agent: Googlebot
Disallow: /*.gif$

Это правило запрещает сканировать весь сайт, но при этом он может обрабатываться роботом `Mediapartners-Google`

Робот `Mediapartners-Google` сможет получить доступ к удаленным вами из результатов поиска страницам, чтобы подобрать объявления для показа тому или иному пользователю.

User-agent: *
Disallow: /

User-agent: Mediapartners-Google
Allow: /

Воспользуйтесь подстановочными знаками `*` и `$`, чтобы сопоставлять URL, которые заканчиваются определенной строкой.

Например, вы можете исключить все файлы `.xls`.

User-agent: Googlebot
Disallow: /*.xls$