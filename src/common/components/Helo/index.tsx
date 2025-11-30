"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FinalScrollAnimation = () => {
  // 1. Setup Refs for all six distinct circular elements
  const containerRef = useRef(null);
  const initialTextRef = useRef(null);

  // 1st Yellow Circle (Outer most)
  const yellowCircle1Ref = useRef(null); // section-3_first-yellow-circle
  // 2nd White Circle (Expands to cover YC1)
  const whiteCircleRef = useRef(null); // section-3-2nd-circle
  // 3rd Yellow Circle (Small dot inside White)
  const yellowCircle2Ref = useRef(null); // section-3-3rd-cirlce
  // 4th Gray Ring (The thick gray annulus)
  const grayRingRef = useRef(null); // section-3-4th-cirlce
  // 5th Inner Yellow/Image Circle (Inside the Gray Ring)
  const imageCircleRef = useRef(null); // section-3-6th-cirlce_image
  // Final Text
  const finalTextRef = useRef(null); // section-3_final-content-cirlce
  const rotatingTextRef = useRef(null); // circular-text

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Total scroll distance for the entire animation (400vh in Webflow, using 5000 for clarity)
    const scrollDistance = 5000;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${scrollDistance}`,
        scrub: 0.5,
        pin: true,
        // markers: true, // Uncomment for debugging scroll timing
      },
    });

    // Helper function to convert the scroll position based on total distance
    const getTime = (percent: number) =>
      (percent / 100) * (scrollDistance / 500);

    // 3. Initial States (Based on Webflow CSS prior to scroll)
    gsap.set(yellowCircle1Ref.current, {
      width: "30em",
      height: "30em",
      y: "28em",
    });
    gsap.set(whiteCircleRef.current, { width: "0em", height: "0em" });
    gsap.set(yellowCircle2Ref.current, { scale: 0 });
    gsap.set(grayRingRef.current, { scale: 0 });
    gsap.set(imageCircleRef.current, { scale: 0 });
    gsap.set(finalTextRef.current, { opacity: 0 });
    gsap.set(rotatingTextRef.current, { opacity: 0 });

    /* -------------------------------------------
        STAGE 1: Yellow Circle 1 & Initial Text Out
        ------------------------------------------- */
    // Time 0: Yellow Circle 1 moves up and starts scaling
    tl.to(
      yellowCircle1Ref.current,
      {
        y: "0em",
        width: "75.5148em",
        height: "75.5148em",
        duration: 1.0,
      },
      0
    );

    // Time 0: Initial text fades out (or gets pushed out)
    tl.to(initialTextRef.current, { opacity: 0, duration: 0.3 }, 0);

    /* -------------------------------------------
        STAGE 2: White Circle 2 & Yellow Circle 3 Reveal
        ------------------------------------------- */

    // Time 1.0: White Circle 2 expands from 0em to 18em
    tl.to(
      whiteCircleRef.current,
      {
        width: "18.1005em",
        height: "18.1005em",
        duration: 0.5,
      },
      0.8
    );

    // Time 1.5: White Circle 2 continues to expand
    // tl.to(
    //   whiteCircleRef.current,
    //   {
    //     width: "121.413em",
    //     height: "121.413em",
    //     duration: 1.5,
    //   },
    //   1.5
    // );
    // tl.to(
    //   [yellowCircle1Ref.current, whiteCircleRef.current],
    //   {
    //     width: "225em",
    //     height: "225em",
    //     duration: 2.5,
    //     ease: "power2.inOut",
    //   },
    //   ">-0.5"
    // );
    // Time 1.5: Yellow Circle 1 and White Circle 2 expand to final huge size
    tl.to(
      [yellowCircle1Ref.current, whiteCircleRef.current],
      {
        width: "200em",
        height: "200em",
        duration: 1,
      },

    );

    // Time 1.7: Yellow Circle 3 (small dot) scales in
    tl.to(
      yellowCircle2Ref.current,
      { scale: 7.5, duration: 0.5, ease: "power2.out" },
      1.7
    );

    /* -------------------------------------------
        STAGE 3: Gray Ring 4 and Image/Final Circles 5/6 Reveal
        ------------------------------------------- */

    // Time 2.5: Gray Ring 4 scales in (around the yellow dot)
    tl.to(grayRingRef.current, { scale: 0.74885, duration: 1.0 }, 2.5);

    // Time 2.5: Inner Yellow Circle (section-3-5th-cirlce, inside the gray ring) scales in
    // This element is placed inside the grayRingRef in the JSX
    gsap.to(".inner-gray-ring-yellow", {
      scrollTrigger: {
        trigger: container,
        start: `top+=${getTime(50)}`, // Start around 50% of the timeline
        scrub: 0.5,
      },
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    // Time 3.0: Image Circle 6 scales in
    tl.to(imageCircleRef.current, { scale: 0.5111, duration: 1.0 }, 3.0);

    // Time 3.5: Final text fades in
    tl.to(finalTextRef.current, { opacity: 1, duration: 0.5 }, 3.5);

    // Time 3.5: Rotating Text fades in and starts spinning
    tl.to(rotatingTextRef.current, { opacity: 1, duration: 0.5 }, 3.5);
    tl.to(
      rotatingTextRef.current,
      { rotation: 3600, duration: 5.0, ease: "none" },
      4.0
    );

    // 4. Cleanup function
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const CharacterScene = () => (
    <div ref={finalTextRef} className="final-text-container">
      <div>
        <h2 className="heading-small is-indent">We</h2>
        <h2 className="heading-small">create</h2>
        <h2 className="text-color-yellow heading-small text-right-align">
          Epic
        </h2>
      </div>
    </div>
  );

  return (
    <div className="page-wrapper">
      <div className="other-content">
        <h1>Scroll Down To Start Animation</h1>
      </div>

      <div ref={containerRef} className="scroll-animation-container">
        <div className="pin-stage">
          {/* Layer 6: Initial text overlay (Fades out quickly) */}
          <h1 ref={initialTextRef} className="animated-text">
            WE <span className="bold">DON'T</span>
            <br />
            JUST BUILD
            <br />
            WEBSITES
          </h1>

          {/* Layer 1: Outer Yellow Circle (section-3_first-yellow-circle) */}
          <div
            ref={yellowCircle1Ref}
            className="yellow-circle-1 circle-layer circle-1"
          />

          {/* Layer 2: White Circle (section-3-2nd-circle) */}
          <div
            ref={whiteCircleRef}
            className="white-circle-2 circle-layer circle-2"
          />

          {/* Layer 3: Inner Yellow Circle (section-3-3rd-cirlce) */}
          {/* We must place this inside a container that is centered within the white circle */}
          <div
            ref={yellowCircle2Ref}
            className="yellow-circle-3 circle-layer circle-3"
          />

          {/* Layer 4: Gray Ring (section-3-4th-cirlce) */}
          <div ref={grayRingRef} className="gray-ring-4 circle-layer circle-4">
            {/* Layer 4a: Rotating Text (circular-text) - Positioned on the edge of the gray ring */}
            <div ref={rotatingTextRef} className="rotating-text-container">
              <img
                src="https://cdn.prod.website-files.com/670ca2dcca5221d99dd8207d/670fa91538faf6be169cad04_circural%20text.svg"
                alt="circular text"
                className="circular-text"
              />
            </div>

            {/* Layer 5: Inner Yellow Circle (section-3-5th-cirlce) - Scaled in a separate GSAP call */}
            <div className="inner-gray-ring-yellow circle-layer circle-5" />

            {/* Layer 6: Image Circle (section-3-6th-cirlce_image) */}
            <div
              ref={imageCircleRef}
              className="image-circle-6 circle-layer circle-6"
            >
              <img
                src="https://cdn.prod.website-files.com/670ca2dcca5221d99dd8207d/670caa198f0c2eaaa826b4de_image%20(5).png"
                loading="lazy"
                alt="circle image"
                className="full-image-inner"
              />
              <CharacterScene />
            </div>
          </div>
        </div>
      </div>

      <div className="other-content">
        <h1>Animation Complete!</h1>
      </div>
    </div>
  );
};

export default FinalScrollAnimation;

// "use client";
// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const FinalScrollAnimation = () => {
//   // 1. Setup Refs for all distinct elements
//   const containerRef = useRef(null);
//   const textRef = useRef(null);
//   const outerYellowRef = useRef(null); // The main yellow circle
//   const darkRingRef = useRef(null); // The thick, dark gray ring (Image 6)
//   const innerBlackRef = useRef(null); // The solid black circle (Image 8)
//   const characterContainerRef = useRef(null); // Contains the character and final text
//   const innerWhiteRef = useRef(null);
//   const rotatingTextRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     const text = textRef.current;
//     const outerYellow = outerYellowRef.current;
//     const darkRing = darkRingRef.current;
//     const innerBlack = innerBlackRef.current;
//     const characterContainer = characterContainerRef.current;
//     const rotatingText = rotatingTextRef.current;

//     // Total scroll distance for the entire animation
//     const scrollDistance = 5000;

//     // 2. Create the Main Timeline (linked to scroll)
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: container,
//         start: "top top",
//         end: `+=${scrollDistance}`,
//         scrub: 0.5,
//         pin: true,
//         // markers: true, // Use this for debugging scroll timing
//       },
//     });

//     // 3. Initial States (Hidden/Small)
//     gsap.set(outerYellow, { scale: 0, y: "100vh" });
//     gsap.set(darkRing, { scale: 0 });
//     gsap.set(innerBlack, { scale: 0 });
//     gsap.set(characterContainer, { scale: 0, opacity: 0 });
// gsap.set(innerWhiteRef.current, { scale: 0.1 });
//     // Initial text state (Image 1)
//     gsap.set(text, { innerHTML: "WE JUST BUILD<br/>WEBSITES" });

//     /* -------------------------------------------
//           STAGE 1: Yellow Circle Entry & Text Change
//         ------------------------------------------- */

//     // Phase 1.0: Yellow Circle slides up and scales quickly (Image 5)
//     tl.to(
//       outerYellow,
//       {
//         scale: 1,
//         y: 0,
//         duration: 0.7,
//         ease: "power2.out",
//       },
//       0
//     );

//     // Phase 1.1: Text is initially on the white background, fades and changes (Images 1 -> 3)
//     tl.to(text, { opacity: 0.2, duration: 0.2 }, 0);
//     tl.set(
//       text,
//       {
//         innerHTML: "WE DON'T<br/>JUST BUILD<br/>WEBSITES",
//         fontSize: "4em",
//         color: "white",
//       },
//       0.2
//     );
//     tl.to(text, { opacity: 1, duration: 0.3 }, 0.3);

//     /* -------------------------------------------
//           STAGE 2: Ring Reveals (Images 6 & 7)
//         ------------------------------------------- */

//     // Phase 2.0: Dark Gray Ring expands (Image 6)
//     // It starts as a dot and expands into a thick ring

//     tl.to(
//       darkRing,
//       {
//         scale: 1,
//         duration: 0.5,
//         opacity: 1,
//         // The ring is created by having a transparent center and a thick border
//         borderWidth: "10vw",
//       },
//       0.8
//     );
//     tl.to(text, { opacity: 0 });
//     // The transition between Image 7 (small character) and Image 8 (large character)
//     // We'll use the 'innerBlack' element for the small center dot transition before it becomes the solid black circle.

//     // Phase 2.1: Inner Black Dot appears (Small circle in Image 7)
//     tl.to(
//       innerBlack,
//       {
//         scale: 0.1,
//         opacity: 1,
//         duration: 0.3,
//         backgroundColor: "#FFD700", // Yellow dot color (as per your description)
//       },
//       1.2
//     );

//     /* -------------------------------------------
//           STAGE 3: Character & Final Text Reveal (Images 8 & 9)
//         ------------------------------------------- */

//     // Phase 3.0: Black circle expands, Character & "WE CREATE EPIC" appear (Image 8)
//     tl.to(
//       innerBlack,
//       {
//         scale: 0.6, // Final scale for the solid black circle
//         backgroundColor: "black",
//         duration: 0.5,
//         ease: "power2.inOut",
//       },
//       2.0
//     );

//     // Character element scales up and reveals the new text
//     tl.to(
//       characterContainer,
//       {
//         scale: 1,
//         opacity: 1,
//         duration: 1.0,
//         ease: "back.out(1.7)",
//       },
//       2.0
//     );

//     // Phase 3.1: Continuous Rotating Text (Image 9)
//     // We start the rotation slightly after the black circle is defined.
//     tl.to(
//       rotatingText,
//       {
//         rotation: 3600, // 10 full rotations
//         duration: 5.0, // Long duration to last until the end of the scroll
//         ease: "none",
//       },
//       2.5
//     ); // Starts spinning after the character is mostly revealed

//     // 4. Cleanup function
//     return () => {
//       tl.kill();
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, []);

//   // Component for the Character and inner text
//   const CharacterScene = () => (
//     <div ref={characterContainerRef} className="character-scene">
//       <div
//         className="character-placeholder"
//         // style={{
//         //   backgroundImage: "url(/path/to/character.png)", // **UPDATE THIS PATH**
//         // }}
//       >
//         {/* Character Illustration goes here */}
//       </div>
//       <p className="epic-text">
//         WE CREATE
//         <br />
//         **EPIC**
//       </p>
//     </div>
//   );

//   return (
//     <div className="page-wrapper">
//       <div className="other-content">
//         <h1>Scroll Down To Start Animation</h1>
//       </div>

//       <div ref={containerRef} className="scroll-animation-container">
//         <div className="pin-stage">
//           {/* 1. Main Yellow Circle (Outer) */}
//           <div
//             ref={outerYellowRef}
//             className="outer-yellow-circle circle-layer"
//           />

//           {/* 2. Dark Gray Ring */}
//           <div ref={darkRingRef} className="dark-ring circle-layer" />

//           {/* 3. Inner Black/Yellow Dot Circle */}
//           <div ref={innerBlackRef} className="inner-black-circle circle-layer">
//             {/* 3a. Rotating Text Container (Spins 360) */}
//             {/* <div ref={rotatingTextRef} className="rotating-text-container">
//               <p className="circle-text">
//                 DIGITAL EXPERIENCES - DIGITAL EXPERIENCES - DIGITAL EXPERIENCES
//                 -
//               </p>
//             </div> */}
// <div ref={innerWhiteRef} className="inner-white-circle circle-layer">
//             {/* 3a. Character and Final Text Layer (Innermost) */}
//             <CharacterScene />
//           </div>
//             {/* 3b. Character and Final Text Layer (Innermost) */}
//             <CharacterScene />
//           </div>

//           {/* 4. Text Overlay (WE DON'T JUST BUILD WEBSITES) */}
//           <h1 ref={textRef} className="animated-text"></h1>
//         </div>
//       </div>

//       <div className="other-content">
//         <h1>Animation Complete!</h1>
//       </div>
//     </div>
//   );
// };

// export default FinalScrollAnimation;
