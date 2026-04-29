import { useState } from "react";

const initialState = {
  amount: "",
  category: "Food",
  description: "",
  date: "",
};

const categories = ["Food", "Transport", "Entertainment", "Others"];

const ExpenseForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!formData.amount || Number(formData.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      await onSubmit(formData);
      setFormData(initialState);
    } catch (submitError) {
      setError(submitError.message || "Failed to add expense.");
    }
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h3>Add Expense</h3>
      {error && <p className="error-text">{error}</p>}
      <div className="form-grid">
        <input
          type="number"
          min="0"
          step="0.01"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </div>
      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Expense"}
      </button>
    </form>
  );
};

export default ExpenseForm;
