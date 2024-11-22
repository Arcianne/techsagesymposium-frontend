const title = document.getElementById("title");
const attendees = document.getElementById("title");
const speaker = document.getElementById("title");
const location = document.getElementById("title");
const venue = document.getElementById("title");
const duration = document.getElementById("title");
const date = document.getElementById("title");
const email = document.getElementById("title");

function setEvent(event) {
    event.preventDefault();
    console.log(title.value)
    console.log(attendees.value)
    console.log(speaker.value)
    console.log(location.value)
    console.log(venue.value)
    console.log(duration.value)
    console.log(date.value)
    console.log(email.value)
    try {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/v1/events',
            data: {
                title: title.value,
                attendees: attendees.value,
                speaker: speaker.value,
                location: location.value,
                venue: venue.value,
                duration: duration.value,
                date: date.value,
                email: email.value,
                is_pending: false
            }
        });
        console.log("success")
    } catch (error) {
        console.log(error)
    }
    
}
