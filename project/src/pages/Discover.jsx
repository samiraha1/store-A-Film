import "./../css/Discover.css";

const Discover = () => {
    return (
        <>
            <h2>Search Google</h2>
            <form action="https://www.google.com/search" method="get" target="_blank">
                <input type="text" name="q" placeholder="Type your search here..." required />
                <button type="submit">Search</button>
            </form>
        </>
    );
}