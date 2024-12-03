// Get Params from URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const qrCode = document.getElementById("qr-code")
const qrData = ENVIRONMENT.BASE_URL + "/event.html?id=" + id
async function generateQRCode() {
    const response = await axios.get(
        `https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=250x250`, 
        { responseType: "blob" }
    ) 

    console.log(`https://api.qrserver.com/v1/create-qr-code/?data=${qrData}&size=250x250`)

    const imageUrl = URL.createObjectURL(response.data);

    console.log(imageUrl)

    qrCode.src = imageUrl;
}

async function fetchBannerDetails() {
    try {
        const response = await axios.get(ENVIRONMENT.API_BASE_URL + "/api/v1/banners/event-id/" + id);
        const dataSource = response.data.data;
        const bannerDetails = document.getElementById("banner-details")
        const htmlContent = `
            <h1>${dataSource[0].banner_heading}</h1>
            <p>${dataSource[0].banner_promotional_text}</p>
        `

        bannerDetails.innerHTML = htmlContent;
    } catch (error) {
        
    }
}

generateQRCode()
fetchBannerDetails()