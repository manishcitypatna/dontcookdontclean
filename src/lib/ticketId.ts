const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomLetters(count: number): string {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += LETTERS[Math.floor(Math.random() * LETTERS.length)];
  }
  return result;
}

function randomDigits(count: number): string {
  let result = "";
  for (let i = 0; i < count; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

/** Format: TKT-XX00XX (2 letters, 2 digits, 2 letters), e.g. TKT-TY56GH */
export function generateTicketId(): string {
  return `TKT-${randomLetters(2)}${randomDigits(2)}${randomLetters(2)}`;
}
