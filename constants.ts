import { SectorData, SectorKey } from './types';

export const SECTORS: SectorKey[] = ['goa', 'himachal', 'rajasthan', 'kerala', 'uttarakhand', 'karnataka', 'meghalaya'];

export const PACKAGES: Record<SectorKey, SectorData> = {
    goa: {
        title: "MISSION SECTOR: GOA",
        subtitle: "Select your operational parameters for the Tropical Zone.",
        coords: [15.2993, 74.1240],
        missions: [
            { 
                codename: "Goa_Budget_Blitz", 
                price: "₹8,999", 
                threat: "Low", 
                vfm: "95%", 
                duration: "4D/3N", 
                brief: "A high-speed infiltration of North Goa's party sector for the solo operator or small fireteam.", 
                media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Goa/Goa_Budget_Blitz.png'}], 
                inclusions: ["Hostel Stay (Anjuna)", "Scooter Rental (2 Days)", "Entry to one beach club", "Breakfast Included"],
                lockedInclusions: ["Secret 'Locals Only' Rave Location", "Discount Code for Thalassa"]
            },
            { 
                codename: "Goa_Adrenaline_Rush", 
                price: "₹14,500", 
                threat: "Medium", 
                vfm: "88%", 
                duration: "4D/3N", 
                brief: "Engage in high-risk aquatic operations. This package focuses on water sports and coastal exploration.", 
                media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Goa/Goa_Adrenaline_Rush.png'}], 
                inclusions: ["3-Star Hotel (Calangute)", "Parasailing & Jetski Package", "Scuba Diving Taster Session", "Airport Transfers"],
                lockedInclusions: ["Hidden Cove Map Coordinates", "Free GoPro Rental Voucher"]
            },
            { 
                codename: "Goa_Southern_Serenity", 
                price: "₹17,999", 
                threat: "Low", 
                vfm: "92%", 
                duration: "5D/4N", 
                brief: "A low-intensity mission focused on recuperation and wellness in the tranquil South. Ideal for pairs.", 
                media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Goa/Goa_Southern_Serenity.png'}], 
                inclusions: ["Boutique Resort (Palolem)", "Daily Yoga Sessions", "Ayurvedic Massage", "Private Kayak Tour"],
                lockedInclusions: ["Private Sunset Point Access", "Chef's Table Reservation Priority"]
            },
            { codename: "Goa_Monsoon_Magic", price: "₹7,500", threat: "Low", vfm: "98%", duration: "4D/3N", brief: "Off-season infiltration. Leverage lower costs for maximum impact.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Goa/Goa_Monsoon_Magic.png'}], inclusions: ["Homestay (Ponda)", "Full-day Dudhsagar & Spice Plantation Tour", "Scooter Rental"], lockedInclusions: ["Off-grid Waterfall Trek Guide", "Feni Tasting Session"] },
            { codename: "Goa_Carnival_King", price: "₹25,000", threat: "High", vfm: "85%", duration: "4D/3N", brief: "A high-cost, high-reward cultural immersion during the Goa Carnival.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Goa/Goa_Carnival_King.png'}], inclusions: ["4-Star Hotel (Panjim)", "VIP Carnival Parade Access", "Casino Entry & Credits"], lockedInclusions: ["Backstage Pass to Float Prep", "Private After-Party Invite"] },
            { codename: "Goa_Workation_Weaver", price: "₹22,000", threat: "Low", vfm: "90%", duration: "10D/9N", brief: "Extended deployment for digital nomads. Establish a forward operating base.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Goa/Goa_Workation_Weaver.png'}], inclusions: ["Serviced Apartment with WiFi", "Co-working Space Pass", "Weekend Excursions"], lockedInclusions: ["Digital Nomad Community Mixer Access", "High-Speed Dongle Backup"] },
            { codename: "Goa_Squad_Goals", price: "₹15,999 pp", threat: "Medium", vfm: "93%", duration: "4D/3N", brief: "Large-scale group operation. Secure a private villa and dominate the social landscape.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Goa/Goa_Squad_Goals.png'}], inclusions: ["Private Villa with Pool (Vagator)", "Private Minibus for 8 hours/day", "Stocked Mini-bar on Arrival"], lockedInclusions: ["Private Chef BBQ Night", "Club Table Reservation Waiver"] }
        ]
    },
    himachal: {
        title: "MISSION SECTOR: HIMACHAL",
        subtitle: "Briefings for high-altitude and alpine operations.",
        coords: [32.0836, 77.1711],
        missions: [
            { codename: "Himachal_Alpine_Ascent", price: "₹12,999", threat: "Medium", vfm: "92%", duration: "6D/5N", brief: "Classic Manali deep-dive. Covers adventure sports and high-altitude pass reconnaissance.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Himachal/Himachal_Alpine_Ascent.png'}], inclusions: ["Hotel Stay (Manali)", "Solang Valley Day Trip", "Atal Tunnel & Sissu Exploration", "Volvo Bus (Delhi-Manali-Delhi)"], lockedInclusions: ["Secret Hot Springs Location", "Off-road 4x4 Trail Map"] },
            { codename: "Himachal_Parvati_Pilgrim", price: "₹9,999", threat: "High", vfm: "96%", duration: "5D/4N", brief: "Infiltrate Parvati Valley. Low-cost, high-endurance trekking.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Himachal/Himachal_Parvati_Pilgrim.png'}], inclusions: ["Guesthouse Stays (Kasol, Tosh)", "Guided Kheerganga Trek", "Manikaran Sahib Visit", "Overnight Bus Transfers"], lockedInclusions: ["Full Moon Party Schedule", "Hidden Cafe in the Woods"] },
            { codename: "Himachal_Spiti_Odyssey", price: "₹28,000", threat: "Extreme", vfm: "94%", duration: "10D/9N", brief: "The ultimate high-altitude desert expedition.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Himachal/Himachal_Spiti_Odyssey.png'}], inclusions: ["All transport (Innova/Tempo)", "Homestays & Guesthouses", "All Permits & Inner Line Permits"], lockedInclusions: ["Fossil Hunting Coordinates", "Stargazing Guide (Milky Way)"] },
            { codename: "Himachal_Colonial_Echo", price: "₹16,500", threat: "Low", vfm: "89%", duration: "4D/3N", brief: "A sophisticated operation in Shimla.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Himachal/Himachal_Colonial_Echo.png'}], inclusions: ["Heritage Hotel on Mall Road", "Kalka-Shimla Toy Train Ticket", "Jakhu Temple Ropeway"], lockedInclusions: ["Colonial Ghost Tour Access", "Members-Only Club Dinner"] },
            { codename: "Himachal_Dharma_Drifter", price: "₹11,500", threat: "Low", vfm: "93%", duration: "5D/4N", brief: "Spiritual and wellness mission in Dharamshala.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Himachal/Himachal_Dharma_Drifter.png'}], inclusions: ["Hotel in McLeodGanj", "Dalai Lama Temple Visit", "Triund Trek (Day Trek)"], lockedInclusions: ["Private Monk Debate Session", "Tibetan Medicine Consultation"] },
            { codename: "Himachal_Bike_Brigade", price: "₹21,000", threat: "High", vfm: "90%", duration: "8D/7N", brief: "A two-wheeled assault from Manali to Leh.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Himachal/Himachal_Bike_Brigade.png'}], inclusions: ["Royal Enfield 500cc Rental", "Backup Vehicle & Mechanic", "All Accommodations & Permits"], lockedInclusions: ["Hidden Off-road Shortcuts", "Rider's Patch & Badge"] },
            { codename: "Himachal_Winter_Wraith", price: "₹14,999", threat: "Medium", vfm: "91%", duration: "5D/4N", brief: "Winter warfare package.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Himachal/Himachal_Winter_Wraith.png'}], inclusions: ["Heated Hotel Rooms", "Skiing & Snowboarding Session", "4x4 Vehicle for snowy roads"], lockedInclusions: ["Igloo Stay Upgrade Option", "Private Bonfire Setup"] }
        ]
    },
    rajasthan: {
        title: "MISSION SECTOR: RAJASTHAN",
        subtitle: "Engage targets in the Arid and Heritage Zones.",
        coords: [27.0238, 74.2179],
        missions: [
            { codename: "Rajasthan_Royal_Retreat", price: "₹15,999", threat: "Low", vfm: "90%", duration: "5D/4N", brief: "A classic two-city operation covering the royal capitals.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Rajasthan/Rajasthan_Royal_Retreat.png'}], inclusions: ["3-Star Hotels", "Inter-city AC Train", "Guided Fort & Palace Tours"], lockedInclusions: ["Royal Family Tea Invite", "Private Stepwell Access"] },
            { codename: "Rajasthan_Desert_Dreamer", price: "₹11,999", threat: "Medium", vfm: "94%", duration: "4D/3N", brief: "Deep desert mission. Infiltrate Jaisalmer.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Rajasthan/Rajasthan_Desert_Dreamer.png'}], inclusions: ["Hotel (Jaisalmer)", "Overnight Desert Camp with Camel Safari", "Cultural Program & Dinner"], lockedInclusions: ["Dune Bashing 4x4 Session", "Midnight Stargazing Setup"] },
            { codename: "Rajasthan_Blue_Bastion", price: "₹10,500", threat: "Low", vfm: "92%", duration: "3D/2N", brief: "Focused reconnaissance of Jodhpur.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Rajasthan/Rajasthan_Blue_Bastion.png'}], inclusions: ["Heritage Haveli Stay", "Mehrangarh Fort Entry", "Ziplining 'Flying Fox' Ticket"], lockedInclusions: ["Best Blue City Photo Point Map", "Street Food Walk Guide"] },
            { codename: "Rajasthan_Pushkar_Mystic", price: "₹8,500", threat: "Low", vfm: "95%", duration: "3D/2N", brief: "A spiritual and cultural deep-dive into Pushkar.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Rajasthan/Rajasthan_Pushkar_Mystic.png'}], inclusions: ["Desert Camp Stay", "Brahma Temple Visit", "Sunset Camel Ride"], lockedInclusions: ["Ghat Aarti VIP Seat", "Local Handicraft Wholesaler List"] },
            { codename: "Rajasthan_Insta_Imperial", price: "₹18,000", threat: "Low", vfm: "88%", duration: "6D/5N", brief: "A high-value target acquisition mission for content creators.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Rajasthan/Rajasthan_Insta_Imperial.png'}], inclusions: ["Boutique Stays", "Private Car & Driver", "Entry to 'Instagrammable' spots"], lockedInclusions: ["Drone Permission Assistance", "Sunrise/Sunset Timing Guide"] },
            { codename: "Rajasthan_Zipline_Zorawar", price: "₹13,500", threat: "Medium", vfm: "91%", duration: "4D/3N", brief: "Adventure-focused op in Jodhpur.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Rajasthan/Rajasthan_Zipline_Zorawar.png'}], inclusions: ["Hotel Stay", "Mehrangarh Fort Ziplining", "Rappelling at Soorsagar"], lockedInclusions: ["Private Rock Climbing Session", "Leopard Safari Access"] },
            { codename: "Rajasthan_Monsoon_Monarch", price: "₹12,500", threat: "Low", vfm: "96%", duration: "4D/3N", brief: "Off-season op in Udaipur.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Rajasthan/Rajasthan_Monsoon_Monarch.png'}], inclusions: ["Lake-view Hotel", "Monsoon Palace Visit", "Guided cycling tour"], lockedInclusions: ["Secret Monsoon Waterfall Trek", "Rooftop Dinner Reservation"] }
        ]
    },
    kerala: {
        title: "MISSION SECTOR: KERALA",
        subtitle: "Dossiers for Aquatic, Plantation, and Wellness Operations.",
        coords: [10.8505, 76.2711],
        missions: [
            { codename: "Kerala_Backwater_Bliss", price: "₹13,999", threat: "Low", vfm: "93%", duration: "4D/3N", brief: "The quintessential Kerala mission. A 22-hour infiltration.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Kerala/Kerala_Backwater_Bliss.png'}], inclusions: ["Private 1-BR Houseboat (Alleppey)", "All meals on board", "Kochi Heritage Hotel (1 Night)"], lockedInclusions: ["Toddy Shop Tour", "Sunset Canoe Upgrade"] },
            { codename: "Kerala_Emerald_Escape", price: "₹11,500", threat: "Low", vfm: "91%", duration: "4D/3N", brief: "High-altitude operation in Munnar.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Kerala/Kerala_Emerald_Escape.png'}], inclusions: ["Resort Stay in Munnar", "Tea Plantation & Factory Visit", "Eravikulam National Park Entry"], lockedInclusions: ["Top Station Sunrise Trek", "Private Tea Tasting"] },
            { codename: "Kerala_Varkala_Vagabond", price: "₹9,999", threat: "Low", vfm: "95%", duration: "5D/4N", brief: "Coastal operation focused on the Varkala cliff-side.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Kerala/Kerala_Varkala_Vagabond.png'}], inclusions: ["Cliff-side Guesthouse", "Daily Yoga Class", "Surfing Lesson (Beginner)"], lockedInclusions: ["Secret Black Sand Beach Map", "Electronic Music Event Pass"] },
            { codename: "Kerala_Ayurveda_Ascension", price: "₹24,000", threat: "Low", vfm: "89%", duration: "8D/7N", brief: "A full-scale rejuvenation protocol.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Kerala/Kerala_Ayurveda_Ascension.png'}], inclusions: ["Ayurveda Resort Stay", "Doctor Consultation & Plan", "Daily Panchakarma Treatments"], lockedInclusions: ["Custom Herbal Medicine Kit", "Private Meditation Session"] },
            { codename: "Kerala_Kochi_Canvas", price: "₹10,500", threat: "Low", vfm: "90%", duration: "3D/2N", brief: "A cultural warfare mission in Fort Kochi.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Kerala/Kerala_Kochi_Canvas.png'}], inclusions: ["Boutique Hotel in Fort Kochi", "Kathakali Performance Ticket", "Guided tour of Mattancherry"], lockedInclusions: ["Artist Studio Access", "Secret Jazz Bar Entry"] },
            { codename: "Kerala_Monsoon_Maestro", price: "₹8,999", threat: "Low", vfm: "97%", duration: "4D/3N", brief: "Off-season deployment to witness Kerala's dramatic monsoon.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Kerala/Kerala_Monsoon_Maestro.png'}], inclusions: ["Homestay (Athirappilly)", "Athirappilly & Vazhachal Waterfalls visit", "Local Keralan meals"], lockedInclusions: ["Rainforest Night Trek", "Leech-Proof Gear Rental"] },
            { codename: "Kerala_Spice_Route_Saga", price: "₹19,999", threat: "Medium", vfm: "92%", duration: "7D/6N", brief: "A multi-pronged operation covering Kochi, Munnar, and Alleppey.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Kerala/Kerala_Spice_Route_Saga.png'}], inclusions: ["Hotels & Houseboat", "Private Car for entire trip", "All major sightseeing"], lockedInclusions: ["Spice Trading Warehouse Access", "Private Cooking Class"] }
        ]
    },
    uttarakhand: {
        title: "MISSION SECTOR: UTTARAKHAND",
        subtitle: "The Land of Gods. Spiritual and Adventure parameters active.",
        coords: [30.0668, 79.0193],
        missions: [
            { codename: "UK_Ganges_Rider", price: "₹9,500", threat: "Medium", vfm: "94%", duration: "3D/2N", brief: "High-adrenaline riverine operation in Rishikesh.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Uttarakhand/UK_Ganges_Rider.png'}], inclusions: ["Riverside Camp Stay", "16km River Rafting", "Cliff Jumping & Body Surfing"], lockedInclusions: ["Beatles Ashram Secret Entance", "Private Ganga Aarti Spot"] },
            { codename: "UK_Nainital_Nirvana", price: "₹12,000", threat: "Low", vfm: "90%", duration: "4D/3N", brief: "A tranquil operation centered around the lakes of Kumaon.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Uttarakhand/UK_Nainital_Nirvana.png'}], inclusions: ["Lake-view Hotel (Nainital)", "Boating on Naini Lake", "Cable Car to Snow View Point"], lockedInclusions: ["Haunted House Tour", "Hidden Lake Trek"] },
            { codename: "UK_Auli_Overwatch", price: "₹18,500", threat: "Medium", vfm: "91%", duration: "6D/5N", brief: "Winter-season alpine dominance.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Uttarakhand/UK_Auli_Overwatch.png'}], inclusions: ["Resort in Auli", "Skiing lessons & equipment", "Gondola ride (Asia's longest)"], lockedInclusions: ["Night Skiing Session", "Hot Chocolate by Bonfire"] },
            { codename: "UK_Corbett_Tracker", price: "₹14,000", threat: "Medium", vfm: "88%", duration: "3D/2N", brief: "Wildlife tracking mission in Jim Corbett National Park.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Uttarakhand/UK_Corbett_Tracker.png'}], inclusions: ["Jungle Resort Stay", "2 Jeep Safaris (Bijrani/Jhirna)", "Corbett Museum Visit"], lockedInclusions: ["Tiger Tracking Expert Guide", "Night Patrol Ride"] },
            { codename: "UK_Mussoorie_Muse", price: "₹11,000", threat: "Low", vfm: "89%", duration: "3D/2N", brief: "Classic hill station infiltration.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Uttarakhand/UK_Mussoorie_Muse.png'}], inclusions: ["Hotel on Mall Road", "Kempty Falls Visit", "Cable car to Gun Hill"], lockedInclusions: ["Ruskin Bond Book Signing Info", "Secret Sunset Point"] },
            { codename: "UK_Valley_of_Flowers", price: "₹16,000", threat: "High", vfm: "96%", duration: "7D/6N", brief: "Seasonal high-altitude botanical expedition.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Uttarakhand/UK_Valley_of_Flowers.png'}], inclusions: ["All transport from Haridwar", "Guesthouses (Govindghat, Ghangaria)", "All permits"], lockedInclusions: ["Rare Blue Poppy Coordinates", "Yogi Cave Visit"] },
            { codename: "UK_Tehri_Torrent", price: "₹15,500", threat: "Medium", vfm: "90%", duration: "4D/3N", brief: "Engage in advanced water sports at the Tehri Dam.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Uttarakhand/UK_Tehri_Torrent.png'}], inclusions: ["Lakeside Hotel", "Jet Skiing, Banana Boat Ride", "Kayaking session"], lockedInclusions: ["Floating Hut Dinner", "Underwater Temple History Tour"] }
        ]
    },
    karnataka: {
        title: "MISSION SECTOR: KARNATAKA",
        subtitle: "Ancient Ruins and Highland Plantations.",
        coords: [15.3173, 75.7139],
        missions: [
            { codename: "KA_Hampi_Historian", price: "₹10,999", threat: "Low", vfm: "95%", duration: "4D/3N", brief: "Time-travel operation to the ruins of the Vijayanagara Empire.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Karnataka/KA_Hampi_Historian.png'}], inclusions: ["Guesthouse in Hampi", "Full-day Auto-rickshaw Tour", "Coracle Ride on Tungabhadra"], lockedInclusions: ["Sunset Jam Session Spot", "Hidden Cave Paintings"] },
            { codename: "KA_Coorg_Coffee_Chronicles", price: "₹13,500", threat: "Low", vfm: "92%", duration: "3D/2N", brief: "Immerse in the aromatic highlands of Coorg.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Karnataka/KA_Coorg_Coffee_Chronicles.png'}], inclusions: ["Coffee Plantation Homestay", "Guided Plantation Walk & Tasting", "Abbey Falls & Raja's Seat Visit"], lockedInclusions: ["Civet Coffee Tasting", "Private Waterfall Access"] },
            { codename: "KA_Gokarna_Gateway", price: "₹9,500", threat: "Low", vfm: "94%", duration: "4D/3N", brief: "A coastal operation to the laid-back beaches of Gokarna.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Karnataka/KA_Gokarna_Gateway.png'}], inclusions: ["Beachside Shack/Guesthouse", "Beach trek (Kudle to Paradise)", "Visit to Mahabaleshwar Temple"], lockedInclusions: ["Bioluminescence Spotting Guide", "Secret Yoga Shala"] },
            { codename: "KA_Mysuru_Maharaja", price: "₹11,000", threat: "Low", vfm: "90%", duration: "3D/2N", brief: "A royal deep-dive into the cultural capital.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Karnataka/KA_Mysuru_Maharaja.png'}], inclusions: ["Heritage Hotel", "Mysore Palace Entry", "Brindavan Gardens Light Show"], lockedInclusions: ["Royal Silk Weaving Tour", "Best Mysore Pak Shop Info"] },
            { codename: "KA_Badami_Boulders", price: "₹14,500", threat: "Medium", vfm: "91%", duration: "4D/3N", brief: "Explore the rock-cut cave temples.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Karnataka/KA_Badami_Boulders.png'}], inclusions: ["Hotel in Badami", "Private Car for circuit", "Guided tour of all temple sites"], lockedInclusions: ["Bouldering Guide Contact", "Hidden Canyon Hike"] },
            { codename: "KA_Chikmagalur_Charm", price: "₹14,000", threat: "Low", vfm: "93%", duration: "3D/2N", brief: "Operation in India's coffee heartland.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Karnataka/KA_Chikmagalur_Charm.png'}], inclusions: ["Plantation Resort", "Mullayanagiri Peak Trek", "Jhari Waterfalls Visit"], lockedInclusions: ["Off-road Jeep Safari", "Wild Elephant Spotting Route"] },
            { codename: "KA_Dandeli_Daredevil", price: "₹12,500", threat: "Medium", vfm: "89%", duration: "3D/2N", brief: "Engage in river rafting and jungle adventures.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Karnataka/KA_Dandeli_Daredevil.png'}], inclusions: ["Jungle Camp Stay", "White Water Rafting", "Jungle Trekking & Kayaking"], lockedInclusions: ["Black Panther Tracking Zone", "Night Jungle Walk"] }
        ]
    },
    meghalaya: {
        title: "MISSION SECTOR: MEGHALAYA",
        subtitle: "Into the Abode of Clouds. Bio-lumina and eco-wonder operations.",
        coords: [25.4670, 91.3662],
        missions: [
            { codename: "ME_Mawsynram_Monsoon", price: "₹16,500", threat: "Medium", vfm: "94%", duration: "5D/4N", brief: "Monsoon-season mission to the wettest place on Earth.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Meghalaya/ME_Mawsynram_Monsoon.png'}], inclusions: ["Resort in Cherrapunji", "Visit to Mawsynram", "Exploration of numerous waterfalls"], lockedInclusions: ["Sacred Forest Entry", "Local Khasi Feast"] },
            { codename: "ME_Jaintia_Jewel", price: "₹18,000", threat: "Medium", vfm: "91%", duration: "6D/5N", brief: "Explore the Jaintia Hills, focusing on monoliths.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Meghalaya/ME_Jaintia_Jewel.png'}], inclusions: ["Homestay in Jowai", "Visit to Nartiang Monoliths", "Swimming at Krang Suri Falls"], lockedInclusions: ["Crystal River Boat Ride", "Archer's Competition Entry"] },
            { codename: "ME_Laitlum_Lookout", price: "₹11,000", threat: "Low", vfm: "93%", duration: "3D/2N", brief: "A short, high-impact mission from Shillong.", media: [{type:'image',src:'https://palatepilgrim.com/hubfs/VWW%20Destinations/Meghalaya/ME_Laitlum_Lookout.png'}], inclusions: ["Hotel in Shillong", "Full-day tour to Laitlum Canyons", "Trek down to Rasong village"], lockedInclusions: ["Bob Dylan Cafe Reserv.", "Police Bazar Secret Shop"] }
        ]
    }
};