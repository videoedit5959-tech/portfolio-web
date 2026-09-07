import React, { useState } from 'react';
import { ServiceData } from '../../../types/portfolio';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { IconRenderer } from '../../common/IconRenderer';

interface AdminServicesTabProps {
  services: ServiceData[];
  onSaveService: (service: ServiceData) => void;
  onDeleteService: (id: string) => void;
}

export const AdminServicesTab: React.FC<AdminServicesTabProps> = ({
  services,
  onSaveService,
  onDeleteService,
}) => {
  const [editingService, setEditingService] = useState<ServiceData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<ServiceData>>({});
  const [highlightsInput, setHighlightsInput] = useState('');

  const openCreate = () => {
    setIsCreating(true);
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      iconName: 'Layers',
      displayOrder: services.length + 1,
      isActive: true,
      highlights: [],
    });
    setHighlightsInput('');
  };

  const openEdit = (service: ServiceData) => {
    setIsCreating(false);
    setEditingService(service);
    setFormData({ ...service });
    setHighlightsInput(service.highlights?.join('\n') || '');
  };

  const closeForm = () => {
    setIsCreating(false);
    setEditingService(null);
    setFormData({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const parsedHighlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const toSave: ServiceData = {
      id: editingService ? editingService.id : `srv-${Date.now()}`,
      title: formData.title || '',
      description: formData.description || '',
      iconName: formData.iconName || 'Layers',
      displayOrder: Number(formData.displayOrder) || 1,
      isActive: formData.isActive !== undefined ? formData.isActive : true,
      highlights: parsedHighlights,
    };

    onSaveService(toSave);
    closeForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Services Management
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Offerings shown on the public website with icons, summaries, and value points.
          </p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                  <IconRenderer name={srv.iconName} className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  #{srv.displayOrder}
                </span>
              </div>

              <h3 className="font-bold text-base text-zinc-900 dark:text-white mb-1">
                {srv.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className={`text-[11px] font-mono ${srv.isActive ? 'text-emerald-500' : 'text-zinc-400'}`}>
                {srv.isActive ? 'Active' : 'Draft'}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEdit(srv)}
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDeleteService(srv.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {(isCreating || editingService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {isCreating ? 'Add Professional Service' : `Edit: ${editingService?.title}`}
              </h3>
              <button onClick={closeForm} className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm text-zinc-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Lucide Icon Name
                  </label>
                  <input
                    type="text"
                    value={formData.iconName || 'Layers'}
                    onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder || 1}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Bullet Highlights (one per line)
                </label>
                <textarea
                  rows={3}
                  value={highlightsInput}
                  onChange={(e) => setHighlightsInput(e.target.value)}
                  placeholder="Feature point 1&#10;Feature point 2"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="srv-active"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded text-cyan-500"
                />
                <label htmlFor="srv-active" className="text-zinc-700 dark:text-zinc-300 font-medium">
                  Active and visible on public website
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-xs"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
