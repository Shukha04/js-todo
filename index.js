const form = document.getElementById('add-form')
const input = document.getElementById('add-input')
const items = document.getElementById('items')
const theme = document.getElementById('theme')

let todos = JSON.parse(localStorage.getItem('todos')) || []

form.addEventListener('submit', e => {
	e.preventDefault()
	input.getAttribute('data-id') ? edit(input.getAttribute('data-id')) : add(input.value)
})

form.addEventListener('reset', () => {
	if (input.getAttribute('data-id')) {
		input.removeAttribute('data-id')
	}
})

// Render todos
const show = todos => {
	items.innerHTML = ''

	todos.sort((a, b) => {
		return a.done - b.done || new Date(a.createdAt) - new Date(b.createdAt)
	})

	todos.map(todo => {
		const done = todo.done

		const li = document.createElement('li')
		li.classList.add('card')
		li.setAttribute('data-key', todo.id)

		li.innerHTML = `
		<h3 class='text'>
			${todo.title}
		</h3>

		<div class='card-bottom'>
			<div class='date-group'>
				<small class='create-date'>
					<strong>Todo created:</strong> ${new Date(todo.createdAt).toLocaleDateString()} | ${new Date(todo.createdAt).toLocaleTimeString()}
				</small>
				${done ? `<small class='done-date'>
					<strong>Todo completed:</strong> ${new Date(todo.doneAt).toLocaleDateString()} | ${new Date(todo.doneAt).toLocaleTimeString()}
				</small>` : ''}
			</div>

			<div class='btn-group'>
				${!done ? `<button class='done-btn'>
					<svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0 c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7 C514.5,101.703,514.499,85.494,504.502,75.496z' />
					</svg>
				</button>
				<button class='edit-btn'>
					<svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='m368 511.957031h-309.332031c-32.363281 0-58.667969-26.304687-58.667969-58.667969v-309.332031c0-32.363281 26.304688-58.667969 58.667969-58.667969h181.332031c8.832031 0 16 7.167969 16 16 0 8.832032-7.167969 16-16 16h-181.332031c-14.699219 0-26.667969 11.96875-26.667969 26.667969v309.332031c0 14.699219 11.96875 26.667969 26.667969 26.667969h309.332031c14.699219 0 26.667969-11.96875 26.667969-26.667969v-181.332031c0-8.832031 7.167969-16 16-16s16 7.148438 16 16v181.332031c0 32.363282-26.304688 58.667969-58.667969 58.667969zm0 0' />
						<path
							d='m187.136719 340.820312c-4.203125 0-8.300781-1.664062-11.308594-4.691406-3.796875-3.777344-5.417969-9.21875-4.371094-14.445312l15.082031-75.433594c.617188-3.113281 2.152344-5.953125 4.371094-8.171875l220.953125-220.925781c22.867188-22.871094 60.074219-22.871094 82.964844 0 11.070313 11.070312 17.171875 25.792968 17.171875 41.472656s-6.101562 30.398438-17.195312 41.472656l-220.925782 220.949219c-2.21875 2.238281-5.078125 3.753906-8.171875 4.371094l-75.414062 15.082031c-1.046875.214844-2.113281.320312-3.15625.320312zm75.433593-31.082031h.214844zm-45.609374-52.457031-9.410157 47.144531 47.125-9.429687 217.515625-217.511719c5.035156-5.058594 7.808594-11.734375 7.808594-18.859375s-2.773438-13.804688-7.808594-18.859375c-10.367187-10.390625-27.285156-10.390625-37.714844 0zm0 0' />
						<path
							d='m453.332031 134.976562c-4.09375 0-8.191406-1.558593-11.304687-4.695312l-60.332032-60.351562c-6.25-6.25-6.25-16.382813 0-22.632813s16.382813-6.25 22.636719 0l60.328125 60.351563c6.25 6.25 6.25 16.382812 0 22.632812-3.136718 3.117188-7.230468 4.695312-11.328125 4.695312zm0 0' />
					</svg>
				</button>` : `<button class='delete-btn'>
					<svg viewBox='-47 0 512 512' xmlns='http://www.w3.org/2000/svg'>
						<path
							d='m416.875 114.441406-11.304688-33.886718c-4.304687-12.90625-16.339843-21.578126-29.941406-21.578126h-95.011718v-30.933593c0-15.460938-12.570313-28.042969-28.027344-28.042969h-87.007813c-15.453125 0-28.027343 12.582031-28.027343 28.042969v30.933593h-95.007813c-13.605469 0-25.640625 8.671876-29.945313 21.578126l-11.304687 33.886718c-2.574219 7.714844-1.2695312 16.257813 3.484375 22.855469 4.753906 6.597656 12.445312 10.539063 20.578125 10.539063h11.816406l26.007813 321.605468c1.933594 23.863282 22.183594 42.558594 46.109375 42.558594h204.863281c23.921875 0 44.175781-18.695312 46.105469-42.5625l26.007812-321.601562h6.542969c8.132812 0 15.824219-3.941407 20.578125-10.535157 4.753906-6.597656 6.058594-15.144531 3.484375-22.859375zm-249.320312-84.441406h83.0625v28.976562h-83.0625zm162.804687 437.019531c-.679687 8.402344-7.796875 14.980469-16.203125 14.980469h-204.863281c-8.40625 0-15.523438-6.578125-16.203125-14.980469l-25.816406-319.183593h288.898437zm-298.566406-349.183593 9.269531-27.789063c.210938-.640625.808594-1.070313 1.484375-1.070313h333.082031c.675782 0 1.269532.429688 1.484375 1.070313l9.269531 27.789063zm0 0' />
						<path
							d='m282.515625 465.957031c.265625.015625.527344.019531.792969.019531 7.925781 0 14.550781-6.210937 14.964844-14.21875l14.085937-270.398437c.429687-8.273437-5.929687-15.332031-14.199219-15.761719-8.292968-.441406-15.328125 5.925782-15.761718 14.199219l-14.082032 270.398437c-.429687 8.273438 5.925782 15.332032 14.199219 15.761719zm0 0' />
						<path
							d='m120.566406 451.792969c.4375 7.996093 7.054688 14.183593 14.964844 14.183593.273438 0 .554688-.007812.832031-.023437 8.269531-.449219 14.609375-7.519531 14.160157-15.792969l-14.753907-270.398437c-.449219-8.273438-7.519531-14.613281-15.792969-14.160157-8.269531.449219-14.609374 7.519532-14.160156 15.792969zm0 0' />
						<path
							d='m209.253906 465.976562c8.285156 0 15-6.714843 15-15v-270.398437c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v270.398437c0 8.285157 6.714844 15 15 15zm0 0' />
					</svg>
				</button>`}				
			</div>
		</div>
		`

		items.append(li)
	})
}

