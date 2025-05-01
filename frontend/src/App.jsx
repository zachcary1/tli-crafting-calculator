import { useEffect, useState } from 'react';

function App() {
  const [builds, setBuilds] = useState([]);
  const [form, setForm] = useState({
    itemType: '',
    affixes: '',
    tiers: '',
    estimatedCost: ''
  });

  useEffect(() => {
    fetch('https://tli-crafting-calculator.onrender.com/api/builds')
      .then((res) => res.json())
      .then((data) => setBuilds(data));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBuild = {
      itemType: form.itemType,
      affixes: form.affixes.split(',').map((a) => a.trim()),
      tiers: form.tiers.split(',').map((t) => parseInt(t)),
      estimatedCost: parseInt(form.estimatedCost)
    };

    const res = await fetch('https://tli-crafting-calculator.onrender.com/api/builds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBuild)
    });

    const saved = await res.json();
    setBuilds([...builds, saved]);
    setForm({ itemType: '', affixes: '', tiers: '', estimatedCost: '' });
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Saved Builds</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label>Item Type:</label>
          <input name="itemType" value={form.itemType} onChange={handleChange} className="ml-2 p-1 text-black" />
        </div>
        <div>
          <label>Affixes (comma separated):</label>
          <input name="affixes" value={form.affixes} onChange={handleChange} className="ml-2 p-1 text-black w-80" />
        </div>
        <div>
          <label>Tiers (comma separated):</label>
          <input name="tiers" value={form.tiers} onChange={handleChange} className="ml-2 p-1 text-black w-48" />
        </div>
        <div>
          <label>Estimated Cost:</label>
          <input name="estimatedCost" value={form.estimatedCost} onChange={handleChange} className="ml-2 p-1 text-black w-24" />
        </div>
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Add Build
        </button>
      </form>

      {builds.length === 0 ? (
        <p>No builds found.</p>
      ) : (
        <ul className="space-y-4">
          {builds.map((build) => (
            <li key={build._id} className="p-4 bg-gray-800 rounded">
              <p><strong>Item Type:</strong> {build.itemType}</p>
              <p><strong>Affixes:</strong> {build.affixes.join(', ')}</p>
              <p><strong>Tiers:</strong> {build.tiers.join(', ')}</p>
              <p><strong>Estimated Cost:</strong> {build.estimatedCost}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
