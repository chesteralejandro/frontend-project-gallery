function isValidSVG(svgCode) {
	return svgCode.startsWith('<svg') && svgCode.endsWith('</svg>');
}

export default isValidSVG;
