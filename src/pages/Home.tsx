import Dashboard from '../components/Dashboard';

const Home = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
