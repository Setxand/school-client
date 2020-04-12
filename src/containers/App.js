import React from 'react';
import './App.css';
import Questions from "../components/Questions/Questions.js"
import axios from 'axios';


class App extends React.Component {

	constructor() {
		super();
		this.SERVER_URL = 'https://bot-db-dddb.herokuapp.com/v1/tests';
		this.alphabet = 'абвгдеєжзиіїйклмнопрстуф';
	}

	state = {
		requestData: [],
		requestDataIndexToShow: '',
		questionsToShow: [],
	};

	sendRequestTests(method, body) {
		const requestOptions = {
			method: method,
			headers: {'Content-Type': 'application/json'},
			body: body != null ? JSON.stringify(body) : null
		};
		return fetch(this.SERVER_URL, requestOptions);
	}

	componentDidMount = () => {
		this.sendRequestTests('GET', null)
			.then(response => response.json())
			.then(data => this.setState({requestData: data.content}));
	};

	openQuestions = (id) => {
		const testBox = [...this.state.requestData];
		const index = testBox.findIndex(t => t.id === id);
		this.setState({requestDataIndexToShow: index});
		this.setState({questionsToShow: testBox[index].questions});
	};

	saveChanges = () => {
		const testBox = this.state.requestData[this.state.requestDataIndexToShow];
		testBox.questions = this.state.questionsToShow;
		this.sendRequestTests("PATCH", testBox);
		this.setState({questionsToShow: [], requestDataIndexToShow: ''});
		alert("Зміни збержено!")
	};

	changeInput = (event, questionIndex, answerIndex) => {
		const questions = [...this.state.questionsToShow];
		const name = event.target.name;
		const value = event.target.value;

		if (name === "Question") {
			questions[questionIndex].name = value;
		} else if (name === "correctAnswer") {
			questions[questionIndex].correctAnswer = value;
		} else if (name === "answer") {
			questions[questionIndex].answers[answerIndex] = value;
		}

		this.setState({questionsToShow: questions})
	};

	addQuestion = () => {
		const questions = [...this.state.questionsToShow];
		questions.push({name: " ", correctAnswer: " ", answers: []});
		this.setState({questionsToShow: questions});
	};

	addAnswer = questionIndex => {
		const questions = [...this.state.questionsToShow];
		const question = questions[questionIndex];

		question.answers.push(this.alphabet[question.answers.length] + ") ");
		this.setState({questionsToShow: questions});
	};

	deleteAnswer = (questionIndex, answerIndex) => {
		const questions = [...this.state.questionsToShow];
		questions[questionIndex].answers.splice(answerIndex, 1);
		this.setState({questionsToShow: questions});
	};

	blueSelect = {
		color: "blue"
	};


	render() {
		return (
			<div className="App">
				<div className={"testBoxes"}>
					{this.state.requestData.map((rd, i) => {
						const style = i === this.state.requestDataIndexToShow ? this.clickedStyle : null;
						return (
							<p style={style} onClick={() => this.openQuestions(rd.id)}
							   key={rd.id}>{rd.name}</p>)
					})}
				</div>
				<Questions questions={this.state.questionsToShow}
						   saveChanges={this.saveChanges}
						   change={(event, questionIndex, answerIndex) =>
							   this.changeInput(event, questionIndex, answerIndex)}
						   addQuestion={this.addQuestion}
						   addAnswer={(questionIndex) => this.addAnswer(questionIndex)}
						   deleteAnswer={(questionIndex, answerIndex) => this.deleteAnswer(questionIndex, answerIndex)}/>
			</div>
		);
	}
}

export default App;
