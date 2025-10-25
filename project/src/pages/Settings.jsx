import "./../css/Settings.css";

export default function Settings() {
    return (
        <main id="all">
            <div id="settings-nav" class="top">
                <ul>
                    <div class="setting-list">
                        <li>Privacy: </li>
                        <button id="public">public</button>
                    </div>
                    <div class="setting-list">
                        <li>Friends: </li>
                    </div>
                    <div class="setting-list">
                        <li><a href="blog.html">Personal Info: </a></li>
                    </div>
                    <div class="setting-list">
                        <li>Notifications: </li>
                        <button id="public">On</button>

                    </div>
                    <div class="setting-list">
                        <li>Language: </li>
                        <button id="public">English</button>

                    </div>
                    <div class="setting-list">
                        <li>Simple How To: </li>
                        <ul>
                            <li>1. Tap the Log in button in the navigation bar</li>
                            <li>2. If you have an account log in if not create a new one</li>
                            <li>3. Now that you're logged in create a playlist by going to your profile</li>
                            <li>4. Add the movies you want and customize your playlist by adding a picture for your
                                playlist</li>
                            <li>5. press save and your playlist is added</li>
                        </ul>
                    </div>
                    <div class="setting-list">
                        <li>How To Delete Account: </li>
                        <ul>
                            <li>1.</li>
                        </ul>
                    </div>
                </ul>
            </div>

        </main>
    );
}