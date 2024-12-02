"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, CopyCheck } from 'lucide-react';

const CountdownHalving = () => {
    // Bitcoin Halving Details
    const LAST_HALVING_DATE = new Date('2024-04-19');
    const BLOCK_INTERVAL = 10 * 60 * 1000; // 10 minutes in milliseconds
    const BLOCK_PER_HALVING = 210000;
    const HALVING_INTERVAL = 210000 * 10 * 60 * 1000; // Approximately every 4 years
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      });

    const [blockHeight, setBlockHeight] = useState(0);
    const [nextHalvingBlockHeight, setNextHalvingBlockHeight] = useState(0);

    // Fetch Bitcoin Block Height
    useEffect(() => {
        const fetchBlockHeight = async () => {
            try {
                const response = await axios.get('https://blockchain.info/q/getblockcount');
                if (response.status !== 200) {
                    console.error('Failed to fetch block height');
                    return;
                }

                const blockHeight = response.data;
                setBlockHeight(blockHeight);

                const halvingsSoFar = Math.floor(blockHeight / BLOCK_PER_HALVING);
                const nextHalvingBlockHeight = (halvingsSoFar + 1) * BLOCK_PER_HALVING;
                setNextHalvingBlockHeight(nextHalvingBlockHeight);

                console.log('Block Height:', blockHeight);
            } catch (error) {
            console.error('Failed to fetch block height:', error);
                }
            };

        fetchBlockHeight();
        const blockHeightInterval = setInterval(fetchBlockHeight, 60000);

        return () => clearInterval(blockHeightInterval);
    }
    , []);

    // Halving Countdown
    useEffect(() => {
        if (blockHeight === 0) return;

        const calculateHalvingCountdown = () => {           
            const blocksUntilHalving = nextHalvingBlockHeight - blockHeight;
            const timeUntilHalving = blocksUntilHalving * BLOCK_INTERVAL;
            const nextHalvingDate = new Date(Date.now() + timeUntilHalving);

            return nextHalvingDate;
        };

        const nextHalvingDate = calculateHalvingCountdown();

        const updateCountdown = () => {
            const now = new Date();
            const timeDifference = nextHalvingDate.getTime() - now.getTime();

            if (timeDifference <= 0) {
                setCountdown({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
                return;
            }

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setCountdown({
                days,
                hours,
                minutes,
                seconds
            });
        }

        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000);

        return () => clearInterval(countdownInterval);
    }, [blockHeight, nextHalvingBlockHeight]);

    return (
        // <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
        //     { blockHeight === 0 && <div>Loading...</div> }
        //     <h3 className="text-lg font-semibold mb-2">Next Bitcoin Halving In</h3>
        //     <div className="flex justify-center space-x-4">
        //         {Object.entries(countdown).map(([unit, value]) => (
        //             <div key={unit} className="text-center">
        //                 <div className="text-2xl font-bold">{value}</div>
        //                     <div className="text-xs uppercase">{unit}</div>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Clock className="text-blue-600 w-8 h-8" />
                    <h2 className="text-xl font-bold text-gray-800">
                        Bitcoin Halving Countdown
                    </h2>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-1 text-blue-800">
                    <CopyCheck className="w-4 h-4" />
                    <span className="text-sm">Block: {blockHeight}</span>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {Object.entries(countdown).map(([unit, value]) => (
                    <div 
                        key={unit} 
                        className="bg-white border border-blue-100 rounded-xl p-4 text-center shadow-sm"
                    >
                        <div className="text-3xl font-bold text-blue-600">
                            {value.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase text-gray-500 mt-1">
                            {unit}
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center text-sm text-gray-500 mt-4">
                Estimated Next Halving Block: {nextHalvingBlockHeight}
            </div>
        </div>
    );
};


export default CountdownHalving;