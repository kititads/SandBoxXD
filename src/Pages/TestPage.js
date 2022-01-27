
import React, { useEffect, useState } from "react";
import * as loadingData from "../loading.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


function TestPage() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {

          setLoading(true);
          
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
          <FadeIn>
            <div style={{ display: "flex" ,opacity: 0.9}}>
                <Lottie options={defaultOptions} background="#071929" speed="10" height={600} width={600} />
              
            </div>
          </FadeIn>
       
  
      </header>
    </div>
  );
}

export default TestPage;
