import capitalize from './utils/capitalize.js';

const output = document.getElementById('output');
const generateBtn = document.getElementById('btn-generate');
const copyBtn = document.getElementById('btn-copy');
const categorySelect = document.getElementById('category');
const amountInput = document.getElementById('amount');
const amountValue = document.getElementById('amount-value');

const MIN_CHAR_LENGTH = 220;
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

function updateAmountText() {
	amountValue.textContent = amountInput.value;
}

function buildParagraph(category) {
	const positive = [...kindWordsData.positive_words];

	const selected =
		category === 'all'
			? Object.entries(kindWordsData)
					.filter(([key]) => key !== 'positive_words')
					.flatMap(([, arr]) => arr)
			: [...kindWordsData[category]];

	let result = '';
	let usePositive = true;

	while (result.length < MIN_CHAR_LENGTH) {
		const source = usePositive ? positive : selected;

		if (!source.length) break;

		const index = Math.floor(Math.random() * source.length);
		const word = source.splice(index, 1)[0];

		result += capitalize(word) + ' ';
		usePositive = !usePositive;
	}

	return result.trim();
}

function buildOutput(category, amount) {
	const paragraphs = [];

	for (let i = 0; i < amount; i++) {
		paragraphs.push(`<p>${buildParagraph(category)}</p>`);
	}

	return paragraphs.join('');
}

function generateKindWords() {
	if (!kindWordsData) return;

	const category = categorySelect.value;
	const amount = parseInt(amountInput.value, 10);

	const result = buildOutput(category, amount);

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

window.addEventListener('DOMContentLoaded', loadData);
amountInput.addEventListener('input', updateAmountText);
generateBtn.addEventListener('click', generateKindWords);
copyBtn.addEventListener('click', copyToClipboard);
