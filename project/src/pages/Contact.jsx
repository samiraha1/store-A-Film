import "./../css/Contact.css";
import React from "react";
import { useState } from "react";
export default function Contact() {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");

        const formData = new FormData(event.target);
        formData.append("access_key", "e84e3927-8b1a-4af9-b2d0-7f1c2d516fef");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setResult("Form Submitted Successfully!");
                event.target.reset();
            } else {
                console.log("Error:", data);
                setResult(`${data.message || "Something went wrong."}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setResult(" Network error — please try again later.");
        }

        // optional: clear message after 3 seconds
        setTimeout(() => setResult(""), 3000);
    };

    return (
        <main id="all" class="main-contact">
            <div class="contact">
                <div id="search">
                    <h2>Search for answers</h2>
                    <input class="search" type="text" placeholder="Search..." />

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
                    <form id="contact-form" onSubmit={onSubmit}>
                        <p className="infoName">
                            <label htmlFor="name">Full Name: </label>
                            <input type="text" name="name" required />
                        </p>

                        <p className="infoName">
                            <label htmlFor="email">Email: </label>
                            <input type="email" name="email" required />
                        </p>

                        <p className="mail">
                            <label htmlFor="message">Message: </label>
                            <textarea name="message" required></textarea>
                        </p>

                        <input
                            type="checkbox"
                            name="botcheck"
                            className="hidden"
                            style={{ display: "none" }}
                        />

                        <button className="btn" type="submit">
                            Submit Form
                        </button>

                        {result && (
                            <span> {result}</span>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}