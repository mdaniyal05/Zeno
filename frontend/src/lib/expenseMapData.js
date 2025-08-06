export default function expenseMap (dataset, expense) {
  expense.expensesData.map((expense) => {
    let expenseSum = 0;
    let monthNo = new Date(expense.expenseDate).getMonth() + 1;

    switch (monthNo) {
      case 1: {
        let month = dataset.find((u) => u.month === "Jan");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 2: {
        let month = dataset.find((u) => u.month === "Feb");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 3: {
        let month = dataset.find((u) => u.month === "Mar");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 4: {
        let month = dataset.find((u) => u.month === "Apr");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 5: {
        let month = dataset.find((u) => u.month === "May");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 6: {
        let month = dataset.find((u) => u.month === "June");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 7: {
        let month = dataset.find((u) => u.month === "July");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 8: {
        let month = dataset.find((u) => u.month === "Aug");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 9: {
        let month = dataset.find((u) => u.month === "Sep");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 10: {
        let month = dataset.find((u) => u.month === "Oct");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 11: {
        let month = dataset.find((u) => u.month === "Nov");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      case 12: {
        let month = dataset.find((u) => u.month === "Dec");
        expenseSum = expenseSum + expense.expenseAmount;
        month.expense = month.expense + expenseSum;
        break;
      }
      default:
        break;
    }
  });
}
