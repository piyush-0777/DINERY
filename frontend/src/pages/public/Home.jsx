import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Utensils, ShoppingCart, Users } from "lucide-react";
import PublicLayout from "../../layouts/PublicLayout";
import { useNavigate } from "react-router-dom";


const PublicHome = () => {
  const navigate = useNavigate()
  return (
    <PublicLayout>
      <div className=" select-none min-h-screen bg-black text-white font-sans">
        {/* HERO SECTION */}
        <section className="relative h-screen overflow-hidden">
          <img
            src="/images/restaurant-hero.jfif"
            alt="Dinery Restaurant"
            className="absolute inset-0  h-full w-full object-cover opacity-40 scale-105 transition-transform duration-700 hover:scale-110"
          />
          <div className="relative z-10 mx-auto max-w-7xl px-6 py-32">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight"
            >
              Dinery POS System
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-2xl text-lg text-gray-300"
            >
              A modern, fast, and powerful restaurant POS system built for owners
              and customers. Real-time orders, live notifications, and sleek UI.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex gap-4"
            >
              <Button 
              onClick={e =>navigate('/login')}
              className="rounded-2xl px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">Login</Button>
              <Button
                onClick={e => navigate('/register')}
                variant="outline"
                className="rounded-2xl px-8 py-6 text-lg border-white text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
              >
                Register Restaurant
              </Button>
            </motion.div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center"
          >
            Why Choose Dinery?
          </motion.h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[{
              icon: <ShoppingCart size={40} />,
              title: "Live Orders",
              desc: "Customers place orders instantly with real-time updates via Socket.io.",
            }, {
              icon: <Users size={40} />,
              title: "Owner Dashboard",
              desc: "Manage menu, tables, staff, and orders from one powerful panel.",
            }, {
              icon: <Utensils size={40} />,
              title: "Modern Menu",
              desc: "Beautiful digital menu with images, pricing, and instant ordering.",
            }].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-2xl">
                  <CardContent className="p-8">
                    <div className="mb-4 text-primary">{item.icon}</div>
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-gray-400">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* IMAGE + TEXT SECTION */}
        <section className="mx-auto max-w-7xl px-6 py-24 grid gap-16 md:grid-cols-2 items-center">
          <motion.img
            src="/images/restaurant-hero.jfif"
            alt="Dashboard Preview"
            className="rounded-3xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold">Built for Speed & Scale</h3>
            <p className="mt-6 text-gray-300 text-lg">
              Dinery is designed with modern restaurants in mind. Whether you run
              a cafe or a large restaurant, Dinery grows with you.
            </p>
            <Button 
            onClick={e=>navigate('/about')}
            className="mt-8 rounded-2xl px-8 py-6 text-lg">
              Explore Features
            </Button>
          </motion.div>
        </section>

        {/* FOOTER */}

      </div>
    </PublicLayout>
  );
}

export default PublicHome;
