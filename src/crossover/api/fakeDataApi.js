export function getRandomNumber() {
  // RETURN A RANDOM NUM (0 - 200)
  // TAKES BETWEEN 0.5 AND 2 SECONDS TO RETURN
  return new Promise((resolve) => {
    const randomDelay = Math.round(Math.max(Math.random() * 2000, 500));
    console.log(`FAKE API : Delaying data by ${randomDelay}ms`);

    setTimeout(() => {
      const num = Math.round(Math.random() * 200);
      resolve(num);
    }, randomDelay);
  });
}
