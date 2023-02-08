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
	new Result("От -15 до -28 баллов (устойчиво-негативное отношение) - очевидно, потребность в получении знаний у подростка практически отсутствует. Он откровенно презирает тех, кто учится, считает их «ботаниками» - людьми, живущими неполноценной жизнью. Он уверен, что уровень и качество его образования не окажут никакого влияния на его дальнейшую жизнь.",-15),
	new Result("От -1 до -14 баллов (ситуативно-негативное отношение) - подросток никогда не спросит взрослого, если ему что-то непонятно. Откровенно не понимает, как по телевизору можно смотреть научно-популярные программы. Знания носят для него чисто утилитарный характер (выучил, ответил - значит не нажил неприятностей ).", -14),
	new Result("От +1 до +14 баллов (ситуативно-позитивное отношение) - подросток может неплохо учиться, но по своей инициативе вряд ли будет долго копаться в книгах, чтобы найти значение непонятного ему термина или факта. В его сознании знания и будущая карьера, конечно, связаны, но не прикладывать же для этого столько усилий!", 1),
	new Result("От +15 до +28 баллов (устойчиво-позитивное отношение) - перед вами - любознательный человек, у которого есть устойчивое стремление к познанию нового. Подросток может быть «неудобен» учителю, так как много спрашивает на уроке, сомневается в казалось бы очевидных вещах. Он считает, что успешность профессионального роста, карьеры напрямую связана с глубиной знаний и стремится к их получению.", 15)
];




//Массив с вопросами
const questions = 
[
	new Question("Не стоит на уроке обращаться к учителю с вопросами: они отвлекают от главного.", 
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

	new Question("Я стремлюсь узнать значения незнакомых мне слов.", 
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

	new Question("Учеба - занятие для ботаников».", 
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

	new Question("Человек не может всего знать, поэтому я не беспокоюсь по поводу своего незнания некоторых важных вещей.", 
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

	new Question("Мне нравится копаться в энциклопедиях, журналах, словарях: там можно найти много интересного.", 
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

	new Question("Я думаю, что и без получения хороших знаний смогу в будущем сделать неплохую карьеру.", 
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

	new Question("Телевидение в первую очередь должно быть средством развлечения и отдыха и только во вторую - источником информации о событиях в стране и мире.", 
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