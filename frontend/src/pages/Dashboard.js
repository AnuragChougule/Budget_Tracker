import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import { createExpense, getExpenses, removeExpense } from "../services/expenseService";
import "./Dashboard.css"; // Ensure this import matches your filename

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

  // Calculate statistics for the new stats-row
  const stats = useMemo(() => {
    const total = expenses.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
    const count = expenses.length;
    const avg = count > 0 ? (total / count).toFixed(2) : 0;
    return { total, count, avg };
  }, [expenses]);

  const fetchExpenses = useCallback(async () => {
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
  }, [navigate]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

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

  const filteredExpenses = useMemo(() => {
    return selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);
  }, [expenses, selectedCategory]);

  return (
    <div className="dashboard-page">
      <div className="container">
        
        {/* Header Section */}
        <header className="dashboard-header">
          <div className="brand-group">
            <h1>FinancePulse</h1>
            <p className="welcome-text">
              Welcome back, <span>{user?.name || "User"}</span>. Here's your financial status.
            </p>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value accent">₹{stats.total.toLocaleString()}</div>
            <div className="stat-sub">Across {stats.count} transactions</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Transactions</div>
            <div className="stat-value">{stats.count}</div>
            <div className="stat-sub">Lifetime records</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Avg Transaction</div>
            <div className="stat-value">₹{stats.avg}</div>
            <div className="stat-sub">Per expense entry</div>
          </div>
        </div>

        {error && <div className="global-error">{error}</div>}

        <div className="dashboard-grid">
          {/* Sidebar Area: Form */}
          <aside className="sidebar-section">
            <div className="card form-card">
              <ExpenseForm onSubmit={handleAddExpense} loading={saving} />
            </div>
          </aside>

          {/* Main Area: Chart and List */}
          <main className="main-section">
            <div className="card chart-card">
              <div className="card-header">
                <h3>Category Analysis</h3>
                <span className="badge">Real-time</span>
              </div>
              <div className="chart-viewport">
                <ExpenseChart expenses={filteredExpenses} />
              </div>
            </div>

        
          </main>
              <div className="card list-card">
              <div className="list-header">
                <h3>Transactions</h3>
                <div className="filter-group">
                  <label>Filter:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-select"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="list-content">
                {loading ? (
                  <div className="loader-container">
                    <div className="spinner"></div>
                    <p>Fetching your data...</p>
                  </div>
                ) : (
                  <ExpenseList
                    expenses={filteredExpenses}
                    onDelete={handleDelete}
                    loadingDeleteId={deletingId}
                  />
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;