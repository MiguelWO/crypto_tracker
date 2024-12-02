"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Crypto {
    id: string;
    name: string;
    symbol: string;
    logo ?: string;
}

interface Price {
    currentPrice: number;
    priceChange: number;
}
const PriceTracker = () => {
    const cryptocurrencies: Crypto[] = [
        { id: "bitcoin", name: "Bitcoin", symbol: "BTC", logo: "/bitcoin_logo.png" },
        { id: "ethereum", name: "Ethereum", symbol: "ETH", logo: "/ethereum_logo.svg" },
        { id: "cardano", name: "Cardano", symbol: "ADA", logo: "/cardano_logo.webp" },
    ];

    const [selectedCrypto, setSelectedCrypto] = useState(cryptocurrencies[0]);
    const [price, setPrice] = useState<Price>({ currentPrice: 0, priceChange: 0 });
    interface HistoricalPrice {
        day: number;
        price: number;
    }

    const [historicalPrices, setHistoricalPrices] = useState<HistoricalPrice[]>([]);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_COIN;
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY_COIN;

    console.log(BASE_URL);
    console.log(API_KEY);

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const responsePrice = await axios.get(`${BASE_URL}/simple/price`, {
                    params: {
                        ids: selectedCrypto.id,
                        vs_currencies: "usd",
                        include_24hr_change : true,
                    },
                    headers: {
                        "x-cg-demo-api-key": API_KEY,
                        "Content-Type": "application/json",
                    },
                });

                const responseHistorical = await axios.get(`${BASE_URL}/coins/${selectedCrypto.id}/market_chart`, {
                    params: {
                        vs_currency: "usd",
                        days: 30,
                    },
                    headers: {
                        "x-cg-demo-api-key": API_KEY,
                        "Content-Type": "application/json",
                    },
                });


                // console.log(responseHistorical.data);    

                setPrice({
                    currentPrice: responsePrice.data[selectedCrypto.id].usd,
                    priceChange: responsePrice.data[selectedCrypto.id].usd_24h_change,
                });

                interface HistoricalPrice {
                    day: number;
                    price: number;
                }

                // console.log(responseHistorical.data.prices);

                const formattedHistoricalPrices: HistoricalPrice[] = responseHistorical.data.prices.map((item: [number, number], index: number) => ({
                    
                    // Convert timestamp date to short date format
                    date: new Date(item[0]).toLocaleDateString("short"),
                    // Format the price 
                    price: parseFloat(item[1].toFixed(2)),
                }));

                setHistoricalPrices(formattedHistoricalPrices);
            } catch (error) {
                console.error('Failed to fetch crypto data:', error);
            }
        };
        fetchCryptoData();
        const interval = setInterval(fetchCryptoData, 60000);

        return () => clearInterval(interval);
        }, [selectedCrypto]);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img 
                        src={selectedCrypto.logo} 
                        alt={`${selectedCrypto.name} logo`} 
                        className="w-10 h-10 rounded-full"
                    />
                    <h2 className="text-xl font-bold text-gray-800">
                        {selectedCrypto.name} Price
                    </h2>
                </div>
                <div className="relative">
                    <select
                        value={selectedCrypto.id}
                        onChange={(e) => {
                            const crypto = cryptocurrencies.find(c => c.id === e.target.value);
                            if (crypto) setSelectedCrypto(crypto);
                        }}
                        className="appearance-none bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 pr-8 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {cryptocurrencies.map(crypto => (
                            <option key={crypto.id} value={crypto.id}>
                                {crypto.symbol}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">
                    ${price.currentPrice.toLocaleString()}
                </span>
                <div className="flex items-center space-x-2">
                    {price.priceChange >= 0 ? (
                        <TrendingUp className="text-green-600" />
                    ) : (
                        <TrendingDown className="text-red-600" />
                    )}
                    <span 
                        className={`font-semibold ${
                            price.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {price.priceChange.toFixed(2)}%
                    </span>
                </div>
            </div>

            <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalPrices}>
                        <XAxis dataKey="date" hide />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={price.priceChange >= 0 ? '#10B981' : '#EF4444'}
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    //     <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg">
    //     {/* Cryptocurrency Selector */}
    //     <div className="relative">
    //       <select
    //         value={selectedCrypto.id}
    //         onChange={(e) => {
    //           const crypto = cryptocurrencies.find(c => c.id === e.target.value);
    //           if (crypto) {
    //             setSelectedCrypto(crypto);
    //           }
    //         }}
    //         className="w-full p-2 border rounded appearance-none pr-8"
    //       >
    //         {cryptocurrencies.map(crypto => (
    //           <option key={crypto.id} value={crypto.id}>
    //             {crypto.name} ({crypto.symbol})
    //           </option>
    //         ))}
    //       </select>
    //       <ChevronDown className="absolute right-3 top-3 text-gray-500" size={20} />
    //     </div>
  
    //     {/* Price Information */}
    //     {price && (
    //       <div className="mt-4">
    //         <div className="flex justify-between items-center">
    //           <h2 className="text-2xl font-bold">
    //             ${price.currentPrice.toLocaleString()}
    //           </h2>
    //           <span 
    //             className={`font-semibold ${
    //               price.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
    //             }`}
    //           >
    //             {price.priceChange.toFixed(2)}%
    //           </span>
    //         </div>
  
    //         {/* Price Chart */}
    //         <div className="h-40 mt-4">
    //           <ResponsiveContainer width="100%" height="100%">
    //             <LineChart data={historicalPrices}>
    //               <XAxis dataKey="date" hide />
    //               <YAxis hide />
    //               <Tooltip />
    //               <Line 
    //                 type="monotone" 
    //                 dataKey="price" 
    //                 stroke={price.priceChange >= 0 ? '#10B981' : '#EF4444'}
    //                 strokeWidth={2}
    //                 dot={false}
    //               />
    //             </LineChart>
    //           </ResponsiveContainer>
    //         </div>
    //       </div>
    //     )}        
    //   </div>
    );
};


export default PriceTracker;