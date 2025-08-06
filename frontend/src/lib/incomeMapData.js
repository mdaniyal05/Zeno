export default function (dataset, income) {
  income.incomesData.map((income) => {
    let incomeSum = 0;
    let monthNo = new Date(income.incomeDate).getMonth() + 1;

    switch (monthNo) {
      case 1: {
        let month = dataset.find((u) => u.month === "Jan");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 2: {
        let month = dataset.find((u) => u.month === "Feb");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 3: {
        let month = dataset.find((u) => u.month === "Mar");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 4: {
        let month = dataset.find((u) => u.month === "Apr");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 5: {
        let month = dataset.find((u) => u.month === "May");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 6: {
        let month = dataset.find((u) => u.month === "June");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 7: {
        let month = dataset.find((u) => u.month === "July");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 8: {
        let month = dataset.find((u) => u.month === "Aug");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 9: {
        let month = dataset.find((u) => u.month === "Sep");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 10: {
        let month = dataset.find((u) => u.month === "Oct");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 11: {
        let month = dataset.find((u) => u.month === "Nov");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      case 12: {
        let month = dataset.find((u) => u.month === "Dec");
        incomeSum = incomeSum + income.incomeAmount;
        month.income = month.income + incomeSum;
        break;
      }
      default:
        break;
    }
  });
}
