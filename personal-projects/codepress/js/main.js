const inputTextArea = document.getElementById('input-textarea');
const outputTextArea = document.getElementById('output-textarea');
const btnMinify = document.getElementById('btn-minify');
const btnCopy = document.getElementById('btn-copy');

btnMinify.addEventListener('click', () => {
	let code = inputTextArea.value;

	// 1. Remove HTML comments
	code = code.replace(/<!--[\s\S]*?-->/g, '');

	// 2. Remove line breaks
	code = code.replace(/\n/g, '');

	// 3. Collapse multiple spaces into one
	code = code.replace(/\s{2,}/g, ' ');

	// 4. Remove spaces between tags
	code = code.replace(/>\s+</g, '><');

	// 5. Trim start and end
	code = code.trim();

	outputTextArea.value = code;
});

inputTextArea.addEventListener('input', () => {
	btnCopy.disabled = !inputTextArea.value.trim();
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
