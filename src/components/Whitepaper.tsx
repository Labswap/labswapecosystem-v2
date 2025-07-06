import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const Whitepaper = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0x15d46b30207991425dca153d91eecaa746d57eb1";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokenomics = [
    { label: "Merge", percentage: 25, amount: "1,230,000,000", color: "bg-blue-500", fillColor: "fill-blue-500" },
    { label: "Liquidity", percentage: 25, amount: "1,230,000,000", color: "bg-purple-500", fillColor: "fill-purple-500" },
    { label: "Block Algorithm", percentage: 20, amount: "980,000,000", color: "bg-green-500", fillColor: "fill-green-500" },
    { label: "Exchanges listing", percentage: 20, amount: "980,000,000", color: "bg-yellow-500", fillColor: "fill-yellow-500" },
    { label: "Marketing", percentage: 10, amount: "492,000,000", color: "bg-red-500", fillColor: "fill-red-500" }
  ];

  return (
    <section id="whitepaper" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Whitepaper
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Token Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <img 
                src="/loder.png" 
                alt="Blue Flask V2 Logo" 
                className="h-16 w-16"
              />
              <div>
                <h3 className="text-2xl font-bold text-white">Blue Flask V2</h3>
                <p className="text-blue-400">$FLASK</p>
              </div>
            </div>

            {/* Contract Address */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">Contract Address:</p>
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={copyToClipboard}
              >
                <code className="text-blue-400 font-mono text-sm break-all">
                  {contractAddress}
                </code>
                {copied ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <Copy size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                )}
              </div>
              {copied && <p className="text-green-400 text-xs mt-1">Copied!</p>}
            </div>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p>
                Blue Flask V2 is a decentralized finance (DeFi) token that operates on the Binance Chain (BEP-20). 
                We've merged LAB and Blue Flask into a new single token called '$FLASK Labswap Ecosystem' to facilitate 
                better integration within the Labswap ecosystem.
              </p>
              <p>
                Our staking and other DeFi features will enhance the demand and reduce the supply, while also fostering 
                value growth through staking and NFTs. Through our yield farm, you will be able to maximize the benefits from your $FLASK.
              </p>
            </div>

            {/* Token Details */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h4 className="text-xl font-semibold text-white mb-4">Token Details</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Token name:</span>
                  <span className="text-blue-400">Blue Flask V2</span>
                </div>
                <div className="flex justify-between">
                  <span>Token symbol:</span>
                  <span className="text-blue-400">FLASK</span>
                </div>
                <div className="flex justify-between">
                  <span>Initial supply:</span>
                  <span className="text-blue-400">4,920,000,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span className="text-blue-400">BNB Chain [BSC]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tokenomics Chart */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h4 className="text-xl font-semibold text-white mb-6 text-center">Token Distribution</h4>
            
            {/* Pie Chart Representation */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {tokenomics.map((item, index) => {
                  const startAngle = tokenomics.slice(0, index).reduce((sum, prev) => sum + (prev.percentage * 3.6), 0);
                  const endAngle = startAngle + (item.percentage * 3.6);
                  const largeArcFlag = item.percentage > 50 ? 1 : 0;
                  
                  const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                  
                  return (
                    <path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      className={`${item.fillColor} opacity-80 hover:opacity-100 transition-opacity`}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {tokenomics.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-gray-300">{item.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{item.percentage}%</div>
                    <div className="text-gray-400 text-sm">{item.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whitepaper;