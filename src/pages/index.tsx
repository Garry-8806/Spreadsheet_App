import React from 'react';
import Toolbar from '../components/Toolbar';
import Grid from '../components/Grid';

const Home: React.FC = () => {
  return (
    <div className="p-8">
      <Toolbar />
      <div className="mt-8">
        <Grid />
      </div>
    </div>
  );
};

export default Home;
