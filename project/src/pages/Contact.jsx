import "./../css/Contact.css";
export default function Contact () {
    return (
        <>
            <main id="all" class="main-contact">
                <div class="contact">
                    <div id="search">
                        <h2>Search for answers</h2>
                        <input class="search" type="text" placeholder="Search..."/>

                    </div>
                    <div id="simple">
                        <a href="use.html">How to use the app</a>
                        <a href="login.html">How to login</a>
                        <a href="settings.html">How to create an account</a>
                        <a href="settings.html">Account privacy</a>
                        <a href="settings.html">How to delete account</a>
                    </div>
                </div>
                <div class="info">
                    <h2>Fill out your information for more help:</h2>
                    <div id="email">
                        <h3>Phone Number: 123 - 456 - 7890</h3>
                        <h3>Email: blahblahblah@gmail.com</h3>
                        <h3 class="h3">Fill Out:</h3>
                        <input class="fill" type="text" placeholder="Type here..."/>
                    </div>
                </div>
            </main>
        </>
    );
}