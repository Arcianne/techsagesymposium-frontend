const title = document.getElementById("title");
const attendees = document.getElementById("attendees");
const speakerName = document.getElementById("speaker-name");
const location1 = document.getElementById("location");
const venue = document.getElementById("venue");
const duration = document.getElementById("duration");
const date = document.getElementById("date");
const email = document.getElementById("email");

function setEvent(event) {
    event.preventDefault();
    
    try {
        axios({
            method: 'post',
            url: ENVIRONMENT.API_BASE_URL + "/api/v1/events",
            data: {
                title: title.value,
                attendees: attendees.value,
                speaker: speakerName.value,
                location: location1.value,
                venue: venue.value,
                duration: duration.value,
                date: date.value,
                email: email.value,
                is_pending: false
            }
        });

        Swal.fire({
            title: "Submission Successful!",
            text: "Your event has been successfully submitted and is now available in the admin dashboard.",
            icon: "success",
        });
    } catch (error) {
        console.log(error)
    }
    
}
