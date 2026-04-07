const dropZone = document.getElementById('drop-zone');
const folderInput = document.getElementById('folder-input');
const outputEl = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');

// ---------- Event Listeners ----------
dropZone.addEventListener('dragover', (e) => {
	e.preventDefault();
	dropZone.classList.add('hover');
});

dropZone.addEventListener('dragleave', (e) => {
	dropZone.classList.remove('hover');
});

dropZone.addEventListener('drop', (e) => {
	e.preventDefault();
	dropZone.classList.remove('hover');
	handleFiles(e.dataTransfer.items);
});

folderInput.addEventListener('change', (e) => {
	handleFiles(e.target.files);
});

copyBtn.addEventListener('click', () => {
	navigator.clipboard
		.writeText(outputEl.textContent)
		.then(() => alert('Copied to clipboard!'))
		.catch((err) => alert('Copy failed: ' + err));
});

// ---------- Core Logic ----------
function handleFiles(items) {
	let filesArray = [];

	// Normalize FileList or DataTransferItemList
	if (items instanceof DataTransferItemList) {
		for (let i = 0; i < items.length; i++) {
			const entry = items[i].webkitGetAsEntry();
			if (entry) traverseEntry(entry, '', filesArray);
		}
	} else {
		for (let file of items) {
			filesArray.push(file);
		}
		generateASCIIFromFiles(filesArray);
	}
}

// ---------- Recursive traversal ----------
function traverseEntry(entry, path, filesArray) {
	if (entry.isFile) {
		entry.file((file) => {
			file.relativePath = path + file.name;
			filesArray.push(file);
			generateASCIIFromFiles(filesArray);
		});
	} else if (entry.isDirectory) {
		const dirReader = entry.createReader();
		dirReader.readEntries((entries) => {
			entries.forEach((e) =>
				traverseEntry(e, path + entry.name + '/', filesArray),
			);
		});
	}
}

// ---------- Build ASCII ----------
function generateASCIIFromFiles(filesArray) {
	const tree = {};

	filesArray.forEach((file) => {
		const parts = (file.relativePath || file.webkitRelativePath).split('/');
		let current = tree;
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			if (!current[part]) current[part] = {};
			current = current[part];
		}
	});

	outputEl.textContent = renderTree(tree);
}

// ---------- Render ASCII ----------
function renderTree(node, prefix = '', isRoot = true) {
	let result = '';
	const keys = Object.keys(node);

	keys.forEach((key, idx) => {
		const children = node[key];
		const isLast = idx === keys.length - 1;
		const pointer = isRoot ? '' : isLast ? '└── ' : '├── ';

		// If it has children, it's a folder
		const displayName =
			Object.keys(children).length > 0 ? `📁 ${key}/` : key;

		result += prefix + pointer + displayName + '\n';

		if (Object.keys(children).length > 0) {
			const newPrefix = prefix + (isRoot ? '' : isLast ? '    ' : '│   ');
			result += renderTree(children, newPrefix, false);
		}
	});

	return result;
}
