// src/pages/InventoryManager.jsx
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Search,
  Filter,
  Edit3,
  TrendingUp,
} from "lucide-react";
import { Card, Badge, Button, cn } from "../components/ui/DesignSystem";
// ❌ OLD (single-day drawer)
// import { EditInventoryDrawer } from "./EditInventoryDrawer";
// ✅ NEW: bulk drawer
import { BulkUpdateInventoryDrawer } from "./BulkUpdateInventoryDrawer"; // 🆕 ADDED
import { getRoomInventory, updateRoomInventory } from "../api/inventory"; // 🆕 UPDATED
import { useParams } from "react-router-dom";

export default function InventoryManager() {
  const { roomId } = useParams();

  // State
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  // ❌ OLD: single selectedItem for per-day edit
  // const [selectedItem, setSelectedItem] = useState(null);
  // ✅ NEW: simple boolean for bulk drawer open/close
  const [isBulkOpen, setIsBulkOpen] = useState(false); // 🆕 ADDED
  const [searchDate, setSearchDate] = useState("");

  // ✅ UPDATED: refetch when roomId changes
  useEffect(() => {
    if (roomId) {
      loadData();
    }
  }, [roomId]); // 🆕 CHANGED (was [])

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getRoomInventory(roomId); // 🆕 CHANGED
      setInventory(res.data);                          // 🆕 CHANGED
    } catch (err) {
      console.error("Failed to load", err);
    } finally {
      setLoading(false);
    }
  };

  // Logic to determine row status
  const getStatus = (item) => {
    if (item.closed) return "closed";
    const available = item.totalCount - item.bookedCount - item.reservedCount;
    if (available <= 0) return "soldout";
    return "available";
  };

  // Filter Logic
  const filteredInventory = inventory.filter((item) =>
    item.date.includes(searchDate)
  );

  return (
    <div className="min-h-screen bg-neutral-200 p-8 font-sans text-slate-900">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <span>Admin</span>
              <span>/</span>
              <span>Inventory</span>
              <span>/</span>
              <span className="text-indigo-600 font-medium">
                Deluxe Ocean Suite
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Room Inventory
            </h1>
            <p className="text-slate-500 mt-1">
              Manage availability, pricing surge, and maintenance blocks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2">
              <Calendar size={16} /> Sync Calendar
            </Button>

            {/* ✅ UPDATED: Bulk Update now opens drawer */}
            <Button
              variant="primary"
              className="gap-2"
              onClick={() => setIsBulkOpen(true)} // 🆕 ADDED
            >
              <Filter size={16} /> Bulk Update
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {/* Filters & Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4 flex items-center gap-4 border-l-4 border-l-indigo-500">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">
                Avg. Rate
              </p>
              <p className="text-xl font-bold">$185.00</p>
            </div>
          </Card>

          <div className="md:col-span-3 flex items-center justify-end">
            <div className="relative w-full md:w-64 group">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all shadow-sm"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Data Table / List */}
        <Card className="overflow-hidden border-0 shadow-lg ring-1 ring-black/5">
          {loading ? (
            <div className="p-12 text-center text-gray-400">
              Loading inventory data...
            </div>
          ) : filteredInventory.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <Calendar size={32} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                No dates found
              </h3>
              <p className="text-slate-500 max-w-sm mt-2">
                Try adjusting your date filters to see availability.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price / Surge
                    </th>
                    {/* ❌ Action column is now view-only; keep or remove */}
                    <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredInventory.map((item) => {
                    const status = getStatus(item);
                    const available =
                      item.totalCount - item.bookedCount - item.reservedCount;

                    return (
                      <tr
                        key={item.id}
                        className="group hover:bg-gray-50/80 transition-colors"
                      >
                        <td className="py-4 px-6">
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                              {new Date(item.date).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                              })}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(item.date).toLocaleDateString("en-US", {
                                weekday: "long",
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge status={status}>
                            {status === "soldout" ? "Sold Out" : status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  status === "closed"
                                    ? "bg-gray-300"
                                    : "bg-indigo-500"
                                )}
                                style={{
                                  width: `${
                                    (item.bookedCount / item.totalCount) * 100
                                  }%`,
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-700">
                              {status === "closed" ? "-" : `${available} left`}
                            </span>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {item.bookedCount} booked • {item.reservedCount} rsrv
                            • {item.totalCount} total
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">
                              ₹{item.price}
                            </span>
                            {item.surgeFactor > 1 && (
                              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-1.5 rounded">
                                {item.surgeFactor}x Surge
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {/* ❌ Per-day Edit removed – bulk only now */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* ✅ NEW: Bulk Update Drawer (PATCH interface) */}
      <BulkUpdateInventoryDrawer
        isOpen={isBulkOpen}
        onClose={() => setIsBulkOpen(false)}
        onSave={async (payload) => {
          // payload matches UpdateInventoryRequestDTO
          await updateRoomInventory(roomId, payload); // 🆕 PATCH WHOLE INVENTORY
          await loadData();                           // 🆕 REFRESH LIST
        }}
      />
    </div>
  );
}
