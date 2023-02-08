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
	new Result("От -15 до -28 баллов (устойчиво-негативное отношение) - слово «культура» во всех своих формах вызывает у подростка неприятие и рассматривается как проявление лживости взрослого мира. Он наверняка знает, что представляют собой культурные формы поведения, но в своей повседневности реализует их с точностью до наоборот. Тактичность кажется ему проявлением слабости, хамство и нецензурная брань - силы, «потягивание пивка» под аккомпанемент матерщины - лучшим времяпрепровождением. Памятники прошлого воспринимаются им, вероятнее всего, как обыкновенная старая рухлядь, поэтому он совсем не против «скинуть их с парохода современности».",-15),
	new Result("От -1 до -14 баллов (ситуативно-негативное отношение) - культурные формы поведения рассматриваются подростком как нечто догматичное, идущее от мира взрослых, а потому обременяющее его повседневную жизнь. Он сторонник естественного выражения своих мыслей, чувств, желаний и считает, что культурная огранка только помешает ему быть таким, какой он есть. Слово «культура» наверняка ассоциируется у него с телеканалом «Культура» И навевает непреодолимую скуку. Вряд ли он сам способен на акт вандализма, но и осуждать вандалов сверстников, скорее всего, не станет.", -14),
	new Result("От +1 до +14 баллов (ситуативно-позитивное отношение) - подросток признает объективную ценность культурных форм поведения, но отнюдь не всегда руководствуется ими в своей повседневной жизни. Он наверняка хотел бы выглядеть«культурным человеком», но не готов прикладывать ежедневные усилия к этому. Он находит оправдание эпизодическим проявлениям со своей стороны хамства («я хамлю только в ответ»), неряшливости («ну и пусть встречают по одежке, зато провожают по уму»), нецензурной брани («сильные эмоции трудно выразить по-другому») и т.п. Вандалы антипатичны ему.", 1),
	new Result("ОТ + 15 до +28 баллов (устойчиво-позитивное отношение) - культурные формы поведения, безусловно, личностно значимы для подростка и деятельно реализуются им в  повседневной жизни. Ему чужды хамство, «украшение» речи нецензурными оборотами, он внимателен и тактичен по отношению к другим людям. Он понимает необходимость сбережения того культурного достояния, которое достал ось нам в наследство от прошлого, и категорически не приемлет вандализма.", 15)
];




//Массив с вопросами
const questions = 
[
	new Question("То, что многие называют культурными ценностями прошлого, на деле часто оказывается примитивной старой рухлядью.", 
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

	new Question("Внешний вид - показатель уважения не только к себе, но и к окружающим.", 
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

	new Question("Нецензурные выражения в общении - признак бескультурья.", 
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

	new Question("Какое общение без бутылки Клинского»!", 
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

	new Question("Проявление вандализма - одна из форм протеста молодежи.", 
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

	new Question("Я не могу представить русскую разговорную речь без мата.", 
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

	new Question("Я могу нахамить человеку, если он мне чем-то не нравится.", 
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