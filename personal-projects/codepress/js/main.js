const inputZone = document.querySelector('.input-zone');
const inputTextarea = document.getElementById('input-textarea');
const fileInput = document.getElementById('fileInput');

const outputTextArea = document.getElementById('output-textarea');
const btnCopy = document.getElementById('btn-copy');
const btnClear = document.getElementById('btn-clear');

const inputFeedbackColors = {
	html: { bg: 'rgba(229, 83, 45, 0.2)', border: 'rgba(229, 83, 45, 0.6)' },
	css: { bg: 'rgba(9, 116, 188, 0.2)', border: 'rgba(9, 116, 188, 0.6)' },
	js: { bg: 'rgba(247, 224, 37, 0.2)', border: 'rgba(247, 224, 37, 0.6)' },
	md: { bg: 'rgba(212, 212, 212, 0.2)', border: 'rgba(212, 212, 212, 0.6)' },
};

inputZone.addEventListener('click', () => {
	inputTextarea.focus();
});

inputTextarea.addEventListener('paste', (e) => {
	e.preventDefault(); // prevent default paste
	const pastedCode = (e.clipboardData || window.clipboardData).getData(
		'text',
	);
	if (!pastedCode) return;

	inputTextarea.value = pastedCode;
	toggleOverlay();
	processCode(pastedCode);
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

function flashInputZone(type) {
	const colors = inputFeedbackColors[type] || {
		bg: 'rgba(255,255,255,0.03)',
		border: 'rgba(148,163,184,0.5)',
	};

	inputZone.style.backgroundColor = colors.bg;
	inputZone.style.borderColor = colors.border;

	setTimeout(() => {
		inputTextarea.value = '';
		inputZone.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
		inputZone.style.borderColor = 'rgba(148, 163, 184, 0.5)';
		inputZone.classList.remove('has-content');
	}, 2000);
}

function toggleOverlay() {
	if (inputTextarea.value.trim()) {
		inputZone.classList.add('has-content');
	} else {
		inputZone.classList.remove('has-content');
	}
}

function detectFileType(code = '', filename = '') {
	const lowerCode = code.toLowerCase().trim();

	if (filename) {
		if (filename.endsWith('.html')) return 'html';
		if (filename.endsWith('.css')) return 'css';
		if (filename.endsWith('.js')) return 'js';
		if (filename.endsWith('.md')) return 'md';
	}

	// 2. Strong JS detection
	if (
		/\b(function|const|let|var|return|import|export)\b/.test(code) ||
		code.includes('=>')
	) {
		return 'js';
	}

	// 3. Strong CSS detection
	if (/[.#][a-zA-Z0-9_-]+\s*\{[^}]*\}/.test(code)) {
		return 'css';
	}

	// 4. Strong HTML detection
	if (/<(html|head|body|div|span|p|a|!doctype)/i.test(code)) {
		return 'html';
	}

	// 5. Markdown fallback
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

function processCode(code, filename) {
	const type = detectFileType(code, filename);

	const minified = minifyCode(code, type);

	if (!minified) {
		alert('Unsupported file type!');
		return;
	}

	flashInputZone(type);

	let outputHeader = '';
	if (filename) {
		outputHeader = `(Filename: ${filename} | Filetype: ${type.toUpperCase()})`;
	} else {
		outputHeader = `(Filetype: ${type.toUpperCase()})`;
	}

	const formatted = `${outputHeader}\n${minified}\n\n`;

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
