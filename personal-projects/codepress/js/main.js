const inputZone = document.querySelector('.input-zone');
const inputTextarea = document.getElementById('input-textarea');
const fileInput = document.getElementById('fileInput');

const outputTextArea = document.getElementById('output-textarea');
const btnCopy = document.getElementById('btn-copy');
const btnClear = document.getElementById('btn-clear');

let typingTimer;

inputTextarea.addEventListener('input', () => {
	toggleOverlay();

	clearTimeout(typingTimer);

	typingTimer = setTimeout(() => {
		const code = inputTextarea.value.trim();
		if (code) processCode(code);
	}, 500);
});

inputZone.addEventListener('dragover', (e) => {
	e.preventDefault();
	inputZone.classList.add('dragover');
});

inputZone.addEventListener('dragleave', () => {
	inputZone.classList.remove('dragover');
});

inputZone.addEventListener('drop', (e) => {
	e.preventDefault();
	inputZone.classList.remove('dragover');

	const file = e.dataTransfer.files[0];
	if (file) handleFile(file);
});

fileInput.addEventListener('change', (e) => {
	const file = e.target.files[0];
	if (file) handleFile(file);
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
		btnCopy.style.background = '#22c55e';

		setTimeout(() => {
			btnCopy.textContent = 'Copy';
			btnCopy.style.background = '';
		}, 1500);
	} catch (error) {
		console.error('Failed to copy:', error.message);
		alert('Failed to copy. Try Manually.');
	}
});

btnClear.addEventListener('click', () => {
	inputTextarea.value = '';
	outputTextArea.value = '';

	toggleOverlay();

	btnCopy.disabled = true;
});

inputZone.addEventListener('click', () => fileInput.click());

inputTextarea.addEventListener('input', toggleOverlay);

function toggleOverlay() {
	if (inputTextarea.value.trim()) {
		inputZone.classList.add('has-content');
	} else {
		inputZone.classList.remove('has-content');
	}
}

function detectFileType(code, filename) {
	if (filename.endsWith('.html')) return 'html';
	if (filename.endsWith('.css')) return 'css';
	if (filename.endsWith('.js')) return 'js';
	if (filename.endsWith('.md')) return 'md';

	// Fallback detection (basic)
	if (code.includes('<html') || code.includes('<div')) return 'html';
	if (code.includes('{') && code.includes('}')) return 'css';
	if (code.includes('function') || code.includes('=>')) return 'js';

	return 'md';
}

function handleFile(file) {
	const reader = new FileReader();

	reader.onload = (e) => {
		const code = e.target.result;

		inputTextarea.value = code;
		toggleOverlay();

		processCode(code, file.name);
	};

	reader.readAsText(file);
}

function processCode(code, filename = 'pasted.txt') {
	const type = detectFileType(code, filename);

	const minified = minifyCode(code, type);

	if (!minified) {
		alert('Unsupported file type!');
		return;
	}

	const formatted = `(Filename: ${filename} | Type: ${type.toUpperCase()})\n${minified}\n\n`;

	if (outputTextArea.value.trim()) {
		outputTextArea.value += formatted;
	} else {
		outputTextArea.value = formatted;
	}

	outputTextArea.scrollTop = outputTextArea.scrollHeight;
	btnCopy.disabled = false;
}

function minifyCode(code, type) {
	let minified = '';

	if (type === 'html') {
		minified = code
			.replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
			.replace(/>\s+</g, '><'); // Remove spaces between tags
	} else if (type === 'css') {
		minified = code
			.replace(/\/\*[\s\S]*?\*\//g, '')
			.replace(/\s*([{}:;,])\s*/g, '$1');
	} else if (type === 'js') {
		minified = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
	} else if (type === 'md') {
		minified = minifyMarkdown(code);
	} else {
		return null;
	}

	return minified
		.replace(/\n/g, '') // Remove line breaks
		.replace(/\s{2,}/g, ' ') // Collapse multiple spaces into one
		.trim();
}

function minifyMarkdown(content) {
	const lines = content.split('\n');
	let result = [];

	let inCodeBlock = false;

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];

		// Detect code block start/end
		if (line.trim().startsWith('```')) {
			inCodeBlock = !inCodeBlock;
			result.push(line);
			continue;
		}

		// Preserve code blocks exactly
		if (inCodeBlock) {
			result.push(line);
			continue;
		}

		// Remove HTML comments
		line = line.replace(/<!--[\s\S]*?-->/g, '');

		// Trim whitespace
		line = line.trim();

		// Skip multiple blank lines
		if (line === '' && result[result.length - 1] === '') {
			continue;
		}

		result.push(line);
	}

	return result.join('\n').trim();
}
