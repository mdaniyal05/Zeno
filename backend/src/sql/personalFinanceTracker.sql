CREATE DATABASE personalFinanceTracker;
USE personalFinanceTracker;

SELECT * FROM Users;

INSERT INTO Accounts (
  accountId, accountName, accountType, accountBalance,
  accountCurrency, bankName, accountNumber, isActive,
  userId, createdAt, updatedAt
) VALUES
('26e3b8d5-1c23-4e89-a1e6-bf20c2e8e124', 'My Savings', 'Savings', 12000.50, 'USD', 'Bank of America', '1234567890', 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

INSERT INTO Accounts (
  accountId, accountName, accountType, accountBalance,
  accountCurrency, bankName, accountNumber, isActive,
  userId, createdAt, updatedAt
) VALUES
('de9481c9-5482-4aa4-9d6c-35dd8d50cfd3', 'Primary Account', 'Current', 5000.00, 'PKR', 'HBL', '8765432109', 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

INSERT INTO Accounts (
  accountId, accountName, accountType, accountBalance,
  accountCurrency, bankName, accountNumber, isActive,
  userId, createdAt, updatedAt
) VALUES
('115e51d9-f17c-4d46-8a9b-cf28f05b1e2b', 'Default Wallet', 'Default', 250.75, 'EUR', 'Deutsche Bank', '1122334455', 0, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

INSERT INTO Accounts (
  accountId, accountName, accountType, accountBalance,
  accountCurrency, bankName, accountNumber, isActive,
  userId, createdAt, updatedAt
) VALUES
('baed5b6b-bd67-4c14-ae6f-ef2fc9e3b34f', 'Crypto Vault', 'Savings', 98765.43, 'USD', 'Silicon Valley Bank', '9988776655', 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

INSERT INTO Accounts (
  accountId, accountName, accountType, accountBalance,
  accountCurrency, bankName, accountNumber, isActive,
  userId, createdAt, updatedAt
) VALUES
('c3fe5af1-0e67-47f7-bb5c-3b09e8a3cb43', 'Euro Trip Funds', 'Current', 3000.00, 'EUR', 'HSBC', '6677889900', 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

SELECT * FROM Accounts;

INSERT INTO Categories (
  categoryId, categoryName, categoryType, description, isActive,
  monthlyLimit, monthlyLimitRemainingAmount, isMonthlyLimitExceeded,
  userId, createdAt, updatedAt
) VALUES
('8a7c9e59-1354-4a62-9fd4-2c3f705b5a5e', 'Groceries', 'Needs', 'Monthly grocery expenses for food and essentials', 1, 25000.00, 5000.00, 0, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

INSERT INTO Categories (
  categoryId, categoryName, categoryType, description, isActive,
  monthlyLimit, monthlyLimitRemainingAmount, isMonthlyLimitExceeded,
  userId, createdAt, updatedAt
) VALUES
('b3ff34e7-83a7-453c-83a6-9753c0d69b41', 'Dining Out', 'Wants', 'Money spent on restaurants and takeout', 1, 8000.00, 0.00, 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

INSERT INTO Categories (
  categoryId, categoryName, categoryType, description, isActive,
  monthlyLimit, monthlyLimitRemainingAmount, isMonthlyLimitExceeded,
  userId, createdAt, updatedAt
) VALUES
('df5c29fa-370e-4ab3-89b1-547d6746e5b0', 'Emergency Fund', 'Savings', 'Savings reserved for unexpected expenses', 1, 10000.00, 10000.00, 0, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

INSERT INTO Categories (
  categoryId, categoryName, categoryType, description, isActive,
  monthlyLimit, monthlyLimitRemainingAmount, isMonthlyLimitExceeded,
  userId, createdAt, updatedAt
) VALUES
('c94467f5-ec61-44a7-9e2c-310b55eb768f', 'Transport', 'Needs', 'Fuel, car maintenance, and public transport', 1, 15000.00, 2000.00, 0, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

INSERT INTO Categories (
  categoryId, categoryName, categoryType, description, isActive,
  monthlyLimit, monthlyLimitRemainingAmount, isMonthlyLimitExceeded,
  userId, createdAt, updatedAt
) VALUES
('f7f8c947-2c33-413f-86c4-6f172ed28ff1', 'Subscriptions', 'Wants', 'Monthly payments for streaming and apps', 1, 5000.00, 1000.00, 0, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

SELECT * FROM Categories;

INSERT INTO Incomes (incomeId, incomeAmount, currency, incomeDate, incomeSource, userId, createdAt)
VALUES 
('b10e427d-e0e4-4870-85e4-31f29d340001', 150000.00, 'PKR', '2025-01-01', 'Full-time Job', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340002', 5000.00, 'PKR', '2025-01-10', 'Freelance Writing', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340003', 150000.00, 'PKR', '2025-02-01', 'Full-time Job', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340004', 12000.00, 'PKR', '2025-02-18', 'Upwork', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340005', 20000.00, 'PKR', '2025-03-01', 'Part-time Job', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340006', 150000.00, 'PKR', '2025-03-01', 'Full-time Job', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340007', 3000.00, 'PKR', '2025-03-20', 'Content Creation', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340008', 150000.00, 'PKR', '2025-04-01', 'Full-time Job', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340009', 7000.00, 'PKR', '2025-04-10', 'Freelance Design', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340010', 150000.00, 'PKR', '2025-05-01', 'Full-time Job', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340011', 4000.00, 'PKR', '2025-05-15', 'Tutoring', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340012', 150000.00, 'PKR', '2025-06-01', 'Full-time Job', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340013', 5500.00, 'PKR', '2025-06-05', 'Freelance Coding', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340014', 3000.00, 'PKR', '2025-06-12', 'Graphic Design', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340015', 10000.00, 'PKR', '2025-06-13', 'Social Media Project', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340016', 8000.00, 'PKR', '2025-06-13', 'Blog Sponsorship', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340017', 25000.00, 'PKR', '2025-06-13', 'Bonus Payment', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340018', 15000.00, 'PKR', '2025-06-13', 'Referral Commission', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340019', 4500.00, 'PKR', '2025-06-13', 'Video Editing', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE()),
('b10e427d-e0e4-4870-85e4-31f29d340020', 6500.00, 'PKR', '2025-06-13', 'E-book Sales', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE());

SELECT * FROM Incomes;

INSERT INTO Transactions (
  transactionId, transactionAmount, transactionType, paymentMethod,
  description, userId, accountId, createdAt
) VALUES
(NEWID(), 5000.00, 'Expense', 'Card', 'Grocery shopping at Carrefour', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '26e3b8d5-1c23-4e89-a1e6-bf20c2e8e124', GETDATE()),
(NEWID(), 1200.00, 'Expense', 'Cash', 'Daily bus fare', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'de9481c9-5482-4aa4-9d6c-35dd8d50cfd3', GETDATE()),
(NEWID(), 30000.00, 'Income', 'Bank', 'Client payment - web app', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '115e51d9-f17c-4d46-8a9b-cf28f05b1e2b', GETDATE()),
(NEWID(), 1500.00, 'Expense', 'Online', 'Netflix subscription', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'baed5b6b-bd67-4c14-ae6f-ef2fc9e3b34f', GETDATE()),
(NEWID(), 20000.00, 'Income', 'Bank', 'Monthly salary', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '26e3b8d5-1c23-4e89-a1e6-bf20c2e8e124', GETDATE()),
(NEWID(), 800.00, 'Expense', 'Card', 'Dinner with friends', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'de9481c9-5482-4aa4-9d6c-35dd8d50cfd3', GETDATE()),
(NEWID(), 12000.00, 'Income', 'Bank', 'Project bonus', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '115e51d9-f17c-4d46-8a9b-cf28f05b1e2b', GETDATE()),
(NEWID(), 500.00, 'Expense', 'Cash', 'Fuel refill', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'c3fe5af1-0e67-47f7-bb5c-3b09e8a3cb43', GETDATE()),
(NEWID(), 2500.00, 'Expense', 'Online', 'Grocery order from Cheetay', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '26e3b8d5-1c23-4e89-a1e6-bf20c2e8e124', GETDATE()),
(NEWID(), 1000.00, 'Expense', 'Card', 'Uber to office', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'de9481c9-5482-4aa4-9d6c-35dd8d50cfd3', GETDATE()),
(NEWID(), 10000.00, 'Income', 'Bank', 'Online course refund', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '115e51d9-f17c-4d46-8a9b-cf28f05b1e2b', GETDATE()),
(NEWID(), 600.00, 'Expense', 'Cash', 'Café latte and sandwich', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'de9481c9-5482-4aa4-9d6c-35dd8d50cfd3', GETDATE()),
(NEWID(), 22000.00, 'Income', 'Bank', 'Contract gig payout', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '115e51d9-f17c-4d46-8a9b-cf28f05b1e2b', GETDATE()),
(NEWID(), 1800.00, 'Expense', 'Online', 'Fitness club membership', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'baed5b6b-bd67-4c14-ae6f-ef2fc9e3b34f', GETDATE()),
(NEWID(), 400.00, 'Expense', 'Card', 'Cinema ticket', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'baed5b6b-bd67-4c14-ae6f-ef2fc9e3b34f', GETDATE()),
(NEWID(), 2000.00, 'Income', 'Bank', 'Stock dividends', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'baed5b6b-bd67-4c14-ae6f-ef2fc9e3b34f', GETDATE()),
(NEWID(), 1350.00, 'Expense', 'Cash', 'Metro card recharge', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'c3fe5af1-0e67-47f7-bb5c-3b09e8a3cb43', GETDATE()),
(NEWID(), 2500.00, 'Income', 'Online', 'Affiliate earnings', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '115e51d9-f17c-4d46-8a9b-cf28f05b1e2b', GETDATE()),
(NEWID(), 900.00, 'Expense', 'Card', 'Takeaway lunch', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'de9481c9-5482-4aa4-9d6c-35dd8d50cfd3', GETDATE()),
(NEWID(), 720.00, 'Expense', 'Cash', 'Office snacks', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'de9481c9-5482-4aa4-9d6c-35dd8d50cfd3', GETDATE());

SELECT * FROM Transactions;

INSERT INTO Budgets (
  budgetId, budgetAmount, budgetPeriod, description, startDate, endDate,
  amountSpent, amountRemaining, percentUsed, status, notificationsEnabled, userId, createdAt, updatedAt
) VALUES
(NEWID(), 20000.00, 'Monthly', 'Monthly grocery and essentials', '2025-06-01', '2025-06-30', 14000.00, 6000.00, 70.00, 'Active', 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE()),
(NEWID(), 15000.00, 'Monthly', 'Dining & Entertainment budget', '2025-06-01', '2025-06-30', 16000.00, 0.00, 106.67, 'Exceeded', 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE()),
(NEWID(), 100000.00, 'Yearly', 'Annual health and medical expenses', '2025-01-01', '2025-12-31', 25000.00, 75000.00, 25.00, 'Active', 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE()),
(NEWID(), 5000.00, 'Weekly', 'Weekly commute and transport', '2025-06-10', '2025-06-16', 5000.00, 0.00, 100.00, 'Completed', 0, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE()),
(NEWID(), 8000.00, 'Monthly', 'Online subscriptions and utilities', '2025-06-01', '2025-06-30', 2000.00, 6000.00, 25.00, 'Active', 1, '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', GETDATE(), GETDATE());

SELECT * FROM Budgets;

INSERT INTO Expenses (expenseId, expenseAmount, expenseType, currency, expenseDate, merchant, userId, categoryId, budgetId, createdAt)
VALUES
(NEWID(), 4200.00, 'Needs', 'PKR', '2025-06-02', 'SuperMart', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '8a7c9e59-1354-4a62-9fd4-2c3f705b5a5e', '7C485E05-999C-4D63-AE13-54757134B9FC', GETDATE()),
(NEWID(), 950.00, 'Needs', 'PKR', '2025-06-03', 'City Bus Service', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'c94467f5-ec61-44a7-9e2c-310b55eb768f', '7C485E05-999C-4D63-AE13-54757134B9FC', GETDATE()),
(NEWID(), 1600.00, 'Wants', 'PKR', '2025-06-04', 'PVR Cinemas', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'b3ff34e7-83a7-453c-83a6-9753c0d69b41', '7C485E05-999C-4D63-AE13-54757134B9FC', GETDATE()),
(NEWID(), 1350.00, 'Needs', 'PKR', '2025-06-05', 'Petrol Pump', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'c94467f5-ec61-44a7-9e2c-310b55eb768f', 'A4BC9D6B-239D-45A9-8D08-F169F5FC34A6', GETDATE()),
(NEWID(), 2100.00, 'Wants', 'PKR', '2025-06-07', 'Netflix Subscription', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'f7f8c947-2c33-413f-86c4-6f172ed28ff1', 'A4BC9D6B-239D-45A9-8D08-F169F5FC34A6', GETDATE()),
(NEWID(), 7800.00, 'Needs', 'PKR', '2025-06-08', 'Monthly Grocery Delivery', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', '8a7c9e59-1354-4a62-9fd4-2c3f705b5a5e', 'A4BC9D6B-239D-45A9-8D08-F169F5FC34A6', GETDATE()),
(NEWID(), 1800.00, 'Wants', 'PKR', '2025-06-09', 'Gym Membership Fee', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'b3ff34e7-83a7-453c-83a6-9753c0d69b41', 'F020C953-22EE-42AF-92E3-E01A509E4F62', GETDATE()),
(NEWID(), 3200.00, 'Needs', 'PKR', '2025-06-10', 'Utility Bill Payment', '4ccf7b57-862d-45ca-afbe-d88b16e85f2d', 'c94467f5-ec61-44a7-9e2c-310b55eb768f', 'F020C953-22EE-42AF-92E3-E01A509E4F62', GETDATE())

SELECT * FROM Expenses;
