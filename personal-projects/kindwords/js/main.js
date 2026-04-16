import capitalize from './utils/capitalize.js';

const output = document.getElementById('output');
const generateBtn = document.getElementById('btn-generate');
const copyBtn = document.getElementById('btn-copy');
const categorySelect = document.getElementById('category');
const outputTypeSelect = document.getElementById('output-type');
const amountInput = document.getElementById('amount');
const amountValue = document.getElementById('amount-value');

let kindWordsData = null;

async function loadData() {
	try {
		const response = await fetch('./data/kindwords.json');
		kindWordsData = await response.json();

		setTimeout(() => {
			generateKindWords();
		}, 100);
	} catch (error) {
		console.error('Failed to load JSON:', error.message);
	}
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

function getPlainTextFromOutput() {
	const tempDiv = document.createElement('div');
	tempDiv.innerHTML = output.innerHTML;

	return tempDiv.innerText.trim();
}

async function copyToClipboard() {
	const text = getPlainTextFromOutput();

	if (!text || text.includes('Your kind words will appear here')) {
		return;
	}

	try {
		await navigator.clipboard.writeText(text);
	} catch (err) {
		console.error('Copy failed:', err);
	}
}

function updateAmountText() {
	amountValue.textContent = amountInput.value;
}

window.addEventListener('DOMContentLoaded', loadData);
amountInput.addEventListener('input', updateAmountText);
generateBtn.addEventListener('click', generateKindWords);
copyBtn.addEventListener('click', copyToClipboard);
