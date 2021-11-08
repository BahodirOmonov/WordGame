let data = {
	"a": ["anor"],
	'b': ['baho'],
	'd': ['daraxt'],
	'e': ['echki'],
	'f': ['fil'],
	'g': ['gul'],
	'h': ['handalak'],
	'i': ['ilon'],
	'j': ['jayron'],
	'k': ['kapalak'],
	'l': ['lola'],
	'm': ['moychechak'],
	'n': ['non'],
	'o': ['olcha'],
	'p': ['pahlavon'],
	'q': ['qalpoq'],
	'r': ['raketa'],
	's': ['sabzi'],
	't': ['tarvuz'],
	'u': ['uzum'],
	'v': ['varrak'],
	'x': ["xo'roz"],
	'y': ['yantoq'],
	'z': ['zebra']
}



let btn = document.querySelector('.btn')
let h1_user = document.querySelector('.user h1')
let h2_user = document.querySelector('.user h2')
let h1_robot = document.querySelector('.robot h1')
let h2_robot = document.querySelector('.robot h2')

let temp = []




let voice = new webkitSpeechRecognition()
voice.lang = 'uz-UZ'

btn.addEventListener('click', () => {
	h1_user.textContent = "So'z ayting iltimos:"
	voice.start()
	btn.textContent = 'Refresh'
	if(temp[0]){
		temp.forEach((el) => {
			if(!data[el[0]].some(elem => el == elem))
				data[el[0]].push(el)
		})
		temp = []
		h1_robot.textContent = "" 
		h2_user.textContent = ""
		h2_robot.textContent = ""
		console.log(data)
	}
})

voice.onaudiostart = () => {
	console.log('Yozib olish boshlandi!')
}

voice.onaudioend = () => {
	console.log('Yozib olish tugadi!')
}

voice.onresult = (event) => {
	let result = event.results[0][0].transcript
	console.log(result)
	if(h2_robot.textContent != "" && h2_robot.textContent.slice(-1) != result[0]){
		h1_user.textContent = `${h2_robot.textContent.slice(-1)} harfidan so'z boshlanmagan!`
		h1_robot.textContent = `Robot g'alaba qozondi!` 
		h2_user.textContent = ""
		h2_robot.textContent = ""
	}
	else if(check(result)){
		h1_user.textContent = `${result} so'z aytilgan!`
		h1_robot.textContent = `Robot g'alaba qozondi!` 
		h2_user.textContent = ""
		h2_robot.textContent = ""
	}
	else{
		temp.push(result)
		h2_user.textContent = result
		h2_robot.textContent = ""
		h1_robot.textContent = 'Robot:'
		robot(result)
	}
}


function robot(value) {
	setTimeout(() => {
		if(check(data[value.slice(-1)][0])){
			h1_user.textContent = `${data[value.slice(-1)][0]} so'zi aytilgan!`
			h1_robot.textContent = `Ishtirokchi g'alaba qozondi!`
			h2_user.textContent = ""
			h2_robot.textContent = ""
		}
		else{
			temp.push(data[value.slice(-1)][0])
			h2_robot.textContent = data[value.slice(-1)][0]
			h1_user.textContent = `${h2_robot.textContent.slice(-1)} harfiga so'z ayting:`
			h2_user.textContent = ""
			data[value.slice(-1)].shift()
			voice.start()
		}
	}, 2000)
}

function check(value) {
	console.log(temp)
	for(let i of temp){
		if(i===value)
			return true
	}
	return false
}

