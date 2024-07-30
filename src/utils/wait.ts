export function wait(timeMS: number) {
	return new Promise(resolve => {
		setTimeout(resolve, timeMS)
	})
}