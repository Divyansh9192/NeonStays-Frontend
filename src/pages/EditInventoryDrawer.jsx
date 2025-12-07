// src/pages/EditInventoryDrawer.jsx
import React, { useState, useEffect } from 'react';
import { X, Save, AlertTriangle, Lock, Unlock } from 'lucide-react';
import { Button, Input, cn } from '../components/ui/DesignSystem';
import { updateRoomInventory } from '../api/inventory';

export const EditInventoryDrawer = ({ isOpen, onClose, item, onSave }) => {
  const [formData, setFormData] = useState({
    totalCount: 0,
    surgeFactor: 1.0,
    closed: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (item) {
      setFormData({
        totalCount: item.totalCount,
        surgeFactor: item.surgeFactor,
        closed: item.closed
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  // Calculations for preview
  const available = Math.max(0, formData.totalCount - item.bookedCount - item.reservedCount);
  const projectedPrice = (item.price * formData.surgeFactor).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // API PATCH Call
      const payload = { ...item, ...formData }; // Merging for mock
      await updateRoomInventory(item.id, payload);
      onSave(payload);
    } catch (err) {
      setError("Failed to update inventory. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white z-10">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit Inventory</h2>
            <p className="text-sm text-slate-500">
              {new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Status Toggle Card */}
          <div className={cn(
            "p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer",
            formData.closed 
              ? "border-rose-100 bg-rose-50/50" 
              : "border-emerald-100 bg-emerald-50/50"
          )}
          onClick={() => setFormData(p => ({ ...p, closed: !p.closed }))}
          >
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg", formData.closed ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600")}>
                {formData.closed ? <Lock size={20} /> : <Unlock size={20} />}
              </div>
              <div>
                <p className={cn("font-bold text-sm", formData.closed ? "text-rose-900" : "text-emerald-900")}>
                  {formData.closed ? "Room Closed" : "Room Open"}
                </p>
                <p className="text-xs text-gray-500">
                  {formData.closed ? "Not bookable by guests" : "Available for booking"}
                </p>
              </div>
            </div>
            <div className={cn("w-12 h-6 rounded-full p-1 transition-colors relative", formData.closed ? "bg-rose-500" : "bg-emerald-500")}>
               <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", formData.closed ? "translate-x-6" : "translate-x-0")} />
            </div>
          </div>

          {!formData.closed && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Capacity Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Capacity Management</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Total Inventory" 
                    type="number" 
                    value={formData.totalCount}
                    onChange={(e) => setFormData(prev => ({...prev, totalCount: parseInt(e.target.value) || 0}))}
                    min="0"
                  />
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Remaining</span>
                    <span className={cn("text-xl font-bold", available === 0 ? "text-rose-600" : "text-slate-900")}>
                      {available}
                    </span>
                  </div>
                </div>
                
                {/* Visual Summary */}
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Booked</span>
                    <span className="font-medium text-slate-900">{item.bookedCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reserved (Held)</span>
                    <span className="font-medium text-slate-900">{item.reservedCount}</span>
                  </div>
                  <div className="border-t border-blue-200 my-2 pt-2 flex justify-between font-bold text-slate-900">
                    <span>Adjusted Total</span>
                    <span>{formData.totalCount}</span>
                  </div>
                </div>
              </div>

              {/* Pricing Surge Section */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Pricing Logic</h3>
                <Input 
                  label="Surge Factor (x)" 
                  type="number" 
                  step="0.1"
                  min="1.0"
                  value={formData.surgeFactor}
                  onChange={(e) => setFormData(prev => ({...prev, surgeFactor: parseFloat(e.target.value) || 1.0}))}
                />
                <p className="text-xs text-gray-500">
                  Base Price (${item.price}) × Surge ({formData.surgeFactor}x) = <strong className="text-indigo-600">${projectedPrice}</strong> final price.
                </p>
              </div>

            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-50 text-rose-700 text-sm rounded-lg flex items-center gap-2">
              <AlertTriangle size={16} /> {error}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button variant="primary" className="flex-[2] gap-2" onClick={handleSubmit} loading={isSaving}>
            <Save size={18} /> Update Inventory
          </Button>
        </div>

      </div>
    </div>
  );
};