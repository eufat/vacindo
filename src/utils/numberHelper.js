export function numberWithDelimiter(n, delimiter) {
  if (n) return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
  return '';
}

export function numberStripDelimiter(n, delimiter) {
  return parseInt(
    n
      .toString()
      .split(delimiter)
      .join(''),
    10,
  );
}

export function getDate(millis) {
  let today = new Date();

  if (millis) {
    today = new Date(millis);
  }
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${yyyy}/${mm}/${dd}`;
}

export function getDashDate(millis) {
  let today = new Date();

  if (millis) {
    today = new Date(millis);
  }
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${yyyy}-${mm}-${dd}`;
}
