// Mock Data for 31/4L Village Website

export const villageStats = {
  name: "Chak 31/4L",
  tagline: "The Golden Heart of Punjab's Farmlands",
  location: "Okara District, Punjab, Pakistan",
  coordinates: "30.8012° N, 73.4478° E",
  stats: [
    { label: "Population", value: "Expected 4,000", description: "According to latest local survey" },
    { label: "Main District", value: "Okara", description: "Land of Agriculture & Dairy" },
    { label: "Primary Crops", value: "Potato, Wheat, Rice, Corn, Sugarcane", description: "Top agricultural exports" },
    { label: "Literacy Rate", value: "> 80%", description: "Highly active school enrollment" },
    { label: "Caste", value: "Baloch", description: "Main community of the village" }
  ]
};

export const villageHistory = {
  origin: "Established in the early 1900s during the development of the Lower Bari Doab Canal (LBDC) irrigation system. Settle-in families were allotted agricultural land under the British Canal Colony project, bringing farming expertise from diverse districts of undivided Punjab.",
  milestones: [
    { year: "1914", title: "First Settlement", description: "Arrival of pioneering farming families and initial allotment of chaks." },
    { year: "1947", title: "Independence & Harmony", description: "Smooth transition and welcoming of migrating families post-partition." },
    { year: "1962", title: "First Primary School", description: "Inauguration of the Government School, laying the foundation of education." },
    { year: "1988", title: "Electrification & Tube wells", description: "Modern farming began with electric tube wells replacing traditional Persian wheels." },
    { year: "2010", title: "Paved Streets & Canal Bridge", description: "Upgraded main transit roads and a new concrete bridge over the regional distributary." },
    { year: "2024", title: "Digital Integration", description: "Launching local community portal and starting the overseas resident directory." }
  ],
  geography: {
    overview: "Chak 31/4L is located in the fertile plains of Punjab. It benefits from a network of sub-canals feeding from the main canal branch, keeping the soil rich and highly productive.",
    distances: [
      { city: "Okara City", distance: "18 km" },
      { city: "Renala Khurd", distance: "12 km" },
      { city: "Lahore", distance: "115 km" }
    ]
  }
};

export const villageCulture = {
  intro: "Our village is one of the canal-irrigated farming settlements of Okara District, known locally by its chak number. Life here is simple and closely tied to the land, livestock, and strong Punjabi traditions.",
  sections: [
    {
      title: "Economy & Daily Life",
      text: "Farming is not only the source of income; many people are in government jobs like police officers, teachers, army officers, and the health department. Villagers grow wheat, rice, maize, potatoes, and sugarcane using water from the local canal system. Many families also raise animals like Sahiwal cows and Nili-Ravi buffaloes for milk and dairy.",
      subtext: "A typical day starts early with morning prayers, followed by work in the fields or with the animals. Afternoons are for rest, and evenings bring people together to relax and talk as the weather cools down.",
      gallery: [
        { label: "Wheat Crop", src: "/images/wheat.png" },
        { label: "Rice Crop", src: "/images/rice.png" },
        { label: "Sugarcane", src: "/images/sugarcane.png" },
        { label: "Livestock", src: "/images/animal img.jpg" }
      ]
    },
    {
      title: "Food & Traditions",
      text: "Meals here are fresh and homemade —- milk, desi butter (makhan), lassi, saag (mustard greens), and makki di roti (corn flatbread) are everyday favorites. Our village is also famous for its barfi, a traditional sweet loved by locals and visitors alike.",
      subtext: "Punjabi is the main language spoken. Men often wear shalwar kameez with a chaddar, while women wear shalwar kameez with colorful dupattas.",
      gallery: [
        { label: "Makki Roti", src: "/images/makki.jpg" },
        { label: "Lassi", src: "/images/lassi.png" },
        { label: "Barfi", src: "/images/barfi.png" }
      ]
    },
    {
      title: "Community Spirit",
      text: "People here believe in helping each other. Weddings, celebrations, and even disagreements are handled together as a community.",
      subtext: "Important affairs or issues are often guided by respected elders through informal gatherings (panchayat-style discussions) to maintain local peace and harmony.",
      gallery: [
        { label: "Chaupal", src: "/images/chaupal.png" },
        { label: "Panchayat", src: "/images/chaupal.png" },
        { label: "Celebrations", src: "/images/hero.png" }
      ]
    }
  ],
  eventsAndSports: {
    festivals: {
      title: "Festivals & Events",
      paragraphs: [
        "Our village celebrates two special urs (spiritual gatherings) every year in honor of local saints —- Urs Baba Suba Sadiq Shah Mela and Urs Baba Ahmad Shah. These are the biggest events on our village calendar, drawing residents and visitors from nearby areas alike.",
        "The celebrations feature traditional Qawwali music and Dhamaal, along with free community food (Langar) served to everyone who attends —- a tradition of hospitality and sharing that defines our village spirit.",
        "Alongside the spiritual gatherings, the mela comes alive with local sports and cultural activities:"
      ],
      bullets: [
        "Volleyball & Kabaddi matches —- friendly competitions between village teams",
        "Akhara (wrestling) contests —- a traditional test of strength and skill",
        "Dhol beats and Jhumar dance —- lively music and folk dance that keep the celebration going late into the evening"
      ]
    },
    sports: {
      title: "Sports & Recreation",
      paragraphs: [
        "Beyond the mela season, sports are a big part of everyday life here. Cricket and football are the most loved games among the youth, with friendly matches often played on open fields in the evenings.",
        "Cricket holds a special place in our village —- every year, local teams compete in the Kori Premier League (KPL), our very own cricket tournament that brings out fierce team spirit and excitement across the whole community. It's one of the most anticipated events of the year for sports lovers."
      ]
    },
    conclusion: "These urs melas, everyday matches, and the KPL tournament aren't just games and rituals —- they're where our whole community comes together to celebrate faith, tradition, and togetherness."
  }
};




