const fileInput = document.getElementById('fileInput');
const dropzone = document.querySelector('.dropzone');
const outputTextArea = document.getElementById('output-textarea');
const btnCopy = document.getElementById('btn-copy');

// Read file content and auto-minify
function readFile(file) {
	const reader = new FileReader();

	reader.onload = (e) => {
		const code = e.target.result;

		let minified = '';

		if (file.name.endsWith('.html')) {
			minified = code
				.replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
				.replace(/>\s+</g, '><'); // Remove spaces between tags
		} else if (file.name.endsWith('.css')) {
			minified = code
				.replace(/\/\*[\s\S]*?\*\//g, '')
				.replace(/\s*([{}:;,])\s*/g, '$1');
		} else if (file.name.endsWith('.js')) {
			minified = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
		} else {
			alert('Unsupported file type!');
			return;
		}

		minified = minified
			.replace(/\n/g, '') // Remove line breaks
			.replace(/\s{2,}/g, ' ') // Collapse multiple spaces into one
			.trim();

		// Minified code with filename
		const formatted = `(Filename: ${file.name})\n${minified}\n\n`;

		if (outputTextArea.value.trim() !== '') {
			outputTextArea.value += formatted;
		} else {
			outputTextArea.value = formatted;
		}

		// Auto scroll to bottom
		outputTextArea.scrollTop = outputTextArea.scrollHeight;

		// Enable copy button if minified content exists
		btnCopy.disabled = !minified;

		// Update dropzone text for confirmation
		dropzone.textContent = `Loaded: ${file.name}`;
		dropzone.classList.add('loaded');
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
