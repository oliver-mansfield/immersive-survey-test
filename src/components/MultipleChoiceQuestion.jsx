export default function MultipleChoiceQuestion({
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
		<fieldset className="relative">
			<label htmlFor={name} className={showError ? "text-red-400" : ""}>
				{label}
			</label>
			<select id={name} name={name} onChange={handleChange}>
				<option value="">Select an option</option>
				{options.map((option, index) => {
					return (
						<option key={index} value={option}>
							{option}
						</option>
					);
				})}
			</select>
			{showError ? (
				<p className="text-red-400 text-sm absolute bottom-[-1rem]">
					Please complete this question before submitting.
				</p>
			) : null}
		</fieldset>
	);
}
