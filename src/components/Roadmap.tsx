import React from 'react';

const Roadmap = () => {
  const roadmapItems = [
    {
      quarter: "Q1",
      title: "Marketing Solutions",
      description: "Labswap is integrating cutting-edge features, including marketing solutions for other projects. Additionally, we'll offer create customised new tokens. It will help to boost marketing funds for our ecosystem."
    },
    {
      quarter: "Q2",
      title: "Router Implementation",
      description: "We're transitioning from using PancakeSwap's router to deploying our own. This upgrade will allow us to list additional tokens on our exchange and offer staking and farming services."
    },
    {
      quarter: "Q3",
      title: "Token Listings and Yield Opportunities",
      description: "As we roll out our new router, we'll begin listing more partner tokens on Labswap. Every purchase, staking action, or yield farming activity will contribute to our ecosystem's growth."
    },
    {
      quarter: "Q4",
      title: "Future Plans: Launchpad and Incubator",
      description: "Looking ahead, we aim to introduce a launchpad and incubator. These platforms will support other projects launching on Labswap, fostering collaboration and innovation."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Roadmap
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-600 rounded-full hidden md:block"></div>
          
          {/* Timeline Circles */}
          <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex flex-col justify-between h-full">
            {roadmapItems.map((_, index) => (
              <div 
                key={index}
                className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"
                style={{ marginTop: index === 0 ? '2rem' : '0', marginBottom: index === roadmapItems.length - 1 ? '2rem' : '0' }}
              ></div>
            ))}
          </div>

          {/* Roadmap Items */}
          <div className="space-y-16 md:space-y-24">
            {roadmapItems.map((item, index) => (
              <div 
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 md:w-1/2">
                  <div className={`bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500 transition-all duration-300 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xl">
                        {item.quarter}
                      </div>
                      <h3 className="text-xl font-semibold text-blue-400">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for desktop */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;