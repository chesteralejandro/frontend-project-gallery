function ensureSVGNamespace(svgCode) {
	console.log('Success');
	if (!svgCode.includes('xmlns=')) {
		return svgCode.replace(
			'<svg',
			'<svg xmlns="http://www.w3.org/2000/svg"',
		);
	}
	return svgCode;
}

export default ensureSVGNamespace;
