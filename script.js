let transactions = [];

const balance = 5000;
document.getElementById('balance').textContent = `₹${balance.toFixed(2)}`;

function updateUI() {
  const transactionList = document.getElementById('transactionList');
  const balanceEl = document.getElementById('balance');
  const incomeEl = document.getElementById('income');
  const expenseEl = document.getElementById('expense');
  transactionList.innerHTML = '';

  let income = 0, expense = 0, total = 0;

  transactions.forEach((tx, idx) => {
    const li = document.createElement('li');
    li.classList.add('transaction');
    if (tx.amount < 0) li.classList.add('expense');
    li.innerHTML = `
      <span>${tx.desc}</span>
      <span>
        ${tx.amount < 0 ? '-' : '+'}$${Math.abs(tx.amount).toFixed(2)}
        <button class="delete-btn" onclick="deleteTransaction(${idx})">&times;</button>
      </span>
    `;
    transactionList.appendChild(li);

    if (tx.amount > 0) income += tx.amount;
    else expense += tx.amount;
    total += tx.amount;
  });

  balanceEl.textContent = `₹${total.toFixed(2)}`;
  incomeEl.textContent = `+$${income.toFixed(2)}`;
  expenseEl.textContent = `-$${Math.abs(expense).toFixed(2)}`;

  document.querySelector('.plus').textContent = `+₹${income.toFixed(2)}`;
  document.querySelector('.minus').textContent = `-₹${expense.toFixed(2)}`;
}

function deleteTransaction(idx) {
  transactions.splice(idx, 1);
  updateUI();
}

document.getElementById('transactionForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const desc = document.getElementById('desc').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  if (!desc || isNaN(amount) || amount === 0) return;
  transactions.push({ desc, amount });
  document.getElementById('transactionForm').reset();
  updateUI();
});

function addTransaction(description, amount) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-IN'); // e.g., 19/06/2025

  const transaction = {
    description,
    amount,
    date: formattedDate // Add date property
  };

  transactions.push(transaction);
  renderTransactions();
}

function renderTransactions() {
  const list = document.getElementById('transactionList');
  list.innerHTML = '';
  transactions.forEach(transaction => {
    const li = document.createElement('li');
    li.className = `transaction${transaction.amount < 0 ? ' expense' : ''}`;
    li.innerHTML = `
      <span class="desc">${transaction.description}</span>
      <span class="amount">${transaction.amount < 0 ? '-' : '+'} ₹${Math.abs(transaction.amount).toFixed(2)}</span>
      <span class="date">${transaction.date}</span>
      <button class="delete-btn">x</button>
    `;
    list.appendChild(li);
  });
}

updateUI();