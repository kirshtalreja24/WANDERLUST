const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1500,
    location: "Malibu",
    country: "United States",
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "New York City",
    country: "United States",
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1000,
    location: "Aspen",
    country: "United States",
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 2500,
    location: "Florence",
    country: "Italy",
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 800,
    location: "Portland",
    country: "United States",
  },
  {
    title: "Beachfront Paradise",
    description:
      "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2000,
    location: "Cancun",
    country: "Mexico",
  },
  {
    title: "Rustic Cabin by the Lake",
    description:
      "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
  },
  {
    title: "Luxury Penthouse with City Views",
    description:
      "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 3500,
    location: "Los Angeles",
    country: "United States",
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description:
      "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
  },
  {
    title: "Safari Lodge in the Serengeti",
    description:
      "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
  },
  {
    title: "Peaceful Zen Garden Retreat",
    description:
      "Rejuvenate your spirit at this tranquil retreat surrounded by a Japanese zen garden and koi ponds.",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9b1a5d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1800,
    location: "Kyoto",
    country: "Japan",
  },
  {
    title: "Overwater Bungalow in Bora Bora",
    description:
      "Stay in an overwater bungalow with direct access to crystal-clear lagoons. A romantic paradise.",
    image: "https://images.unsplash.com/photo-1582719478171-2f5c4c2b39c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 5000,
    location: "Bora Bora",
    country: "French Polynesia",
  },
  {
    title: "Icelandic Aurora Cabin",
    description:
      "Watch the northern lights from your private hot tub in this cozy glass-roofed cabin.",
    image: "https://images.unsplash.com/photo-1519821172141-b5d8e0d7607d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2200,
    location: "Reykjavik",
    country: "Iceland",
  },
  {
    title: "Cave House in Cappadocia",
    description:
      "Stay in a traditional cave dwelling carved into the fairy chimneys. A truly unique experience.",
    image: "https://images.unsplash.com/photo-1594974966348-55d3f53c808c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1400,
    location: "Göreme",
    country: "Turkey",
  },
  {
    title: "Jungle Treehouse in Costa Rica",
    description:
      "Immerse yourself in the rainforest canopy in this eco-friendly jungle treehouse.",
    image: "https://images.unsplash.com/photo-1559628233-48b8f9b536e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Monteverde",
    country: "Costa Rica",
  },
  {
    title: "Desert Dome in Joshua Tree",
    description:
      "A geodesic dome with modern comforts in the heart of the desert. Perfect for stargazing.",
    image: "https://images.unsplash.com/photo-1606788075765-c34fdbf2cd65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGVzZXJ0fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1200,
    location: "Joshua Tree",
    country: "United States",
  },
  {
    title: "Floating House in Amsterdam",
    description:
      "Experience city life on the water in this charming houseboat.",
    image: "https://images.unsplash.com/photo-1599202164893-e3ab203fdf80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1900,
    location: "Amsterdam",
    country: "Netherlands",
  },
  {
    title: "Igloo Dome in the Arctic",
    description:
      "Stay warm in this luxury igloo while surrounded by snow and ice. Watch the aurora dance overhead.",
    image: "https://images.unsplash.com/photo-1561489427-8f4f8e0a06c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 2700,
    location: "Tromsø",
    country: "Norway",
  },
  {
    title: "Minimalist Flat in Seoul",
    description:
      "Modern comfort in the heart of the city. Clean design and close to everything.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1300,
    location: "Seoul",
    country: "South Korea",
  },
  {
    title: "Island Bungalow in the Maldives",
    description:
      "A dreamy island escape with turquoise waters and white sandy beaches.",
    image: "https://images.unsplash.com/photo-1587019155707-34b9c1cc4bdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 4800,
    location: "Malé",
    country: "Maldives",
  },
  {
    title: "French Countryside Cottage",
    description:
      "Rustic charm meets modern comfort in this idyllic cottage surrounded by vineyards.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y290dGFnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1600,
    location: "Provence",
    country: "France",
  },
  {
    title: "Historic Castle in Scotland",
    description:
      "Live like royalty in this authentic Scottish castle with centuries of history.",
    image: "https://images.unsplash.com/photo-1564518098554-805d15c8c71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNhc3RsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 4200,
    location: "Edinburgh",
    country: "Scotland",
  },
  {
    title: "Bohemian Hideout in Morocco",
    description:
      "Colorful decor and rooftop views in the heart of the medina.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1lZGluYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 1100,
    location: "Marrakech",
    country: "Morocco",
  },
  {
    title: "Tiny House in the Woods",
    description:
      "Minimalism meets nature in this cozy off-grid tiny home.",
    image: "https://images.unsplash.com/photo-1560448075-bb2a7638e640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGlueSUyMGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 700,
    location: "Vermont",
    country: "United States",
  },
  {
    title: "Lakefront Modern A-Frame",
    description:
      "Gaze out over the calm lake from this beautiful A-frame cabin with a fire pit.",
    image: "https://images.unsplash.com/photo-1613977257363-ea6d9a3f15d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YSUyMGZyYW1lfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    price: 1400,
    location: "Michigan",
    country: "United States",
  },
  {
    title: "Urban Studio in Berlin",
    description:
      "Compact and stylish studio in the heart of the creative district.",
    image: "https://images.unsplash.com/photo-1618221195710-ddbdc6d3bc7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0dWRpb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    price: 900,
    location: "Berlin",
    country: "Germany",
  },
  {
    title: "Tropical Villa in Bali",
    description:
      "Private villa with pool surrounded by lush jungle and rice paddies.",
    image: "https://images.unsplash.com/photo-1559477084-3fef7c2a508d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    price: 2100,
    location: "Ubud",
    country: "Indonesia",
  },
  {
  title: "Cave House in Cappadocia",
  description:
    "Stay inside a natural cave dwelling carved into the soft rock formations of Cappadocia.",
  image: "https://images.unsplash.com/photo-1580059484261-02e2a4b3de62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  price: 1750,
  location: "Göreme",
  country: "Turkey",
},
{
  title: "Luxury Yacht Stay in Dubai",
  description:
    "Live lavishly aboard a docked yacht with skyline views and first-class amenities.",
  image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  price: 5200,
  location: "Dubai",
  country: "United Arab Emirates",
},
{
  title: "Treehouse Escape in Costa Rica",
  description:
    "Reconnect with nature in a rainforest canopy treehouse. Wildlife at your doorstep.",
  image: "https://images.unsplash.com/photo-1601071171673-9ee1c3eec2ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  price: 1500,
  location: "Monteverde",
  country: "Costa Rica",
}];

module.exports = { data: sampleListings };
