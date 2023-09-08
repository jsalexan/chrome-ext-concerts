async function fetchData() {
    const apiKey = 'e80c95076bmsha45acbf7c7c0d2cp1c74c9jsnddca0daf3fee';
    const apiHost = 'concerts-artists-events-tracker.p.rapidapi.com';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': apiHost,
        },
    };
    const defaultImage = "/defaultArtist.png";

    const currentDate = new Date();
    const currentDateISO = currentDate.toISOString().split('T')[0]; // Get current date in ISO format (YYYY-MM-DD)

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30); // Calculate the date 30 days from now
    const endDateISO = endDate.toISOString().split('T')[0]; // Get end date in ISO format (YYYY-MM-DD)

const locationName = 'Seattle';


    try {
        const res = await fetch(`https://concerts-artists-events-tracker.p.rapidapi.com/location?name=${locationName}&minDate=${currentDateISO}&maxDate=${endDateISO}&page=1`, options);
        
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const record = await res.json();
        console.log(record);
        if (record && record.data && Array.isArray(record.data)) {
            document.getElementById("concerts").innerHTML = record.data.map(item => {
                // Parse the date string
                const startDate = new Date(item.startDate);
                // Format the date as desired (e.g., MM/DD/YYYY)
                const formattedDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;
                // Create an <img> element with the artist's image
                const artistImage = item.image ? `<img src="${item.image}" alt="${item.name} Image">` : `<img src="${defaultImage}" alt="Default Image">`;
                return `<li>${artistImage}<br>Artist: ${item.name}<br>Venue: ${item.location.name}<br>Date: ${formattedDate}</li><br><br>`;
                }).join('');
        } else {
            console.error('Invalid data structure in the API response');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();
