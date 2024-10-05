function extractDynamicPart(url) {
  const regex = /product\/([a-zA-Z0-9-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}
export default extractDynamicPart;