const columns = document.querySelectorAll('.column')

document.addEventListener('keydown', (event)=>{
	event.preventDefault()
	if (event.code.toLowerCase()==='space'){
		setRandomColors()
	}
})
document.addEventListener('click', (event)=>{
	const type = event.target.dataset.type
	if (type==='lock'){
		const node= event.target.tagName.toLowerCase()==='i'
		?event.target
		:event.target.children[0]

	node.classList.toggle('fa-lock-open')
	node.classList.toggle('fa-lock')
	} else if(type==='copy'){
		copyToClickboard(event.target.textContent)
	}
})


//Генерируем рандомный цвет
function generateRandomColor(){
	const hexCodes= '0123456789ABCDEF'
	let color=''
	for (let i=0; i<6; i++){
		color+= hexCodes[Math.floor(Math.random()*hexCodes.length)]
	}
	return `#${color}`
}

// Задаем цвет колонкам и тексту
function setRandomColors(isInitial){
	const colors=isInitial 
	?getColorsFromHash()
	:[]

	columns.forEach((column,index)=>{
		const isLocked=column.querySelector('i').classList.contains('fa-lock')
		const text=column.querySelector('h2')
		
		//const color=generateRandomColor()
		const button=column.querySelector('button')

		if(isLocked){
			colors.push(text.textContent)
			return
		}

		const color=isInitial 
		?colors[index]
			? colors[index]
			:chroma.random()
		:chroma.random()

		if(!isInitial){
			colors.push(color)
		}
		
		text.textContent=color
		column.style.background= color

		setTextColor(text,color)
		setTextColor(button,color)
	})

	updateColorsHash(colors)
}
//Выбираем цвет в соответствии цвета колонки
function setTextColor(text, color) {
	const luminance=chroma(color).luminance()
	text.style.color=luminance>0.5
	?'black'
	:'white'
}
//Получаем promise
function copyToClickboard(text){
	return navigator.clipboard.writeText(text)
}
//Читабельная запись в hash
function updateColorsHash(colors=[]){
	document.location.hash = colors.map(color=>{
		return color.toString().substring(1)
	}).join('-')
}
//Получаем цвета из hash
function getColorsFromHash(){
	if(document.location.hash.length >1){
		document.location.hash.substring(1).split('-').map(color=>'#'+color)
	}
	return []
}

setRandomColors(true)