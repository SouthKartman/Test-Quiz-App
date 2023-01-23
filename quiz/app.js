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
	new Result("Отношение подростка к семье: От -15 до -28 баллов (устойчиво-негативное отноше¬ние) - семья не представляет для ребенка какой-либо ценнос¬ти. Такое отношение проявляется в чувстве стыда за свою фа¬милию, сознательном неприятии принятых в семье норм пове¬дения, представлений о жизни. Все это в будущем может нега¬тивно отразится на его способности и желании создать соб¬ственную счастливую семью.",-15),
	new Result("Отношение подростка к семье: От -1 до -14 баллов (ситуативно-негативное отношение) - отношение к семье у подростка, как правило, потребительское. Ему «должны» давать деньги на мелкие расходы и прощать шалости. Но если от родителей нужно что-то серьезное, подросток добьется этого любыми путями - лестью, ложью, послушанием. Сам он, скорее всего, считает, что никому и ничем не обязан.", -14),
	new Result("Отношение подростка к семье: От +1 до +14 баллов (ситуативно-позитивное отношение) - семья для подростка представляет определенную ценность, но сам факт наличия семьи, семейных традиций воспринимается им как естественный («а как же иначе?»). Подросток принимает участие в семейных праздниках, но без напоминания не всегда вспомнит о дне рождения кого-то из близких. Заботу родителей воспринимает как само собой разумеющуюся. Он предполагает, что семья, которую он создаст в будущем, будет не слишком похожа на ту, в которой он живет сейчас.", 1),
	new Result("Отношение подростка к семье: От + 15 до +28 баллов (устойчиво-позитивное отношение) - ценность семьи высоко значима для подростка. Он дорожит семейными традициями и устоями, помнит о разных мелочах, приятных кому-то из членов семьи. Семейные праздники всегда проходят при его участии и помощи в подготовке. В будущем он хочет создать счастливую семью.", 15)
];




//Массив с вопросами
const questions = 
[
	new Question("Мне нравится, когда вся наша семья идет в гости, отмечает какой-нибудь праздник или просто собирается за общим столом. ", 
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

	new Question("Я смогу прожить счастливо и не создавая собственной семьи. ", 
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

	new Question("Я горжусь своей фамилией. ", 
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

	new Question("Без семьи и детей человек чувствует себя более свободным.", 
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

	new Question("Рассматривать старые семейные фотографии – занятие для чудаков.", 
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

	new Question("Человеку не обязательно знать свою родословную.", 
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

	new Question("Меня огорчает то, что я не делаю для своих родителей всего, что мог бы.", 
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