const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("От -15 до -28 баллов (устойчиво-негативное отношение) - собственное здоровье, тем более здоровье окружающих, не представляет для подростка сколь-нибудь значимой ценности. Ему либо вовсе наплевать на свое физическое состояние, либо он ненавидит все то, что связано с его телесной жизнью (последний случай реален при условии низкого самопринятия подростка). 3аботящихся о своем здоровье он презирает. Свои вредные привычки полагает делом абсолютно естественным и, может быть, даже гордится ими. При случае он не преминет высмеять все, что связано с темой здоровья, физической куль- туры и спорта.",-15),
	new Result("От -1 до -14 баллов (ситуативно-негативное отношение) - ценность здоровья невысока в сознании подростка. Размышления и разговоры о здоровье и здоровом образе жизни он считает пустой тратой времени, уделом пенсионеров. Ему хочется хорошо, по- спортивному, выглядеть в глазах окружающих, но что-то делать для этого ему откровенно лень. Вредные привычки не кажутся ему такими уж вредными, наоборот, - в них есть некая приятность, шарм. Он наверняка одобрительно усмехнется, услышав фразу «кто не курит и не пьет, тот здоровеньким помрет».", -14),
	new Result("От +1 до +14 баллов (ситуативно-позитивное отношение) - ценность здоровья значима для подростка. Объективно он понимает важность здорового образа жизни, но субъективно ставит его не слишком высоко. Здоровье для него - естественное состояние, само собой разумеющаяся «вещь», а не то, что требует специальных усилий. Пристрастие к вредным привычкам - извинительная слабость, а не проявление безволия. Возможно, в глубине души он полагает, что способен добиться жизненного успеха, не уделяя пристального внимания своей физической форме.", 1),
	new Result("От + 15 до +28 баллов (устойчиво-позитивное отношение) - для подростка ценность здоровья является приоритетной. Он понимает, что такое здоровый образ жизни, сознательно культивирует его и связывает с ним свои дальнейшие жизненные успехи. Он способен противостоять попыткам вовлечь его в процесс употребления табака, алкоголя, наркотических веществ и постарается не допустить этого в отношении других.", 15)
];




//Массив с вопросами
const questions = 
[
	new Question("Спортивные занятия - жизненная необходимость для каждого человека.", 
	[
		new Answer("Полностью согласен", 4),
		new Answer("Согласен", 3),
		new Answer("Согласен но не полностью", 2),
		new Answer("Согласен лишь частично", 1),
		new Answer("Не могу ответить", 0),
		new Answer("Скорее нет, чем да",-1),
		new Answer("В общем, нет", -2),
		new Answer("Нет, конечно ", -3),
		new Answer("Нет, абсолютно неверно", -4),
	]),

	new Question("Я считаю, что курение или алкоголь способны помочь мне расслабиться, снять напряжение.", 
	[
		new Answer("Полностью согласен", -4),
		new Answer("Согласен", -3),
		new Answer("Согласен но не полностью", -2),
		new Answer("Согласен лишь частично", -1),
		new Answer("Не могу ответить", 0),
		new Answer("Скорее нет, чем да",1),
		new Answer("В общем, нет", 2),
		new Answer("Нет, конечно ", 3),
		new Answer("Нет, абсолютно неверно", 4),
		
	]),

	new Question("От одной дозы наркотиков я не стану наркоманом.", 
	[
		new Answer("Полностью согласен", -4),
		new Answer("Согласен", -3),
		new Answer("Согласен но не полностью", -2),
		new Answer("Согласен лишь частично", -1),
		new Answer("Не могу ответить", 0),
		new Answer("Скорее нет, чем да",1),
		new Answer("В общем, нет", 2),
		new Answer("Нет, конечно ", 3),
		new Answer("Нет, абсолютно неверно", 4),
		
	]),

	new Question("Все состоявшиеся в жизни люди стараются поддерживать хорошую физическую форму.", 
	[
		new Answer("Полностью согласен", 4),
		new Answer("Согласен", 3),
		new Answer("Согласен но не полностью", 2),
		new Answer("Согласен лишь частично", 1),
		new Answer("Не могу ответить", 0),
		new Answer("Скорее нет, чем да",-1),
		new Answer("В общем, нет", -2),
		new Answer("Нет, конечно ", -3),
		new Answer("Нет, абсолютно неверно", -4),
		
	]),

	new Question("Я предпочту активный отдых сидению у телевизора или компьютера.", 
	[
		new Answer("Полностью согласен", 4),
		new Answer("Согласен", 3),
		new Answer("Согласен но не полностью", 2),
		new Answer("Согласен лишь частично", 1),
		new Answer("Не могу ответить", 0),
		new Answer("Скорее нет, чем да",-1),
		new Answer("В общем, нет", -2),
		new Answer("Нет, конечно ", -3),
		new Answer("Нет, абсолютно неверно", -4),
		
	]),

	new Question("Я думаю, что здоровье сегодня не самое главное в жизни.", 
	[
		new Answer("Полностью согласен", -4),
		new Answer("Согласен", -3),
		new Answer("Согласен но не полностью", -2),
		new Answer("Согласен лишь частично", -1),
		new Answer("Не могу ответить", 0),
		new Answer("Скорее нет, чем да",1),
		new Answer("В общем, нет", 2),
		new Answer("Нет, конечно ", 3),
		new Answer("Нет, абсолютно неверно", 4),
		
	]),

	new Question("Вкусовые качества продуктов питания, на мой взгляд, важнее их полезности.", 
	[
		new Answer("Полностью согласен", -4),
		new Answer("Согласен", -3),
		new Answer("Согласен но не полностью", -2),
		new Answer("Согласен лишь частично", -1),
		new Answer("Не могу ответить", 0),
		new Answer("Скорее нет, чем да",1),
		new Answer("В общем, нет", 2),
		new Answer("Нет, конечно ", 3),
		new Answer("Нет, абсолютно неверно", 4),
		
	]),

];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Баллы: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 2)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}