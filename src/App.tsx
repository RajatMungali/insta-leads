import React from 'react';
import Header from './components/Header';
import SearchContainer from './components/SearchContainer';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-950 to-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SearchContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;