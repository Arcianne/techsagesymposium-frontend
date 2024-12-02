const title = document.getElementById("title");
const attendees = document.getElementById("attendees");
const speakerName = document.getElementById("speaker-name");
const location1 = document.getElementById("location");
const venue = document.getElementById("venue");
const duration = document.getElementById("duration");
const date = document.getElementById("date");
const speakerInformation = document.getElementById("speaker-information");
const eventDetails = document.getElementById("event-details");
const registratorFullName = document.getElementById("registrator-full-name");
const registratorEmail = document.getElementById("registrator-email");
const registratorContactNumber = document.getElementById("registrator-contact-number");
const eventImageInput = document.getElementById("event-image-input")
const speakerImageInput = document.getElementById("speaker-image-input")

function convertImageToBase64(fileInput) {
    const files = fileInput.files;

    return new Promise((resolve, reject) => {
        if(files && files[0]){
            const reader = new FileReader();
    
            reader.onloadend = () => {
                resolve(reader.result);
            }

            reader.onerror = (error) => {
                reject(error);
            }

            reader.readAsDataURL(files[0])
        }else{
            reject(new Error("No file selected"));
        }
    })
}


async function setEvent(event) {
    event.preventDefault();
    
    try {
        const [eventCoverBase64, speakerImageBase64] = await Promise.all([
            convertImageToBase64(eventImageInput),
            convertImageToBase64(speakerImageInput),
        ]);

        const response = await axios({
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
                speaker_information: speakerInformation.value,
                event_details: eventDetails.value,
                is_pending: false,
                images: {
                    event_cover: eventCoverBase64,
                    speaker_image: speakerImageBase64,
                },
                registrator: {
                    full_name: registratorFullName.value,
                    email: registratorEmail.value,
                    contact_number: registratorContactNumber.value,
                },
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