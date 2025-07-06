import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const About = () => {
  const [copied, setCopied] = useState(false);
  const contractAddress = "0x15d46b30207991425dca153d91eecaa746d57eb1";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      title: "Decentralized Exchange (DEX)",
      description: "Secure and efficient trading of digital assets."
    },
    {
      title: "Automated Market Maker (AMM)",
      description: "Providing liquidity through smart contracts."
    },
    {
      title: "Staking and Yield Farming",
      description: "Opportunities for users to earn rewards by staking and providing liquidity."
    },
    {
      title: "NFT Collection",
      description: "Unique hand-drawn NFTs with membership benefits, including voting rights and token airdrops."
    },
    {
      title: "Marketing Solutions",
      description: "Tailored services for decentralized projects, including CMC & CG listing, influencer marketing, press releases, and community management."
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Labswap Ecosystem
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Labswap Ecosystem: decentralized exchange and automated market maker (AMM) system on the BNB Chain. 
              Our ecosystem is designed to offer staking, yield farming, NFTs, coding, and marketing solutions.
            </p>
            <p>
              Blue Flask V2 is a decentralized finance (DeFi) token that operates on the BNB Chain (BEP-20). 
              Our staking and other DeFi features will enhance the demand and reduce the supply, while also fostering 
              value growth through staking and NFTs. Through our yield farm, you will be able to maximize the benefits from your $FLASK.
            </p>
          </div>

          {/* Contract Address */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm mb-2">Blue Flask V2 Contract Address:</p>
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
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Key Features of Labswap Ecosystem
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <h4 className="text-xl font-semibold text-blue-400 mb-3">
                  {feature.title}
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;