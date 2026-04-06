const fileInput = document.getElementById('fileInput');
const dropzone = document.querySelector('.dropzone');
const outputTextArea = document.getElementById('output-textarea');
const btnCopy = document.getElementById('btn-copy');

// Read file content and auto-minify
function readFile(file) {
	if (file.type !== 'text/html') {
		alert('Please upload a valid HTML file!');
		return;
	}

	dropzone.textContent = `Loaded: ${file.name}`;
	dropzone.classList.add('loaded');

	const reader = new FileReader();

	reader.onload = (e) => {
		const code = e.target.result;

		let minified = code
			.replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
			.replace(/\n/g, '') // Remove line breaks
			.replace(/\s{2,}/g, ' ') // Collapse multiple spaces into one
			.replace(/>\s+</g, '><') // Remove spaces between tags
			.trim();

		outputTextArea.value = minified;
		outputTextArea.scrollTop = 0;

		btnCopy.disabled = !minified;
	};

	reader.readAsText(file);
}

// Handle Drag events
dropzone.addEventListener('dragover', (e) => {
	e.preventDefault();
	dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
	dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
	e.preventDefault();
	dropzone.classList.remove('dragover');
	const file = e.dataTransfer.files[0];
	if (file) readFile(file);
});

// Click to open file input
dropzone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
	const file = e.target.files[0];
	if (file) readFile(file);
});

btnCopy.addEventListener('click', async () => {
	const minifiedCode = outputTextArea.value;

	if (!minifiedCode) {
		alert('Nothing to copy!');
		return;
	}

	try {
		await navigator.clipboard.writeText(minifiedCode);

		btnCopy.textContent = 'Copied!';

		setTimeout(() => (btnCopy.textContent = 'Copy'), 1500);
	} catch (error) {
		console.error('Failed to copy:', error.message);
		alert('Failed to copy. Try Manually.');
	}
});