export const placeLandmarks = [
  {
    id: 1,
    name: "Jamia Masjid Siddique E Akbar (R.A)",
    category: "Heritage",
    description: "The first and main masjid of our village, built more than 30 years ago, serving as the central spiritual heart of the community.",
    image: "/images/Masjid.PNG"
  },
  {
    id: 2,
    name: "Bahr Wala Chowk",
    category: "Community",
    description: "The main crossroads and heartbeat of our village - connecting Depalpur Road (East), Sahiwal Road (West), Okara Road (North), and Pakpattan Road (South). Home to food stalls, a snooker club, motorcycle repair shops, milk vendors, barbershops, and a beautiful mosque at its heart.",
    image: "/images/bahr.jpg"
  },
  {
    id: 3,
    name: "LBDC Distributary Bridge",
    category: "Scenic",
    description: "A popular evening spot overlooking the fast-flowing canal distributary, where youths gather to enjoy the cool breeze and sunset views.",
    image: "/images/hero.png"
  },
  {
    id: 4,
    name: "Government Boys Middle School",
    category: "Education",
    description: "This is the one and only government middle school for boys. In the past, the boys went to different villages for studies, but now they can study at their own village school. Children come daily to study, learn and play. There is also a ground for children to play. Students from different villages also come to study. This school also encourages the children to come and study.",
    image: "/images/boys school.png"
  }
];

export const localDirectory = [
  {
    id: 1,
    name: "Al-Hamd Agro Center",
    category: "Agriculture",
    owner: "Chaudhary Bashir Ahmad",
    contact: "+92 300 1234567",
    services: "Pesticides, high-yield seeds, fertilizers, and modern tractor renting services.",
    whatsapp: "+923001234567"
  },
  {
    id: 2,
    name: "Bhatti Custom Carpentry",
    category: "Artisans",
    owner: "Ustad Saleem Bhatti",
    contact: "+92 301 7654321",
    services: "Handmade wooden swing chairs (Jhoolas), traditional bridal beds, and wooden doors.",
    whatsapp: "+923017654321"
  },
  {
    id: 3,
    name: "Bilal General Store & Milk Shop",
    category: "Shops",
    owner: "Muhammad Bilal",
    contact: "+92 321 9876543",
    services: "Daily groceries, fresh dairy products, spices, and mobile recharge vouchers.",
    whatsapp: "+923219876543"
  },
  {
    id: 4,
    name: "Fatima Community Maternity Clinic",
    category: "Health",
    owner: "Dr. Ayesha Malik",
    contact: "+92 333 4567890",
    services: "Maternal care, emergency first aid, vaccination drives, and women's health consultation.",
    whatsapp: "+923334567890"
  },
  {
    id: 5,
    name: "Iqbal Modern High School",
    category: "Education",
    owner: "Principal Sajid Iqbal",
    contact: "+92 345 5432109",
    services: "Primary and Secondary education with focus on digital literacy and sports.",
    whatsapp: "+923455432109"
  },
  {
    id: 6,
    name: "Chishti Flour & Rice Mill",
    category: "Agriculture",
    owner: "Haji Liaquat Chishti",
    contact: "+92 312 8887776",
    services: "Cold-press mustard oil extraction, whole wheat flour grinding, and rice husking.",
    whatsapp: "+923128887776"
  }
];

