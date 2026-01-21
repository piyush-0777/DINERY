import PublicLayout from "../../layouts/PublicLayout";

const About = () => {
  return (
    <PublicLayout>
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="font-heading text-4xl mb-6">
          About Dinery
        </h2>

        <p className="text-gray-400 leading-relaxed">
          Dinery is a real-time restaurant POS platform built
          for owners and customers. Orders flow instantly
          from table to kitchen with live socket updates.
        </p>
      </section>
    </PublicLayout>
  );
};

export default About;
