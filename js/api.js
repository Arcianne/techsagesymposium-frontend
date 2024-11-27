async function fetchApprovedEvents() {
    try {
        const response = await axios.get("http://localhost:8000/api/v1/events/pending-status/true");
        const listContainer = document.getElementById("list-container")
        console.log(response.data.data)
        const dataSource = response.data.data
        // return response.data.data;
        const htmlContent = dataSource.map(event => `
            <div class="list">
                <div class="container list-details">
                    <div class="title">
                        <h1>${event.title}</h1>
                        <p><span>#</span>${event.tags}</p>
                        <p><span>#</span>${event.tags}</p>
                    </div>
                    <div class="attendees">
                        <p>No. of Attendees</p>
                        <p>${event.attendees}</p>
                    </div>
                    <div class="speaker">
                        <p>Speaker</p>
                        <p>${event.speaker}</p>
                    </div>
                    <div class="location">
                        <p>Location</p>
                        <p>${event.location}</p>
                    </div>
                    <div class="venue">
                        <p>Venue</p>
                        <p>${event.venue}</p>
                    </div>
                    <div class="duration">
                        <p>Duration</p>
                        <p>${event.duration}</p>
                    </div>
                    <div class="date">
                        <p>Date</p>
                        <p>${moment(event.date).format('MM/DD/YYYY')}</p>
                    </div>
                    <a href="event.html">
                        <button class="btn">View</button>
                    </a>
                </div>
            </div>
        `).join('')

        listContainer.innerHTML = htmlContent;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch event");
    }
}

fetchApprovedEvents()

