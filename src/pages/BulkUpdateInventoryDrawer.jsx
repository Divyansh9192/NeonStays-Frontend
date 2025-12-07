import React, { useState } from "react";
import { X } from "lucide-react";
import { Button, Input, cn } from "../components/ui/DesignSystem";
import { updateRoomInventory } from "../api/inventory";
import { useParams } from "react-router-dom";

export const BulkUpdateInventoryDrawer = ({ isOpen, onClose, onSave }) => {
  const { roomId } = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [surgeFactor, setSurgeFactor] = useState(1);
  const [closed, setClosed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      startDate,
      endDate,
      surgeFactor,
      closed,
    };

    try {
      await onSave(payload); 
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-end z-50">
      <div className="w-full max-w-md bg-white h-full p-6 overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Bulk Update Inventory</h2>
          <button onClick={onClose}>
            <X size={22} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Date Range */}
        <div className="space-y-4 mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase">DATE RANGE</p>

          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Room Open / Closed Toggle */}
        <div className="mb-8 p-4 rounded-xl border border-gray-200 flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900">{closed ? "Room Closed" : "Room Open"}</p>
            <p className="text-sm text-gray-500">
              {closed ? "Not available for booking" : "Available for booking"}
            </p>
          </div>

          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={!closed}
              onChange={() => setClosed(!closed)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-all"></div>
          </label>
        </div>

        {/* Pricing Logic */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">SURGE FACTOR (X)</p>
          <Input
            type="number"
            step="0.1"
            value={surgeFactor}
            onChange={(e) => setSurgeFactor(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between mt-10">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>

          <Button
            variant="primary"
            loading={loading}
            onClick={handleSubmit}
          >
            Update Inventory
          </Button>
        </div>
      </div>
    </div>
  );
};