export const communityNews = [
  {
    id: 1,
    title: "Annual Kabaddi Cup Schedule Announced",
    date: "July 28, 2026",
    tag: "Sports",
    excerpt: "The local sports committee has finalized standard rules and schedule for the upcoming Monsoon Kabaddi Cup starting early next month.",
    content: "We are excited to host 8 teams from surrounding villages for a three-day tournament. The prize pool includes a cash prize and a local breed calf for the tournament's best player (Man of the Match). Matches will start at 4:30 PM daily at the village sand court."
  },
  {
    id: 2,
    title: "Free Healthcare & Eye Care Camp",
    date: "July 22, 2026",
    tag: "Welfare",
    excerpt: "A free medical camp will be set up at the Government Primary School by Okara Welfare Society on upcoming Sunday.",
    content: "Residents can access free consultations from certified pediatricians, cardiologists, and eye specialists. Free medicines, glucose checks, and eye testing with complimentary prescription glasses will be distributed."
  },
  {
    id: 3,
    title: "Sewerage Pipe Network Expansion Approved",
    date: "July 15, 2026",
    tag: "Development",
    excerpt: "The District Council has approved budget for extending the paved sewerage canal network to the southern sector of Chak 31/4L.",
    content: "The local councilors confirmed that work will commence within two weeks. This project will resolve water logging issues in the street lanes during monsoon rainstorms."
  }
];

export const galleryCategories = [
  { id: "all", label: "All Photos" },
  { id: "farming", label: "Agriculture" },
  { id: "culture", label: "Festivals & Life" },
  { id: "landmarks", label: "Landmarks" }
];

export const galleryItems = [
  {
    id: 1,
    category: "culture",
    title: "Streets During Mela",
    description: "The village streets come alive during the annual Urs Mela — families, children and visitors from neighbouring villages pour in, filling every lane with colour, laughter and festive energy. Stalls line the roads, music fills the air, and the whole community gathers to celebrate faith and togetherness in true Punjabi spirit.",
    image: "/images/streets during Mela.jpeg"
  },
  {
    id: 2,
    category: "farming",
    title: "Wheat Fields",
    description: "Golden ripe wheat fields swaying under the bright April Punjab sun before harvest.",
    image: "/images/hero.png"
  },
  {
    id: 3,
    category: "culture",
    title: "Chaupal Gathering",
    description: "Elders chatting over hot tea under the historic Banyan tree in the cool evening.",
    image: "/images/chaupal.png"
  },
  {
    id: 4,
    category: "culture",
    title: "Kabaddi During Mela",
    description: "One of the most thrilling highlights of our annual Mela — a fierce Kabaddi match played on the village ground with teams from our own chak and neighbouring villages. Crowds gather on all sides, cheering at the top of their lungs as players raid and wrestle in the ancient tradition of this beloved Punjabi sport. Raw strength, quick reflexes, and pure team spirit — Kabaddi at the Mela is an experience like no other.",
    image: "/images/Kabbadi during Mela.jpeg"
  },
  {
    id: 5,
    category: "culture",
    title: "Kabaddi Warm-up",
    description: "Local athletes prepping on the clay court ahead of the village championship.",
    image: "/images/hero.png"
  },
  {
    id: 6,
    category: "landmarks",
    title: "Jamia Masjid Siddique E Akbar (R.A)",
    description: "The elegant minaret and dome of the village's main and first masjid, standing for over 30 years.",
    image: "/images/Masjid.PNG"
  },
  {
    id: 7,
    category: "farming",
    type: "video",
    title: "Bull Plowing in the Field",
    description: "The bull is plowing the agricultural field using traditional Punjabi farming methods.",
    video: "/videos/1.MOV",
    image: "/images/bull.jpg"
  },
  {
    id: 8,
    category: "farming",
    type: "video",
    title: "Rice Paddy Plantation",
    description: "Rice is planted in the paddy field during the monsoon farming season.",
    video: "/videos/2.MOV",
    image: "/images/rice.png"
  },
  {
    id: 9,
    category: "culture",
    type: "video",
    title: "Children Playing on Jumping Jhoola",
    description: "Village children having fun and playing on the jumping Jhoola in the local gathering.",
    video: "/videos/3.MOV",
    image: "/images/children playing.png"
  }
];
