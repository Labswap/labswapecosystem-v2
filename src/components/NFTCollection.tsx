import React from 'react';

const NFTCollection = () => {
  const nfts = [
    {
      id: "501",
      name: "LABScientist DAO #501",
      image: "public/imagen_0.png"
    },
    {
      id: "507", 
      name: "LABScientist DAO #507",
      image: "public/imagen_3.png"
    },
    {
      id: "514",
      name: "LABScientist DAO #514", 
      image: "public/imagen_5.png"
    },
    {
      id: "375",
      name: "LABScientist DAO #375",
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