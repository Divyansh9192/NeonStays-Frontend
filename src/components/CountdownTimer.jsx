import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function normalizeStart(startTime) {
  if (!startTime) return null;

  // If numeric timestamp
  if (typeof startTime === "number") return startTime;

  // If backend returned microseconds (6 digits)
  if (startTime.includes(".")) {
    const [datePart, micro] = startTime.split(".");
    const ms = micro.substring(0, 3); // convert micro → milli
    return Date.parse(`${datePart}.${ms}Z`);
  }

  // Otherwise assume ISO without timezone
  return Date.parse(startTime + "Z");
}

export default function CountdownTimer({ startTime }) {
  const [now, setNow] = useState(Date.now());

  const start = normalizeStart(startTime);

  if (!start)
    return (
      <div className="text-white text-xs w-[40px] opacity-60">--:--</div>
    );

  const end = start + 10 * 60 * 1000;

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const phase =
    now < start ? "before" : now >= start && now < end ? "running" : "expired";

  const remaining = phase === "running" ? end - now : 0;

  const seconds = Math.floor((remaining / 1000) % 60);
  const minutes = Math.floor((remaining / 1000 / 60) % 60);

  const format = (n) => (n < 10 ? "0" + n : n);

  return (
    <div className="w-[40px] flex justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold text-[#dff8ff]"
      >
        {phase === "before" && "10:00"}
        {phase === "running" && `${format(minutes)}:${format(seconds)}`}
        {phase === "expired" && "00:00"}
      </motion.div>
    </div>
  );
}
