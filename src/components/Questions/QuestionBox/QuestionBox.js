import React from "react";
import Answers from './Answers/Answers.js'
import "./QuestionBox.css"


const questionBox = props => {
	return (
		<div className={"QuestionBox"}>
			<span>
				<label className={"correctAnswer"}>Question:
					<input value={props.question.name} onChange={props.change} name={"Question"}/>
				</label>
				<label className={"correctAnswer"}>Correct answer:
					<input value={props.question.correctAnswer} onChange={props.change} name={"correctAnswer"}/>
				</label>

				<Answers answers={props.question.answers}
						 change={(event, index) => props.change(event, index)}
						 deleteAnswer={(index) => props.deleteAnswer(index)}
						 addAnswer={props.addAnswer}/>
			</span>
		</div>
	);
};

export default questionBox;