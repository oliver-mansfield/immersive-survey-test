export default function TextQuestion({
	type,
	label,
	name,
	validation,
	onAnswerChange,
	showError,
}) {
	//Check current input value against validation rules
	const handleValidation = (inputValue) => {
		if (validation) {
			if (inputValue.length >= validation.minLength) {
				return true;
			} else if (inputValue.length < validation.minLength) {
				return false;
			} else return null;
		} else return true; //if no validation rules, return true (valid)
	};

	const renderInput = () => {
		switch (type) {
			case "text":
				return (
					<input
						className={showError ? "border-red-400" : ""}
						type={type}
						id={name}
						name={name}
						onChange={handleChange}
					/>
				);
			case "textarea":
				return (
					<textarea
						id={name}
						name={name}
						onChange={handleChange}
						className={showError ? "border-red-400" : ""}
					></textarea>
				);

			default:
				return null;
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
			{renderInput()}
			{showError ? (
				<p className="text-red-400 text-sm absolute bottom-[-1rem]">
					Please complete this question before submitting.
				</p>
			) : null}
		</fieldset>
	);
}
