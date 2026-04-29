import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import { createExpense, getExpenses, removeExpense } from "../services/expenseService";

const categories = ["All", "Food", "Transport", "Entertainment", "Others"];

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const user = useMemo(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses();
      setExpenses(data);
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Failed to load expenses.");
      if (apiError.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (payload) => {
    try {
      setSaving(true);
      setError("");
      await createExpense(payload);
      await fetchExpenses();
    } catch (apiError) {
      throw new Error(apiError.response?.data?.message || "Unable to save expense.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      setDeletingId(expenseId);
      setError("");
      await removeExpense(expenseId);
      setExpenses((prev) => prev.filter((expense) => expense._id !== expenseId));
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Unable to delete expense.");
    } finally {
      setDeletingId("");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <h2>Expense Dashboard</h2>
          <p>Hello {user?.name || "User"}, keep your spending in control.</p>
        </div>
        <button className="btn-secondary" type="button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {error && <p className="error-text">{error}</p>}

      <section className="dashboard-grid">
        <ExpenseForm onSubmit={handleAddExpense} loading={saving} />
        <div className="card">
          <h3>Category Distribution</h3>
          <ExpenseChart expenses={filteredExpenses} />
        </div>
      </section>

      <section className="card">
        <div className="list-header">
          <h3>Expenses</h3>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <p className="empty-text">Loading expenses...</p>
        ) : (
          <ExpenseList
            expenses={filteredExpenses}
            onDelete={handleDelete}
            loadingDeleteId={deletingId}
          />
        )}
      </section>
    </main>
  );
};

export default Dashboard;
