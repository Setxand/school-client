import React from "react";
import QuestionBox from "./QuestionBox/QuestionBox.js"

const questions = (props) => {

	const isNotEmpty = typeof props.questions !== 'undefined' && props.questions.length > 0;

	return isNotEmpty ?
		(<div>
			{props.questions.map((question, questionIndex) => {
				return (
					<div key={question.id}>
						<QuestionBox question={question}
									 change={(event, answerIndex = null) =>
										 props.change(event, questionIndex, answerIndex)}
									 addAnswer={() => props.addAnswer(questionIndex)}
									 deleteAnswer={(answerIndex) => props.deleteAnswer(questionIndex, answerIndex)}/>

						<br/>
					</div>
				)
			})}
			<button onClick={props.addQuestion}>Додати питання</button>
			<button onClick={props.saveChanges}>Зберегти зміни</button>
		</div>) : null;
};

export default questions;