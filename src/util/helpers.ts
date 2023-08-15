export default function contrastChecker(color: string) {
	const rgb = parseInt(color.substring(1), 16)
	const r = (rgb >> 16) & 0xff
	const g = (rgb >> 8) & 0xff
	const b = (rgb >> 0) & 0xff
	const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b

	return lum > 165 ? '#000' : '#FFF'
}

const correctOption = (gameLevel: GameLevel) =>
	Math.floor(Math.random() * (gameLevel - 1)) + 1

const colorGenerator = () =>
	'#' +
	((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0').toUpperCase()

export const generateOptions = (gameLevel: GameLevel = 4) => {
	const correct = correctOption(gameLevel)
	const optionsArray: GameOptions[] = []

	for (let i = 1; i < gameLevel; i++) {
		const color = colorGenerator()
		optionsArray.push({
			color,
			isCorrect: i === correct ? true : false,
		})
	}

	return optionsArray
}

