"use client";

interface SearchBarProps {
    onSearch: (search: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    return (
        <div className="mb-4">
            <input
                type="text"
                placeholder="Search services by name or description..."
                className="input input-bordered w-full"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}
