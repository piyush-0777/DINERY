import PublicLayout from "../../layouts/PublicLayout";

const Home = () => {
  return (
    <PublicLayout>
      <section className="h-[90vh] flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-heading text-5xl md:text-6xl mb-6">
            Modern Restaurant POS
          </h1>

          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Dinery powers smart restaurants with live orders,
            table management, and real-time owner notifications.
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-6 py-3 bg-white text-black rounded hover:opacity-90">
              Start Free
            </button>
            <button className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black">
              Explore
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