// set new array of todos to localStorage and render it
const setToLocalStorage = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos))
	show(todos)
}

// Edit, do and delete events
items.addEventListener('click', e => {
	const id = e.target.parentElement.parentElement.parentElement.getAttribute('data-key')

	if (e.target.classList.contains('delete-btn')) {
		del(id)
	} else if (e.target.classList.contains('edit-btn')) {
		select(id)
	} else if (e.target.classList.contains('done-btn')) {
		done(id)
	}
})

// ACTIONS WITH CARDS
// add new card
const add = title => {
	title = title.trim()
	if (title) {
		const todo = {
			id: Date.now(),
			title,
			createdAt: new Date(),
			doneAt: undefined,
			done: false
		}

		todos.push(todo)
		setToLocalStorage(todos)

		input.value = ''
	}
}
// select which card you want to edit
const select = (id) => {
	todos.map(t => {
		if (t.id.toString() === id.toString()) {
			input.value = t.title
			input.setAttribute('data-id', id)
			input.focus()
		}
	})
}
// edit selected card
const edit = (id) => {
	todos.map(t => {
		if (t.id.toString() === id.toString()) {
			t.title = input.value
			input.removeAttribute('data-id')
			input.value = ''
		}
	})
	setToLocalStorage(todos)
}
// switch to done
const done = (id) => {
	todos.map(t => {
		if (t.id.toString() === id.toString()) {
			t.done = true
			t.doneAt = new Date()
			input.removeAttribute('data-id')
		}
	})
	setToLocalStorage(todos)
}
// delete card
const del = id => {
	todos = todos.filter(t => t.id.toString() !== id.toString())
	input.removeAttribute('data-id')
	setToLocalStorage(todos)
}

// Show all todos from localStorage with fake loading
window.onload = () => {
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
		localStorage.setItem('theme', 'dark')
	}

	if (localStorage.getItem('theme') === 'dark') {
		theme.checked = true
		document.body.classList.add('dark')
	}
	setTimeout(() => show(todos), 300)
	// show(todos)
}

// Switch theme
theme.addEventListener('change', (e) => {
	if (e.target.checked) {
		document.body.classList.add('dark')
		localStorage.setItem('theme', 'dark')
	} else {
		document.body.classList.remove('dark')
		localStorage.setItem('theme', 'light')
	}
})