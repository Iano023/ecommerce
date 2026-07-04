import { Store } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-surface-900">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center animate-pulse">
          <Store className="w-8 h-8 text-brand-400" />
        </div>
      </div>
      <div className="w-6 h-6 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      <div className="sr-only">Loading</div>
    </div>
  );
};

export default LoadingSpinner;
