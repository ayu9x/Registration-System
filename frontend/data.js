// ==================== Country, State, City Data ====================
const locationData = {
    "India": {
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati"],
        "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli", "Belgaum", "Gulbarga"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
        "Delhi": ["New Delhi", "Central Delhi", "East Delhi", "North Delhi", "South Delhi", "West Delhi"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
        "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut"],
        "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
        "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"]
    },
    "United States": {
        "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno"],
        "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"],
        "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
        "New York": ["New York City", "Buffalo", "Rochester", "Syracuse", "Albany"],
        "Illinois": ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford"],
        "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
        "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
        "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"],
        "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
        "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor"]
    },
    "United Kingdom": {
        "England": ["London", "Birmingham", "Manchester", "Liverpool", "Leeds", "Sheffield", "Bristol"],
        "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness"],
        "Wales": ["Cardiff", "Swansea", "Newport", "Wrexham"],
        "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry"]
    },
    "Canada": {
        "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London", "Kitchener"],
        "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
        "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Victoria"],
        "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
        "Manitoba": ["Winnipeg", "Brandon", "Steinbach"],
        "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert"]
    },
    "Australia": {
        "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast"],
        "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo"],
        "Queensland": ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns"],
        "Western Australia": ["Perth", "Mandurah", "Bunbury"],
        "South Australia": ["Adelaide", "Mount Gambier", "Whyalla"],
        "Tasmania": ["Hobart", "Launceston", "Devonport"]
    },
    "Germany": {
        "Bavaria": ["Munich", "Nuremberg", "Augsburg", "Regensburg"],
        "Berlin": ["Berlin"],
        "Hamburg": ["Hamburg"],
        "Hesse": ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt"],
        "North Rhine-Westphalia": ["Cologne", "Dusseldorf", "Dortmund", "Essen", "Duisburg"]
    },
    "France": {
        "Île-de-France": ["Paris", "Boulogne-Billancourt", "Saint-Denis", "Versailles"],
        "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Toulon", "Aix-en-Provence"],
        "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Saint-Étienne"],
        "Occitanie": ["Toulouse", "Montpellier", "Nîmes"],
        "Nouvelle-Aquitaine": ["Bordeaux", "Limoges", "Poitiers"]
    },
    "Japan": {
        "Tokyo": ["Tokyo", "Hachioji", "Machida", "Fuchu"],
        "Osaka": ["Osaka", "Sakai", "Higashiosaka"],
        "Kanagawa": ["Yokohama", "Kawasaki", "Sagamihara"],
        "Aichi": ["Nagoya", "Toyota", "Okazaki"],
        "Hokkaido": ["Sapporo", "Asahikawa", "Hakodate"]
    },
    "Singapore": {
        "Central": ["Downtown Core", "Marina Bay", "Orchard", "River Valley"],
        "East": ["Bedok", "Pasir Ris", "Tampines", "Changi"],
        "North": ["Woodlands", "Yishun", "Sembawang"],
        "West": ["Jurong", "Clementi", "Bukit Batok"],
        "North-East": ["Serangoon", "Hougang", "Sengkang"]
    }
};

// ==================== Country Phone Codes ====================
const countryPhoneCodes = {
    "India": "+91",
    "United States": "+1",
    "United Kingdom": "+44",
    "Canada": "+1",
    "Australia": "+61",
    "Germany": "+49",
    "France": "+33",
    "Japan": "+81",
    "Singapore": "+65"
};

// ==================== Disposable Email Domains ====================
const disposableEmailDomains = [
    "tempmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "throwaway.email",
    "temp-mail.org",
    "fakeinbox.com",
    "trashmail.com",
    "getnada.com",
    "maildrop.cc",
    "yopmail.com",
    "mintemail.com",
    "sharklasers.com",
    "spam4.me",
    "tempr.email",
    "throwawaymail.com",
    "mohmal.com",
    "emailondeck.com",
    "guerrillamail.info",
    "dispostable.com",
    "disposableemailaddresses.com",
    "spamgourmet.com",
    "mytrashmail.com",
    "jetable.org",
    "mailcatch.com",
    "临时邮箱.com",
    "临时邮.com",
    "disposable.com",
    "mailnesia.com",
    "anonymbox.com",
    "33mail.com",
    "tmpeml.info"
];

// Export data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        locationData,
        countryPhoneCodes,
        disposableEmailDomains
    };
}