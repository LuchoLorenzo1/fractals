const canvas = document.getElementById('fractal')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

X0 = -2
X1 = 1

Y0 = -1.5
Y1 = 1.5

dx = Math.abs(X1 - X0) / width
dy = Math.abs(Y1 - Y0) / height

const drawFractal = (intervalA, intervalB, fractal) => {
	const imageData = ctx.createImageData(width, height)
	X0 = intervalA[0]
	X1 = intervalA[1]

	Y0 = intervalB[1]
	Y1 = intervalB[0]

	dx = Math.abs(X1 - X0) / width
	dy = Math.abs(Y1 - Y0) / height

	for (let j = 0; j < height; j++) {
		for (let i = 0; i < width; i++) {
			alpha = fractal(X0 + i * dx, Y0 - j * dy)

			let index = 4 * (i + j * width)
			if (0 < alpha < 0.5) {
				imageData.data[index + 0] = alpha
				imageData.data[index + 1] = alpha
				imageData.data[index + 2] = 255
			} else {
				imageData.data[index + 0] = 200 - alpha * 120
				imageData.data[index + 1] = 0
				imageData.data[index + 2] = alpha * 100
			}

			imageData.data[index + 3] = alpha * 255
		}
	}
	ctx.putImageData(imageData, 0, 0)
}

const mandelbrot = (ca, cb) => {
	iterations = 100
	a = 0
	b = 0

	while (iterations > 0) {
		new_a = a * a - b * b + ca
		new_b = 2 * a * b + cb

		if (Math.abs(new_a + new_b) > 15) {
			return iterations / 100
		}
		a = new_a
		b = new_b

		iterations--
	}
	return 1
}

const julia = (x, y, f) => {
	iterations = 100
	a = x
	b = y
	let new_a, new_b

	while (iterations > 0) {
		[new_a, new_b] = f(a, b)

		if (Math.abs(new_a + new_b) > 15) {
			return iterations / 100
		}
		a = new_a
		b = new_b

		iterations--
	}
	return 1
}

const f = (a, b, ca, cb) => {
	return [a * a - b * b + ca, 2 * a * b + cb]
}

const g = (a, b) => {
	n = Math.exp(a)
	return [n * Math.cos(b) - 0.65, n * Math.sin(b)]
}

// mousedown = false
// canvas.addEventListener('mousedown', (e) => {
// 	mousedown = true
// })
// canvas.addEventListener('mouseup', (e) => {
// 	mousedown = false
// })
// canvas.addEventListener('mousemove', (e) => {
// 	if (mousedown) {
// 		drawFractal([-2, 1], [-1.5, 1.5], (x, y) => julia(x, y, (x, y) => f(x, y, e.x * dx + X0, Y0 - e.y * dy)))
// 		console.log(e.x * dx + X0, e.y * dy + Y0)
// 	}
// })

// canvas.addEventListener('click', (e) => {
// 	drawFractal([-2, 1], [-1.5, 1.5], (x, y) => julia(x, y, (x, y) => f(x, y, e.x * dx + X0, Y0 - e.y * dy)))
// })

// drawFractal([-10, 10], [-10, 10], (x, y) => julia(x, y, g))
// drawFractal([-1, 1], [-1.5, 1.5], (x, y) => julia(x, y, f))
drawFractal([-2, 1], [-1.5, 1.5], mandelbrot)
