export default function Summary({answers}) {
	const renderAnswers = () => {
		return answers.map((answer, index) => {
			return (
				<p key={index}>
					{answer.name}: {answer.value}
				</p>
			);
		});
	};

	const fakeAPICall = () => {
		console.log("API call made with these answers:", answers);

		fetch("https://oliversfakeAPI.com/api/form-submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({answers}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-red-300">
			<div className="border border-black p-16">
				<h2>Your Answers</h2>
				{renderAnswers()}

				<button onClick={fakeAPICall}>Submit</button>
			</div>
		</div>
	);
}
