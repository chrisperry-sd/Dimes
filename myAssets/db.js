function randomDate(start, end) {
  var d = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    ),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [year, month, day].join('-');
}

const data = [
  {
    id: 1,
    Name: 'James',
    Account_Number: 101010,
    Bank_Name: 'HSBC',
    transactions: [
      {
        id: 1,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -38.72,
        merchant: 'Holister',
        category: 'Shopping',
      },
      {
        id: 2,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -9.87,
        merchant: 'Starbucks',
        category: 'Lunch',
      },
      {
        id: 3,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -5.45,
        merchant: 'McDonalds',
        category: 'Lunch',
      },
      {
        id: 4,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -0.79,
        merchant: 'App Store',
        category: 'Apps',
      },
      {
        id: 5,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -45.67,
        merchant: 'Holister',
        category: 'Shopping',
      },
      {
        id: 6,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -9.87,
        merchant: 'Starbucks',
        category: 'Lunch',
      },
      {
        id: 7,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -5.45,
        merchant: 'McDonalds',
        category: 'Lunch',
      },
      {
        id: 8,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -0.79,
        merchant: 'App Store',
        category: 'Apps',
      },
      {
        id: 9,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: 95.0,
        merchant: 'Bank Transfer',
        category: 'Allowance',
      },
      {
        id: 10,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: 25.0,
        merchant: 'Bank Transfer',
        category: 'Allowance',
      },
      {
        id: 11,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: 55.0,
        merchant: 'Bank Transfer',
        category: 'Allowance',
      },
      {
        id: 12,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -0.79,
        merchant: 'App Store',
        category: 'Apps',
      },
      {
        id: 13,
        Date: randomDate(new Date(2020, 8, 15), new Date()),
        amount: -8.97,
        merchant: 'Cinema',
        category: 'Cinema',
      },
    ],
  },
];
export default data;
