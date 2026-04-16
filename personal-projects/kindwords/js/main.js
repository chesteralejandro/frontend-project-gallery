// UI elements
const output = document.getElementById('output');
const generateBtn = document.getElementById('btn-generate');
const categorySelect = document.getElementById('category');
const outputTypeSelect = document.getElementById('output-type');
const amountInput = document.getElementById('amount');
const amountValue = document.getElementById('amount-value');

let kindWordsData = null;

async function loadData() {
	try {
		const response = await fetch('./data/kindwords.json');
		kindWordsData = await response.json();
	} catch (error) {
		console.error('Failed to load JSON:', error.message);
	}
}

function capitalize(word) {
	if (!word) return '';
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function getWordsByCategory(category) {
	if (category === 'all') {
		const allArrays = Object.values(kindWordsData);
		return allArrays.flat();
	}

	return kindWordsData[category] || [];
}

function pickRandomUnique(arr, count) {
	const copy = [...arr];
	const result = [];

	while (result.length < count && copy.length > 0) {
		const index = Math.floor(Math.random() * copy.length);
		result.push(copy.splice(index, 1)[0]);
	}

	return result;
}

function buildOutput(words, type, amount) {
	if (!words.length) {
		return `<span class="output-placeholder">No words found.</span>`;
	}

	const picked = pickRandomUnique(words, amount);

	if (type === 'sentences') {
		return picked.map((word) => capitalize(word)).join(' ');
	}

	const chunkSize = Math.ceil(picked.length / amount);

	let paragraphs = [];

	for (let i = 0; i < amount; i++) {
		const chunk = picked.slice(i * chunkSize, (i + 1) * chunkSize);

		const line = chunk.map((word) => capitalize(word)).join(' ');

		paragraphs.push(`<p>${line}</p>`);
	}

	return paragraphs.join('');
}

function generateKindWords() {
	if (!kindWordsData) return;

	const category = categorySelect.value;
	const outputType = outputTypeSelect.value;
	const amount = parseInt(amountInput.value, 10);

	const words = getWordsByCategory(category);

	const result = buildOutput(words, outputType, amount);

	output.innerHTML = result;
}

window.addEventListener('DOMContentLoaded', loadData);

amountInput.addEventListener('input', () => {
	amountValue.textContent = amountInput.value;
});

generateBtn.addEventListener('click', generateKindWords);
