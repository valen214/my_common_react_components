
import Button from '../../src/Button';
import React, { useState } from 'react';
import { capitalize } from '../../src/util/string';

import "./Home.scss";

function Home() {
  const [ selectedTab, setSelectedTab ] = useState(0);
  const handleTabChange = (e: Event, newTab: number) => {
    setSelectedTab(newTab);
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="tab-bar">
        <Button
          onClick={() => setSelectedTab(0)}
          className={`tab ${ selectedTab === 0 && "selected" }`}
        >
          Manual Search
        </Button>
        <Button
          onClick={() => setSelectedTab(1)}
          className={`tab ${ selectedTab === 1 && "selected" }`}
        >
          Smart Search
        </Button>
      </div>
      { capitalize("heyeyeye hyosaDDd ADSASD") }
    </div>
  );
}

export default Home;