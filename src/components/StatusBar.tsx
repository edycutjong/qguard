"use client";

import { useState, useEffect } from "react";

export function StatusBar() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(12);

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
      setLatency(Math.floor(8 + Math.random() * 8));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between glass rounded-lg px-4 py-2 text-xs font-mono mx-6 mt-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="relative">
            <span className="w-2 h-2 rounded-full bg-success inline-block" />
            <span className="w-2 h-2 rounded-full bg-success absolute inset-0 animate-ping opacity-40" />
          </span>
          <span className="text-slate-400">QVAC RUNTIME ACTIVE</span>
        </div>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">v1.0.0</span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">NODE: <span className="text-primary">LOCAL-0x01</span></span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-500">LATENCY: <span className="text-primary">{latency}ms</span></span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">GPU: <span className="text-success">VULKAN</span></span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">{time}</span>
      </div>
    </div>
  );
}
