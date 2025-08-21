import React, { useState } from 'react';
import { Search, Filter, Grid, List, ShoppingCart, Heart } from 'lucide-react';

const NFTMarket: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'art', name: 'Art' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'collectibles', name: 'Collectibles' },
    { id: 'utility', name: 'Utility' },
  ];

  const nfts = [
    {
      id: '1',
      name: 'LabScientist DAO #501',
      collection: 'LabScientist DAO',
      price: '0.5',
      currency: 'BNB',
      image: '/LABScientist_501.png',
      seller: '0x1234...5678',
      category: 'collectibles',
      likes: 24,
      isLiked: false,
    },
    {
      id: '2',
      name: 'LabScientist DAO #507',
      collection: 'LabScientist DAO',
      price: '0.75',
      currency: 'BNB',
      image: '/LABScientist_507.png',
      seller: '0x2345...6789',
      category: 'collectibles',
      likes: 18,
      isLiked: true,
    },
    {
      id: '3',
      name: 'LabScientist DAO #514',
      collection: 'LabScientist DAO',
      price: '1.2',
      currency: 'BNB',
      image: '/LABScientist_514.png',
      seller: '0x3456...7890',
      category: 'collectibles',
      likes: 32,
      isLiked: false,
    },
    {
      id: '4',
      name: 'LabScientist DAO #375',
      collection: 'LabScientist DAO',
      price: '0.8',
      currency: 'BNB',
      image: '/LABScientist_375.png',
      seller: '0x4567...8901',
      category: 'collectibles',
      likes: 15,
      isLiked: false,
    },
  ];

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.collection.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || nft.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBuyNFT = (nftId: string) => {
    console.log('Buying NFT:', nftId);
  };

  const handleLikeNFT = (nftId: string) => {
    console.log('Liking NFT:', nftId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">NFT Marketplace</h1>
          <p className="text-gray-300">
            Discover, collect, and trade unique digital assets on the BNB Chain.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search NFTs..."
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* NFT Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNFTs.map((nft) => (
              <div
                key={nft.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => handleLikeNFT(nft.id)}
                    className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <Heart
                      size={16}
                      className={nft.isLiked ? 'text-red-500 fill-current' : 'text-white'}
                    />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="mb-2">
                    <p className="text-gray-400 text-sm">{nft.collection}</p>
                    <h3 className="text-white font-semibold text-lg">{nft.name}</h3>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-gray-400 text-sm">Price</p>
                      <p className="text-white font-bold">{nft.price} {nft.currency}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart size={14} className="text-gray-400" />
                      <span className="text-gray-400 text-sm">{nft.likes}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBuyNFT(nft.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </button>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-gray-400 text-xs">
                      Seller: <span className="text-blue-400">{nft.seller}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNFTs.map((nft) => (
              <div
                key={nft.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">{nft.collection}</p>
                        <h3 className="text-white font-semibold text-lg">{nft.name}</h3>
                        <p className="text-gray-400 text-sm">Seller: {nft.seller}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-gray-400 text-sm">Price</p>
                        <p className="text-white font-bold text-xl">{nft.price} {nft.currency}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLikeNFT(nft.id)}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Heart
                        size={16}
                        className={nft.isLiked ? 'text-red-500 fill-current' : 'text-white'}
                      />
                    </button>
                    <button
                      onClick={() => handleBuyNFT(nft.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={24} />
            </div>
            <h3 className="text-white text-lg font-semibold mb-2">No NFTs found</h3>
            <p className="text-gray-400">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTMarket;