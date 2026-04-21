function sanitizeFilename(name) {
	return name.replace(/[^a-z0-9_\-]/gi, '_').toLowerCase();
}

export default sanitizeFilename;
