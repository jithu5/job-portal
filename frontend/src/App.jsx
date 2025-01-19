import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import "./App.css"
import Lenis from "@studio-freight/lenis";

function App() {
  

  useEffect(() => {
      // Initialize Lenis
      const lenis = new Lenis({
          duration: 1,
          easing: (t) => 1 - Math.pow(1 - t, 2),
          smoothWheel: true,
          smoothTouch: false,
      });

      // Update Lenis
      function raf(time) {
          lenis.raf(time); // Update Lenis on each animation frame
          requestAnimationFrame(raf); // Loop it
      }

      requestAnimationFrame(raf); // Start the animation loop

      return () => {
          lenis.destroy(); // Clean up when the component is unmounted
      };
  }, []);

  return (
    <>
    <div className='min-h-screen w-full bg-primary'>
    <Outlet/>
      
    </div>
    </>
  )
}

export default App
