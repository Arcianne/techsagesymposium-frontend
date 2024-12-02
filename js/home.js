/*------------- Marquee -------------*/
let copy = document.querySelector(".blog-slide").cloneNode(true);
document.querySelector('.blogs').appendChild(copy);

const subscriberEmail = document.getElementById("subscriber-email")

function resetInputs(){
    subscriberEmail.value = ''
}

async function registerSubscriber(event){
    event.preventDefault()

    try {
        const response = await axios.post(
            ENVIRONMENT.API_BASE_URL + "/api/v1/subscribers", 
            {
                email: subscriberEmail.value
            }
        )

        resetInputs()
        Swal.fire({
            title: "Subscription Successful!",
            text: "Thank you for subscribing! You'll receive the latest updates and exclusive content in your inbox.",
            icon: "success",
        });
    } catch (error) {
        console.log(error)
    }
}