import { useEffect, useState } from "react";

export function Loading() {
	const [count, setCount] = useState(3)

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(prev => prev % 3 + 1)
		}, 150)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return `Loading${'.'.repeat(count)}`
}