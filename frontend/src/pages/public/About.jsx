import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

const About = () => {
  return (
    <PublicLayout>
      <section className="bg-black text-white py-24">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="font-heading text-4xl md:text-5xl mb-6">
              About <span className="text-yellow-500">Dinery</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Dinery is a next-generation restaurant POS system built to
              digitize dine-in ordering, streamline kitchen operations,
              and provide real-time insights to restaurant owners.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-10 mb-24">

            {/* Owner */}
            <div className="bg-zinc-900 rounded-2xl overflow-hidden
                            hover:-translate-y-2 hover:scale-105
                            transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
              <img
                src="/images/about-dinery-1.jfif"
                alt="Restaurant Owner Dashboard"
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Owner Control Panel
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Owners get full control over menus, pricing, live orders,
                  tables, and staff activity from a single dashboard.
                </p>
              </div>
            </div>

            {/* Kitchen */}
            <div className="bg-zinc-900 rounded-2xl overflow-hidden
                            hover:-translate-y-2 hover:scale-105
                            transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
              <img
                src="/images/about-dinery-2.jfif"
                alt="Kitchen Orders"
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Real-Time Kitchen Orders
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Orders appear instantly in the kitchen using Socket.io,
                  reducing miscommunication and order delays.
                </p>
              </div>
            </div>

            {/* Customer */}
            <div className="bg-zinc-900 rounded-2xl overflow-hidden
                            hover:-translate-y-2 hover:scale-105
                            transition-all duration-300 shadow-lg hover:shadow-yellow-500/20">
              <img
                src="/images/about-dinery-3.jfif"
                alt="Customer Ordering"
                className="h-52 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Seamless Customer Ordering
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Customers can place orders directly from their table
                  without waiting for staff, improving speed and comfort.
                </p>
              </div>
            </div>

          </div>

          {/* Why Dinery */}
          <div className="mb-24">
            <h3 className="text-3xl font-semibold mb-6">
              Why Choose Dinery?
            </h3>

            <ul className="grid md:grid-cols-2 gap-6 text-gray-400">
              <li>✔ Real-time order synchronization</li>
              <li>✔ QR-based table ordering</li>
              <li>✔ Owner & customer role separation</li>
              <li>✔ Live order notifications</li>
              <li>✔ Secure authentication with JWT</li>
              <li>✔ Scalable architecture for future growth</li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mb-24 bg-zinc-900 rounded-2xl p-10">
            <h3 className="text-3xl font-semibold mb-6">
              Technology Stack
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Dinery is built using modern technologies including
              <span className="text-white font-medium"> React </span>,
              <span className="text-white font-medium"> Node.js </span>,
              <span className="text-white font-medium"> Express </span>,
              <span className="text-white font-medium"> MongoDB </span>,
              <span className="text-white font-medium"> Socket.io </span>,
              <span className="text-white font-medium"> Redux </span>, and
              <span className="text-white font-medium"> Tailwind CSS</span>.
              This ensures performance, security, and scalability.
            </p>
          </div>

          {/* Back Home Button */}
          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3
               bg-zinc-900 text-white font-semibold rounded-full
               border border-zinc-700
               hover:border-yellow-500 hover:text-yellow-500
               hover:scale-105 transition-all duration-300
               shadow-md"
            >
              ← Back to Home
            </Link>
          </div>

        </div>
      </section>
    </PublicLayout>
  );
};

export default About;
