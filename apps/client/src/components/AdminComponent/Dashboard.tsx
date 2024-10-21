export const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl mb-6 font-semibold">Dashboard Overview</h2>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-3 p-4 rounded-lg shadow-md shadow-slate-12">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-2xl font-bold">100</p>
          </div>
          <div className="bg-slate-3 p-4 rounded-lg shadow-md shadow-slate-12">
            <h3 className="text-xl font-semibold">Total Projects</h3>
            <p className="text-2xl font-bold">100</p>
          </div>
          <div className="bg-slate-3 p-4 rounded-lg shadow-md shadow-slate-12">
            <h3 className="text-xl font-semibold">Total Messages</h3>
            <p className="text-2xl font-bold">100</p>
          </div>
        </div>
      </div>
    </div>
  );
};
