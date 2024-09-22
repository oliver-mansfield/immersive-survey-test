import data from "../data.json";
import TextQuestion from "./TextQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import RatingQuestion from "./RatingQuestion";
import Summary from "./Summary";
import {useEffect, useState} from "react";

export default function Form() {
	const [answers, setAnswers] = useState([]);
	const [questions, setQuestions] = useState({questions: []});
	const [showSummary, setShowSummary] = useState(false);

	useEffect(() => {
		setAnswers(generateInitialAnswers(data));
		setQuestions(generateQuestions(data));
	}, []);

	//Create an array of answers based off the questions in the JSON.
	const generateInitialAnswers = (data) => {
		return data.questions.map((question) => {
			const answer = {
				name: question.name,
				value: null,
			};
			if (question.validation) {
				answer.isValid = null;
			}
			return answer;
		});
	};

	//Create an object which is the questions from the JSON, plus a showError property.
	//showError is passed to the child components, and is used to show/hide error messages.
	const generateQuestions = (data) => {
		return {
			// ...data,
			title: data.title,
			questions: data.questions.map((question) => ({
				...question,
				showError: null,
			})),
		};
	};

	//When the child components send their input and validation to the parent,
	//the parent updates the answers array with the new data.
	//which is rendering the child components
	//This way I can show/hide error messages onClick of the submit button
	const handleShowErrors = () => {
		setQuestions((prevData) => {
			const updatedQuestions = prevData.questions.map((question) => {
				const answer = answers.find((ans) => ans.name === question.name);
				let showError = question.showError;
				if (question.validation) {
					if (answer) {
						showError = !answer.isValid;
					}
				}
				return {
					...question,
					showError: showError,
				};
			});
			return {
				...prevData,
				questions: updatedQuestions,
			};
		});
	};

	const allAnswersValid = () => {
		return answers.every(
			(answer) => answer.isValid !== false && answer.isValid !== null
		);
	};

	//Check the answers, check they are valid, then show the summary
	const handleSubmit = (e) => {
		e.preventDefault();
		handleShowErrors();

		if (allAnswersValid()) {
			console.log("valid", answers);
			setShowSummary(true);
		}
	};

	//When the child components listen for a change to their inputs, they call this function
	//They pass it their input data.
	const handleAnswerChange = (name, value, isValid) => {
		setAnswers((prevAnswers) => {
			return prevAnswers.map((answer) =>
				answer.name === name ? {name, value, isValid} : answer
			);
		});
	};

	const renderQuestions = () => {
		return questions.questions.map((question, index) => {
			switch (question.type) {
				case "text":
					return (
						<TextQuestion
							type={question.type}
							key={index}
							label={question.label}
							name={question.name}
							validation={question.validation}
							onAnswerChange={handleAnswerChange}
							showError={question.showError}
						/>
					);

				case "multiple_choice":
					return (
						<MultipleChoiceQuestion
							key={index}
							label={question.label}
							name={question.name}
							validation={question.validation}
							options={question.options}
							onAnswerChange={handleAnswerChange}
							showError={question.showError}
						/>
					);

				case "rating":
					return (
						<RatingQuestion
							key={index}
							label={question.label}
							name={question.name}
							scale={question.scale}
							validation={question.validation}
							onAnswerChange={handleAnswerChange}
							showError={question.showError}
						/>
					);

				case "multiple_select":
					break;

				case "yes_no":
					return (
						<MultipleChoiceQuestion
							key={index}
							label={question.label}
							name={question.name}
							validation={question.validation}
							options={["Yes", "No"]}
							onAnswerChange={handleAnswerChange}
							showError={question.showError}
						/>
					);

				case "multiple_select_with_other":
					break;

				case "textarea":
					return (
						<TextQuestion
							type={question.type}
							key={index}
							label={question.label}
							name={question.name}
							validation={question.validation}
							onAnswerChange={handleAnswerChange}
							showError={question.showError}
						/>
					);
				default:
					return <p>Unknown question type</p>;
			}
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<h1>{questions.title}</h1>
				{renderQuestions()}
				<button type="submit">Submit</button>
			</form>
			{showSummary ? <Summary answers={answers} question={questions} /> : null}
		</>
	);
}
