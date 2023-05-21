const fs = require("fs");

// Генерация моковых военных билетов
const generateMilitaryTicket = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = () =>
    letters[Math.floor(Math.random() * letters.length)];
  const randomDigit = () => Math.floor(Math.random() * 10);

  return `${randomLetter()}${randomLetter()}-${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}-${randomLetter()}${randomLetter()}`;
};

// Создание файла с моковыми военными билетами
const generateMockMilitaryTickets = () => {
  const tickets = [];
  for (let i = 0; i < 30; i++) {
    const militaryTicket = generateMilitaryTicket();
    tickets.push(militaryTicket);
  }

  const jsonData = JSON.stringify(tickets, null, 2);
  fs.writeFileSync("mockMilitaryTickets.json", jsonData);
};

generateMockMilitaryTickets();
