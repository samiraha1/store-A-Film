import "./../css/Blog.css";

const Blog = () => {
    return (
        <>
            <h2>What's going on?</h2>
            <div className="posts">
                <article className="post">
                    <img src="/images/demon-slayer.png" alt="demon" />
                    <h3>New Demon Slayer Movie</h3>
                    <p>This movie was so good. I definitely recommend. It explains a lot of backstory but it's so beautiful.</p>
                </article>


                <article className="post">
                    <img src="/images/him.jpg" alt="him" />
                    <h3>Negative Reviews on the movie 'Him'</h3>
                    <p>There have been lots of opinions on the new Him movie. Many don't like the fact that they advertised the movie as being made by Jordan Peele but it was actually directed by Justin Tipping and is not a Jordan Peele movie.</p>
                </article>


                <article className="post">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/wo87F-va410" title="YouTube video player" frameBorder="0" allowFullScreen></iframe>
                    <h3>New Horror movie called Primate coming out in 2026!!</h3>
                    <p>A group of friends' tropical vacation turns into a terrifying, primal tale of horror and survival.</p>
                </article>
            </div>
        </>
    );
}