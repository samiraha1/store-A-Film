import "./../css/Discover.css";

export default function Discover () {
    return (
        <main id="all">
            <div class="discover">
            <h2>Search Google</h2>
            <form action="https://www.google.com/search" method="get" target="_blank">
                <input type="text" name="q" placeholder="Type your search here..." required />
                <button type="submit">Search</button>
            </form>
            </div>
        </main>
    );
}