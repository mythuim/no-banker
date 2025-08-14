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
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(27,22,18,0.8)" }}
        onClick={closeModal}
        aria-hidden="true"
      />

      <div
        className="relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-4 shadow-lg"
        style={{
          backgroundColor: "var(--color-mocha)",
          color: "var(--color-taupe)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-lg font-semibold text-white">
            Select Item
          </h2>
          <button
            onClick={closeModal}
            className="text-taupe hover:text-kharid"
            aria-label="Sluiten"
            style={{ color: "var(--color-taupe)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-kharid)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-taupe)")
            }
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
          className="w-full rounded-md px-3 py-2 mb-3 border"
          style={{
            backgroundColor: "var(--color-cacao)",
            borderColor: "var(--color-sable)",
            color: "var(--color-white)",
          }}
        />

        {loading ? (
          <p className="text-sm" style={{ color: "var(--color-taupe)" }}>
            Loading…
          </p>
        ) : query.trim().length < 3 ? (
          <p className="text-sm" style={{ color: "var(--color-taupe)" }}>
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
                  style={{
                    ...style,
                    backgroundColor: "var(--color-mocha)",
                    color: "var(--color-white)",
                  }}
                  key={it.id}
                  className="flex items-center gap-3 px-1 rounded-md cursor-pointer"
                  onClick={() => selectItem(it)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--color-sable)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--color-mocha)")
                  }
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
          <p className="text-sm" style={{ color: "var(--color-taupe)" }}>
            Can't find the item.
          </p>
        )}

        <div className="mt-4 flex justify-between">
          {currentItem && (
            <button
              onClick={clearItem}
              className="px-4 py-2 rounded-md text-sm"
              style={{
                backgroundColor: "#b94b4b",
                color: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#c75a5a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#b94b4b")
              }
            >
              Clear
            </button>
          )}
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-md text-sm ml-auto"
            style={{
              backgroundColor: "var(--color-cacao)",
              color: "var(--color-white)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-sable)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--color-cacao)")
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
