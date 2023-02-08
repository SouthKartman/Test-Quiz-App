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
	new Result("От -15 до -28 баллов (устойчиво-негативное отношение) более-менее сложная работа вызывает у подростка отвращение. Он придумывает себе массу причин, по которым за нее не стоит браться. Подросток с удовольствием воспользуется плодами чу- жого труда, по возможности выдавая их за свои. Между трудолюбием и жизненным благополучием для него нет никакой связи.",-15),
	new Result("ОТ -1 до -14 баллов (ситуативно-негативное отношение) - подросток по возможности переложит часть своей работы на другого. Если узнает, что кто-то из одноклассников работает после школы, то отреагирует, скорее всего, так: «Тебе что, де- лать нечего?!». В его представлении «грязная» работа – удел людей второго сорта или тех, кто не сумел устроиться в жизни. Сам-то он уж точно никогда за нее не возьмется.", -14),
	new Result("От +1 до +14 баллов (ситуативно-позитивное отношение) - скорее всего, только престижная работа вызывает уважение подростка. Хотя если все окружающие заняты чем- то непрестижным (например, уборкой территории во время субботника), то может и поучаствовать «за компанию». Он поможет и в домашних делах, но его будет раздражать, что это занимает столько времени.", 1),
	new Result("От + 15 до +28 баллов (устойчиво-позитивное отношение) - подростка отличает трудолюбие во всем: от уборки класса до чтения трудной книги. Он получает удовольствие от сложной, трудоемкой, даже нудной работы. Не считает зазорным помочь родителям по хозяйству, может сам предложить что-либо сделать. Подрабатывает он где-то или пока еще нет - в любом случае подросток этого не стыдится.", 15)
];




//Массив с вопросами
const questions = 
[
	new Question("Я способен с радостью выполнять разную работу.", 
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

	new Question("Физический труд - удел неудачников.", 
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

	new Question("Домохозяйка тоже может быть творческим человеком.", 
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

	new Question("Я хотел бы подрабатывать в свободное время, если это не будет мешать учебе.", 
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

	new Question("Хорошая учеба тоже серьезный труд.", 
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

	new Question("Субботник по очистке территории дома или школы - пережиток прошлого.", 
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

	new Question("Я могу заставить себя делать работу, которая мне не нравится.", 
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