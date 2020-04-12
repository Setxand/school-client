import React from "react";


const answers = props => {
	return (
		<div className={"Answers"}>
			{props.answers.map((ans, index) => {
				return (
					<div key={index}>3
						<input value={ans} onChange={(event) => props.change(event, index)} name={"answer"}/>
						<span><button onClick={() => props.deleteAnswer(index)}>Видалити відповідь</button></span>
					</div>
				)
			})}
			<button onClick={props.addAnswer}>Додати відповідь</button>
		</div>
	);
};

export default answers;