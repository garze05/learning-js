export function hideElement(element) {
  if (element.style.display !== 'none') {
    element.style.display = 'none';
  }
}

export function showElement(element) {
  if (element.style.display === 'none') {
    element.style.display = ''; // inline es el default
  }
}

export function isVoid(input) {
  return input.value.trim() === '';
}