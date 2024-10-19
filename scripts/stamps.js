const stamps = [
  "h17.webp",
  "gasmask.jpg",
  "aphex.png",
  "bobby-sponge.gif",
  "j18.webp",
  "legendofthepenis.webp",
  "ppels.webp",
  "xp.webp",
  "snack.webp",
  "kitty.webp",
  "cute.webp",
  "colon.webp",
  "73a.webp",
  "18.png",
  "stamp10.gif",
  "nich.webp",
  "e82.gif",
  "sleep.webp",
  "lucky.gif",
  "jerm.gif",
  "pizza.webp",
  "2001.webp",
  "tetris.webp",
  "egg.png",
  "stars.webp",
  "stamp100.gif",
  "garfpenis.png",
  "stamp121.gif"
]

const logStamps = [
  "t1.gif",
  "w8.gif",
  "v15.gif",
  "z6.gif",
  "j14.gif",
  "g20.gif",
  "gaysex.gif",
  "yaoi.gif",
  "h16.gif",
  "a13.gif",
  "c48.gif",
  "e65.gif",
  "e25.gif",
  "d64.gif",
  "e77.gif",
  "b1.gif",
  "a15.gif",
  "e63.gif",
  "d53.gif",
  "c36.gif",
  "a64.gif",
  "a59.gif",
  "a10.gif",
  "v27.gif",
  "burgerblinkie.gif",
  "loveonline.gif",
  "z15.gif",
  "t6.gif",
  "n3.gif",
  "bondageblink.gif",
  "62.gif",
  "z4.gif",
  "u14.gif",
  "g18.gif",
  "w1.gif",
  "g24.gif",
  "k18.gif",
  "s4.gif",
  "x38.gif",
  "yum.gif",
  "g26.gif",
  "p42.gif",
  "j52.gif",
  "t53.gif",
  "s53.gif",
  "g99.gif",
  "g12.gif",
  "c93.gif",
  "preg.webp",
]

const buttons = [
  ["neocities.gif", "https://neocities.org"],
  ["alien.gif", ""],
  ["minesweeper.png", "https://minesweeper.us"],
  ["bestdesktop.gif", ""],
  ["firefox.gif", "https://www.mozilla.org/en-US/firefox"],
  ["linux.jpg", "https://www.kernel.org"],
  ["archive.gif", "https://archive.org"],
  ["dream.gif", "https://store.steampowered.com/app/650700/Yume_Nikki/"],
  ["furry.png", ""],
  ["piracy.gif", ""],
  ["no.gif", ""],
  ["lain.gif", ""],
  ["yaoi.gif", ""],
  ["redgingham.gif", ""],
  ["socks.png", ""],
  ["smokekills.gif", ""],
  ["cherry.jpg", ""],
  ["artix.gif", "https://artixlinux.org"],
  ["chrome.gif", ""],
  ["tangerine.png", ""],
  ["card123.png", ""],
  ["2hu.gif", "https://moriyashrine.org/"],
  ["fifox.jpg", ""],
  ["archlinux.gif", "https://archlinux.org"],
  ["banshee.gif", "https://blankbanshee.bandcamp.com/"],
  ["benis.gif", ""],
  ["strike.gif", ""],
  ["dawa.gif", ""],
  ["beyes.gif", "https://www.youtube.com/watch?v=4lyI7O7kLP0"],
  ["tran.jpg", ""],
  ["onlinux.gif", ""],
  ["migu.gif", ""],
  ["vim.gif", ""],
  ["vocaloid.gif", ""],
  ["scottgames.gif", ""],
  ["touhou.webp", ""],
  ["apple.jpg", ""],
  ["badapple.webp", "https://youtu.be/FtutLA63Cp8"],
  ["earthbound.webp", "https://earthbound.fandom.com/wiki/EarthBound"],
  ["oldman.gif", ""],
  ["smile.gif", ""],
  ["wedding.gif", ""],
  ["raspberry.png", "https://youtu.be/eQS4zaSWjVk"],
  ["stalker.gif", "https://www.moddb.com/mods/stalker-anomaly"],
];

function loadStamps() {
  stamps.forEach(function(item) {
    var img = document.createElement("img");
    img.src = `/assets/stamps/${item}`;
    $("#stamps").append(img);
  });

  logStamps.forEach(function(item) {
    var img = document.createElement("img");
    img.src = `/assets/log-stamps/${item}`;
    $("#log-stamps").append(img);
  });

  buttons.forEach(function(item) {
    var link = document.createElement("a");
    var img = document.createElement("img");
    if (item[1].length > 0) link.href = item[1];
    img.src = `/assets/buttons/${item[0]}`;
    link.target = "_blank";
    link.appendChild(img);
    $("#buttons").append(link);
  });
}
