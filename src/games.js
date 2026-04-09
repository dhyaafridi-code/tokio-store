// src/games.js

export const CATEGORIES = [
  { key: 'all', label: 'All Games' }, { key: 'hot', label: '🔥 Hot' }, { key: 'shooter', label: '🎯 Shooter' }, { key: 'adventure', label: '🗺️ Adventure' }, { key: 'rpg', label: '⚔️ RPG' }, { key: 'action', label: '💥 Action' }, { key: 'sport', label: '⚽ Sport' }, { key: 'free', label: '🆓 Free' },
];

export const GAMES = [
  // الألعاب القديمة نتاعك
  { title: "FC 26", price: 10.99, image: "https://image.api.playstation.com/vulcan/ap/rnd/202507/1617/2e757ffb0a6bb4b91af84db64e0183d725e56e5354f45eba.png", category: ['hot', 'sport'], rating: 4.8 },
  { title: "GTA 5", price: 10.50, image: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png", category: ['hot', 'action', 'shooter'], rating: 4.9 },
  { title: "Red Dead Redemption 2", price: 9.99, image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Red_Dead_Redemption_II.jpg/250px-Red_Dead_Redemption_II.jpg", category: ['hot', 'adventure', 'action'], rating: 4.9 },
  { title: "Assassin's Creed 2", price: 6.32, image: "https://store-images.s-microsoft.com/image/apps.41930.13751698123876051.fbe31682-3a2b-47ef-81cd-f2d61eb7eccd.a31a5e60-b857-4875-9874-e0db0f88a78d", category: ['adventure', 'action'], rating: 4.5 },
  { title: "Uncharted 4", price: 11.99, image: "https://upload.wikimedia.org/wikipedia/en/1/1a/Uncharted_4_box_artwork.jpg", category: ['adventure', 'action'], rating: 4.7 },
  { title: "Cyberpunk 2077", price: 19.99, image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/250px-Cyberpunk_2077_box_art.jpg", category: ['hot', 'rpg', 'action', 'shooter'], rating: 4.6 },
  { title: "Elden Ring", price: 13.99, image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg", category: ['hot', 'rpg', 'action'], rating: 4.9 },
  { title: "The Witcher 3", price: 14.99, image: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg", category: ['rpg', 'adventure'], rating: 4.9 },
  { title: "God of War", price: 16.99, image: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg", category: ['hot', 'action', 'adventure'], rating: 4.8 },
  { title: "Baldur's Gate 3", price: 18.99, image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Baldur%27s_Gate_3_cover_art.jpg/250px-Baldur%27s_Gate_3_cover_art.jpg", category: ['rpg', 'adventure'], rating: 4.9 },
  { title: "Counter-Strike 2", price: 0, image: "https://upload.wikimedia.org/wikipedia/en/f/f2/CS2_Cover_Art.jpg", category: ['free', 'shooter', 'hot'], rating: 4.7 },
  { title: "Resident Evil 4", price: 12.00, image: "https://media.senscritique.com/media/000021509526/0/resident_evil_4.png", category: ['action', 'shooter'], rating: 4.6 },
  { title: "Hogwarts Legacy", price: 12.50, image: "https://image.api.playstation.com/vulcan/ap/rnd/202503/2716/f6b1e4512ee6061913f7d604da8f5f39566be56ca32a68ee.png", category: ['rpg', 'adventure'], rating: 4.7 },
  { title: "Call of Duty: MW3", price: 19.25, image: "https://upload.wikimedia.org/wikipedia/en/b/bf/Call_of_Duty_Modern_Warfare_3_box_art.png", category: ['shooter', 'hot', 'action'], rating: 4.5 },
  
  // الألعاب الجديدة المشهورة (مجانية ومدفوعة)
  { title: "Valorant", price: 0, image: "https://store-images.s-microsoft.com/image/apps.21507.13663857844271189.4c1de202-3961-4c40-a0aa-7f4f1388775a.20ed7782-0eda-4f9d-b421-4cc47492edc6", category: ['free', 'shooter', 'hot'], rating: 4.8 },
  { title: "Apex Legends", price: 0, image: "https://upload.wikimedia.org/wikipedia/en/d/db/Apex_legends_cover.jpg", category: ['free', 'shooter', 'action'], rating: 4.6 },
  { title: "Fortnite", price: 0, image: "https://m.media-amazon.com/images/M/MV5BMTZlMmIxM2EtN2Y4Zi00M2ZhLTk3NzgtNjJmZTU0MTQ3YjcwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", category: ['free', 'shooter', 'hot'], rating: 4.7 },
  { title: "Minecraft", price: 15.99, image: "https://store-images.s-microsoft.com/image/apps.17382.13510798885735219.9735d495-578c-4a4c-b892-3eb3a780b3a0.d3792486-cf98-40c0-a2c1-d6443f0e2b70", category: ['adventure', 'hot'], rating: 5.0 },
  { title: "Spider-Man Remastered", price: 24.99, image: "https://upload.wikimedia.org/wikipedia/en/e/e1/Spider-Man_PS4_cover.jpg", category: ['action', 'adventure'], rating: 4.8 },
  { title: "The Last of Us Part I", price: 29.99, image: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Last_of_Us_Part_I_cover.jpg", category: ['action', 'adventure', 'hot'], rating: 4.9 },
  { title: "Ghost of Tsushima", price: 22.50, image: "https://upload.wikimedia.org/wikipedia/en/b/b6/Ghost_of_Tsushima.jpg", category: ['action', 'adventure', 'rpg'], rating: 4.9 },
  { title: "Helldivers 2", price: 25.00, image: "https://image.api.playstation.com/vulcan/ap/rnd/202602/0318/6e5ee3f7aa2bc0a43db36822068e252c4b42702eff9c0b45.jpg", category: ['shooter', 'action', 'hot'], rating: 4.7 },
  { title: "Palworld", price: 18.00, image: "https://e.snmc.io/lk/f/x/08706f71d62247b7eefcb89b67b91373/10853756", category: ['adventure', 'rpg', 'hot'], rating: 4.5 },
  { title: "Overwatch 2", price: 0, image: "https://m.media-amazon.com/images/M/MV5BOGMxODVmNDgtZGE1Yy00Y2VlLTk3ZTMtYzU5YTcxODhiNzMxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", category: ['free', 'shooter'], rating: 4.2 },
  { title: "League of Legends", price: 0, image: "https://store-images.s-microsoft.com/image/apps.18996.14127010465288187.f9de4a96-0ee4-4da3-bf66-d4132b38c599.caf661a7-e0b3-492d-b91b-63627e47283e", category: ['free', 'rpg', 'hot'], rating: 4.6 },
  { title: "Forza Horizon 5", price: 25.99, image: "https://upload.wikimedia.org/wikipedia/en/8/86/Forza_Horizon_5_cover_art.jpg", category: ['sport', 'hot'], rating: 4.8 },
  { title: "Rocket League", price: 0, image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Rocket_League_coverart.jpg", category: ['free', 'sport'], rating: 4.7 },
  { title: "Tekken 8", price: 35.00, image: "https://image.api.playstation.com/vulcan/ap/rnd/202308/0312/aff71a0ced271048f5079b1fcf715bcb45110efc13e9704a.png", category: ['action', 'hot'], rating: 4.8 },
  { title: "Terraria", price: 4.99, image: "https://image.alza.cz/products/WG421/WG421.jpg?width=500&height=500", category: ['adventure', 'rpg'], rating: 4.9 },
  { title: "Stardew Valley", price: 7.99, image: "https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png", category: ['rpg', 'adventure'], rating: 4.9 },
  { title: "Rainbow Six Siege", price: 9.99, image: "https://upload.wikimedia.org/wikipedia/en/4/47/Tom_Clancy%27s_Rainbow_Six_Siege_cover_art.jpg", category: ['shooter', 'action'], rating: 4.6 },
  { title: "Destiny 2", price: 0, image: "https://upload.wikimedia.org/wikipedia/en/0/05/Destiny_2_%28artwork%29.jpg", category: ['free', 'shooter', 'rpg'], rating: 4.4 },
  { title: "EA Sports FC 24", price: 14.99, image: "https://store-images.s-microsoft.com/image/apps.62211.14149336736014321.ba14b91a-e8c6-40d0-9285-ac512ca86a54.8021282f-2bc6-41f3-8412-fe458797ea2b", category: ['sport'], rating: 4.5 },
  { title: "Sekiro: Shadows Die Twice", price: 19.99, image: "https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg", category: ['action', 'rpg'], rating: 4.9 },
  { title: "Horizon Zero Dawn", price: 12.99, image: "https://static.actugaming.net/media/2024/09/horizon-zero-dawn-remastered-jaquette-e1727684857588.webp", category: ['adventure', 'action'], rating: 4.8 }
];
