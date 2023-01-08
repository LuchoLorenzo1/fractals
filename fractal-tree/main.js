const canvas = document.getElementById('tree')
const ctx = canvas.getContext('2d')
const size = canvas.width

function branch(len, angle, simetria) {
	if (len < 1) {
		return
	}
	a = (simetria * (angle * Math.PI)) / 180
	b = -1 * ((angle * Math.PI) / 180)

	ctx.moveTo(0, 0)
	ctx.rotate(a)
	ctx.lineTo(0, len)

	ctx.translate(0, len)
	branch(len * 0.67, angle, simetria)
	ctx.translate(0, -len)
	ctx.rotate(-a)

	ctx.moveTo(0, 0)
	ctx.rotate(b)
	ctx.lineTo(0, len)

	ctx.translate(0, len)
	branch(len * 0.67, angle, simetria)
	ctx.translate(0, -len)
	ctx.rotate(-b)
}

function draw_tree(len, angle, simetria) {
	ctx.beginPath()
	ctx.translate(size / 2, 0)
	ctx.moveTo(0, 0)
	ctx.lineTo(0, len)
	ctx.translate(0, len)

	branch(len * 0.67, angle, simetria)

	ctx.strokeStyle = '#a0c0ff'
	ctx.stroke()
	ctx.setTransform(1, 0, 0, 1, 0, 0)

	ctx.beginPath()
	ctx.beginPath()
	ctx.translate(size / 2, size)
	ctx.rotate((180 * Math.PI) / 180)
	ctx.moveTo(0, 0)
	ctx.lineTo(0, len)
	ctx.translate(0, len)

	branch(len * 0.67, angle, simetria)

	ctx.strokeStyle = "#0000FF";
	ctx.stroke()
	ctx.setTransform(1, 0, 0, 1, 0, 0)
}

angleSlider = document.getElementById('angle-slider')
lenSlider = document.getElementById('len-slider')
simetriaSlider = document.getElementById('simetria-slider')

angleSlider.oninput = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw_tree(lenSlider.value, angleSlider.value, simetriaSlider.value)
}

lenSlider.oninput = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw_tree(lenSlider.value, angleSlider.value, simetriaSlider.value)
}

simetriaSlider.oninput = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	draw_tree(lenSlider.value, angleSlider.value, simetriaSlider.value)
}

console.log(simetriaSlider.value)
draw_tree(lenSlider.value, angleSlider.value, simetriaSlider.value)
