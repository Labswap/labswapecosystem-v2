import React from 'react';

const NFTCollection = () => {
  const nfts = [
    {
      id: "001",
      name: "LABScientist #001",
      image: "public/imagen_0.png"
    },
    {
      id: "002", 
      name: "Scientist #002",
      image: "public/imagen_3.png"
    },
    {
      id: "003",
      name: "Scientist #003", 
      image: "public/imagen_5.png"
    },
    {
      id: "004",
      name: "Scientist #004",
      image: "public/imagen_10.png"
    }
  ];

  return (
    <section id="nft" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            LabScientistDAO NFT Collection
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              LabScientistDAO is an NFT collection of 555 unique pieces hand-drawn powered by Labswap Ecosystem.
            </p>
            <p>
              Your LabScientistDAO is also your membership pass to vote and make decisions. Those who own our NFTs 
              will have the power to vote and decide what will be our next moves.
            </p>
          </div>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {nfts.map((nft) => (
            <div 
              key={nft.id}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-400 text-center">
                  {nft.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NFTCollection;