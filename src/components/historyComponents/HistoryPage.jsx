import React, { useRef, useState, useMemo } from "react";

export const HistoryPage = ({ profile, weeklyLogs }) => {
  const [Logs, setWeeklyLogs] = useState(weeklyLogs);
  const [range, setRange] = useState(90);

  const filteredLogs = useMemo(() => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - range);
    cutoffDate.setHours(0, 0, 0, 0);

    return Logs.filter((log) => {
      // FIX: Force midday to avoid timezone shifting the date backwards
      const logDate = new Date(`${log.logDate}T12:00:00`);
      return logDate >= cutoffDate && log.weight >= 0;
    }).sort((a, b) => new Date(a.logDate) - new Date(b.logDate));
  }, [Logs, range]);

  return (
    <div className="flex flex-col bg-cyan-100 shadow-xl rounded-2xl w-full h-full py-6 px-4 sm:px-8 gap-8">
      {/* HISTORY TABLE */}
      <div className="bg-cyan-50 rounded-2xl shadow-lg p-6">
        <h2 className="text-lg font-medium text-gray-700 mb-4">Recent Logs</h2>
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Date</th>
              <th>Weight (kg)</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {/* FIX: Reverse the array to show Newest first, limit to 10 rows */}
            {[...filteredLogs]
              .reverse()
              .slice(0, 10)
              .map((log, i, arr) => {
                // Because we reversed it, the chronologically older log is the NEXT item (i + 1)
                const olderLog = arr[i + 1];
                const diff = olderLog
                  ? (log.weight - olderLog.weight).toFixed(2)
                  : "0.0";
                const color =
                  diff < 0
                    ? "text-green-600"
                    : diff > 0
                      ? "text-red-500"
                      : "text-gray-600";

                return (
                  <tr key={log.logDate} className="border-b last:border-none">
                    <td className="py-2">
                      {new Date(`${log.logDate}T12:00:00`).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      )}
                    </td>
                    <td>{log.weight.toFixed(2)}</td>
                    <td className={color}>
                      {diff === "0.0" ? "—" : diff > 0 ? `+${diff}` : diff}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
