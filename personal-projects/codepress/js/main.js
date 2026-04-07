const fileInput = document.getElementById('fileInput');
const dropzone = document.querySelector('.dropzone');
const outputTextArea = document.getElementById('output-textarea');
const btnCopy = document.getElementById('btn-copy');
const btnClear = document.getElementById('btn-clear');
const tabs = document.querySelectorAll('.tabs button');

let fileType = 'html';

tabs.forEach((tab) => {
	tab.addEventListener('click', () => {
		tabs.forEach((tab) => tab.classList.remove('active'));
		tab.classList.add('active');

		fileType = tab.dataset.type;

		// Update dropzone text for clarity
		dropzone.textContent = `Drop your ${fileType.toUpperCase()} file here`;

		// Micro animation (pulse)
		tab.animate(
			[
				{ transform: 'scale(1)' },
				{ transform: 'scale(1.05)' },
				{ transform: 'scale(1)' },
			],
			{
				duration: 200,
				easing: 'ease',
			},
		);
	});
});

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
	outputTextArea.value = '';

	btnCopy.disabled = true;

	dropzone.textContent = `Drop your ${fileType.toUpperCase()} file here`;
	dropzone.classList.remove('loaded');
});

// Read file content and auto-minify
function readFile(file) {
	const reader = new FileReader();

	reader.onload = (e) => {
		const code = e.target.result;

		// Validate file type based on active tab
		if (!file.name.endsWith(`.${fileType}`)) {
			alert(
				`You're in ${fileType.toUpperCase()} mode. Please upload the correct file type.`,
			);
			return;
		}

		minified = minifyCode(code, fileType);

		if (!minified) {
			alert('Unsupported file type!');
			return;
		}

		// Minified code with filename
		const formatted = `(Filename: ${file.name} | Type: ${fileType.toUpperCase()})\n${minified}\n\n`;

		if (outputTextArea.value.trim() !== '') {
			outputTextArea.value += formatted;
		} else {
			outputTextArea.value = formatted;
		}

		// Auto scroll to bottom
		outputTextArea.scrollTop = outputTextArea.scrollHeight;

		// Enable copy button if minified content exists
		btnCopy.disabled = false;

		// Update dropzone text for confirmation
		dropzone.textContent = `Loaded: ${file.name}`;
		dropzone.classList.add('loaded');

		setTimeout(() => {
			dropzone.textContent = `Drop your ${fileType.toUpperCase()} file here`;
			dropzone.classList.remove('loaded');
		}, 2000);
	};

	reader.readAsText(file);
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
