function createDashedLine(label, value, totalLength = 30) {
  if (label && value) {
    const lineLength = totalLength - (label.length + value.length);
    const dashedLine = lineLength > 0 ? '-'.repeat(lineLength) : '';
    return dashedLine
  }
}
export default createDashedLine