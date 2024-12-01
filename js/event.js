// LDCV Initialization
var ldcv = new ldcover({ root: "#event-registration-modal" }); 

async function fetchEventById() {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/events/672e00063584fb7492a5a061");
        const eventDetails = document.getElementById("event-details");
        console.log(response.data.data);
        const dataSource = response.data.data
        const htmlContent = dataSource.map(event => `
            <section class="event-details">
                <div class="details">
                    <div class="heading">
                        <h1>${event.title}</h1>
                        <h2>with ${event.speaker}</h2>
                        <p>@${event.location}</p>
                        <p>January 05, 2025 at 10:00 AM</p>
                        <div class="event-cta">
                            <button class="btn" onclick="ldcv.toggle()">Join Now!</button>
                            <button class="btn">Generate Banner</button>
                        </div>
                    </div>
                    <img src="assets/event-banner.png" alt="Mika Soriano">
                </div>
                <p>${event.speaker_desc}</p>
            </section>

        <h1 class="subheading">About the Speaker</h1>
        <section class="about-speaker">
            <img src="assets/event-author.png" alt="speaker">
            <div>
                <h2>${event.speaker}</h2>
                <h2>Full-Stack Web Developer & Educator</h2>
                <p>${event.event_detail}</p>
            </div>
        </section>
            `).join('')

        eventDetails.innerHTML = htmlContent;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch event");
    }
}

fetchEventById()