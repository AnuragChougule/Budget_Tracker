const ExpenseList = ({ expenses, onDelete, loadingDeleteId }) => {
  if (!expenses.length) {
    return <p className="empty-text">No expenses found for this filter.</p>;
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <div className="expense-item" key={expense._id}>
          <div>
            <h4>
              {expense.category} 
              {/* Added a subtle badge for payment method */}
              <span className="payment-method-badge" style={{ marginLeft: '8px', fontSize: '0.8rem', opacity: 0.7 }}>
                ({expense.paymentMethod || "Cash"})
              </span>
            </h4>
            <p>{expense.description || "No description"}</p>
            <small>{new Date(expense.date).toLocaleDateString()}</small>
          </div>
          <div className="expense-actions">
            <strong>₹{Number(expense.amount).toFixed(2)}</strong>
            <button
              className="btn-danger"
              type="button"
              onClick={() => onDelete(expense._id)}
              disabled={loadingDeleteId === expense._id}
            >
              {loadingDeleteId === expense._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
