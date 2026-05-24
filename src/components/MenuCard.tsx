import React from 'react';
import { Menu } from '../types';
import { Calendar, Tag, ArrowUpRight, BookOpen, Link as LinkIcon } from 'lucide-react';

interface MenuCardProps {
  menu: Menu;
  onOpenDetail: (menu: Menu) => void;
  onAddToPlanner: (menu: Menu) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ menu, onOpenDetail, onAddToPlanner }) => {
  const formattedDate = menu.dateLastMade
    ? new Date(menu.dateLastMade).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Never cooked yet';

  const hasCustomImage = menu.imageUrls && menu.imageUrls.length > 0 && menu.imageUrls[0] && !menu.imageUrls[0].includes('images.unsplash.com');

  // Stable hashing for beautiful minimalist gradient banner
  const sum = menu.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    'from-[#fdf6e2] to-[#f5e6be] text-[#8a5e1a]', // Amber Sand
    'from-[#eef3f0] to-[#d6e4dc] text-[#3d5e48]', // Sage Grass
    'from-[#f9eff0] to-[#eed0d3] text-[#a4454f]', // Clay Plum
    'from-[#f2f4f8] to-[#d9e2ec] text-[#243b53]', // Soft Slate/Blue
    'from-[#fbf5f2] to-[#f3e1d6] text-[#c05e19]', // Warm Apricot
  ];
  const emojis = ['🍳', '🍲', '🥗', '🍱', '🍜', '🍕', '🍝', '🍛', '🥩', '🥘', '🥙', '🥞'];
  
  const normalized = menu.name.toLowerCase();
  let emoji = emojis[sum % emojis.length];
  if (normalized.includes('mushroom') || normalized.includes('enoki') || normalized.includes('jamur')) emoji = '🍄';
  else if (normalized.includes('chicken') || normalized.includes('ayam')) emoji = '🍗';
  else if (normalized.includes('beef') || normalized.includes('daging') || normalized.includes('bakso')) emoji = '🥩';
  else if (normalized.includes('fish') || normalized.includes('ikan')) emoji = '🐟';
  else if (normalized.includes('rice') || normalized.includes('nasi')) emoji = '🍛';
  else if (normalized.includes('noodle') || normalized.includes('mie') || normalized.includes('ramen')) emoji = '🍜';
  else if (normalized.includes('egg') || normalized.includes('telur')) emoji = '🍳';
  else if (normalized.includes('vegetable') || normalized.includes('sayur') || normalized.includes('salad') || normalized.includes('pakcoy')) emoji = '🥗';
  else if (normalized.includes('drink') || normalized.includes('soup') || normalized.includes('sup')) emoji = '🍲';
  else if (normalized.includes('sweet') || normalized.includes('camilan') || normalized.includes('roti') || normalized.includes('toast') || normalized.includes('pancake')) emoji = '🍞';

  const gradient = gradients[sum % gradients.length];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-earth-sand bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-earth-sage hover:shadow-md">
      {/* Image Thumbnail */}
      {hasCustomImage && (
        <div className="relative aspect-video w-full overflow-hidden bg-earth-sand">
          <img
            src={menu.imageUrls![0]}
            alt={menu.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Category Tag overlay */}
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-1 text-xs font-semibold text-earth-olive shadow-xs">
            <Tag className="h-3 w-3" />
            {menu.category}
          </span>

          {/* Recipe type indicator */}
          <span className="absolute top-3 right-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/90 backdrop-blur-xs text-earth-charcoal shadow-xs">
            {menu.recipeType === 'link' ? (
              <LinkIcon className="h-3.5 w-3.5 text-earth-clay" title="Linked Recipe" />
            ) : (
              <BookOpen className="h-3.5 w-3.5 text-earth-olive" title="Written Recipe" />
            )}
          </span>
        </div>
      )}

      {/* Card Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex-1">
          {/* If there is no image, show category and type inline for a beautiful compact layout */}
          {!hasCustomImage && (
            <div className="flex items-center justify-between mb-3 border-b border-earth-sand/30 pb-2.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-earth-cream px-2 py-0.5 text-[10px] font-bold text-earth-olive border border-earth-sand/60 uppercase tracking-wider">
                <Tag className="h-2.5 w-2.5 text-earth-olive" />
                {menu.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-earth-warm-gray">
                {menu.recipeType === 'link' ? (
                  <>
                    <LinkIcon className="h-3 w-3 text-earth-clay" />
                    <span>Link</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="h-3 w-3 text-earth-olive" />
                    <span>Written</span>
                  </>
                )}
              </span>
            </div>
          )}
          
          <h3 className="font-serif text-lg font-bold leading-snug text-earth-charcoal group-hover:text-earth-olive">
            {menu.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-earth-warm-gray">
            {menu.description || "No description provided."}
          </p>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3.5 border-t border-earth-sand/60 flex flex-col gap-1.5 text-xs text-earth-warm-gray">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5 text-earth-sage" />
              <span>Last made: {formattedDate}</span>
            </span>
            <span className="inline-flex items-center gap-0.5 font-semibold text-earth-clay group-hover:text-earth-clay-dark">
              Ingredients: {menu.ingredients.length}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-earth-warm-gray border-t border-earth-sand/30 pt-1.5">
            <span>Times cooked:</span>
            <span className="font-bold text-earth-olive bg-earth-sage-light/50 px-1.5 py-0.5 rounded-md border border-earth-sand/50">
              {menu.cookCount || 0} times
            </span>
          </div>
        </div>

        {/* Overlay Hover Button Container */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onOpenDetail(menu)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-earth-sand bg-earth-cream hover:bg-earth-sand px-3 py-2 text-xs font-semibold text-earth-olive transition"
            id={`view-detail-${menu.id}`}
          >
            View Details
          </button>
          
          <button
            onClick={() => onAddToPlanner(menu)}
            className="inline-flex items-center justify-center rounded-xl bg-earth-olive hover:bg-earth-olive-light px-3 py-2 text-xs font-semibold text-white transition"
            title="Add to weekly plan"
            id={`quick-add-${menu.id}`}
          >
            + Plan
          </button>
        </div>
      </div>
    </div>
  );
};
