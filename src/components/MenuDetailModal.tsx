import React, { useState } from 'react';
import { Menu } from '../types';
import { X, Calendar, Tag, FileText, Link as LinkIcon, Edit2, Trash2, CheckCircle2, Info, RefreshCw } from 'lucide-react';
import { useLibrary } from '../contexts/LibraryContext';

interface MenuDetailModalProps {
  menu: Menu;
  onClose: () => void;
  onEdit: (menu: Menu) => void;
  onDelete: (id: string) => void;
  onAddToPlanner: (menu: Menu) => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({
  menu: originalMenu,
  onClose,
  onEdit,
  onDelete,
  onAddToPlanner,
}) => {
  const { menus, updateMenu } = useLibrary();
  const menu = menus.find(m => m.id === originalMenu.id) || originalMenu;

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const hasCustomImage = menu.imageUrls && menu.imageUrls.length > 0 && menu.imageUrls[0] && !menu.imageUrls[0].includes('images.unsplash.com');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl overflow-hidden my-8" id="menu-detail-panel">
        {/* Header Image banner */}
        {hasCustomImage ? (
          /* Header Image banner */
          <div className="relative h-64 sm:h-80 bg-earth-sand">
            <img
              src={menu.imageUrls![0]}
              alt={menu.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
              id="close-detail-modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Title overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-earth-olive px-2.5 py-0.5 text-xs font-semibold text-white">
                  <Tag className="h-3 w-3" />
                  {menu.category}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-earth-clay px-2.5 py-0.5 text-xs font-semibold text-white">
                  {menu.recipeType === 'link' ? 'Hyperlink Recipe' : 'Written Recipe'}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3.5xl font-bold tracking-tight leading-tight">
                {menu.name}
              </h2>
              {menu.description && (
                <p className="mt-2 text-sm text-white/90 line-clamp-2 max-w-xl font-light">
                  {menu.description}
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Text Header banner when NO image is added */
          <div className="relative bg-earth-cream border-b border-earth-sand px-6 sm:px-8 py-7">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-earth-sand bg-white text-earth-charcoal hover:bg-earth-sand transition"
              id="close-detail-modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header elements */}
            <div className="pr-12">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-earth-sage-light text-earth-olive px-2.5 py-0.5 text-xs font-bold border border-earth-sand">
                  <Tag className="h-3 w-3" />
                  {menu.category}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-earth-sand/45 text-earth-clay px-2.5 py-0.5 text-xs font-bold border border-earth-sand/65">
                  {menu.recipeType === 'link' ? 'Hyperlink Recipe' : 'Written Recipe'}
                </span>
              </div>
              <h2 className="font-serif text-2.5xl sm:text-3.5xl font-bold tracking-tight leading-tight text-earth-olive">
                {menu.name}
              </h2>
              {menu.description && (
                <p className="mt-2 text-sm text-earth-warm-gray max-w-2xl leading-relaxed">
                  {menu.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[calc(100vh-22rem)] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Ingredients Left Column (2/5 size) */}
            <div className="md:col-span-2 space-y-5">
              <div className="rounded-2xl bg-earth-cream p-5 border border-earth-sand">
                <h3 className="font-serif text-lg font-bold text-earth-olive mb-4 flex items-center gap-2 border-b border-earth-sand pb-2">
                  <span>Ingredients</span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-earth-sage text-white text-[11px] font-bold">
                    {menu.ingredients.length}
                  </span>
                </h3>
                {menu.ingredients.length === 0 ? (
                  <p className="text-sm text-earth-warm-gray italic">No ingredients specified.</p>
                ) : (
                  <ul className="space-y-2.5">
                    {menu.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex justify-between text-sm py-1 border-b border-earth-sand/40 last:border-0">
                        <span className="font-medium text-earth-charcoal">{ing.name}</span>
                        <span className="text-earth-clay font-semibold shrink-0">
                          {ing.quantity !== null && `${ing.quantity} `}
                          {ing.unit}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Quick statistics/dates */}
              <div className="rounded-2xl bg-white p-4 border border-earth-sand space-y-3 text-xs text-earth-warm-gray">
                <div className="flex items-center justify-between gap-2 border-b border-earth-sand/50 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-earth-olive" />
                    <span>
                      Last cooked:{' '}
                      <strong className="text-earth-charcoal font-semibold">
                        {menu.dateLastMade
                          ? new Date(menu.dateLastMade).toLocaleDateString(undefined, {
                              weekday: 'short',
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })
                          : 'Never cooked yet'}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-earth-charcoal">Times cooked:</span>
                    <span className="inline-flex h-5 items-center justify-center rounded-md bg-earth-sage-light/60 px-2 py-0.5 text-xs font-extrabold text-earth-olive border border-earth-sand">
                      {menu.cookCount || 0}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      updateMenu(menu.id, {
                        cookCount: (menu.cookCount || 0) + 1,
                        dateLastMade: new Date().toISOString().split('T')[0]
                      });
                    }}
                    className="inline-flex gap-1 items-center justify-center rounded-lg bg-earth-olive hover:bg-earth-olive-light text-white font-bold text-[11px] px-2.5 py-1.5 transition active:scale-95 duration-150 cursor-pointer"
                  >
                    <span>🍳 Mark as Cooked</span>
                  </button>
                </div>
                {menu.notes && (
                  <div className="pt-2 border-t border-earth-sand/60">
                    <div className="flex items-center gap-1.5 font-bold text-earth-charcoal text-xs mb-1">
                      <Info className="h-3.5 w-3.5 text-earth-clay" />
                      <span>Chef’s Personal Notes</span>
                    </div>
                    <p className="italic leading-relaxed text-earth-warm-gray whitespace-pre-line">
                      "{menu.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Recipe Instructions Right Column (3/5 size) */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-earth-charcoal mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-earth-olive" />
                  Recipe Guide
                </h3>

                {menu.recipeType === 'link' ? (
                  <div className="rounded-2xl border border-dashed border-earth-sage bg-earth-sage-light/45 p-6 text-center space-y-4">
                    <LinkIcon className="h-10 w-10 text-earth-clay mx-auto" />
                    <div className="space-y-2">
                      <h4 className="font-serif font-bold text-lg text-earth-olive">External Link Attached</h4>
                      <p className="text-sm text-earth-warm-gray max-w-sm mx-auto">
                        This recipe guidelines and precise methods are stored on an external website.
                      </p>
                    </div>
                    <a
                      href={menu.recipeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-earth-olive hover:bg-earth-olive-light px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition"
                    >
                      <span>Web Cooking Link</span>
                      <X className="h-4 w-4 rotate-45" />
                    </a>
                  </div>
                ) : (
                  <div className="rounded-2xl bg-white border border-earth-sand p-5 sm:p-6 shadow-xs">
                    {menu.recipeText ? (
                      <p className="text-earth-charcoal text-sm leading-relaxed whitespace-pre-line">
                        {menu.recipeText}
                      </p>
                    ) : (
                      <p className="text-earth-warm-gray text-sm italic">
                        No recipe text has been written down yet for this dish. Take a moment to add some guidelines!
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Panel Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-earth-sand bg-earth-sand/30 px-6 py-4">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(menu)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-earth-sand bg-white hover:bg-earth-sand px-4.5 py-2.5 text-sm font-semibold text-earth-olive transition"
              id="edit-menu"
            >
              <Edit2 className="h-4 w-4" />
              <span>Edit Dish</span>
            </button>
            {isConfirmingDelete ? (
              <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl p-1 px-2 animate-fade-in shrink-0">
                <span className="text-xs font-semibold text-red-800">Delete this entry?</span>
                <button
                  onClick={() => {
                    onDelete(menu.id);
                    onClose();
                  }}
                  className="rounded-lg bg-red-600 hover:bg-red-700 font-bold text-xs text-white px-3 py-1.5 transition"
                  id="confirm-delete-menu-btn"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setIsConfirmingDelete(false)}
                  className="rounded-lg bg-white border border-earth-sand text-xs font-semibold text-earth-charcoal px-3 py-1.5 transition hover:bg-earth-sand"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsConfirmingDelete(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white hover:bg-red-50 px-4.5 py-2.5 text-sm font-semibold text-red-700 transition"
                id="delete-menu"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            )}
          </div>

          <button
            onClick={() => {
              onAddToPlanner(menu);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-earth-clay hover:bg-earth-clay-dark px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition"
            id="add-to-planner-btn"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Add to Meal Plan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
