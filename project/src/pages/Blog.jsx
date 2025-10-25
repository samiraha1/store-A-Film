import "./../css/Blog.css";
import him from '../images/him.jpg';
import demon from '../images/demon slayer.png';

export default function Blog() {
    return (
        <main id="main-blog">
            <h2 class="blog-title">What's going on?</h2>
            <a class="addBlog" href="addBlog.html">Add Blog Post</a>
            <div id="blog">
                <div class="popular">
                    <img src={demon} alt="DemonSlayer"/>
                    <h2>New Demon Slayer Movie</h2>
                    <p class="post">This movie was so good. I definitly recommend. It explains a lot of backstory but it's
                        so beautiful</p>
                </div>
                <div class="popular">
                    <img src={him} alt="post" />
                    <h2>Negative Reviews on the movie 'Him'</h2>
                    <p class="post">There have been lots of opinions on the new Him movie. Many don't like the fact that
                        they advertised the movie as being made by Jordan Peele but it was actually directed by Justin
                        Tipping and is not a Jordan Peele movie.</p>
                </div>
            </div>
        </main>
    );
}