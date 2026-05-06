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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-indigo-600 rounded-full"></span>
        Add Expense
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {/* Amount Input */}
          <div className="col-span-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                type="number"
                min="0"
                step="0.01"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full pl-7 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
              />
            </div>
          </div>

          {/* Date Input */}
          <div className="col-span-1">
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-gray-600"
            />
          </div>
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all appearance-none cursor-pointer text-gray-700"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1 ml-1">Description</label>
          <input
            type="text"
            name="description"
            placeholder="What was this for?"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-gray-300"
          />
        </div>

        {/* Submit Button */}
        <button
          className={`w-full mt-2 py-3 px-4 rounded-xl font-bold text-white transition-all transform active:scale-95 ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg shadow-indigo-200"
          }`}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </span>
          ) : (
            "Add Expense"
          )}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;