import { Check, X } from "lucide-react";

const FeatureComparison = ({ features = [] }) => {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <div className="border-b border-gray-200 p-6 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Compare Plans
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Everything included in each plan.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                Feature
              </th>

              <th className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                Free
              </th>

              <th className="px-6 py-4 text-center font-semibold text-amber-500">
                Premium
              </th>
            </tr>
          </thead>

          <tbody>
            {features.map((feature, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-800"
              >
                <td className="px-6 py-4 font-medium text-gray-700 dark:text-gray-200">
                  {feature.name}
                </td>

                <td className="px-6 py-4 text-center">
                  {feature.free ? (
                    typeof feature.free === "boolean" ? (
                      <Check
                        className="mx-auto text-green-500"
                        size={20}
                      />
                    ) : (
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {feature.free}
                      </span>
                    )
                  ) : (
                    <X
                      className="mx-auto text-red-500"
                      size={20}
                    />
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  {feature.premium ? (
                    typeof feature.premium === "boolean" ? (
                      <Check
                        className="mx-auto text-green-500"
                        size={20}
                      />
                    ) : (
                      <span className="font-semibold text-amber-500">
                        {feature.premium}
                      </span>
                    )
                  ) : (
                    <X
                      className="mx-auto text-red-500"
                      size={20}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeatureComparison;