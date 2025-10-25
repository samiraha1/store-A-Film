import "./../css/Contact.css";
const Contact = () => {
    return (
        <>
            <div className="faq-links">
                <h3>Search for answers</h3>
                <input className="search" type="text" placeholder="Search..." />
                <nav className="help-links">
                    <a href="/">How to use the app</a>
                    <a href="/">How to login</a>
                    <a href="/">How to create an account</a>
                </nav>
            </div>


            <form className="contact-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Full Name" required />
                <input type="email" name="email" placeholder="Email" required />
                <textarea name="message" placeholder="Message" required />
                <button type="submit">Submit Form</button>
            </form>
        </>
    );
}