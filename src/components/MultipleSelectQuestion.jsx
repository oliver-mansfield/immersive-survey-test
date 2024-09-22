export default function MultipleSelectQuestion({
	label,
	name,
	validation,
	options,
	onAnswerChange,
	showError,
}) {
	//Check current input value against validation rules
	const handleValidation = (inputValue) => {
		if (validation.required) {
			if (inputValue) {
				return true;
			}
		}
	};

	//When the input changes, call the parent component's function to update the answers array
	const handleChange = (e) => {
		const inputValue = e.target.value;
		onAnswerChange(name, inputValue, handleValidation(inputValue));
	};

	return (
		<form onChange={handleChange}>
			{showError ? <p> "Error" </p> : null}
			<label htmlFor={name}>{label}</label>

			{options.map((option, index) => (
				<div key={index}>
					<input
						type="checkbox"
						id={`${name}-${index}`}
						name={option}
						value={option}
					/>
					<label htmlFor={`${name}-${index}`}>{option}</label>
				</div>
			))}

			<button type="submit">Submit</button>
		</form>
	);
}
