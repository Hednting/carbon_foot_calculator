// 环保Tips内容，可自行扩展
const tipsList = [
  { icon: "🌱", text: "每天步行或骑行，减少碳排放。" },
  { icon: "💡", text: "随手关灯，节约用电。" },
  { icon: "🚰", text: "节约用水，减少热水使用。" },
  { icon: "🥗", text: "多吃蔬菜水果，少吃高碳食物。" },
  { icon: "🛍️", text: "自带购物袋，减少塑料使用。" },
  { icon: "♻️", text: "垃圾分类，资源回收再利用。" },
  { icon: "🚗", text: "拼车或乘坐公共交通出行。" },
  { icon: "🌳", text: "多种树，保护绿色家园。" }
];

let currentTip = 0;
const tipsCard = document.getElementById('tipsCard');
const tipsText = document.getElementById('tipsText');
const tipsDots = document.getElementById('tipsDots');

// 初始化指示点
tipsList.forEach((_, idx) => {
  const dot = document.createElement('span');
  dot.className = 'tips-dot' + (idx === 0 ? ' active' : '');
  dot.addEventListener('click', () => showTip(idx, true));
  tipsDots.appendChild(dot);
});

function showTip(idx, manual = false) {
  if (idx === currentTip) return;
  tipsCard.style.opacity = 0;
  setTimeout(() => {
    tipsText.textContent = tipsList[idx].text;
    tipsCard.querySelector('.tips-icon').textContent = tipsList[idx].icon;
    document.querySelectorAll('.tips-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    tipsCard.style.opacity = 1;
    currentTip = idx;
  }, 400);
  if (manual) {
    clearInterval(autoTimer);
    autoTimer = setInterval(nextTip, 4000);
  }
}

function nextTip() {
  let next = (currentTip + 1) % tipsList.length;
  showTip(next);
}

let autoTimer = setInterval(nextTip, 4000);

// 动态数字动画
function animateNumber(id, target, duration = 1800, decimals = 2) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const step = (timestamp, startTime) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = start + (target - start) * progress;
    el.textContent = value.toFixed(decimals);
    if (progress < 1) {
      requestAnimationFrame(ts => step(ts, startTime));
    } else {
      el.textContent = target.toFixed(decimals);
    }
  };
  requestAnimationFrame(step);
}

// 首页示例数据
window.addEventListener('DOMContentLoaded', function() {
  animateNumber('statGlobal', 4.7, 1800, 2); // 全球人均年碳排放
  animateNumber('statChina', 7.6, 1800, 2);  // 中国人均年碳排放
  animateNumber('statLocal', 6.2, 1800, 2);  // 本地人均碳排放
  animateNumber('leaderCount', 1289, 1800, 0); // 本月已测算人数
  animateNumber('leaderReduce', 32.5, 1800, 1); // 累计减少碳排放量

  // 用户头像逻辑
  var user = localStorage.getItem('currentUser');
  var avatar = document.getElementById('userAvatar');
  if (avatar) {
    if (user) {
      avatar.src = './images/' + user + '.png';
      avatar.style.display = 'inline-block';
    } else {
      avatar.style.display = 'none';
    }
  }
}); 