import Image from "next/image";
import PriceTracker from "@/components/PriceTracker";
import CountdownHalving from "@/components/CountdownHalving";
import { Bitcoin } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center space-x-4 mb-10">
          <Bitcoin className="text-blue-600 w-12 h-12" />
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Bitcoin Dashboard
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100/50 p-6">
            <PriceTracker />
          </div>
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100/50 p-6">
            <CountdownHalving />
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500">
          <p>Real-time cryptocurrency insights powered by CoinGecko API</p>
        </div>
      </div>
    </div>
    
  );
}
