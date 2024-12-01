// Get Params from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const qrCode = document.getElementById("qr-code")
const qrData = ENVIRONMENT.BASE_URL + "/event.html?id=" + id
async function generateBanner() {
    const response = await axios.get(
        `https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=250x250`, 
        { responseType: "blob" }
    ) 

    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=250x250`)

    const imageUrl = URL.createObjectURL(response.data);

    console.log(imageUrl)

    qrCode.src = imageUrl;
}

generateBanner()