function formatPhone(unformattedNumber: string): string {
  const regExArray = unformattedNumber.match(/[0-9]{0,14}/g);

  if (!regExArray) throw new Error('Please enter a 10 digit phone number.');
  const newString = regExArray.join('');

  if (newString.length !== 10) {
    throw new Error('Please enter a 10 digit phone number.');
  }
  // Start number with "+"
  const final = `+1${newString}`;

  return final;
}

export default formatPhone;
