import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import "./App.css"
import Lenis from "@studio-freight/lenis";
import {ToastContainer,Zoom} from "react-toastify"

function App() {
  

  useEffect(() => {
      // Initialize Lenis
      const lenis = new Lenis({
          duration: 0.7,
          easing: (t) => 1 - Math.pow(1 - t, 1.5),
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
          <div className="min-h-screen w-full bg-primary">
          <ToastContainer
              position="top-right"
              autoClose={4000}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Zoom}
          />
              <Outlet />
          </div>
      </>
  );
}

export default App
