export function getRandomNumber() {
	// RETURN A RANDOM NUM (0 - 200)
	// TAKES BETWEEN 0.5 AND 2 SECONDS TO RETURN
	return new Promise((resolve) => {
		setTimeout(() => {
			const num = Math.round(Math.random() * 200);

			resolve(num);
		}, Math.max(Math.random() * 2000, 500));
	});
}