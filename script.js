let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateValues() {
  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);
  
  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);
  
  const balance = income + expense;

  document.getElementById('income').innerText = income;
  document.getElementById('expense').innerText = expense;
  document.getElementById('balance').innerText = balance;
}

function renderTransactions() {
    const list = document.getElementById('list');
    list.innerHTML = '';
    transactions.forEach((t, index) => {
      const li = document.createElement('li');
      li.classList.add(t.amount < 0 ? 'expense' : 'income');
  
      // Add icon
      const icon = t.amount < 0 ? '💸' : '💰';
  
      li.innerHTML = `
        <span class="transaction-text">${icon} ${t.text}</span>
        <span class="transaction-amount">₹${t.amount}</span>
        <button class="delete-btn" onclick="deleteTransaction(${index})">X</button>
      `;
      list.appendChild(li);
    });
  }
  

function addTransaction() {
  const text = document.getElementById('text').value;
  const amount = +document.getElementById('amount').value;
  
  if (text.trim() === '' || isNaN(amount)) {
    alert('Please enter valid text and amount');
    return;
  }

  transactions.push({ text, amount });
  localStorage.setItem('transactions', JSON.stringify(transactions));
  
  document.getElementById('text').value = '';
  document.getElementById('amount').value = '';

  renderTransactions();
  updateValues();
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  localStorage.setItem('transactions', JSON.stringify(transactions));
  renderTransactions();
  updateValues();
}

// Initialize
renderTransactions();
updateValues();
