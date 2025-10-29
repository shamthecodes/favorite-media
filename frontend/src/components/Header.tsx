import React from "react";
import { Button } from "@/components/ui/button";

export default function Header({ onAdd }: { onAdd?: () => void }) {
  return (
    <header className="border-b bg-card text-card-foreground shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <div className="bg-accent rounded-md text-white font-bold px-3 py-2 bg-red-400">
            FM
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            Favorite Movies & TV Shows
          </h1>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
    </header>
  );
}
