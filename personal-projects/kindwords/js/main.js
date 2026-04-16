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
	return word.charAt(0).toUpperCase() + word.slice(1);
}

function getWordsByCategory(category) {
	if (category === 'all') {
		const allArrays = Object.values(kindWordsData);
		return allArrays.flat();
	}

	return kindWordsData[category] || [];
}

function buildOutput(words, type, amount) {
	if (!words.length) {
		return `<span class="output-placeholder">No words found.</span>`;
	}

	const shuffled = [...words].sort(() => Math.random() - 0.5);

	if (type === 'sentences') {
		return shuffled
			.slice(0, amount)
			.map((w) => capitalize(w) + '.')
			.join(' ');
	}

	// paragraphs mode (simple grouping for now)
	const chunkSize = Math.ceil(words.length / amount);

	let paragraphs = [];
	for (let i = 0; i < amount; i++) {
		const chunk = shuffled.slice(i * chunkSize, (i + 1) * chunkSize);
		paragraphs.push(chunk.join(', '));
	}

	return paragraphs.map((p) => `<p>${p}</p>`).join('');
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
