viewEvent = function(id) {
    window.location.href = `event.html?id=${id}`;
}

const listContainer = document.getElementById("list-container");
async function fetchApprovedEvents() {
    try {
        const response = await axios.get(ENVIRONMENT.API_BASE_URL + "/api/v1/events/pending-status/false");
        console.log(response.data.data);
        const dataSource = response.data.data
        
        const htmlContent = dataSource.map(event => `
            <div class="list">
                <div class="container list-details">
                    <div class="title">
                        <h1>${event.title}</h1>
                        ${event.tags.map(tag => 
                            `<p><span>#</span>${tag}</p>`).join('')
                        }
                    </div>
                    <div class="attendees">
                        <p>Max Attendees</p>
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
                    <button class="btn" onclick="viewEvent('${event._id}')">View</button>
                </div>
            </div>
        `).join('')

        listContainer.innerHTML = htmlContent;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch events");
    }
}

fetchApprovedEvents()

