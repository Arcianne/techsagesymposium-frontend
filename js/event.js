// LDCV Initialization
const ldcv = new ldcover({ root: "#event-registration-modal" }); 

// Get Params from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

navigateToEventBanner = function() {
    window.location.href = `event-banner.html?id=${id}`;
}

const eventDetails = document.getElementById("event-details");
async function fetchEventById() {
    try {
        const response = await axios.get(ENVIRONMENT.API_BASE_URL + "/api/v1/events/" + id);
        console.log(response.data.data);
        const dataSource = response.data.data
        const htmlContent =  `
            <section class="event-details">
                <div class="details">
                    <div class="heading">
                        <h1>${dataSource.title}</h1>
                        <h2>with ${dataSource.speaker}</h2>
                        <p>@${dataSource.location}</p>
                        <p>January 05, 2025 at 10:00 AM</p>
                        <div class="event-cta">
                            <button class="btn" onclick="ldcv.toggle()">Join Now!</button>
                            <button class="btn" onclick="navigateToEventBanner()">Generate Banner</button>
                        </div>
                    </div>
                    <img src="assets/event-banner.png" alt="Mika Soriano">
                </div>
                <p>${dataSource.speaker_desc}</p>
            </section>

            <h1 class="subheading">About the Speaker</h1>
            <section class="about-speaker">
                <img src="assets/event-author.png" alt="speaker">
                <div>
                    <h2>${dataSource.speaker}</h2>
                    <h2>Full-Stack Web Developer & Educator</h2>
                    <p>${dataSource.event_detail}</p>
                </div>
            </section>
        `

        eventDetails.innerHTML = htmlContent;
    } catch (error) {
        const htmlContent = `
            <div class="container not-found">
                <h1>Event Not Found</h1>
            </div>
        `

        eventDetails.innerHTML = htmlContent;
        throw new Error("Failed to fetch event");
    }
}

fetchEventById()