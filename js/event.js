// LDCV Initialization
const eventRegistrationModal = new ldcover({ root: "#event-registration-modal" }); 
const generateBannerModal = new ldcover({ root: "#generate-banner-modal" }); 

const loader = document.getElementById("loader")

// Get Params from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

function navigateToEventBanner() {
    window.location.href = `event-banner.html?id=${id}`;
}

function getEventDetails(id, title) {
    const eventIdInput = document.getElementById("event-id")
    const modalTitle = document.getElementById("modal-title")
    
    eventIdInput.value = id
}

const eventDetails = document.getElementById("event-details");
async function fetchEventById() {
    try {
        setTimeout(() => {
        }, 1000);
        loader.style.display = "block";
        const response = await axios.get(ENVIRONMENT.API_BASE_URL + "/api/v1/events/" + id);
        console.log(response.data.data);
        const dataSource = response.data.data
        const htmlContent =  `
            <section class="event-details">
                <div class="details">
                    <div class="heading">
                        <h1>${dataSource.title}</h1>
                        <h2>with ${dataSource.speaker}</h2>
                        <p>@${dataSource.venue}</p>
                        <p>January 05, 2025 at 10:00 AM</p>
                        <div class="event-cta">
                            <button class="btn" onclick="eventRegistrationModal.toggle(); getEventDetails('${dataSource._id}', '${dataSource.title}')">Join Now!</button>
                            <button class="btn" onclick="generateBannerModal.toggle(); getEventDetails('${dataSource._id}', '${dataSource.title}')">Generate Banner</button>
                        </div>
                    </div>
                    <img src="${dataSource.images.event_cover}" alt="Event Cover">
                </div>
                <p>${dataSource.event_details}</p>
            </section>

            <h1 class="subheading">About the Speaker</h1>
            <section class="about-speaker">
                <img src="${dataSource.images.speaker_image}" alt="speaker">
                <div class="speaker-details">
                    <h2>${dataSource.speaker}</h2>
                    <h2>Full-Stack Web Developer & Educator</h2>
                    <p>${dataSource.speaker_information}</p>
                </div>
            </section>
        `

        eventDetails.innerHTML = htmlContent;
    } catch (error) {
        const htmlContent = `
            <div class="not-found">
                <h1>Event Not Found</h1>
            </div>
        `

        eventDetails.innerHTML = htmlContent;
        throw new Error("Failed to fetch event");
    } finally {
        loader.style.display = "none";
    }
}

const attendeeName = urlParams.get('attendee-name');
const eventId = urlParams.get('event-id');
async function registerAttendee() {
    const attendeeEmail = urlParams.get('attendee-email');
    const attendeeContact = urlParams.get('attendee-contact');

    const response = await axios.post(
        ENVIRONMENT.API_BASE_URL + '/api/v1/attendees',
        {
            attendee_name: attendeeName,
            email: attendeeEmail,
            contact_no: attendeeContact,
            event_id: eventId,
            is_pending: true
        }
    )
}

const bannerHeading = urlParams.get('banner-heading');
async function createBanner() {
    const bannerPromotionalText = urlParams.get('banner-promotional-text');
    
    const response = await axios.post(
        ENVIRONMENT.API_BASE_URL + '/api/v1/banners',
        {
            banner_heading: bannerHeading,
            banner_promotional_text: bannerPromotionalText,
            event: eventId
        }
    )
}

if(attendeeName){
    registerAttendee()
    const htmlContent = `
        <div class="registration-success" style="margin-bottom: 18rem;">
            <h1 id="">Thanks, ${urlParams.get('attendee-name')}</h1>
            <h1>Registration Successful 👏</h1>
            <p>Please wait a couple of days as we confirm your registration. Expect a call or email using the information you provided.</p>
        </div>
    `
    eventDetails.innerHTML = htmlContent;
} else if(bannerHeading){
    createBanner()
    setTimeout(() => {
        window.location.href = `event-banner.html?id=${eventId}`;
    }, 1000);
}else{
    fetchEventById()
}
