import "./../css/Blog.css";
import "./../css/Slideshow.css";
import him from '../images/him.jpg';
import demon from '../images/demon-slayer.png'; // rename file to remove space if needed
import { useState, useEffect } from "react";

export default function Blog() {
  function importAll(r) {
    return r.keys().map((key) => {
      const mod = r(key);
      // support both default export and direct value
      return mod.default || mod;
    });
  }

  // NOTE: fixed regex (use $ not &), and case-insensitive flag
  const images = importAll(
    require.context("./../images/slideshow", false, /\.(png|jpe?g|svg)$/i)
  );
  const bios = 
  [ "The Mitchells Vs The Machines 2 In The Works From Sony Pictures Animation — Netflix To Release",
    "Scream 7’ Trailer: Neve Campbell Returns to Face Ghostface in the Franchise’s Next Chapter",
    "Wake Up Dead Man Was ‘The Hardest Script I’ve Ever Written’, Says Rian Johnson"];

  const slides = images.map((src,i)=>({src,bio:bios[i] || ""}));

  const [index, setIndex] = useState(0);

  // Keep index in-range if images array changes
  useEffect(() => {
    if (images.length === 0) {
      setIndex(0);
      return;
    }
    if (index >= images.length) {
      setIndex(images.length - 1);
    }
  }, [images.length, index]);

  const slideForward = () => {
    if (images.length === 0) return;
    setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    console.log("forward");
  };

  const slideBackward = () => {
    if (images.length === 0) return;
    setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    console.log("backward");
  };

  return (
    <main id="main-blog">
      <h2 className="blog-title">What's going on?</h2>
      <a className="addBlog" href="addBlog.html">Add Blog Post</a>

      <div id="slideshow">
        {slides.length > 0 ? (
          <>
            <img
                src={images[index]}
                alt={`Slide ${index + 1}`}
            />
            <p id="slide-bio">{slides[index].bio}</p>
          </>
        ) : (
          <div className="no-slides">No slideshow images found</div>
        )}

        <p id="forward-arrow" onClick={slideForward}>&gt;</p>
        <p id="backward-arrow" onClick={slideBackward}>&lt;</p>

        {/* <p id="blogP">
          ‘Scream 7’ Trailer: Neve Campbell Returns to Face Ghostface in the Franchise’s Next Chapter
        </p> */}
      </div>

      <div id="blog">
        <div className="popular">
          <img src={demon} alt="Demon Slayer" />
          <h2>New Demon Slayer Movie</h2>
          <p className="post">This movie was so good. I definitely recommend...</p>
        </div>

        <div className="popular">
          <img src={him} alt="Him movie" />
          <h2>Negative Reviews on the movie 'Him'</h2>
          <p className="post">There have been lots of opinions on the new Him movie...</p>
        </div>
      </div>
    </main>
  );
}

// import "./../css/Blog.css";
// import "./../css/Slideshow.css"
// import him from '../images/him.jpg';
// import demon from '../images/demon slayer.png';
// import {useState} from "react";

// export default function Blog() {
//     function importAll(r) {
//         return r.keys().map(r);
//     }
//     const images = importAll(
//         require.context("./../images/slideshow", false, /\.(png|jpe?g|svg)&/)
//     );

//     const [index, setIndex] = useState(0);

//     const slideForward = () => {
//         setIndex(index === images.length-1 ? 0 : index+1)
//         console.log("forward");
//     }

//     const slideBackward = () => {
//         setIndex(index === 0 ? images.length-1 : index-1)
//         console.log("backward");

        
//     }
//     return (
//         <main id="main-blog">
//             <h2 class="blog-title">What's going on?</h2>
//             <a class="addBlog" href="addBlog.html">Add Blog Post</a>
//             <div id="slideshow">
//                 <img src={images[index]} alt={images[index]} />
//                 <p id="forward-arrow" onClick={slideForward}>&gt;</p>
//                 <p id="backward-arrow" onClick={slideBackward}>&lt;</p>
//                 <p id="blogP">‘Scream 7’ Trailer: Neve Campbell Returns to Face Ghostface in the Franchise’s Next Chapter </p>
//             </div>
//             <div id="blog">
//                 <div class="popular">
//                     <img src={demon} alt="DemonSlayer" />
//                     <h2>New Demon Slayer Movie</h2>
//                     <p class="post">This movie was so good. I definitly recommend. It explains a lot of backstory but it's
//                         so beautiful</p>
//                 </div>
//                 <div class="popular">
//                     <img src={him} alt="post" />
//                     <h2>Negative Reviews on the movie 'Him'</h2>
//                     <p class="post">There have been lots of opinions on the new Him movie. Many don't like the fact that
//                         they advertised the movie as being made by Jordan Peele but it was actually directed by Justin
//                         Tipping and is not a Jordan Peele movie.</p>
//                 </div>
//             </div>
//         </main>
//     );
// }