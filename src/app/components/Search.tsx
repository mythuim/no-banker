"use client";

import { Item } from "../types";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";

interface SearchProps {
  activeIndex: number | null;
  query: string;
  setQuery: (q: string) => void;
  loading: boolean;
  filtered: Item[];
  closeModal: () => void;
  selectItem: (item: Item) => void;
  clearItem: () => void;
  currentItem: Item | null;
}

export default function Search({
  activeIndex,
  query,
  setQuery,
  loading,
  filtered,
  closeModal,
  selectItem,
  clearItem,
  currentItem,
}: SearchProps) {
  if (activeIndex === null) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={closeModal}
        aria-hidden="true"
      />

      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold">
            Slot {activeIndex + 1}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          autoFocus
          className="w-full border rounded-md px-3 py-2 mb-3"
        />

        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : query.trim().length < 3 ? (
          <p className="text-sm text-gray-500">
            Enter a minimum of three characters.
          </p>
        ) : filtered.length ? (
          <List
            height={300}
            itemCount={filtered.length}
            itemSize={40}
            width="100%"
          >
            {({ index, style }: ListChildComponentProps) => {
              const it = filtered[index];
              return (
                <div
                  style={style}
                  key={it.id}
                  className="flex items-center gap-3 px-1 hover:bg-gray-50 rounded-md cursor-pointer"
                  onClick={() => selectItem(it)}
                >
                  <img
                    src={it.icon}
                    alt={it.name}
                    className="w-10 h-auto shrink-0"
                  />
                  <span className="text-sm">{it.name}</span>
                </div>
              );
            }}
          </List>
        ) : (
          <p className="text-sm text-gray-500">Can't find the item.</p>
        )}

        <div className="mt-4 flex justify-between">
          {currentItem && (
            <button
              onClick={clearItem}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 text-sm"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm ml-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
